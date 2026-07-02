import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Check,
  ChevronLeft,
  CircleCheckBig,
  Flame,
  Lock,
  MessageCircle,
  PencilLine,
  Plus,
  Sparkles,
} from 'lucide-react';
import { api, ApiError } from '../lib/client';
import { initials, firstName } from '../lib/text';
import { formatDay } from '../lib/dates';
import s from '../styles/admin.module.scss';

const StudentDetail: React.FC = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [toast, setToast] = useState<string | null>(null);

  const { data: student, isLoading } = useQuery({
    queryKey: ['admin', 'student', id],
    queryFn: () => api.getStudent(id),
  });

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3600);
  };

  // Toast handed over by the class editor after "Guardar y publicar".
  useEffect(() => {
    const passed = (location.state as { toast?: string } | null)?.toast;
    if (passed) {
      notify(passed);
      navigate(location.pathname, { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = useMutation({
    mutationFn: () => api.resetStudentPassword(id),
    onSuccess: (res) =>
      notify(
        `Nueva contraseña de ${firstName(student?.name ?? '')}: ${res.password} — compártela con el estudiante.`,
      ),
    onError: (err) => notify(err instanceof ApiError ? err.message : String(err)),
  });

  if (isLoading || !student) return <div className={s.center}>Cargando ficha…</div>;

  return (
    <div className={s.page}>
      <Link to="/students" className={s.backLink}>
        <ChevronLeft size={14} /> Todos los estudiantes
      </Link>

      <div className={s.editorHead}>
        <div className={s.editorHeadLeft} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className={s.avatarLg}>{initials(student.name)}</span>
          <div>
            <h1>
              {student.name}
              <span className={`${s.badge} ${s.badgePrimary}`}>Nivel {student.level}</span>
            </h1>
            <p className={s.code} style={{ marginTop: '0.25rem', color: '#67797c' }}>
              {student.username}
            </p>
          </div>
        </div>
        <div className={s.editorHeadActions}>
          <button
            type="button"
            className={s.btnSoft}
            onClick={() => navigate(`/conversations?student=${id}`)}
          >
            <MessageCircle size={15} /> Ver conversación
          </button>
          <button
            type="button"
            className={s.btnPrimary}
            onClick={() => navigate(`/students/${id}/classes/new`)}
          >
            <Plus size={15} /> Registrar clase
          </button>
        </div>
      </div>

      <div className={s.statCards}>
        <div className={s.statCard}>
          <span className={`${s.statCardIcon} ${s.tintLime}`}>
            <Flame size={19} />
          </span>
          <div>
            <strong>{student.streakWeeks} semanas</strong>
            <small>racha actual</small>
          </div>
        </div>
        <div className={s.statCard}>
          <span className={`${s.statCardIcon} ${s.tintPrimary}`}>
            <CircleCheckBig size={19} />
          </span>
          <div>
            <strong>{student.classesCount}</strong>
            <small>clases completadas</small>
          </div>
        </div>
        <div className={s.statCard}>
          <span className={`${s.statCardIcon} ${s.tintPrimary}`}>
            <Sparkles size={19} />
          </span>
          <div>
            <strong>{student.topicsCount}</strong>
            <small>temas cubiertos</small>
          </div>
        </div>
        <div className={s.statCard}>
          <div className={s.statCardCol}>
            <small style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#67797c', fontWeight: 600 }}>
              <Lock size={14} /> Acceso al portal
            </small>
            <button
              type="button"
              className={s.btnSoft}
              onClick={() => reset.mutate()}
              disabled={reset.isPending}
            >
              Restablecer contraseña
            </button>
          </div>
        </div>
      </div>

      <div className={s.tableCard}>
        <div style={{ padding: '1rem 1.25rem' }}>
          <h2 style={{ fontSize: '1.05rem', color: '#35494c', fontWeight: 700, margin: 0 }}>
            Clases registradas
          </h2>
          <p className={s.pageSub}>
            Cada clase aparece en el portal del estudiante con sus notas y material.
          </p>
        </div>
        <table className={s.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Título</th>
              <th>Temas</th>
              <th>Material</th>
              <th aria-label="Acciones" />
            </tr>
          </thead>
          <tbody>
            {student.classes.map((cl) => {
              const shown = cl.topics.slice(0, 2);
              const extra = cl.topics.length - shown.length;
              return (
                <tr key={cl.id}>
                  <td style={{ fontWeight: 700, color: '#185c60' }}>
                    {String(cl.num).padStart(2, '0')}
                  </td>
                  <td>{formatDay(cl.date)}</td>
                  <td>
                    <strong style={{ color: '#35494c', fontWeight: 600 }}>{cl.title}</strong>
                  </td>
                  <td>
                    <span className={s.chipEditor}>
                      {shown.map((t) => (
                        <span key={t} className={s.chip} style={{ paddingRight: '0.6rem' }}>
                          {t}
                        </span>
                      ))}
                      {extra > 0 && (
                        <span className={s.chip} style={{ paddingRight: '0.6rem' }}>
                          +{extra}
                        </span>
                      )}
                    </span>
                  </td>
                  <td>
                    {cl.materials.length} {cl.materials.length === 1 ? 'recurso' : 'recursos'}
                  </td>
                  <td className={s.rowActions}>
                    <button
                      type="button"
                      className={s.btnSoft}
                      onClick={() => navigate(`/students/${id}/classes/${cl.id}`)}
                    >
                      <PencilLine size={13} /> Editar
                    </button>
                  </td>
                </tr>
              );
            })}
            {student.classes.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <p className={s.cellSub} style={{ padding: '0.5rem 0' }}>
                    Aún no hay clases. Registra la primera con “Registrar clase”.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {toast && (
        <div className={s.toast} role="status">
          <Check size={15} /> {toast}
        </div>
      )}
    </div>
  );
};

export default StudentDetail;
