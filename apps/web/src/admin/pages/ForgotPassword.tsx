import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailCheck, Send } from 'lucide-react';
import { BookStackLogo } from '../../components/Icons';
import { api, ApiError } from '../lib/client';
import s from '../styles/admin.module.scss';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await api.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo enviar el correo');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={s.loginWrap}>
      <form className={s.loginCard} onSubmit={onSubmit}>
        <div className={s.loginBrand}>
          <span className={s.brandMark} aria-hidden="true">
            <BookStackLogo />
          </span>
          Your English Buddy
        </div>

        {sent ? (
          <>
            <h1 className={s.loginTitle}>
              Revisa tu correo <MailCheck size={20} />
            </h1>
            <p className={s.loginSub}>
              Si <strong>{email}</strong> tiene una cuenta de administrador, acabamos de
              enviarle un enlace para restablecer la contraseña. Caduca en 60 minutos.
            </p>
            <Link to="/login" className={s.btnGhost}>← Volver a iniciar sesión</Link>
          </>
        ) : (
          <>
            <h1 className={s.loginTitle}>¿Olvidaste tu contraseña?</h1>
            <p className={s.loginSub}>
              Escribe tu email y te enviaremos un enlace para crear una nueva.
            </p>

            <label className={s.field}>
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                placeholder="tu@email.com"
                required
              />
            </label>

            {error && <p className={s.error}>{error}</p>}

            <button type="submit" className={s.btnPrimary} disabled={busy}>
              <Send size={16} /> {busy ? 'Enviando…' : 'Enviar enlace'}
            </button>
            <Link to="/login" className={s.loginLink}>← Volver a iniciar sesión</Link>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
