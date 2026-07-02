import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PencilLine, Plus, Search, Trash2 } from 'lucide-react';
import { api } from '../lib/client';
import s from '../styles/admin.module.scss';

const BlogList: React.FC = () => {
  const qc = useQueryClient();
  const [query, setQuery] = useState('');
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['admin', 'blog'],
    queryFn: api.listPosts,
  });

  const del = useMutation({
    mutationFn: (id: number) => api.deletePost(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'blog'] }),
  });

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts ?? [];
    return (posts ?? []).filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q),
    );
  }, [posts, query]);

  if (isLoading) return <div className={s.center}>Cargando artículos…</div>;
  if (error) return <div className={s.error}>Error al cargar: {String(error)}</div>;

  return (
    <div className={s.page}>
      <header className={s.pageHead}>
        <div>
          <h1>Artículos del blog</h1>
          <p className={s.pageSub}>
            {posts?.length ?? 0} artículos · los publicados aparecen en /blog al instante.
          </p>
        </div>
      </header>

      <div className={s.tableCard}>
        <div className={s.tableTools}>
          <div className={s.searchBox}>
            <Search size={15} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título, categoría o slug"
              aria-label="Buscar artículos"
            />
          </div>
          <Link to="/blog/new" className={s.btnPrimary}>
            <Plus size={15} /> Nuevo artículo
          </Link>
        </div>

        <table className={s.table}>
          <thead>
            <tr>
              <th>Artículo</th>
              <th>Categoría</th>
              <th>Nivel</th>
              <th>Estado</th>
              <th aria-label="Acciones" />
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className={s.cellMain}>
                    <img src={p.image} alt="" className={s.thumb} loading="lazy" />
                    <div className={s.cellTitle}>
                      <strong>{p.title}</strong>
                      <small>/{p.slug}</small>
                    </div>
                  </div>
                </td>
                <td><span className={`${s.badge} ${s.badgePrimary}`}>{p.category}</span></td>
                <td>{p.level}</td>
                <td>
                  <span className={p.published ? s.badgeOn : s.badgeOff}>
                    {p.published ? 'Publicado' : 'Borrador'}
                  </span>
                </td>
                <td className={s.rowActions}>
                  <Link
                    to={`/blog/${p.id}`}
                    className={`${s.btnIcon} ${s.tip}`}
                    data-tip="Editar artículo"
                    aria-label={`Editar ${p.title}`}
                  >
                    <PencilLine size={16} />
                  </Link>
                  <button
                    type="button"
                    className={`${s.btnIcon} ${s.btnIconDanger} ${s.tip}`}
                    data-tip="Eliminar artículo"
                    aria-label={`Eliminar ${p.title}`}
                    onClick={() => {
                      if (confirm(`¿Eliminar "${p.title}"?`)) del.mutate(p.id);
                    }}
                    disabled={del.isPending}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={5} className={s.center}>
                  {query
                    ? `Sin resultados para "${query}".`
                    : 'Sin artículos todavía. Crea el primero con "Nuevo artículo".'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
