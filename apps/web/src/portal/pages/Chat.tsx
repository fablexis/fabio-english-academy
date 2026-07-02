import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Eye, Send, Sparkles } from 'lucide-react';
import type { ChatMessageDto } from '@eyb/shared';
import { portalApi } from '../lib/client';
import s from '../styles/portal.module.scss';

const SUGGESTIONS = [
  '¿Cuál es la diferencia entre "put off" y "call off"?',
  'Dame más ejemplos de past perfect',
  '¿Cómo empiezo mi respuesta a "Tell me about yourself"?',
];

let tmpId = 0;

const Chat: React.FC = () => {
  const location = useLocation();
  const { data: history } = useQuery({ queryKey: ['portal', 'chat'], queryFn: portalApi.chatHistory });

  const [messages, setMessages] = useState<ChatMessageDto[]>([]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Seed the message list from the server history exactly once.
  useEffect(() => {
    if (!seeded && history) {
      setMessages(history);
      setSeeded(true);
    }
  }, [history, seeded]);

  // Pre-fill from "Preguntar sobre esta clase".
  useEffect(() => {
    const prefill = (location.state as { prefill?: string } | null)?.prefill;
    if (prefill) setDraft(prefill);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autoscroll to the newest message / typing indicator.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const hasUserMsg = messages.some((m) => m.from === 'student');

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || typing) return;
    const optimistic: ChatMessageDto = {
      id: `tmp-${tmpId++}`,
      from: 'student',
      text: t,
      createdAt: new Date(0).toISOString(),
    };
    setMessages((cur) => [...cur, optimistic]);
    setDraft('');
    setTyping(true);
    try {
      const { student, reply } = await portalApi.sendChat(t);
      // Swap the optimistic bubble for the persisted one, then add the reply.
      setMessages((cur) => cur.map((m) => (m.id === optimistic.id ? student : m)).concat(reply));
    } catch {
      setMessages((cur) => [
        ...cur,
        {
          id: `err-${tmpId++}`,
          from: 'ai',
          text: 'Ups, no pude conectarme ahora mismo. Intenta de nuevo en unos segundos 🙏',
          createdAt: new Date(0).toISOString(),
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <main className={s.chatMain}>
      <div className={s.chatHeader}>
        <div className={s.chatHeaderLeft}>
          <div className={s.chatAvatar}>
            <Sparkles size={21} />
          </div>
          <div className={s.chatTitles}>
            <h1>Tu Buddy</h1>
            <p>Responde solo sobre los temas que viste en clase</p>
          </div>
        </div>
        <span className={s.chatEyePill}>
          <Eye size={13} /> Tu profe puede leer esta conversación
        </span>
      </div>

      <div className={s.chatBody} ref={bodyRef}>
        {messages.map((m) => {
          const user = m.from === 'student';
          return (
            <div key={m.id} className={`${s.msgRow} ${user ? s.msgRowUser : s.msgRowAi}`}>
              <div className={`${s.msgBubble} ${user ? s.msgBubbleUser : s.msgBubbleAi}`}>
                {m.text}
              </div>
            </div>
          );
        })}
        {typing && (
          <div className={s.typing}>
            <div className={s.typingBubble}>
              <span className={s.typingDot} />
              <span className={s.typingDot} />
              <span className={s.typingDot} />
            </div>
          </div>
        )}
      </div>

      {!hasUserMsg && (
        <div className={s.suggestions}>
          {SUGGESTIONS.map((sug) => (
            <button key={sug} type="button" className={s.suggestionChip} onClick={() => void send(sug)}>
              {sug}
            </button>
          ))}
        </div>
      )}

      <div className={s.composer}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && void send(draft)}
          placeholder="Escribe tu pregunta sobre lo que viste en clase…"
        />
        <button
          type="button"
          className={s.sendBtn}
          title="Enviar"
          onClick={() => void send(draft)}
          disabled={typing || !draft.trim()}
        >
          <Send size={18} strokeWidth={2.2} />
        </button>
      </div>
    </main>
  );
};

export default Chat;
