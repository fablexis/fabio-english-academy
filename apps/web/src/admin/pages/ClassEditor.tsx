import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ChevronLeft,
  Eye,
  FileText,
  Link as LinkIcon,
  Save,
  Trash2,
  Upload,
} from 'lucide-react';
import type { Material, NoteBlock } from '@eyb/shared';
import { api, ApiError } from '../lib/client';
import { firstName } from '../lib/text';
import s from '../styles/admin.module.scss';

interface EditorState {
  date: string;
  title: string;
  topics: string[];
  notes: NoteBlock[];
  materials: Material[];
}

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

const ClassEditor: React.FC = () => {
  const { id = '', classId } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const editing = Boolean(classId);

  const { data: student } = useQuery({
    queryKey: ['admin', 'student', id],
    queryFn: () => api.getStudent(id),
  });

  const [ed, setEd] = useState<EditorState | null>(null);
  const [topicDraft, setTopicDraft] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Initialise the editor once the student (and, when editing, the class) loads.
  useEffect(() => {
    if (ed || !student) return;
    if (editing) {
      const cls = student.classes.find((c) => c.id === classId);
      if (cls) {
        setEd({
          date: cls.date,
          title: cls.title,
          topics: [...cls.topics],
          notes: cls.notes.map((n) => ({ ...n })),
          materials: cls.materials.map((m) => ({ ...m })),
        });
      }
    } else {
      setEd({ date: todayIso(), title: '', topics: [], notes: [{ kind: 'p', text: '' }], materials: [] });
    }
  }, [student, editing, classId, ed]);

  const patch = (p: Partial<EditorState>) => setEd((cur) => (cur ? { ...cur, ...p } : cur));

  const save = useMutation({
    mutationFn: () => {
      if (!ed) throw new Error('no editor');
      const input = {
        date: ed.date,
        title: ed.title.trim(),
        topics: ed.topics,
        notes: ed.notes,
        materials: ed.materials,
      };
      return editing ? api.updateClass(classId as string, input) : api.createClass(id, input);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['admin', 'student', id] });
      void qc.invalidateQueries({ queryKey: ['admin', 'students'] });
      navigate(`/students/${id}`, {
        state: {
          toast: `Clase guardada — ya es visible en el portal de ${firstName(student?.name ?? '')}.`,
        },
      });
    },
    onError: (err) => setError(err instanceof ApiError ? err.message : String(err)),
  });

  const submit = () => {
    if (!ed?.title.trim()) {
      setError('Ponle un título a la clase antes de guardar.');
      return;
    }
    setError(null);
    save.mutate();
  };

  const cls = editing ? student?.classes.find((c) => c.id === classId) : undefined;
  const heading = editing
    ? `Editar clase ${cls ? String(cls.num).padStart(2, '0') : ''}`
    : `Nueva clase para ${firstName(student?.name ?? '')}`;

  if (!ed) return <div className={s.center}>Cargando editor…</div>;

  return (
    <div className={`${s.page} ${s.pageNarrow}`}>
      <Link to={`/students/${id}`} className={s.backLink}>
        <ChevronLeft size={14} /> Ficha de {student?.name ?? ''}
      </Link>

      <div className={s.editorHead}>
        <div className={s.editorHeadLeft}>
          <h1>{heading}</h1>
        </div>
        <span className={`${s.badge} ${s.tintLime}`} style={{ padding: '0.3rem 0.6rem' }}>
          <Eye size={13} /> El estudiante lo verá tal cual en su portal
        </span>
      </div>

      <div className={s.card}>
        <div className={s.grid2}>
          <label className={s.field}>
            <span>Estudiante</span>
            <input value={student?.name ?? ''} readOnly />
          </label>
          <label className={s.field}>
            <span>Fecha de la clase</span>
            <input
              type="date"
              value={ed.date}
              onChange={(e) => patch({ date: e.target.value })}
            />
          </label>
        </div>

        <label className={s.field}>
          <span>Título de la clase</span>
          <input
            value={ed.title}
            onChange={(e) => patch({ title: e.target.value })}
            placeholder="ej: Phrasal verbs para el trabajo"
          />
        </label>

        {/* Topics */}
        <div className={s.field}>
          <span>Temas cubiertos</span>
          <div className={s.chipEditor}>
            {ed.topics.map((t, i) => (
              <span key={`${t}-${i}`} className={s.chip}>
                {t}
                <button
                  type="button"
                  className={s.chipRemove}
                  title="Quitar tema"
                  onClick={() => patch({ topics: ed.topics.filter((_, j) => j !== i) })}
                >
                  <X14 />
                </button>
              </span>
            ))}
            <input
              className={s.chipInput}
              value={topicDraft}
              onChange={(e) => setTopicDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && topicDraft.trim()) {
                  e.preventDefault();
                  patch({ topics: [...ed.topics, topicDraft.trim()] });
                  setTopicDraft('');
                }
              }}
              placeholder="Escribe un tema y presiona Enter"
            />
          </div>
        </div>

        {/* Notes */}
        <div className={s.field}>
          <span>Notas de la clase</span>
          <div className={s.fieldHelp ?? ''}>
            El estudiante puede preguntarle a la IA sobre estas notas.
          </div>
          <div className={s.noteList}>
            {ed.notes.map((nb, i) => (
              <NoteBlockEditor
                key={i}
                block={nb}
                onChange={(next) =>
                  patch({ notes: ed.notes.map((n, j) => (j === i ? next : n)) })
                }
                onRemove={() => patch({ notes: ed.notes.filter((_, j) => j !== i) })}
              />
            ))}
          </div>
          <div className={s.addRow}>
            <button
              type="button"
              className={s.btnAddSm}
              onClick={() => patch({ notes: [...ed.notes, { kind: 'p', text: '' }] })}
            >
              + Párrafo
            </button>
            <button
              type="button"
              className={s.btnAddSm}
              onClick={() => patch({ notes: [...ed.notes, { kind: 'ex', en: '', es: '' }] })}
            >
              + Ejemplo EN → ES
            </button>
            <button
              type="button"
              className={s.btnAddSm}
              onClick={() => patch({ notes: [...ed.notes, { kind: 'tip', text: '' }] })}
            >
              + Tip
            </button>
          </div>
        </div>

        {/* Materials */}
        <div className={s.field}>
          <span>Material de la clase</span>
          <div className={s.noteList}>
            {ed.materials.map((mt, i) => (
              <MaterialRow
                key={i}
                material={mt}
                onChange={(next) =>
                  patch({ materials: ed.materials.map((m, j) => (j === i ? next : m)) })
                }
                onRemove={() => patch({ materials: ed.materials.filter((_, j) => j !== i) })}
                onError={setError}
              />
            ))}
          </div>
          <div className={s.addRow}>
            <button
              type="button"
              className={s.btnAddSm}
              onClick={() =>
                patch({ materials: [...ed.materials, { type: 'pdf', title: '', url: '' }] })
              }
            >
              <Upload size={14} /> Subir PDF
            </button>
            <button
              type="button"
              className={s.btnAddSm}
              onClick={() =>
                patch({ materials: [...ed.materials, { type: 'blog', title: '', url: '' }] })
              }
            >
              <LinkIcon size={14} /> Enlazar artículo del blog
            </button>
          </div>
        </div>

        {error && <p className={s.error}>{error}</p>}

        <div className={s.formActions ?? ''} style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', borderTop: '1px solid #e2eaea', paddingTop: '1.1rem', marginTop: '0.5rem' }}>
          <button type="button" className={s.btnGhost} onClick={() => navigate(`/students/${id}`)}>
            Cancelar
          </button>
          <button type="button" className={s.btnPrimary} onClick={submit} disabled={save.isPending}>
            <Save size={15} /> {save.isPending ? 'Guardando…' : 'Guardar y publicar'}
          </button>
        </div>
      </div>
    </div>
  );
};

