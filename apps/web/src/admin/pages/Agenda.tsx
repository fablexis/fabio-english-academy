import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CalendarCheck, Check, RotateCcw, Video } from 'lucide-react';
import type { DayAvailability, WeeklyAvailability } from '@eyb/shared';
import { api, ApiError } from '../lib/client';
import s from '../styles/admin.module.scss';

// Mon–Sat rows (day index 1..6); Sunday is never bookable, matching the design.
const WEEKDAYS: { day: number; name: string }[] = [
  { day: 1, name: 'Lunes' },
  { day: 2, name: 'Martes' },
  { day: 3, name: 'Miércoles' },
  { day: 4, name: 'Jueves' },
  { day: 5, name: 'Viernes' },
  { day: 6, name: 'Sábado' },
];

const Switch: React.FC<{ on: boolean; small?: boolean; onClick: () => void; label: string }> = ({
  on,
  small,
  onClick,
  label,
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    aria-label={label}
    onClick={onClick}
    className={`${s.switch} ${small ? s.switchSm : ''} ${on ? s.switchOn : ''}`}
  >
    <span className={s.switchKnob} />
  </button>
);

const GoogleGlyph: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="#4285F4" strokeWidth="2" />
    <path d="M8 2v4" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 2v4" stroke="#34A853" strokeWidth="2" strokeLinecap="round" />
    <path d="M3 10h18" stroke="#FBBC05" strokeWidth="2" />
  </svg>
);

