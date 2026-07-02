import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, type Transporter } from 'nodemailer';
import { adminInviteEmail, passwordResetEmail, type RenderedEmail } from './templates';

/**
 * Sends the admin transactional emails. With SMTP_* configured it delivers
 * through nodemailer; without it (local dev) it logs the subject and the
 * action link so the flow stays fully testable.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: Transporter | null;

  constructor(private readonly config: ConfigService) {
    const host = this.config.get<string>('SMTP_HOST');
    if (host) {
      const port = Number(this.config.get<string>('SMTP_PORT') ?? 587);
      const user = this.config.get<string>('SMTP_USER');
      this.transporter = createTransport({
        host,
        port,
        secure: port === 465,
        auth: user
          ? { user, pass: this.config.get<string>('SMTP_PASS') }
          : undefined,
      });
    } else {
      this.transporter = null;
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
    if (!this.transporter) {
      this.logger.log(`[dev mail] to=${to} subject="${mail.subject}" link=${actionUrl}`);
      return;
    }
    const from =
      this.config.get<string>('MAIL_FROM') ??
      'Your English Buddy <no-reply@yourenglishbuddy.com>';
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
