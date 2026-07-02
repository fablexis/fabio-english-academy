import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, type Transporter } from 'nodemailer';
import { adminInviteEmail, passwordResetEmail, type RenderedEmail } from './templates';

/**
 * Sends the admin transactional emails. With SMTP_* configured it delivers
 * through nodemailer; without it (local dev) it logs the subject and the
 * action link so the flow stays fully testable. Resend is special-cased to
 * its HTTPS API because some hosts (e.g. Railway trial plans) block outbound
 * SMTP ports — SMTP_PASS doubles as the Resend API key.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: Transporter | null;
  private readonly resendKey: string | null;

  constructor(private readonly config: ConfigService) {
    const host = this.config.get<string>('SMTP_HOST');
    if (host === 'smtp.resend.com') {
      this.transporter = null;
      this.resendKey = this.config.get<string>('SMTP_PASS') || null;
      if (!this.resendKey) {
        this.logger.warn('SMTP_HOST is Resend but SMTP_PASS is empty — emails are logged, not sent');
      }
    } else if (host) {
      const port = Number(this.config.get<string>('SMTP_PORT') ?? 587);
      const user = this.config.get<string>('SMTP_USER');
      this.resendKey = null;
      this.transporter = createTransport({
        host,
        port,
        secure: port === 465,
        auth: user
          ? { user, pass: this.config.get<string>('SMTP_PASS') }
          : undefined,
        // Fail fast when the host blocks outbound SMTP instead of hanging
        // the awaiting HTTP request for minutes.
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 20_000,
      });
    } else {
      this.transporter = null;
      this.resendKey = null;
      this.logger.warn('SMTP_HOST not set — emails are logged, not sent');
    }
  }

  async sendAdminInvite(params: {
    email: string;
    name?: string;
    inviteUrl: string;
    invitedBy?: string;
    expiresHours: number;
  }): Promise<void> {
    await this.deliver(params.email, adminInviteEmail(params), params.inviteUrl);
  }

  async sendPasswordReset(params: {
    email: string;
    resetUrl: string;
    expiresMinutes: number;
  }): Promise<void> {
    await this.deliver(params.email, passwordResetEmail(params), params.resetUrl);
  }

  private async deliver(to: string, mail: RenderedEmail, actionUrl: string): Promise<void> {
    if (!this.resendKey && !this.transporter) {
      this.logger.log(`[dev mail] to=${to} subject="${mail.subject}" link=${actionUrl}`);
      return;
    }
    try {
      await this.send(to, mail);
    } catch (err) {
      // Surface the action link so a failed delivery (blocked port, sandboxed
      // sender, provider outage) can still be handed to the user manually.
      this.logger.error(`[mail failed] to=${to} link=${actionUrl}`);
      throw err;
    }
  }

  private async send(to: string, mail: RenderedEmail): Promise<void> {
    const from =
      this.config.get<string>('MAIL_FROM') ??
      'Your English Buddy <no-reply@yourenglishbuddy.com>';

    if (this.resendKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${this.resendKey}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ from, to, subject: mail.subject, html: mail.html, text: mail.text }),
        signal: AbortSignal.timeout(15_000),
      });
      if (!res.ok) {
        throw new Error(`Resend API ${res.status}: ${await res.text()}`);
      }
      this.logger.log(`Sent "${mail.subject}" to ${to} via Resend API`);
      return;
    }

    if (!this.transporter) return; // unreachable — deliver() guards this
    await this.transporter.sendMail({
      from,
      to,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });
    this.logger.log(`Sent "${mail.subject}" to ${to}`);
  }
}