const Agenda: React.FC = () => {
  const qc = useQueryClient();
  const [params, setParams] = useSearchParams();
  const [toast, setToast] = useState<string | null>(null);

  const { data: settings, isLoading } = useQuery({
    queryKey: ['admin', 'booking', 'settings'],
    queryFn: api.getBookingSettings,
  });

  const [days, setDays] = useState<DayAvailability[]>([]);
  const [zoomLink, setZoomLink] = useState('');

  // Hydrate the editable availability from the saved settings.
  useEffect(() => {
    if (!settings) return;
    setDays(
      WEEKDAYS.map(({ day }) => {
        const found = settings.weeklyAvailability.find((d) => d.day === day);
        return found ?? { day, on: false, ranges: [] };
      }),
    );
    setZoomLink(settings.zoomLink ?? '');
  }, [settings]);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  // Google OAuth round-trip lands back here with ?google=connected|error.
  useEffect(() => {
    const g = params.get('google');
    if (!g) return;
    if (g === 'connected') {
      notify('Google Calendar conectado — tus eventos bloquean horarios.');
      void qc.invalidateQueries({ queryKey: ['admin', 'booking', 'settings'] });
    } else if (g === 'error') {
      notify('No se pudo conectar Google Calendar. Intenta de nuevo.');
    }
    params.delete('google');
    setParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveSettings = useMutation({
    mutationFn: (input: Parameters<typeof api.updateBookingSettings>[0]) =>
      api.updateBookingSettings(input),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ['admin', 'booking', 'settings'] }),
    onError: (err) => notify(err instanceof ApiError ? err.message : String(err)),
  });

  const toggleBooking = () => {
    if (!settings) return;
    const enabled = !settings.bookingEnabled;
    saveSettings.mutate(
      { bookingEnabled: enabled },
      {
        onSuccess: () => {
          void qc.invalidateQueries({ queryKey: ['admin', 'booking', 'settings'] });
          notify(
            enabled
              ? 'El botón “Agendar clase” ahora es visible en el portal.'
              : 'El botón “Agendar clase” quedó oculto en el portal.',
          );
        },
      },
    );
  };

  const connectGoogle = useMutation({
    mutationFn: api.googleConnectUrl,
    onSuccess: ({ url }) => {
      window.location.href = url;
    },
    onError: (err) => notify(err instanceof ApiError ? err.message : String(err)),
  });

  const disconnectGoogle = useMutation({
    mutationFn: api.googleDisconnect,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['admin', 'booking', 'settings'] });
      notify('Google Calendar desconectado.');
    },
    onError: (err) => notify(err instanceof ApiError ? err.message : String(err)),
  });

  const updateDay = (day: number, patch: Partial<DayAvailability>) =>
    setDays((cur) => cur.map((d) => (d.day === day ? { ...d, ...patch } : d)));

  const saveAvailability = () => {
    const weekly: WeeklyAvailability = days;
    saveSettings.mutate(
      { weeklyAvailability: weekly, zoomLink },
      { onSuccess: () => notify('Disponibilidad guardada — el calendario del portal se actualizó.') },
    );
  };

  const connected = settings?.googleConnected ?? false;
  const enabled = settings?.bookingEnabled ?? false;
  const lastSync = useMemo(
    () => (settings?.updatedAt ? new Date(settings.updatedAt).toLocaleString('es') : ''),
    [settings?.updatedAt],
  );

  if (isLoading || !settings) return <div className={s.center}>Cargando agenda…</div>;

  return (
    <div className={s.pageNarrow + ' ' + s.page}>
      <header className={s.pageHead}>
        <div>
          <h1>Agenda de clases</h1>
          <p className={s.pageSub}>
            Controla si los estudiantes pueden agendar clases desde su portal, y en qué horarios.
          </p>
        </div>
      </header>

      {/* Visibility toggle */}
      <div className={s.card} style={{ marginBottom: '1rem' }}>
        <div className={s.agendaRow}>
          <div className={s.agendaRowLeft}>
            <span className={s.agendaRowIcon}>
              <CalendarCheck size={19} />
            </span>
            <div>
              <h2 style={{ fontSize: '1rem', color: '#35494c', fontWeight: 700, margin: 0 }}>
                Mostrar “Agendar clase” en el portal
              </h2>
              <p className={s.pageSub}>
                Cuando está activo, los estudiantes ven un calendario con tus horarios libres y
                pueden reservar.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className={enabled ? s.badgeOn : s.badgeOff}>
              {enabled ? 'Visible en el portal' : 'Oculto'}
            </span>
            <Switch on={enabled} onClick={toggleBooking} label="Mostrar agendar clase en el portal" />
          </div>
        </div>
      </div>

      {/* Google Calendar */}
      <div className={s.card} style={{ marginBottom: '1rem' }}>
        <div className={s.agendaRow}>
          <div className={s.agendaRowLeft}>
            <span className={s.agendaRowIcon} style={{ background: '#eef3f3', color: 'inherit' }}>
              <GoogleGlyph />
            </span>
            <div style={{ minWidth: 0 }}>
              <h2 style={{ fontSize: '1rem', color: '#35494c', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                Google Calendar
                {connected ? (
                  <span className={s.badgeOn}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#35c789', display: 'inline-block' }} />
                    Conectado
                  </span>
                ) : (
                  <span className={s.badgeOff}>No conectado</span>
                )}
              </h2>
              {connected ? (
                <p className={s.code} style={{ marginTop: '0.3rem', color: '#67797c' }}>
                  {settings.googleEmail}
                </p>
              ) : (
                <p className={s.pageSub}>
                  Conecta tu calendario para bloquear automáticamente los horarios donde ya tienes
                  eventos.
                </p>
              )}
            </div>
          </div>
          {connected ? (
            <button
              type="button"
              className={s.btnGhost}
              onClick={() => disconnectGoogle.mutate()}
              disabled={disconnectGoogle.isPending}
            >
              Desconectar
            </button>
          ) : (
            <button
              type="button"
              className={s.btnPrimary}
              onClick={() => connectGoogle.mutate()}
              disabled={connectGoogle.isPending}
            >
              {connectGoogle.isPending ? 'Redirigiendo…' : 'Conectar con Google'}
            </button>
          )}
        </div>
        {connected && (
          <div className={s.gcalNote}>
            <RotateCcw size={14} color="#1b6f4a" />
            Tus eventos existentes bloquean horarios automáticamente
            {lastSync ? ` · última actualización ${lastSync}` : ''}
          </div>
        )}
      </div>

      {/* Weekly availability */}
      <div className={s.card}>
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1rem', color: '#35494c', fontWeight: 700, margin: 0 }}>
            Disponibilidad semanal
          </h2>
          <p className={s.pageSub}>Los estudiantes solo pueden agendar dentro de estas franjas.</p>
        </div>

        <label className={s.field}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Video size={14} /> Enlace de Zoom de las clases
          </span>
          <input
            className={s.code}
            value={zoomLink}
            onChange={(e) => setZoomLink(e.target.value)}
            placeholder="https://zoom.us/j/…"
          />
        </label>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {days.map((d) => {
            const meta = WEEKDAYS.find((w) => w.day === d.day)!;
            return (
              <div key={d.day} className={s.dayRow}>
                <Switch
                  on={d.on}
                  small
                  onClick={() => updateDay(d.day, { on: !d.on })}
                  label={`Activar ${meta.name}`}
                />
                <span className={`${s.dayName} ${d.on ? '' : s.dayNameOff}`}>{meta.name}</span>
                <div className={s.dayRanges}>
                  {d.on ? (
                    <>
                      {d.ranges.map((r, i) => (
                        <span key={i} className={s.chip}>
                          <input
                            type="time"
                            value={r.start}
                            onChange={(e) =>
                              updateDay(d.day, {
                                ranges: d.ranges.map((x, j) =>
                                  j === i ? { ...x, start: e.target.value } : x,
                                ),
                              })
                            }
                            style={{ border: 0, background: 'transparent', font: 'inherit', color: 'inherit', width: 68 }}
                          />
                          –
                          <input
                            type="time"
                            value={r.end}
                            onChange={(e) =>
                              updateDay(d.day, {
                                ranges: d.ranges.map((x, j) =>
                                  j === i ? { ...x, end: e.target.value } : x,
                                ),
                              })
                            }
                            style={{ border: 0, background: 'transparent', font: 'inherit', color: 'inherit', width: 68 }}
                          />
                          <button
                            type="button"
                            className={s.chipRemove}
                            title="Quitar franja"
                            onClick={() =>
                              updateDay(d.day, { ranges: d.ranges.filter((_, j) => j !== i) })
                            }
                          >
                            <XSmall />
                          </button>
                        </span>
                      ))}
                      <button
                        type="button"
                        className={s.btnAddSm}
                        onClick={() =>
                          updateDay(d.day, {
                            ranges: [
                              ...d.ranges,
                              d.ranges.length ? { start: '19:00', end: '20:00' } : { start: '10:00', end: '12:00' },
                            ],
                          })
                        }
                      >
                        + Franja
                      </button>
                    </>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: '#67797c' }}>Sin clases</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem' }}>
          <button
            type="button"
            className={s.btnPrimary}
            onClick={saveAvailability}
            disabled={saveSettings.isPending}
          >
            Guardar disponibilidad
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

const XSmall: React.FC = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default Agenda;
