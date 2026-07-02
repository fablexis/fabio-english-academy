// Transactional email templates for the admin panel, in the site's brand
// (teal #185C60 · lime #C8E47C · CTA green #5CF890). Email-safe HTML: nested
// tables, inline styles, system font stack, bulletproof button, 560px card.
// Every template also ships a plain-text alternative.

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

// ── Shared frame ─────────────────────────────────────────────────────────────

const FONT =
  "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const COLORS = {
  canvas: '#eef4f3',
  card: '#ffffff',
  teal: '#185c60',
  tealDeep: '#0f3b3e',
  tealSoft: '#2a7a7f',
  lime: '#c8e47c',
  cta: '#5cf890',
  heading: '#233637',
  text: '#52676a',
  muted: '#78898b',
  line: '#e2eaea',
};

function button(label: string, url: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:8px auto 0;">
      <tr>
        <td bgcolor="${COLORS.cta}" style="border-radius:10px;">
          <a href="${url}" target="_blank"
             style="display:inline-block;padding:14px 34px;font-family:${FONT};font-size:15px;font-weight:bold;color:${COLORS.tealDeep};text-decoration:none;border-radius:10px;">
            ${label}&nbsp;&nbsp;&rarr;
          </a>
        </td>
      </tr>
    </table>`;
}

function checklistRow(title: string, detail: string): string {
  return `
    <tr>
      <td valign="top" style="padding:7px 0;width:26px;">
        <span style="display:inline-block;width:18px;height:18px;border-radius:9px;background:${COLORS.lime};color:${COLORS.tealDeep};font-family:${FONT};font-size:12px;font-weight:bold;line-height:18px;text-align:center;">&#10003;</span>
      </td>
      <td style="padding:7px 0;font-family:${FONT};font-size:14px;line-height:1.5;color:${COLORS.text};">
        <strong style="color:${COLORS.heading};">${title}:</strong> ${detail}
      </td>
    </tr>`;
}

interface FrameOptions {
  preheader: string;
  bodyHtml: string;
  recipientEmail: string;
  footerReason: string;
}

function frame(opts: FrameOptions): string {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>Your English Buddy</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.canvas};">
  <!-- preheader: shows in the inbox preview, hidden in the body -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${opts.preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLORS.canvas}">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:560px;max-width:100%;">

          <!-- ── Header ── -->
          <tr>
            <td bgcolor="${COLORS.teal}" style="border-radius:16px 16px 0 0;padding:26px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:${FONT};font-size:18px;font-weight:bold;color:#ffffff;letter-spacing:0.2px;">
                    <span style="display:inline-block;width:10px;height:10px;border-radius:5px;background:${COLORS.lime};margin-right:9px;"></span>Your English Buddy
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background:${COLORS.tealSoft};color:${COLORS.lime};font-family:${FONT};font-size:10px;font-weight:bold;letter-spacing:1.5px;padding:5px 10px;border-radius:20px;">ADMIN</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td bgcolor="${COLORS.card}" style="border-radius:0 0 16px 16px;padding:38px 40px 34px;">
              ${opts.bodyHtml}
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td align="center" style="padding:22px 24px 0;">
              <p style="margin:0 0 4px;font-family:${FONT};font-size:12px;line-height:1.6;color:${COLORS.muted};">
                Your English Buddy · Panel de administración
              </p>
              <p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.6;color:${COLORS.muted};">
                Enviado a ${opts.recipientEmail} ${opts.footerReason}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function fallbackLink(url: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:26px;">
      <tr><td style="border-top:1px solid ${COLORS.line};padding-top:18px;font-family:${FONT};font-size:12px;line-height:1.6;color:${COLORS.muted};">
        Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
        <a href="${url}" style="color:${COLORS.teal};word-break:break-all;">${url}</a>
      </td></tr>
    </table>`;
}

// ── Admin invitation ─────────────────────────────────────────────────────────

