import React, { useEffect, useRef, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
  Link,
  useLocation,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  History,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  Menu,
  Newspaper,
  UserRound,
  Users as UsersIcon,
} from 'lucide-react';
import { BookStackLogo } from '../components/Icons';
import { AuthProvider, useAuth } from './lib/auth';
import RequireAuth from './RequireAuth';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SetPassword from './pages/SetPassword';
import Dashboard from './pages/Dashboard';
import BlogList from './pages/BlogList';
import BlogEditor from './pages/BlogEditor';
import PagesList from './pages/PagesList';
import PageEditor from './pages/PageEditor';
import Users from './pages/Users';
import Activity from './pages/Activity';
import Profile from './pages/Profile';
import Avatar from './components/Avatar';
import { PAGE_SCHEMAS, schemaFor } from './pageSchemas';
import s from './styles/admin.module.scss';

// Collapsible sidebar groups (Vuexy's two-level vertical menu).
const MENU_GROUPS = [
  {
    id: 'pages',
    label: 'Páginas',
    base: '/pages',
    icon: <LayoutTemplate size={19} />,
    children: [
      { to: '/pages', label: 'Todas las páginas', end: true },
      ...PAGE_SCHEMAS.map((sch) => ({ to: `/pages/${sch.key}`, label: sch.title })),
    ],
  },
  {
    id: 'blog',
    label: 'Blog',
    base: '/blog',
    icon: <Newspaper size={19} />,
    children: [
      { to: '/blog', label: 'Todos los artículos', end: true },
      { to: '/blog/new', label: 'Nuevo artículo' },
    ],
  },
];

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

// ─── Breadcrumbs (derived from the route) ────────────────────────────────────

// A crumb with `to` is a link; without it, a non-navigable label — used for the
// sidebar section headings (Contenido / Administración) that aren't pages.
type Crumb = { label: string; to?: string };

const Crumbs: React.FC = () => {
  const { pathname } = useLocation();
  const [, root, sub] = pathname.split('/');

  // Trails mirror the sidebar hierarchy: section → item → sub-page. Panel is a
  // standalone item (no section), so it never prefixes the others.
  const parts: Crumb[] = [];
  if (root === 'pages') {
    parts.push({ label: 'Contenido' }, { label: 'Páginas', to: '/pages' });
    if (sub) parts.push({ label: schemaFor(sub)?.title ?? sub });
  } else if (root === 'blog') {
    parts.push({ label: 'Contenido' }, { label: 'Blog', to: '/blog' });
    if (sub === 'new') parts.push({ label: 'Nuevo artículo' });
    else if (sub) parts.push({ label: 'Editar artículo' });
  } else if (root === 'users') {
    parts.push({ label: 'Administración' }, { label: 'Usuarios', to: '/users' });
  } else if (root === 'activity') {
    parts.push({ label: 'Administración' }, { label: 'Actividad', to: '/activity' });
  } else if (root === 'profile') {
    parts.push({ label: 'Mi cuenta', to: '/profile' });
  } else {
    parts.push({ label: 'Panel', to: '/' });
  }
  const last = parts.pop()!;

  return (
    <nav className={s.crumbs} aria-label="Ruta de navegación">
      {parts.map((p) => (
        <React.Fragment key={p.label}>
          {p.to ? (
            <Link to={p.to}>{p.label}</Link>
          ) : (
            <span className={s.crumbSection}>{p.label}</span>
          )}
          <ChevronRight size={14} aria-hidden="true" />
        </React.Fragment>
      ))}
      <span className={s.crumbCurrent}>{last.label}</span>
    </nav>
  );
};

