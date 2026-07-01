import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/client';
import s from '../styles/admin.module.scss';

const BlogList: React.FC = () => {
  const qc = useQueryClient();
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['admin', 'blog'],
    queryFn: api.listPosts,
  });

  const del = useMutation({
    mutationFn: (id: number) => api.deletePost(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'blog'] }),
  });

  if (isLoading) return <div className={s.center}>Cargando artículos…</div>;
  if (error) return <div className={s.error}>Error al cargar: {String(error)}</div>;

  return (
    <div className={s.page}>
      <header className={s.pageHead}>
        <h1>Artículos del blog</h1>
        <Link to="/blog/new" className={s.btnPrimary}>+ Nuevo artículo</Link>
      </header>

      <table className={s.table}>
        <thead>
          <tr>
            <th>#</th><th>Título</th><th>Categoría</th><th>Estado</th><th></th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((p) => (
            <tr key={p.id}>
              <td>{p.sortOrder}</td>
              <td>{p.title}</td>
              <td>{p.category}</td>
              <td>
                <span className={p.published ? s.badgeOn : s.badgeOff}>
                  {p.published ? 'Publicado' : 'Borrador'}
                </span>
              </td>
              <td className={s.rowActions}>
                <Link to={`/blog/${p.id}`} className={s.btnGhost}>Editar</Link>
                <button
                  className={s.btnDanger}
                  onClick={() => {
                    if (confirm(`¿Eliminar "${p.title}"?`)) del.mutate(p.id);
                  }}
                  disabled={del.isPending}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {posts?.length === 0 && (
            <tr><td colSpan={5} className={s.center}>Sin artículos todavía.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
