import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { ActivityLogDto } from '@eyb/shared';
import { api } from '../lib/client';
import { formatRelative } from '../lib/dates';
import s from '../styles/admin.module.scss';

const ENTITIES = [
  { value: '', label: 'Todas las secciones' },
  { value: 'page', label: 'Páginas' },
  { value: 'blog', label: 'Blog' },
  { value: 'upload', label: 'Imágenes' },
  { value: 'user', label: 'Usuarios' },
  { value: 'auth', label: 'Accesos' },
];

const ACTIONS = [
  { value: '', label: 'Todas las acciones' },
  { value: 'create', label: 'Creación' },
  { value: 'update', label: 'Edición' },
  { value: 'delete', label: 'Eliminación' },
  { value: 'invite', label: 'Invitación' },
  { value: 'login', label: 'Inicio de sesión' },
];

const ACTION_LABEL: Record<string, string> = {
  create: 'Creación',
  update: 'Edición',
  delete: 'Eliminación',
  invite: 'Invitación',
  login: 'Acceso',
};

function actionBadgeClass(action: string): string {
  switch (action) {
    case 'create':
      return s.badgeOn;
    case 'delete':
      return s.badgeWarn;
    case 'update':
    case 'invite':
      return `${s.badge} ${s.badgePrimary}`;
    default:
      return s.badgeOff;
  }
}

const Activity: React.FC = () => {
  const [entity, setEntity] = useState('');
  const [action, setAction] = useState('');

  const query = useInfiniteQuery({
    queryKey: ['admin', 'activity', entity, action],
    queryFn: ({ pageParam }) =>
      api.getActivity({
        entity: entity || undefined,
        action: action || undefined,
        before: pageParam ?? undefined,
        take: 30,
      }),
    initialPageParam: null as number | null,
    getNextPageParam: (last) => last.nextCursor,
  });

  const items: ActivityLogDto[] =
    query.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <div className={s.page}>
      <header className={s.pageHead}>
        <div>
          <h1>Actividad</h1>
          <p className={s.pageSub}>
            Historial de cambios del panel: quién hizo qué y cuándo.
          </p>
        </div>
      </header>

      <div className={s.tableCard}>
        <div className={s.tableTools}>
          <div className={s.filterRow}>
            <select
              className={s.filterSelect}
              value={entity}
              onChange={(e) => setEntity(e.target.value)}
              aria-label="Filtrar por sección"
            >
              {ENTITIES.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <select
              className={s.filterSelect}
              value={action}
              onChange={(e) => setAction(e.target.value)}
              aria-label="Filtrar por acción"
            >
              {ACTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {query.isLoading ? (
          <div className={s.center}>Cargando actividad…</div>
        ) : query.error ? (
          <div className={s.error}>Error al cargar: {String(query.error)}</div>
        ) : (
          <>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Cambio</th>
                  <th>Acción</th>
                  <th>Usuario</th>
                  <th>Cuándo</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.summary}</td>
                    <td>
                      <span className={actionBadgeClass(item.action)}>
                        {ACTION_LABEL[item.action] ?? item.action}
                      </span>
                    </td>
                    <td>
                      <div className={s.cellMain}>
                        <span className={s.avatarSm}>
                          {item.userEmail[0]?.toUpperCase()}
                        </span>
                        {item.userEmail}
                      </div>
                    </td>
                    <td>
                      <time dateTime={item.createdAt} title={new Date(item.createdAt).toLocaleString('es')}>
                        {formatRelative(item.createdAt)}
                      </time>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={4} className={s.center}>
                      Sin actividad todavía. Cada cambio que guardes aparecerá aquí.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {query.hasNextPage && (
              <div className={s.loadMore}>
                <button
                  type="button"
                  className={s.btnGhost}
                  onClick={() => void query.fetchNextPage()}
                  disabled={query.isFetchingNextPage}
                >
                  {query.isFetchingNextPage ? 'Cargando…' : 'Cargar más'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Activity;
