import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  CalendarDays,
  CircleCheckBig,
  FileText,
  Flame,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { portalApi } from '../lib/client';
import { firstName } from '../../admin/lib/text';
import { formatDay } from '../../admin/lib/dates';
import s from '../styles/portal.module.scss';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: dash } = useQuery({ queryKey: ['portal', 'dashboard'], queryFn: portalApi.dashboard });
  const { data: classes } = useQuery({ queryKey: ['portal', 'classes'], queryFn: portalApi.listClasses });

  if (!dash) return <main className={s.main}><p className={s.loading}>Cargando tu progreso…</p></main>;

  const name = firstName(dash.student.name);
  const hasNext = Boolean(dash.nextClassLabel);

  return (
    <main className={s.main}>
      <div className={s.greeting}>
        <h1>
          ¡Hola, <span className={s.accent}>{name}</span>!
        </h1>
        <p>Así va tu camino con el inglés. Sigue así, you&apos;re doing great.</p>
      </div>

      {/* Stats */}
      <div className={s.stats}>
        <div className={`${s.statCard} ${s.statCardTeal}`}>
          <div className={s.statHead}>
            <Flame size={19} fill="#C8E47C" color="#C8E47C" />
            <span className={`${s.statLabel} ${s.statLabelLight}`}>Racha</span>
          </div>
          <p className={s.statValue}>{dash.student.streakWeeks} semanas</p>
          <p className={`${s.statSub} ${s.statSubLime}`}>sin faltar a clase</p>
        </div>

        <div className={s.statCard}>
          <div className={s.statHead}>
            <CircleCheckBig size={19} color="#185C60" />
            <span className={s.statLabel}>Clases completadas</span>
          </div>
          <p className={`${s.statValue} ${s.statValueDark}`}>{dash.classesCount}</p>
          <p className={s.statSub}>desde que empezaste</p>
        </div>

        <div className={s.statCard}>
          <div className={s.statHead}>
            <Sparkles size={19} color="#185C60" />
            <span className={s.statLabel}>Temas cubiertos</span>
          </div>
          <p className={`${s.statValue} ${s.statValueDark}`}>{dash.topicsCount}</p>
          <p className={s.statSub}>entre gramática y conversación</p>
        </div>
      </div>

      {/* Booking callout (only when the tutor enabled it) */}
      {dash.bookingEnabled && (
        <div className={s.bookingCallout}>
          <div className={s.bookingLeft}>
            <span className={s.bookingIcon}>
              <CalendarDays size={22} />
            </span>
            <div className={s.bookingText}>
              {hasNext ? (
                <>
                  <h3>Tu próxima clase: {dash.nextClassLabel}</h3>
                  <p>Con tu profe, por videollamada. Ya está en su calendario.</p>
                </>
              ) : (
                <>
                  <h3>¿Agendamos la próxima clase?</h3>
                  <p>Elige un horario libre de tu profe — su calendario se actualiza solo.</p>
                </>
              )}
            </div>
          </div>
          <button type="button" className={s.ctaGreen} onClick={() => navigate('/agendar')}>
            {hasNext ? 'Reprogramar' : 'Agendar clase'}
          </button>
        </div>
      )}

      {/* Class history */}
      <div className={s.sectionHead}>
        <h2 className={s.sectionTitle}>Tus clases</h2>
        <span className={s.sectionHint}>de la más reciente a la más antigua</span>
      </div>

      <div className={s.classList}>
        {classes?.map((cl) => (
          <button
            key={cl.id}
            type="button"
            className={s.classRow}
            onClick={() => navigate(`/clase/${cl.id}`)}
          >
            <div className={s.classNum}>{String(cl.num).padStart(2, '0')}</div>
            <div className={s.classMid}>
              <p className={s.classDate}>{formatDay(cl.date)}</p>
              <p className={s.classTitle}>{cl.title}</p>
              <div className={s.chips}>
                {cl.topics.map((t) => (
                  <span key={t} className={s.chip}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className={s.classRight}>
              <span className={s.matLabel}>
                <FileText size={14} />
                {cl.materials.length} {cl.materials.length === 1 ? 'material' : 'materiales'}
              </span>
              <span className={s.arrowCircle}>
                <ArrowRight size={15} strokeWidth={2.2} />
              </span>
            </div>
          </button>
        ))}
        {classes?.length === 0 && (
          <p className={s.sectionHint}>Aún no tienes clases registradas. ¡Pronto verás la primera aquí!</p>
        )}
      </div>

      {/* Chat callout */}
      <div className={s.chatCallout}>
        <div className={s.chatCalloutBlob} />
        <div className={s.chatCalloutText}>
          <h3>¿Te quedó alguna duda de tus clases?</h3>
          <p>
            Tu Buddy conoce todo lo que viste en clase y te responde al instante. Tu profe también
            lee la conversación para darte seguimiento.
          </p>
        </div>
        <button type="button" className={s.ctaGreen} onClick={() => navigate('/chat')}>
          <MessageCircle size={16} /> Abrir el chat
        </button>
      </div>
    </main>
  );
};

export default Dashboard;
