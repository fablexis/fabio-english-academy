import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { BookStackLogo } from '../../components/Icons';
import PasswordInput from '../components/PasswordInput';
import { useAuth } from '../lib/auth';
import { ApiError } from '../lib/client';
import s from '../styles/admin.module.scss';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo iniciar sesión');
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

        <h1 className={s.loginTitle}>Bienvenido de nuevo 👋</h1>
        <p className={s.loginSub}>
          Inicia sesión para gestionar las páginas y el blog del sitio.
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
        <label className={s.field}>
          <span>Contraseña</span>
          <PasswordInput
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
            placeholder="········"
            required
          />
        </label>

        {error && <p className={s.error}>{error}</p>}

        <button type="submit" className={s.btnPrimary} disabled={busy}>
          <LogIn size={16} /> {busy ? 'Entrando…' : 'Iniciar sesión'}
        </button>

        <Link to="/forgot" className={s.loginLink}>¿Olvidaste tu contraseña?</Link>
      </form>
    </div>
  );
};

export default Login;
