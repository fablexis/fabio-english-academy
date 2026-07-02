import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Check, ExternalLink, History } from 'lucide-react';
import { mergePageContent, PAGE_DEFAULTS, type PageKey } from '@eyb/shared';
import { api, ApiError } from '../lib/client';
import { schemaFor } from '../pageSchemas';
import ContentFields from '../components/ContentFields';
import s from '../styles/admin.module.scss';

type Doc = Record<string, unknown>;

const PageEditor: React.FC = () => {
  const { key } = useParams<{ key: string }>();
  const schema = schemaFor(key ?? '');
  const qc = useQueryClient();

  const { data: dto, isLoading } = useQuery({
    queryKey: ['admin', 'page', key],
    queryFn: () => api.getPage(key as PageKey),
    enabled: schema != null,
  });

  // Working draft vs. last-persisted baseline (drives the dirty state).
  const [draft, setDraft] = useState<Doc | null>(null);
  const [baseline, setBaseline] = useState<Doc | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!dto || !schema) return;
    const merged = mergePageContent(
      PAGE_DEFAULTS[schema.key] as unknown as Doc,
      dto.data ?? {},
    );
    setDraft(merged);
    setBaseline(merged);
  }, [dto, schema]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const dirty = useMemo(
    () => draft != null && baseline != null && JSON.stringify(draft) !== JSON.stringify(baseline),
    [draft, baseline],
  );

  const save = useMutation({
    mutationFn: (doc: Doc) => api.savePage(schema!.key, doc),
    onSuccess: (saved) => {
      const merged = mergePageContent(
        PAGE_DEFAULTS[schema!.key] as unknown as Doc,
        (saved.data as Doc) ?? {},
      );
      setDraft(merged);
      setBaseline(merged);
      setError(null);
      setToast('Cambios publicados');
      void qc.invalidateQueries({ queryKey: ['admin', 'pages'] });
      void qc.invalidateQueries({ queryKey: ['admin', 'page', key] });
    },
    onError: (err) => {
      setError(err instanceof ApiError ? err.message : (err as Error).message);
    },
  });

  if (!schema) return <Navigate to="/pages" replace />;
  if (isLoading || draft == null) {
    return <div className={s.center}>Cargando contenido…</div>;
  }

  const restoreDefaults = () => {
    if (confirm('¿Restaurar el contenido original de esta página? Deberás guardar para publicarlo.')) {
      setDraft(PAGE_DEFAULTS[schema.key] as unknown as Doc);
    }
  };

  return (
    <div className={`${s.page} ${s.pageNarrow}`}>
      <header className={s.editorHead}>
        <div className={s.editorHeadLeft}>
          <Link to="/pages" className={s.backLink}>
            <ArrowLeft size={15} /> Páginas
          </Link>
          <h1>
            {schema.title} <code className={s.routeChip}>{schema.route}</code>
          </h1>
          {dto?.updatedAt ? (
            <p className={s.pageSub}>
              Última edición: {new Date(dto.updatedAt).toLocaleString('es')}
            </p>
          ) : (
            <p className={s.pageSub}>Mostrando el contenido original del sitio.</p>
          )}
        </div>
        <div className={s.editorHeadActions}>
          <a
            href={schema.route}
            target="_blank"
            rel="noopener noreferrer"
            className={s.btnGhost}
          >
            Ver página <ExternalLink size={13} />
          </a>
          <button type="button" className={s.btnGhost} onClick={restoreDefaults}>
            <History size={14} /> Restaurar original
          </button>
        </div>
      </header>

      {schema.groups.map((group) => (
        <section key={group.title} className={s.groupCard}>
          <header className={s.groupHead}>
            <h2>{group.title}</h2>
            {group.description && <p>{group.description}</p>}
          </header>
          <ContentFields
            fields={group.fields}
            value={draft}
            onChange={(next) => setDraft(next)}
          />
        </section>
      ))}

      {error && <p className={s.error}>{error}</p>}

      {/* Sticky save bar — appears only with unsaved changes */}
      <div className={`${s.saveBar} ${dirty ? s.saveBarVisible : ''}`} aria-hidden={!dirty}>
        <span className={s.saveBarText}>Tienes cambios sin guardar</span>
        <div className={s.saveBarActions}>
          <button
            type="button"
            className={s.btnGhost}
            onClick={() => setDraft(baseline)}
            disabled={save.isPending}
          >
            Descartar
          </button>
          <button
            type="button"
            className={s.btnPrimary}
            onClick={() => draft && save.mutate(draft)}
            disabled={save.isPending}
          >
            {save.isPending ? 'Publicando…' : 'Guardar y publicar'}
          </button>
        </div>
      </div>

      {toast && (
        <div className={s.toast} role="status">
          <Check size={15} /> {toast}
        </div>
      )}
    </div>
  );
};

export default PageEditor;