// A small inline "×" that matches the 11px stroke icon in the prototype.
const X14: React.FC = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const NOTE_META: Record<NoteBlock['kind'], { label: string; block: string; label2: string }> = {
  p: { label: 'Párrafo', block: '', label2: '' },
  ex: { label: 'Ejemplo EN → ES', block: 'Ex', label2: 'Ex' },
  tip: { label: 'Tip', block: 'Tip', label2: 'Tip' },
};

const NoteBlockEditor: React.FC<{
  block: NoteBlock;
  onChange: (next: NoteBlock) => void;
  onRemove: () => void;
}> = ({ block, onChange, onRemove }) => {
  const isEx = block.kind === 'ex';
  const wrapClass =
    block.kind === 'ex' ? s.noteBlockEx : block.kind === 'tip' ? s.noteBlockTip : '';
  const labelClass =
    block.kind === 'ex' ? s.noteLabelEx : block.kind === 'tip' ? s.noteLabelTip : '';
  return (
    <div className={`${s.noteBlock} ${wrapClass}`}>
      <div className={s.noteHead}>
        <span className={`${s.noteLabel} ${labelClass}`}>{NOTE_META[block.kind].label}</span>
        <button type="button" className={s.noteTrash} title="Eliminar bloque" onClick={onRemove}>
          <Trash2 size={13} />
        </button>
      </div>
      {isEx ? (
        <div className={s.noteEx}>
          <input
            className={s.noteExEn + ' ' + s.noteTextarea}
            value={block.en}
            onChange={(e) => onChange({ ...block, en: e.target.value })}
            placeholder="Frase en inglés"
          />
          <input
            className={s.noteExEs + ' ' + s.noteTextarea}
            value={block.es}
            onChange={(e) => onChange({ ...block, es: e.target.value })}
            placeholder="Traducción al español"
          />
        </div>
      ) : (
        <textarea
          className={s.noteTextarea}
          rows={2}
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          placeholder="Escribe la nota…"
        />
      )}
    </div>
  );
};

