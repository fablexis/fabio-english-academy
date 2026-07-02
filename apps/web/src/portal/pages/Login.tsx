import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock, UserRound } from 'lucide-react';
import { useStudentAuth } from '../lib/auth';
import { ApiError } from '../lib/client';
import { BrandBook } from '../PortalApp';
import s from '../styles/portal.module.scss';

const Login: React.FC = () => {
  const { student, loading, login } = useStudentAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && student) return <Navigate to="/" replace />;

  const submit = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Escribe tu usuario y contraseña para entrar.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await login(username.trim(), password);
      navigate('/');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo iniciar sesión. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') void submit();
  };

  return (
    <div className={s.loginWrap}>
      <div className={s.loginCard}>
        {/* Brand panel */}
        <div className={s.loginBrand}>
          <div className={s.loginBlob1} />
          <div className={s.loginBlob2} />
          <div className={s.brandLockup}>
            <BrandBook size={30} color="#C8E47C" />
            <span className={s.brandLockupName}>Your English Buddy</span>
          </div>
          <div className={s.loginCharWrap}>
            <img src="/img/character.png" alt="" className={s.loginChar} />
          </div>
          <div className={s.loginHeadline}>
            <h1>Tu progreso te está esperando</h1>
            <p>Revisa tus clases, repasa el material y pregúntale lo que quieras a tu Buddy.</p>
          </div>
        </div>

        {/* Form */}
        <div className={s.loginForm}>
          <div>
            <p className={s.loginKicker}>Portal del estudiante</p>
            <h2 className={s.loginTitle}>¡Hola de nuevo!</h2>
            <p className={s.loginSubtitle}>Ingresa con los datos que te dio tu profe.</p>
          </div>

          <label className={s.field}>
            <span className={s.fieldLabel}>Usuario</span>
            <div className={s.inputBox}>
              <UserRound size={17} color="#94A3B8" />
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                onKeyDown={onKey}
                placeholder="ej: lya.pernia"
                autoComplete="username"
                autoFocus
              />
            </div>
          </label>

          <label className={s.field}>
            <span className={s.fieldLabel}>Contraseña</span>
            <div className={s.inputBox}>
              <Lock size={17} color="#94A3B8" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                onKeyDown={onKey}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
          </label>

          {error && <p className={s.loginError}>{error}</p>}

          <button type="button" className={s.ctaGreen} onClick={() => void submit()} disabled={submitting}>
            {submitting ? 'Entrando…' : 'Entrar al portal →'}
          </button>

          <p className={s.loginHelper}>Usa el usuario y la contraseña que te dio tu profe.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