export function adminInviteEmail(params: {
  email: string;
  name?: string;
  inviteUrl: string;
  invitedBy?: string;
  expiresHours: number;
}): RenderedEmail {
  const { email, name, inviteUrl, invitedBy, expiresHours } = params;
  const invitedByLine = invitedBy
    ? `<strong style="color:${COLORS.heading};">${invitedBy}</strong> te ha invitado a administrar`
    : 'Te han invitado a administrar';
  const welcome = name
    ? `¡Bienvenido al equipo, ${name}! &#128075;`
    : '¡Bienvenido al equipo! &#128075;';

  const bodyHtml = `
    <h1 style="margin:0 0 14px;font-family:${FONT};font-size:24px;line-height:1.3;color:${COLORS.heading};">
      ${welcome}
    </h1>
    <p style="margin:0 0 14px;font-family:${FONT};font-size:15px;line-height:1.65;color:${COLORS.text};">
      ${invitedByLine} <strong style="color:${COLORS.heading};">Your English Buddy</strong>,
      la academia que ayuda a hispanohablantes a hablar inglés con confianza
      en situaciones reales, sin miedo y con mucho acompañamiento.
    </p>
    <p style="margin:0 0 8px;font-family:${FONT};font-size:15px;line-height:1.65;color:${COLORS.text};">
      Desde el panel podrás gestionar todo lo que ven nuestros estudiantes:
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 20px;">
      ${checklistRow('Páginas del sitio', 'el hero, el equipo, los cursos y cada texto público.')}
      ${checklistRow('Blog', 'artículos, ejercicios y borradores; se publican al guardar.')}
      ${checklistRow('WhatsApp y redes', 'el canal por donde llega cada nuevo estudiante.')}
    </table>
    <p style="margin:0 0 6px;font-family:${FONT};font-size:15px;line-height:1.65;color:${COLORS.text};text-align:center;">
      Crea tu contraseña para activar tu cuenta:
    </p>
    ${button('Crear mi contraseña', inviteUrl)}
    <p style="margin:16px 0 0;font-family:${FONT};font-size:13px;line-height:1.6;color:${COLORS.muted};text-align:center;">
      Este enlace es personal y caduca en ${expiresHours} horas.
    </p>
    ${fallbackLink(inviteUrl)}
    <p style="margin:14px 0 0;font-family:${FONT};font-size:12px;line-height:1.6;color:${COLORS.muted};">
      ¿No esperabas esta invitación? Puedes ignorar este correo; la cuenta no
      se activará sin este enlace.
    </p>`;

  return {
    subject: 'Tu acceso al panel de Your English Buddy',
    html: frame({
      preheader:
        'Te invitaron a administrar Your English Buddy. Crea tu contraseña para activar tu cuenta.',
      bodyHtml,
      recipientEmail: email,
      footerReason: 'porque se creó una cuenta de administrador para ti.',
    }),
    text: [
      name
        ? `¡Bienvenido al equipo de Your English Buddy, ${name}!`
        : '¡Bienvenido al equipo de Your English Buddy!',
      '',
      `${invitedBy ? `${invitedBy} te ha invitado` : 'Te han invitado'} a administrar Your English Buddy, la academia que ayuda a hispanohablantes a hablar inglés con confianza en situaciones reales.`,
      '',
      'Desde el panel podrás gestionar las páginas del sitio, el blog y los canales de contacto.',
      '',
      `Crea tu contraseña para activar tu cuenta (el enlace caduca en ${expiresHours} horas):`,
      inviteUrl,
      '',
      '¿No esperabas esta invitación? Ignora este correo; la cuenta no se activará sin este enlace.',
    ].join('\n'),
  };
}

// ── Password reset ───────────────────────────────────────────────────────────

export function passwordResetEmail(params: {
  email: string;
  resetUrl: string;
  expiresMinutes: number;
}): RenderedEmail {
  const { email, resetUrl, expiresMinutes } = params;

  const bodyHtml = `
    <h1 style="margin:0 0 14px;font-family:${FONT};font-size:24px;line-height:1.3;color:${COLORS.heading};">
      ¿Contraseña olvidada? <span style="white-space:nowrap;">It happens! &#128578;</span>
    </h1>
    <p style="margin:0 0 14px;font-family:${FONT};font-size:15px;line-height:1.65;color:${COLORS.text};">
      Hasta a los que enseñamos inglés se nos olvidan cosas. Recibimos una
      solicitud para restablecer la contraseña de tu cuenta de administrador
      en <strong style="color:${COLORS.heading};">Your English Buddy</strong>.
    </p>
    <p style="margin:0 0 6px;font-family:${FONT};font-size:15px;line-height:1.65;color:${COLORS.text};text-align:center;">
      Crea una contraseña nueva con un clic:
    </p>
    ${button('Restablecer contraseña', resetUrl)}
    <p style="margin:16px 0 0;font-family:${FONT};font-size:13px;line-height:1.6;color:${COLORS.muted};text-align:center;">
      El enlace caduca en ${expiresMinutes} minutos y solo puede usarse una vez.
    </p>
    ${fallbackLink(resetUrl)}
    <p style="margin:14px 0 0;font-family:${FONT};font-size:12px;line-height:1.6;color:${COLORS.muted};">
      ¿No fuiste tú? Ignora este correo: tu contraseña actual sigue siendo
      válida y nadie más puede usar este enlace sin acceso a tu bandeja.
    </p>`;

  return {
    subject: 'Restablece tu contraseña · Your English Buddy',
    html: frame({
      preheader:
        'Recibimos una solicitud para restablecer tu contraseña del panel de administración.',
      bodyHtml,
      recipientEmail: email,
      footerReason: 'porque se solicitó un cambio de contraseña.',
    }),
    text: [
      'Restablece tu contraseña · Your English Buddy',
      '',
      'Recibimos una solicitud para restablecer la contraseña de tu cuenta de administrador.',
      '',
      `Crea una contraseña nueva aquí (caduca en ${expiresMinutes} minutos, un solo uso):`,
      resetUrl,
      '',
      '¿No fuiste tú? Ignora este correo: tu contraseña actual sigue siendo válida.',
    ].join('\n'),
  };
}