const MaterialRow: React.FC<{
  material: Material;
  onChange: (next: Material) => void;
  onRemove: () => void;
  onError: (msg: string) => void;
}> = ({ material, onChange, onRemove, onError }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const isPdf = material.type === 'pdf';

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const { url } = await api.uploadFile(file);
      onChange({ ...material, url, title: material.title || file.name.replace(/\.[^.]+$/, '') });
    } catch (err) {
      onError(err instanceof ApiError ? err.message : String(err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={s.matRow}>
      <span className={`${s.matIcon} ${isPdf ? s.matIconPdf : s.matIconBlog}`}>
        {isPdf ? <FileText size={16} /> : <LinkIcon size={16} />}
      </span>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem', minWidth: 0 }}>
        <input
          value={material.title}
          onChange={(e) => onChange({ ...material, title: e.target.value })}
          placeholder="Título del material"
          style={{ font: 'inherit', fontSize: '0.875rem', fontWeight: 600, color: '#35494c', padding: '0.45rem 0.6rem', border: '1px solid #cfdcdc', borderRadius: '8px', background: '#fff' }}
        />
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          <input
            className={s.code}
            value={material.url}
            onChange={(e) => onChange({ ...material, url: e.target.value })}
            placeholder={isPdf ? 'URL del PDF (o súbelo)' : 'slug o URL del artículo del blog'}
            style={{ flex: 1, minWidth: 0, padding: '0.4rem 0.6rem', border: '1px solid #cfdcdc', borderRadius: '8px', background: '#fff' }}
          />
          {isPdf && (
            <>
              <button
                type="button"
                className={s.btnAddSm}
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
              >
                <Upload size={13} /> {uploading ? 'Subiendo…' : 'Subir'}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="application/pdf"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void upload(f);
                  e.target.value = '';
                }}
              />
            </>
          )}
        </div>
      </div>
      <span className={s.matKind}>{isPdf ? 'PDF' : 'BLOG'}</span>
      <button type="button" className={s.noteTrash} title="Quitar material" onClick={onRemove}>
        <Trash2 size={14} />
      </button>
    </div>
  );
};

export default ClassEditor;
