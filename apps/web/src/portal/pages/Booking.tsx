import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, CalendarCheck, RotateCcw } from 'lucide-react';
import { portalApi, ApiError } from '../lib/client';
import { useToast } from '../PortalApp';
import s from '../styles/portal.module.scss';

interface Selection {
  start: string;
  label: string;
}

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const showToast = useToast();
  const [selected, setSelected] = useState<Selection | null>(null);

  const { data: availability, isLoading } = useQuery({
    queryKey: ['portal', 'availability'],
    queryFn: portalApi.availability,
  });

  const confirm = useMutation({
    mutationFn: () => portalApi.createBooking(selected!.start),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['portal', 'dashboard'] });
      void qc.invalidateQueries({ queryKey: ['portal', 'availability'] });
      showToast('¡Clase agendada! Ya está en el calendario de tu profe.');
      navigate('/');
    },
    onError: (err) => showToast(err instanceof ApiError ? err.message : 'No se pudo agendar. Intenta de nuevo.'),
  });

  if (isLoading) return <main className={`${s.main} ${s.mainNarrow}`}><p className={s.loading}>Cargando horarios…</p></main>;

  if (!availability?.enabled) {
    return (
      <main className={`${s.main} ${s.mainNarrow}`}>
        <button type="button" className={s.backPill} onClick={() => navigate('/')}>
          <ArrowLeft size={14} strokeWidth={2.2} /> Volver
        </button>
        <p className={s.notePara} style={{ marginTop: '1.5rem' }}>
          Tu profe todavía no habilitó las reservas. Pídele que active la agenda o coordinen la
          próxima clase por WhatsApp.
        </p>
      </main>
    );
  }

  return (
    <main className={`${s.main} ${s.mainNarrow}`}>
      <button type="button" className={s.backPill} onClick={() => navigate('/')}>
        <ArrowLeft size={14} strokeWidth={2.2} /> Volver
      </button>

      <div className={s.bookHead}>
        <div>
          <h1>Agendar clase</h1>
          <p>Horarios libres de tu profe · {availability.weekLabel}</p>
        </div>
        <div className={s.legend}>
          <span className={s.legendItem}>
            <span className={s.legendFree} /> Disponible
          </span>
          <span className={s.legendItem}>
            <span className={s.legendTaken} /> Ocupado
          </span>
        </div>
      </div>

      <div className={s.bookGrid}>
        {availability.days.map((day) => (
          <div key={day.date} className={s.bookDay}>
            <p className={s.bookDayName}>{day.name}</p>
            {day.slots.length === 0 && <p className={s.bookEmpty}>Sin horarios</p>}
            {day.slots.map((slot) => {
              const isSel = selected?.start === slot.start;
              const cls = !slot.free
                ? `${s.slot} ${s.slotTaken}`
                : isSel
                  ? `${s.slot} ${s.slotSelected}`
                  : s.slot;
              return (
                <button
                  key={slot.start}
                  type="button"
                  className={cls}
                  disabled={!slot.free}
                  onClick={() =>
                    setSelected(isSel ? null : { start: slot.start, label: `${day.name} · ${slot.label}` })
                  }
                >
                  {slot.label}
                  {!slot.free && <span className={s.slotSub}>Ocupado</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {selected && (
        <div className={s.selectionBar}>
          <div className={s.selectionLeft}>
            <CalendarCheck size={20} />
            <p className={s.selectionLabel}>
              {selected.label} <span>· con tu profe, por videollamada</span>
            </p>
          </div>
          <button
            type="button"
            className={s.ctaGreen}
            onClick={() => confirm.mutate()}
            disabled={confirm.isPending}
          >
            {confirm.isPending ? 'Agendando…' : 'Confirmar clase'}
          </button>
        </div>
      )}

      <p className={s.bookFooterNote}>
        <RotateCcw size={13} />
        Sincronizado con el calendario de tu profe — los horarios ocupados se bloquean
        automáticamente.
      </p>
    </main>
  );
};

export default Booking;
