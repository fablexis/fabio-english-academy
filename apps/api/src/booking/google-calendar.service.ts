import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, type Auth } from 'googleapis';

// Use the google-auth-library types re-exported by `googleapis` itself — the
// package bundles its own copy, so importing them from the top-level
// google-auth-library would be a different (incompatible) declaration.
export type GoogleTokens = Auth.Credentials;

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/userinfo.email',
  'openid',
];

export interface BusyInterval {
  start: string;
  end: string;
}

/**
 * Google OAuth 2.0 + Calendar (free/busy read + event write). Tokens are stored
 * on the PortalSettings singleton and passed in per call. Every call returns the
 * possibly-refreshed credentials so the caller can persist them.
 */
@Injectable()
export class GoogleCalendarService {
  private readonly logger = new Logger(GoogleCalendarService.name);

  constructor(private readonly config: ConfigService) {}

  get configured(): boolean {
    return Boolean(
      this.config.get<string>('GOOGLE_CLIENT_ID') &&
        this.config.get<string>('GOOGLE_CLIENT_SECRET') &&
        this.redirectUri(),
    );
  }

  private redirectUri(): string {
    const explicit = this.config.get<string>('GOOGLE_REDIRECT_URI');
    if (explicit) return explicit;
    const base =
      this.config.get<string>('API_PUBLIC_URL') ??
      `http://localhost:${this.config.get<string>('PORT') ?? '3001'}`;
    return `${base.replace(/\/+$/, '')}/admin/booking/google/callback`;
  }

  // Return type is intentionally inferred: `googleapis` constructs its own
  // (nested) google-auth-library OAuth2Client, which is a distinct nominal type
  // from the top-level one that `Auth.OAuth2Client` resolves to. Inferring keeps
  // `google.calendar({ auth })` happy.
  private oauthClient(tokens?: GoogleTokens) {
    if (!this.configured) {
      throw new ServiceUnavailableException(
        'Google Calendar no está configurado en el servidor (faltan credenciales OAuth).',
      );
    }
    const client = new google.auth.OAuth2(
      this.config.get<string>('GOOGLE_CLIENT_ID'),
      this.config.get<string>('GOOGLE_CLIENT_SECRET'),
      this.redirectUri(),
    );
    if (tokens) client.setCredentials(tokens);
    return client;
  }

  /** Consent URL to start the OAuth flow. `state` is verified on callback. */
  getAuthUrl(state: string): string {
    return this.oauthClient().generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: SCOPES,
      state,
      include_granted_scopes: true,
    });
  }

  /** Exchange the callback code for tokens + the connected account email. */
  async exchangeCode(code: string): Promise<{ tokens: GoogleTokens; email: string | null }> {
    const client = this.oauthClient();
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);
    let email: string | null = null;
    try {
      const oauth2 = google.oauth2({ version: 'v2', auth: client });
      const me = await oauth2.userinfo.get();
      email = me.data.email ?? null;
    } catch (err) {
      this.logger.warn(`Could not read Google account email: ${String(err)}`);
    }
    return { tokens, email };
  }

  /** Busy blocks on the tutor's primary calendar between two instants. */
  async freeBusy(
    tokens: GoogleTokens,
    timeMin: Date,
    timeMax: Date,
  ): Promise<{ busy: BusyInterval[]; tokens: GoogleTokens }> {
    const client = this.oauthClient(tokens);
    const cal = google.calendar({ version: 'v3', auth: client });
    const res = await cal.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        items: [{ id: 'primary' }],
      },
    });
    const busy = (res.data.calendars?.primary?.busy ?? [])
      .filter((b): b is { start: string; end: string } => Boolean(b.start && b.end))
      .map((b) => ({ start: b.start, end: b.end }));
    return { busy, tokens: client.credentials };
  }

  /** Create the confirmed class on the tutor's calendar (with the Zoom link). */
  async createEvent(
    tokens: GoogleTokens,
    input: { summary: string; description: string; location?: string; start: Date; end: Date },
  ): Promise<{ eventId: string | null; tokens: GoogleTokens }> {
    const client = this.oauthClient(tokens);
    const cal = google.calendar({ version: 'v3', auth: client });
    const res = await cal.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: input.summary,
        description: input.description,
        location: input.location,
        start: { dateTime: input.start.toISOString() },
        end: { dateTime: input.end.toISOString() },
      },
    });
    return { eventId: res.data.id ?? null, tokens: client.credentials };
  }

  async revoke(tokens: GoogleTokens): Promise<void> {
    try {
      const client = this.oauthClient(tokens);
      if (tokens.access_token) await client.revokeToken(tokens.access_token);
    } catch (err) {
      this.logger.warn(`Google token revoke failed: ${String(err)}`);
    }
  }
}
