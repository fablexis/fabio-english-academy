import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, CheckCircle2, Lock, LogIn } from 'lucide-react';
import { BookStackLogo } from '../../components/Icons';
import { api, ApiError } from '../lib/client';
import PasswordInput from '../components/PasswordInput';
import s from '../styles/admin.module.scss';

// Password policy — mirrored server-side in auth/dto/password.dto.ts.
const RULES: { id: string; label: string; test: (pw: string) => boolean }[] = [
  { id: 'len', label: 'Al menos 8 caracteres', test: (pw) => pw.length >= 8 },
  { id: 'upper', label: 'Una letra mayúscula (A-Z)', test: (pw) => /[A-ZÁÉÍÓÚÑ]/.test(pw) },
  { id: 'lower', label: 'Una letra minúscula (a-z)', test: (pw) => /[a-záéíóúñ]/.test(pw) },
  { id: 'digit', label: 'Un número (0-9)', test: (pw) => /\d/.test(pw) },
];

const RuleItem: React.FC<{ ok: boolean; label: string }> = ({ ok, label }) => (
  <li className={ok ? `${s.pwRule} ${s.pwRuleOk}` : s.pwRule}>
    <span className={s.pwRuleIcon} aria-hidden="true">
      {ok ? <Check size={11} strokeWidth={3} /> : null}
    </span>
    {label}
  </li>
);

/**
 * Redeems an emailed link: both admin invitations and password resets land
 * here (/set-password?token=…) to choose the new password.
 */
const SetPassword: React.FC = () => {
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [doneEmail, setDoneEmail] = useState<string | null>(null);

  const rulesOk = RULES.every((r) => r.test(password));
  const matchOk = confirm.length > 0 && password === confirm;
  const allOk = rulesOk && matchOk;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!allOk) return;
    setBusy(true);
    try {
      const { email } = await api.setPassword(token, password);
      setDoneEmail(email);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo guardar la contraseña');
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

        {doneEmail ? (
          <>
            <h1 className={s.loginTitle}>
              ¡Listo! <CheckCircle2 size={20} style={{ color: '#1b6f4a' }} />
            </h1>
            <p className={s.loginSub}>
              Tu contraseña quedó guardada. Ya puedes entrar al panel con{' '}
              <strong>{doneEmail}</strong>.
            </p>
            <Link to="/login" className={s.btnPrimary}>
              <LogIn size={16} /> Iniciar sesión
            </Link>
          </>
        ) : !token ? (
          <>
            <h1 className={s.loginTitle}>Enlace incompleto</h1>
            <p className={s.loginSub}>
              A este enlace le falta el código. Abre el botón del correo de nuevo o
              copia la URL completa.
            </p>
            <Link to="/login" className={s.btnGhost}>← Ir a iniciar sesión</Link>
          </>
        ) : (
          <>
            <h1 className={s.loginTitle}>Crea tu contraseña</h1>
            <p className={s.loginSub}>
              Elige la contraseña con la que entrarás al panel de administración.
            </p>

            <label className={s.field}>
              <span>Nueva contraseña</span>
              <PasswordInput
                value={password}
                onChange={setPassword}
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
                required
              />
            </label>
            <label className={s.field}>
              <span>Repite la contraseña</span>
              <PasswordInput
                value={confirm}
                onChange={setConfirm}
                autoComplete="new-password"
                required
              />
            </label>

            {/* Live policy checklist — each rule ticks as it's satisfied */}
            <ul className={s.pwRules} aria-live="polite">
              {RULES.map((rule) => (
                <RuleItem key={rule.id} ok={rule.test(password)} label={rule.label} />
              ))}
              <RuleItem ok={matchOk} label="Las contraseñas coinciden" />
            </ul>

            {error && (
              <>
                <p className={s.error}>{error}</p>
                {/* An invalid/expired token can only be fixed with a new link */}
                {error.includes('enlace') && (
                  <Link to="/forgot" className={s.loginLink}>
                    Reiniciar contraseña →
                  </Link>
                )}
              </>
            )}

            <button type="submit" className={s.btnPrimary} disabled={busy || !allOk}>
              <Lock size={16} /> {busy ? 'Guardando…' : 'Guardar contraseña'}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SetPassword;
