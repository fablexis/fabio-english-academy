import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { History, LayoutTemplate, MessageCircle, Newspaper, Plus } from 'lucide-react';
import { api } from '../lib/client';
import { useAuth } from '../lib/auth';
import { formatRelative, greeting } from '../lib/dates';
import { PAGE_SCHEMAS, schemaFor } from '../pageSchemas';
import s from '../styles/admin.module.scss';

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short' }).format(
    new Date(iso),
  );
}


const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const posts = useQuery({ queryKey: ['admin', 'blog'], queryFn: api.listPosts });
  const pages = useQuery({ queryKey: ['admin', 'pages'], queryFn: api.listPages });
  const recent = useQuery({
    queryKey: ['admin', 'activity', 'recent'],
    queryFn: () => api.getActivity({ take: 4 }),
  });

  const published = posts.data?.filter((p) => p.published).length ?? 0;
  const drafts = (posts.data?.length ?? 0) - published;
  const edited = [...(pages.data ?? [])].sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );

  return (
    <div className={s.page}>
      <header className={s.pageHead}>
        <div>
          <h1>
            {greeting()}, {user?.name?.trim() || user?.email || 'buddy'} 👋
          </h1>
          <p className={s.pageSub}>
            {user?.lastLoginAt
              ? `Tu último acceso fue ${formatRelative(user.lastLoginAt)}.`
              : 'Este es tu primer acceso al panel. ¡Bienvenido!'}{' '}
            Todo el contenido del sitio público se gestiona desde aquí.
          </p>
        </div>
      </header>

      <div className={s.dashGrid}>
        {/* ── Páginas ── */}
        <section className={s.dashCard}>
          <div className={s.dashCardHead}>
            <span className={s.dashIcon}><LayoutTemplate size={21} /></span>
            <div>
              <h2>Páginas del sitio</h2>
              <small>
                {pages.isLoading
                  ? 'Cargando…'
                  : `${edited.length} de ${PAGE_SCHEMAS.length} con contenido personalizado`}
              </small>
            </div>
          </div>

          <div className={s.dashRows}>
            {edited.slice(0, 3).map((p) => (
              <Link key={p.key} to={`/pages/${p.key}`} className={s.dashRow}>
                <strong>{schemaFor(p.key)?.title ?? p.key}</strong>
                <time dateTime={p.updatedAt}>editada el {formatDate(p.updatedAt)}</time>
              </Link>
            ))}
            {!pages.isLoading && edited.length === 0 && (
              <p className={s.dashRow}>
                Todas las páginas muestran su contenido original. Edita cualquiera y
                los cambios se publican al guardar.
              </p>
            )}
          </div>

          <div className={s.dashActions}>
            <Link to="/pages" className={s.btnPrimary}>Gestionar páginas</Link>
          </div>
        </section>

        {/* ── Blog ── */}
        <section className={s.dashCard}>
          <div className={s.dashCardHead}>
            <span className={s.dashIcon}><Newspaper size={21} /></span>
            <div>
              <h2>Blog</h2>
              <small>
                {posts.isLoading
                  ? 'Cargando…'
                  : `${posts.data?.length ?? 0} artículos en total`}
              </small>
            </div>
          </div>

          <div className={s.dashChips}>
            <span className={s.badgeOn}>{published} publicados</span>
            <span className={s.badgeOff}>{drafts} borradores</span>
          </div>

          <div className={s.dashActions}>
            <Link to="/blog" className={s.btnPrimary}>Gestionar blog</Link>
            <Link to="/blog/new" className={s.btnSoft}>
              <Plus size={15} /> Nuevo artículo
            </Link>
          </div>
        </section>

        {/* ── Sitio / WhatsApp ── */}
        <section className={s.dashCard}>
          <div className={s.dashCardHead}>
            <span className={`${s.dashIcon} ${s.dashIconLime}`}>
              <MessageCircle size={21} />
            </span>
            <div>
              <h2>Sitio (general)</h2>
              <small>WhatsApp, footer y redes sociales</small>
            </div>
          </div>

          <p className={s.pageCardBlurb}>
            El número de WhatsApp, el mensaje de bienvenida, el botón de contacto y
            el pie de página se aplican a todas las páginas.
          </p>

          <div className={s.dashActions}>
            <Link to="/pages/site" className={s.btnSoft}>Editar configuración</Link>
          </div>
        </section>

        {/* ── Actividad reciente ── */}
        <section className={s.dashCard}>
          <div className={s.dashCardHead}>
            <span className={s.dashIcon}><History size={21} /></span>
            <div>
              <h2>Actividad reciente</h2>
              <small>Los últimos cambios del panel</small>
            </div>
          </div>

          <div className={s.dashRows}>
            {recent.data?.items.map((item) => (
              <div key={item.id} className={s.dashRow}>
                <strong className={s.dashRowText}>{item.summary}</strong>
                <time dateTime={item.createdAt}>{formatRelative(item.createdAt)}</time>
              </div>
            ))}
            {recent.data?.items.length === 0 && (
              <p className={s.dashRow}>
                Sin actividad todavía. Cada cambio que guardes aparecerá aquí.
              </p>
            )}
          </div>

          <div className={s.dashActions}>
            <Link to="/activity" className={s.btnSoft}>Ver toda la actividad</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
