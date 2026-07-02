import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, MailPlus, PencilLine, Send, Trash2, X } from 'lucide-react';
import type { AdminUserDto } from '@eyb/shared';
import { api, ApiError } from '../lib/client';
import { useAuth } from '../lib/auth';
import { formatRelative } from '../lib/dates';
import Avatar from '../components/Avatar';
import s from '../styles/admin.module.scss';

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}

interface EditDraft {
  id: string;
  name: string;
  email: string;
}

const Users: React.FC = () => {
  const qc = useQueryClient();
  const { user: me, refresh } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [draft, setDraft] = useState<EditDraft | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: api.listUsers,
  });

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };
  const onError = (err: unknown) =>
    setError(err instanceof ApiError ? err.message : String(err));
  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin', 'users'] });

  const invite = useMutation({
    mutationFn: (input: { email: string; name?: string }) =>
      api.inviteUser(input.email, input.name),
    onSuccess: (created) => {
      setEmail('');
      setName('');
      setError(null);
      notify(`Invitación enviada a ${created.email}`);
      void invalidate();
    },
    onError,
  });
  const update = useMutation({
    mutationFn: (d: EditDraft) =>
      api.updateUser(d.id, { name: d.name, email: d.email }),
    onSuccess: async (_res, d) => {
      setError(null);
      setDraft(null);
      notify('Datos actualizados');
      await invalidate();
      if (me?.id === d.id) await refresh(); // own name/email → refresh chrome
    },
    onError,
  });
  const resend = useMutation({
    mutationFn: (id: string) => api.resendInvite(id),
    onSuccess: () => {
      setError(null);
      notify('Invitación reenviada');
      void invalidate();
    },
    onError,
  });
  const del = useMutation({
    mutationFn: (id: string) => api.deleteUser(id),
    onSuccess: () => {
      setError(null);
      void invalidate();
    },
    onError,
  });

  if (isLoading) return <div className={s.center}>Cargando usuarios…</div>;

  const statusCell = (u: AdminUserDto) => {
    if (u.invitePending) {
      return (
        <>
          <span className={u.inviteExpired ? s.badgeWarn : s.badgeOff}>
            {u.inviteExpired ? 'Invitación caducada' : 'Invitación pendiente'}
          </span>
          {u.inviteSentAt && (
            <small className={s.cellSub}>enviada {formatRelative(u.inviteSentAt)}</small>
          )}
        </>
      );
    }
    return (
      <>
        <span className={s.badgeOn}>Activo</span>
        <small className={s.cellSub}>
          {u.lastLoginAt
            ? `último acceso ${formatRelative(u.lastLoginAt)}`
            : 'sin accesos todavía'}
        </small>
      </>
    );
  };

  return (
    <div className={s.page}>
      <header className={s.pageHead}>
        <div>
          <h1>Usuarios administradores</h1>
          <p className={s.pageSub}>
            Invita por email: cada persona recibe un enlace para crear su contraseña.
          </p>
        </div>
      </header>

      <div className={s.tableCard}>
        <form
          className={s.tableTools}
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) {
              invite.mutate({ email: email.trim(), name: name.trim() || undefined });
            }
          }}
        >
          <div className={s.filterRow}>
            <div className={s.searchBox}>
              <MailPlus size={15} aria-hidden="true" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@ejemplo.com"
                aria-label="Email del nuevo administrador"
                required
              />
            </div>
            <input
              className={s.filterSelect}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre (opcional)"
              aria-label="Nombre del nuevo administrador"
              maxLength={80}
            />
          </div>
          <button type="submit" className={s.btnPrimary} disabled={invite.isPending}>
            <Send size={15} /> {invite.isPending ? 'Enviando…' : 'Enviar invitación'}
          </button>
        </form>

        <table className={s.table}>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Estado</th>
              <th>Creado</th>
              <th aria-label="Acciones" />
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => {
              const isEditing = draft?.id === u.id;
              return (
                <tr key={u.id}>
                  <td>
                    {isEditing ? (
                      <div className={s.editStack}>
                        <input
                          value={draft.name}
                          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                          placeholder="Nombre"
                          maxLength={80}
                          aria-label="Nombre"
                        />
                        <input
                          type="email"
                          value={draft.email}
                          onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                          placeholder="email@ejemplo.com"
                          aria-label="Email"
                          required
                        />
                      </div>
                    ) : (
                      <div className={s.cellMain}>
                        <Avatar email={u.email} name={u.name} avatarUrl={u.avatarUrl} />
                        <div className={s.cellTitle}>
                          <strong>
                            {u.name || u.email}
                            {me?.id === u.id && (
                              <span className={`${s.badge} ${s.badgePrimary} ${s.badgeInline}`}>Tú</span>
                            )}
                          </strong>
                          <small>{u.name ? u.email : u.role.toLowerCase()}</small>
                        </div>
                      </div>
                    )}
                  </td>
                  <td>{statusCell(u)}</td>
                  <td>{formatDate(u.createdAt)}</td>
                  <td className={s.rowActions}>
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          className={`${s.btnIcon} ${s.tip}`}
                          data-tip="Guardar cambios"
                          aria-label="Guardar cambios"
                          onClick={() => update.mutate(draft)}
                          disabled={update.isPending || !draft.email.trim()}
                        >
                          <Check size={16} />
                        </button>
                        <button
                          type="button"
                          className={`${s.btnIcon} ${s.tip}`}
                          data-tip="Cancelar"
                          aria-label="Cancelar edición"
                          onClick={() => setDraft(null)}
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className={`${s.btnIcon} ${s.tip}`}
                          data-tip="Editar datos"
                          aria-label={`Editar ${u.email}`}
                          onClick={() =>
                            setDraft({ id: u.id, name: u.name ?? '', email: u.email })
                          }
                        >
                          <PencilLine size={16} />
                        </button>
                        {u.invitePending && (
                          <button
                            type="button"
                            className={`${s.btnIcon} ${s.tip}`}
                            data-tip="Reenviar invitación"
                            aria-label={`Reenviar invitación a ${u.email}`}
                            onClick={() => resend.mutate(u.id)}
                            disabled={resend.isPending}
                          >
                            <Send size={16} />
                          </button>
                        )}
                        {me?.id !== u.id && (
                          <button
                            type="button"
                            className={`${s.btnIcon} ${s.btnIconDanger} ${s.tip}`}
                            data-tip="Eliminar usuario"
                            aria-label={`Eliminar ${u.email}`}
                            onClick={() => {
                              if (confirm(`¿Eliminar la cuenta de ${u.email}?`)) del.mutate(u.id);
                            }}
                            disabled={del.isPending}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {error && <p className={s.error}>{error}</p>}
      {toast && (
        <div className={s.toast} role="status">
          <Check size={15} /> {toast}
        </div>
      )}
    </div>
  );
};

export default Users;
