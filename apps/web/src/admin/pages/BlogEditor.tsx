import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { BlogBody, BlogVariant, CreateBlogPostInput } from '@eyb/shared';
import { api, ApiError } from '../lib/client';
import BodyEditor from '../components/BodyEditor';
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
  image: '/blog-images/',
  published: true,
  sortOrder: 0,
};

const BlogEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
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

  // JSON escape hatch (advanced): edit the raw body JSON directly.
  const [jsonMode, setJsonMode] = useState(false);
  const [bodyJson, setBodyJson] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);

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

  const enterJson = () => {
    setBodyJson(JSON.stringify(body, null, 2));
    setJsonError(null);
    setJsonMode(true);
  };
  const exitJson = () => {
    try {
      setBody(JSON.parse(bodyJson) as BlogBody);
      setJsonError(null);
      setJsonMode(false);
    } catch {
      setJsonError('JSON inválido — corrígelo antes de volver al editor.');
    }
  };
  const onJsonChange = (v: string) => {
    setBodyJson(v);
    try {
      setBody(JSON.parse(v) as BlogBody);
      setJsonError(null);
    } catch {
      setJsonError('JSON inválido');
    }
  };

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

  const blocked = jsonMode && jsonError != null;

  return (
    <div className={s.page}>
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
          <label className={s.field}><span>Imagen (ruta pública)</span>
            <input value={meta.image} onChange={(e) => set('image', e.target.value)}
              placeholder="/blog-images/mi-post.jpg" required />
          </label>
          <label className={s.field}><span>Orden</span>
            <input type="number" value={meta.sortOrder}
              onChange={(e) => set('sortOrder', Number(e.target.value))} />
          </label>
        </div>

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
          <div className={s.modeToggle}>
            <button type="button"
              className={!jsonMode ? s.modeActive : s.modeBtn}
              onClick={() => (jsonMode ? exitJson() : undefined)}>
              Editor
            </button>
            <button type="button"
              className={jsonMode ? s.modeActive : s.modeBtn}
              onClick={() => (!jsonMode ? enterJson() : undefined)}>
              JSON
            </button>
          </div>
        </div>

        {jsonMode ? (
          <label className={s.field}>
            <span>Cuerpo (JSON){jsonError && <em className={s.warn}> — {jsonError}</em>}</span>
            <textarea className={s.code} rows={20} value={bodyJson}
              onChange={(e) => onJsonChange(e.target.value)} spellCheck={false} />
          </label>
        ) : (
          <BodyEditor value={body} onChange={setBody} />
        )}

        {error && <p className={s.error}>{error}</p>}

        <div className={s.formActions}>
          <button type="submit" className={s.btnPrimary} disabled={save.isPending || blocked}>
            {save.isPending ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