// ─── User dropdown ───────────────────────────────────────────────────────────

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!user) return null;

  return (
    <div className={s.userMenuWrap} ref={wrapRef}>
      <button
        type="button"
        className={s.avatarBtn}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Menú de usuario"
      >
        <Avatar email={user.email} name={user.name} avatarUrl={user.avatarUrl} dot />
      </button>

      {open && (
        <div className={s.userMenu} role="menu">
          <div className={s.userMenuHead}>
            <Avatar email={user.email} name={user.name} avatarUrl={user.avatarUrl} />
            <div>
              <strong>{user.name?.trim() || 'Administrador'}</strong>
              <small>{user.email}</small>
            </div>
          </div>
          <Link
            className={s.userMenuItem}
            to="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <UserRound size={15} /> Mi cuenta
          </Link>
          <a
            className={s.userMenuItem}
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
          >
            <ExternalLink size={15} /> Ver sitio público
          </a>
          <button
            type="button"
            className={`${s.userMenuItem} ${s.userMenuDanger}`}
            onClick={() => void logout()}
            role="menuitem"
          >
            <LogOut size={15} /> Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Shell: fixed sidebar + detached top bar ────────────────────────────────

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();
  // Manual open/closed overrides per group; without one, a group follows the route.
  const [manualOpen, setManualOpen] = useState<Record<string, boolean>>({});

  const onNav = () => {
    setDrawerOpen(false);
    setManualOpen({}); // groups follow the route again after navigating
  };
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${s.menuItem} ${s.menuItemActive}` : s.menuItem;
  const subLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${s.subItem} ${s.subItemActive}` : s.subItem;

  return (
    <div className={s.shell}>
      {drawerOpen && (
        <button
          type="button"
          className={s.backdrop}
          onClick={() => setDrawerOpen(false)}
          aria-label="Cerrar menú"
        />
      )}

      <aside className={`${s.sidebar} ${drawerOpen ? s.sidebarOpen : ''}`}>
        <div className={s.sideBrand}>
          <span className={s.brandMark} aria-hidden="true">
            <BookStackLogo />
          </span>
          <div>
            <strong>Your English Buddy</strong>
            <small>Panel de administración</small>
          </div>
        </div>

        <nav className={s.menu}>
          <NavLink to="/" end className={linkClass} onClick={onNav}>
            <LayoutDashboard size={19} /> <span className={s.menuText}>Panel</span>
          </NavLink>

          <span className={s.menuLabel}>Contenido</span>
          {MENU_GROUPS.map((group) => {
            const inGroup = pathname.startsWith(group.base);
            const open = manualOpen[group.id] ?? inGroup;
            return (
              <div key={group.id}>
                <button
                  type="button"
                  className={`${s.menuItem} ${inGroup ? s.menuParent : ''}`}
                  onClick={() => setManualOpen((m) => ({ ...m, [group.id]: !open }))}
                  aria-expanded={open}
                >
                  {group.icon}
                  <span className={s.menuText}>{group.label}</span>
                  <ChevronDown
                    size={15}
                    className={`${s.menuChevron} ${open ? s.menuChevronOpen : ''}`}
                  />
                </button>
                {open && (
                  <div className={s.submenu}>
                    {group.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        end={'end' in child ? child.end : undefined}
                        className={subLinkClass}
                        onClick={onNav}
                      >
                        <span className={s.subDot} aria-hidden="true" />
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <span className={s.menuLabel}>Administración</span>
          <NavLink to="/users" className={linkClass} onClick={onNav}>
            <UsersIcon size={19} /> <span className={s.menuText}>Usuarios</span>
          </NavLink>
          <NavLink to="/activity" className={linkClass} onClick={onNav}>
            <History size={19} /> <span className={s.menuText}>Actividad</span>
          </NavLink>

          <span className={s.menuLabel}>Sitio</span>
          <a href="/" target="_blank" rel="noopener noreferrer" className={s.menuItem}>
            <ExternalLink size={19} /> <span className={s.menuText}>Ver sitio público</span>
          </a>
        </nav>

        <p className={s.sideFootNote}>Los cambios se publican al guardar.</p>
      </aside>

      <div className={s.main}>
        <header className={s.topbar}>
          <button
            type="button"
            className={s.hamburger}
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>
          <Crumbs />
          <div className={s.topbarActions}>
            <UserMenu />
          </div>
        </header>

        {children}
      </div>
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
          <Route path="/forgot" element={<ForgotPassword />} />
          {/* Public: invite + reset emails land here with ?token=… */}
          <Route path="/set-password" element={<SetPassword />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Shell><Dashboard /></Shell>} />
            <Route path="/pages" element={<Shell><PagesList /></Shell>} />
            <Route path="/pages/:key" element={<Shell><PageEditor /></Shell>} />
            <Route path="/blog" element={<Shell><BlogList /></Shell>} />
            <Route path="/blog/new" element={<Shell><BlogEditor /></Shell>} />
            <Route path="/blog/:id" element={<Shell><BlogEditor /></Shell>} />
            <Route path="/users" element={<Shell><Users /></Shell>} />
            <Route path="/activity" element={<Shell><Activity /></Shell>} />
            <Route path="/profile" element={<Shell><Profile /></Shell>} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default AdminApp;
