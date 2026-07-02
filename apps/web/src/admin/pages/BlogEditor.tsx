import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { BlogBody, BlogVariant, CreateBlogPostInput } from '@eyb/shared';
import { api, ApiError } from '../lib/client';
import BodyEditor from '../components/BodyEditor';
import ImageField from '../components/ImageField';
import s from '../styles/admin.module.scss';

const VARIANTS: BlogVariant[] = ['teal', 'lime', 'dark', 'plain'];

const EMPTY_BODY: BlogBody = {
  hook: '',
  sections: [{ heading: '', paragraphs: [''] }],
  tip: '',
  closing: '',
  commonMistakes: [],
  exercise: { instructions: '', questions: [''], answers: [{ answer: '' }] },
  closingQuote: { quote: '', translation: '' },
};

interface MetaState {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  level: string;
  variant: BlogVariant;
  image: string;
  published: boolean;
  sortOrder: number;
}

const BLANK_META: MetaState = {
  slug: '',
  title: '',
  category: 'Gramática',
  excerpt: '',
  readTime: '5 min de lectura',
  level: 'Intermedio',
  variant: 'teal',
  image: '',
  published: true,
  sortOrder: 0,
};

const BlogEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // The /blog/new route has no :id param (id is undefined there); /blog/:id
  // carries a numeric id. Both "new" cases must be treated as a fresh draft.
  const isNew = id === undefined || id === 'new';
  const numericId = isNew ? null : Number(id);
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: existing } = useQuery({
    queryKey: ['admin', 'blog', numericId],
    queryFn: () => api.getPost(numericId as number),
    enabled: numericId != null && !Number.isNaN(numericId),
  });

  const [meta, setMeta] = useState<MetaState>(BLANK_META);
  const [body, setBody] = useState<BlogBody>(EMPTY_BODY);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!existing) return;
    setMeta({
      slug: existing.slug,
      title: existing.title,
      category: existing.category,
      excerpt: existing.excerpt,
      readTime: existing.readTime,
      level: existing.level,
      variant: existing.variant,
      image: existing.image,
      published: existing.published,
      sortOrder: existing.sortOrder,
    });
    setBody(existing.body);
  }, [existing]);

  const set = <K extends keyof MetaState>(key: K, value: MetaState[K]) =>
    setMeta((m) => ({ ...m, [key]: value }));

  const save = useMutation({
    mutationFn: async () => {
      const payload: CreateBlogPostInput = {
        slug: meta.slug,
        title: meta.title,
        category: meta.category,
        excerpt: meta.excerpt,
        readTime: meta.readTime,
        level: meta.level,
        variant: meta.variant,
        image: meta.image,
        published: meta.published,
        sortOrder: Number(meta.sortOrder),
        body,
      };
      return isNew ? api.createPost(payload) : api.updatePost(numericId as number, payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'blog'] });
      navigate('/blog');
    },
    onError: (err) => {
      setError(err instanceof ApiError ? err.message : (err as Error).message);
    },
  });

  return (
    <div className={`${s.page} ${s.pageNarrow}`}>
      <header className={s.pageHead}>
        <h1>{isNew ? 'Nuevo artículo' : `Editar: ${meta.title || '…'}`}</h1>
        <button className={s.btnGhost} onClick={() => navigate('/blog')}>← Volver</button>
      </header>

      <form
        className={s.form}
        onSubmit={(e) => { e.preventDefault(); setError(null); save.mutate(); }}
      >
        <div className={s.grid2}>
          <label className={s.field}><span>Slug</span>
            <input value={meta.slug} onChange={(e) => set('slug', e.target.value)}
              pattern="[a-z0-9-]+" required placeholder="kebab-case" />
          </label>
          <label className={s.field}><span>Título</span>
            <input value={meta.title} onChange={(e) => set('title', e.target.value)} required />
          </label>
          <label className={s.field}><span>Categoría</span>
            <input value={meta.category} onChange={(e) => set('category', e.target.value)} required />
          </label>
          <label className={s.field}><span>Nivel</span>
            <input value={meta.level} onChange={(e) => set('level', e.target.value)} required />
          </label>
          <label className={s.field}><span>Tiempo de lectura</span>
            <input value={meta.readTime} onChange={(e) => set('readTime', e.target.value)} required />
          </label>
          <label className={s.field}><span>Variante</span>
            <select value={meta.variant} onChange={(e) => set('variant', e.target.value as BlogVariant)}>
              {VARIANTS.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </label>
          <label className={s.field}><span>Orden</span>
            <input type="number" value={meta.sortOrder}
              onChange={(e) => set('sortOrder', Number(e.target.value))} />
          </label>
        </div>

        <ImageField
          label="Imagen del artículo"
          value={meta.image}
          onChange={(v) => set('image', v)}
        />

        <label className={s.field}><span>Extracto</span>
          <textarea rows={2} value={meta.excerpt} onChange={(e) => set('excerpt', e.target.value)} required />
        </label>

        <label className={s.checkbox}>
          <input type="checkbox" checked={meta.published}
            onChange={(e) => set('published', e.target.checked)} />
          <span>Publicado</span>
        </label>

        {/* ── Body editor ── */}
        <div className={s.bodyHead}>
          <h2 className={s.bodyTitle}>Contenido del artículo</h2>
        </div>

        <BodyEditor value={body} onChange={setBody} />

        {error && <p className={s.error}>{error}</p>}

        <div className={s.formActions}>
          <button type="submit" className={s.btnPrimary} disabled={save.isPending}>
            {save.isPending ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
