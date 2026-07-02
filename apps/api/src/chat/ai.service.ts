import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

export interface AiTurn {
  role: 'user' | 'model';
  text: string;
}

/**
 * Thin wrapper over Google Gemini. Builds nothing itself — callers pass the
 * fully-formed `systemInstruction` (with the on-topic guardrail) and the mapped
 * conversation. Degrades gracefully: with no key / on error it returns a
 * friendly Spanish fallback so the rest of the portal keeps working.
 */
@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private client: GoogleGenAI | null = null;

  constructor(private readonly config: ConfigService) {
    const apiKey = this.config.get<string>('GEMINI_API_KEY');
    if (apiKey) this.client = new GoogleGenAI({ apiKey });
    else this.logger.warn('GEMINI_API_KEY not set — Buddy chat will use a fallback reply');
  }

  get configured(): boolean {
    return this.client !== null;
  }

  async generateReply(systemInstruction: string, history: AiTurn[]): Promise<string> {
    if (!this.client) {
      return 'Tu Buddy todavía no está conectado. Escríbele a tu profe y lo activa enseguida 🙌';
    }
    const model = this.config.get<string>('GEMINI_MODEL') ?? 'gemini-2.0-flash';
    try {
      const res = await this.client.models.generateContent({
        model,
        contents: history.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
        config: {
          systemInstruction,
          maxOutputTokens: 700,
          temperature: 0.6,
        },
      });
      const text = res.text?.trim();
      if (!text) throw new Error('empty completion');
      return text;
    } catch (err) {
      this.logger.error(`Gemini request failed: ${String(err)}`);
      return 'Ups, no pude conectarme ahora mismo. Intenta de nuevo en unos segundos 🙏';
    }
  }
}
