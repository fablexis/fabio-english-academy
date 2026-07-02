import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  ArrowUpRight,
  FileText,
  Lightbulb,
  MessageCircle,
  PencilLine,
} from 'lucide-react';
import type { Material } from '@eyb/shared';
import { portalApi } from '../lib/client';
import { formatDay } from '../../admin/lib/dates';
import s from '../styles/portal.module.scss';

function materialHref(m: Material): string {
  if (m.type === 'pdf') return m.url;
  // Blog: a full URL/path passes through; a bare slug becomes /blog/<slug>.
  if (!m.url) return '#';
  return /^(https?:)?\//.test(m.url) ? m.url : `/blog/${m.url}`;
}

const ClassDetail: React.FC = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data: cl } = useQuery({
    queryKey: ['portal', 'class', id],
    queryFn: () => portalApi.getClass(id),
  });

  if (!cl) return <main className={`${s.main} ${s.mainNarrow}`}><p className={s.loading}>Cargando la clase…</p></main>;

  return (
    <main className={`${s.main} ${s.mainNarrow}`}>
      <button type="button" className={s.backPill} onClick={() => navigate('/')}>
        <ArrowLeft size={14} strokeWidth={2.2} /> Volver a mis clases
      </button>

      <div className={s.classDetailHead}>
        <p className={s.classEyebrow}>
          Clase {String(cl.num).padStart(2, '0')} · {formatDay(cl.date)}
        </p>
        <h1 className={s.classDetailTitle}>{cl.title}</h1>
        <div className={s.chipRow}>
          {cl.topics.map((t) => (
            <span key={t} className={s.chipLime}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Notes */}
      <section className={s.notesCard}>
        <h2 className={s.notesCardH2}>
          <PencilLine size={18} color="#185C60" /> Notas de la clase
        </h2>
        <p className={s.notesCardSub}>Escritas por tu profe después de la clase</p>
        <div className={s.notesStack}>
          {cl.notes.map((nb, i) => {
            if (nb.kind === 'ex') {
              return (
                <div key={i} className={s.noteExample}>
                  <p className={s.noteExampleEn}>“{nb.en}”</p>
                  <p className={s.noteExampleEs}>{nb.es}</p>
                </div>
              );
            }
            if (nb.kind === 'tip') {
              return (
                <div key={i} className={s.noteTip}>
                  <Lightbulb size={17} strokeWidth={2.2} />
                  <p>{nb.text}</p>
                </div>
              );
            }
            return (
              <p key={i} className={s.notePara}>
                {nb.text}
              </p>
            );
          })}
          {cl.notes.length === 0 && <p className={s.notePara}>Esta clase todavía no tiene notas.</p>}
        </div>
      </section>

      {/* Materials */}
      {cl.materials.length > 0 && (
        <section className={s.materialsSection}>
          <h2 className={s.materialsH2}>Material de la clase</h2>
          <div className={s.materials}>
            {cl.materials.map((mt, i) => (
              <a
                key={i}
                className={s.materialCard}
                href={materialHref(mt)}
                target={mt.type === 'pdf' ? '_blank' : '_self'}
                rel="noopener noreferrer"
              >
                <span className={s.materialIcon}>
                  <FileText size={21} />
                </span>
                <span className={s.materialMeta}>
                  <span className={s.materialTitle}>{mt.title}</span>
                  <span className={s.materialKind}>
                    {mt.type === 'pdf' ? 'PDF' : 'Artículo del blog'}
                  </span>
                </span>
                <ArrowUpRight size={15} strokeWidth={2.2} className={s.materialArrow} />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Ask about this class */}
      <div className={s.askBanner}>
        <div>
          <h3>¿Dudas sobre esta clase?</h3>
          <p>Pregúntale a tu Buddy y tu profe podrá ver tu pregunta.</p>
        </div>
        <button
          type="button"
          className={s.ctaLime}
          onClick={() =>
            navigate('/chat', {
              state: { prefill: `Tengo una duda sobre la clase de "${cl.title}": ` },
            })
          }
        >
          <MessageCircle size={15} /> Preguntar sobre esta clase
        </button>
      </div>
    </main>
  );
};

export default ClassDetail;
