import React, { createContext, useContext, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MessageCircle } from 'lucide-react';
import { StudentAuthProvider, useStudentAuth } from './lib/auth';
import { initials } from '../admin/lib/text';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ClassDetail from './pages/ClassDetail';
import Chat from './pages/Chat';
import Booking from './pages/Booking';
import s from './styles/portal.module.scss';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

// ── Toast ────────────────────────────────────────────────────────────────────
const ToastCtx = createContext<(msg: string) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<string | null>(null);
  const show = (msg: string) => {
    setToast(msg);
    window.clearTimeout((show as unknown as { _t?: number })._t);
    (show as unknown as { _t?: number })._t = window.setTimeout(() => setToast(null), 2700);
  };
  return (
    <ToastCtx.Provider value={show}>
      {children}
      {toast && <div className={s.toast} role="status">{toast}</div>}
    </ToastCtx.Provider>
  );
};

// ── Brand book icon (from the prototype) ─────────────────────────────────────
export const BrandBook: React.FC<{ size?: number; color?: string }> = ({ size = 26, color = '#185C60' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

// ── Top bar (persistent across the app views) ────────────────────────────────
const TopBar: React.FC = () => {
  const { student, logout } = useStudentAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  if (!student) return null;

  const onChat = pathname === '/chat';

  return (
    <nav className={s.topbar}>
      <div className={s.brand}>
        <BrandBook size={26} />
        <div className={s.brandCol}>
          <span className={s.brandName}>Your English Buddy</span>
          <span className={s.brandEyebrow}>Portal del estudiante</span>
        </div>
      </div>

      <div className={s.tabs}>
        <button
          type="button"
          className={`${s.tab} ${!onChat ? s.tabActive : ''}`}
          onClick={() => navigate('/')}
        >
          Mi progreso
        </button>
        <button
          type="button"
          className={`${s.tab} ${onChat ? s.tabActive : ''}`}
          onClick={() => navigate('/chat')}
        >
          <MessageCircle size={15} /> Chat con tu Buddy
        </button>
      </div>

      <div className={s.userWrap}>
        <div className={s.userChip}>
          <div className={s.userAvatar}>{initials(student.name)}</div>
          <div className={s.userCol}>
            <span className={s.userName}>{student.name}</span>
            <span className={s.userLevel}>Nivel {student.level}</span>
          </div>
        </div>
        <button
          type="button"
          className={s.logoutBtn}
          title="Cerrar sesión"
          onClick={() => void logout()}
        >
          Salir
        </button>
      </div>
    </nav>
  );
};

const AppLayout: React.FC = () => (
  <div className={s.app}>
    <TopBar />
    <Outlet />
  </div>
);

const RequireStudentAuth: React.FC = () => {
  const { student, loading } = useStudentAuth();
  if (loading) return <div className={s.loading}>Cargando tu portal…</div>;
  if (!student) return <Navigate to="/login" replace />;
  return <AppLayout />;
};

const PortalApp: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <StudentAuthProvider>
      <ToastProvider>
        <BrowserRouter basename="/portal">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<RequireStudentAuth />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clase/:id" element={<ClassDetail />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/agendar" element={<Booking />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </StudentAuthProvider>
  </QueryClientProvider>
);

export default PortalApp;
