import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, Plus } from 'lucide-react';
import type { CEFRLevel } from '@eyb/shared';
import { api, ApiError } from '../lib/client';
import { initials } from '../lib/text';
import { formatDay } from '../lib/dates';
import s from '../styles/admin.module.scss';

const LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

const emptyDraft = { name: '', username: '', level: 'B1' as CEFRLevel, password: '' };

const StudentsList: React.FC = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState(emptyDraft);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const { data: students, isLoading } = useQuery({
    queryKey: ['admin', 'students'],
    queryFn: api.listStudents,
  });

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const create = useMutation({
    mutationFn: () =>
      api.createStudent({
        name: draft.name.trim(),
        username: draft.username.trim().toLowerCase(),
        level: draft.level,
        password: draft.password.trim() || 'buddy1234',
      }),
    onSuccess: () => {
      setError(null);
      setModalOpen(false);
      setDraft(emptyDraft);
      notify('Estudiante creado. Comparte su usuario y contraseña temporal.');
      void qc.invalidateQueries({ queryKey: ['admin', 'students'] });
    },
    onError: (err) => setError(err instanceof ApiError ? err.message : String(err)),
  });

  const submit = () => {
    if (!draft.name.trim() || !draft.username.trim()) {
      setError('Completa al menos el nombre y el usuario.');
      return;
    }
    create.mutate();
  };

  if (isLoading) return <div className={s.center}>Cargando estudiantes…</div>;

  return (
    <div className={s.page}>
      <header className={s.pageHead}>
        <div>
          <h1>Estudiantes</h1>
          <p className={s.pageSub}>
            Gestiona el acceso, las clases y el progreso que ve cada estudiante en su portal.
          </p>
        </div>
        <button
          type="button"
          className={s.btnPrimary}
          onClick={() => {
            setError(null);
            setDraft(emptyDraft);
            setModalOpen(true);
          }}
        >
          <Plus size={15} /> Nuevo estudiante
        </button>
      </header>

      <div className={s.tableCard}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Nivel</th>
              <th>Racha</th>
              <th>Clases</th>
              <th>Última clase</th>
              <th>Chat</th>
              <th aria-label="Acciones" />
            </tr>
          </thead>
          <tbody>
            {students?.map((st) => (
              <tr key={st.id}>
                <td>
                  <div className={s.cellMain}>
                    <span className={s.avatarSm}>{initials(st.name)}</span>
                    <div className={s.cellTitle}>
                      <strong>{st.name}</strong>
                      <small className={s.code}>{st.username}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`${s.badge} ${s.badgePrimary}`}>{st.level}</span>
                </td>
                <td>{st.streakWeeks} sem</td>
                <td>{st.classesCount}</td>
                <td>{st.lastClassDate ? formatDay(st.lastClassDate) : '—'}</td>
                <td>
                  {st.unread > 0 ? (
                    <span className={s.badgeOn}>{st.unread} sin leer</span>
                  ) : (
                    <small className={s.cellSub}>—</small>
                  )}
                </td>
                <td className={s.rowActions}>
                  <button
                    type="button"
                    className={s.btnSoft}
                    onClick={() => navigate(`/students/${st.id}`)}
                  >
                    Ver ficha
                  </button>
                </td>
              </tr>
            ))}
            {students?.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <p className={s.cellSub} style={{ padding: '0.5rem 0' }}>
                    Todavía no hay estudiantes. Crea el primero con “Nuevo estudiante”.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {error && !modalOpen && <p className={s.error}>{error}</p>}

      {modalOpen && (
        <div
          className={s.modalBackdrop}
          onClick={() => setModalOpen(false)}
          role="presentation"
        >
          <div
            className={s.modalCard}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Nuevo estudiante"
          >
            <h2>Nuevo estudiante</h2>
            <p className={s.modalSub}>
              Crea su acceso al portal. Podrás registrar su primera clase después.
            </p>
            <label className={s.field}>
              <span>Nombre completo</span>
              <input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                placeholder="ej: Camila Rojas"
                autoFocus
              />
            </label>
            <div className={s.grid2}>
              <label className={s.field}>
                <span>Usuario</span>
                <input
                  className={s.code}
                  value={draft.username}
                  onChange={(e) => setDraft({ ...draft, username: e.target.value })}
                  placeholder="camila.rojas"
                />
              </label>
              <label className={s.field}>
                <span>Nivel</span>
                <select
                  value={draft.level}
                  onChange={(e) => setDraft({ ...draft, level: e.target.value as CEFRLevel })}
                >
                  {LEVELS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className={s.field}>
              <span>Contraseña temporal</span>
              <input
                className={s.code}
                value={draft.password}
                onChange={(e) => setDraft({ ...draft, password: e.target.value })}
                placeholder="El estudiante la cambia al entrar"
              />
            </label>
            {error && <p className={s.error}>{error}</p>}
            <div className={s.modalActions}>
              <button type="button" className={s.btnGhost} onClick={() => setModalOpen(false)}>
                Cancelar
              </button>
              <button
                type="button"
                className={s.btnPrimary}
                onClick={submit}
                disabled={create.isPending}
              >
                {create.isPending ? 'Creando…' : 'Crear estudiante'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={s.toast} role="status">
          <Check size={15} /> {toast}
        </div>
      )}
    </div>
  );
};

export default StudentsList;
