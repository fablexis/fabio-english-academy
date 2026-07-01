import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './lib/auth';
import RequireAuth from './RequireAuth';
import Login from './pages/Login';
import BlogList from './pages/BlogList';
import BlogEditor from './pages/BlogEditor';
import s from './styles/admin.module.scss';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  return (
    <div className={s.shell}>
      <aside className={s.sidebar}>
        <div className={s.brand}>YEB · Admin</div>
        <nav className={s.nav}>
          <Link to="/blog">Blog</Link>
        </nav>
        {user && (
          <div className={s.userBox}>
            <span>{user.email}</span>
            <button className={s.btnGhost} onClick={() => void logout()}>Salir</button>
          </div>
        )}
      </aside>
      <main className={s.main}>{children}</main>
    </div>
  );
};

const AdminApp: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      {/* basename keeps all admin routes under /admin */}
      <BrowserRouter basename="/admin">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <RequireAuth />
            }
          >
            <Route path="/" element={<Navigate to="/blog" replace />} />
            <Route path="/blog" element={<Shell><BlogList /></Shell>} />
            <Route path="/blog/new" element={<Shell><BlogEditor /></Shell>} />
            <Route path="/blog/:id" element={<Shell><BlogEditor /></Shell>} />
          </Route>
          <Route path="*" element={<Navigate to="/blog" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default AdminApp;
