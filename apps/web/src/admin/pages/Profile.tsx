import React, { useEffect, useRef, useState } from 'react';
import { Check, ImagePlus, Loader2, Save, Trash2 } from 'lucide-react';
import { api, ApiError } from '../lib/client';
import { useAuth } from '../lib/auth';
import { formatRelative } from '../lib/dates';
import Avatar from '../components/Avatar';
import s from '../styles/admin.module.scss';

/** Own account: display name + profile picture. Email is managed in Usuarios. */
const Profile: React.FC = () => {
  const { user, refresh } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name ?? '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Sync the draft when the profile arrives after a hard reload.
  useEffect(() => {
    setName(user?.name ?? '');
    setAvatarUrl(user?.avatarUrl ?? '');
  }, [user?.name, user?.avatarUrl]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  if (!user) return null;

  const dirty =
    name.trim() !== (user.name ?? '').trim() || avatarUrl !== (user.avatarUrl ?? '');

  const pickFile = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const { url } = await api.uploadImage(file);
      setAvatarUrl(url);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo subir la imagen.');
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    setError(null);
    setSaving(true);
    try {
      await api.updateProfile({ name: name.trim(), avatarUrl });
      await refresh();
      setToast('Perfil actualizado');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo guardar el perfil.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`${s.page} ${s.pageNarrow}`}>
      <header className={s.pageHead}>
        <div>
          <h1>Mi cuenta</h1>
          <p className={s.pageSub}>
            {user.lastLoginAt
              ? `Tu último acceso fue ${formatRelative(user.lastLoginAt)}.`
              : 'Este es tu primer acceso al panel.'}
          </p>
        </div>
      </header>

      <section className={s.groupCard}>
        <header className={s.groupHead}>
          <h2>Foto de perfil</h2>
          <p>Se muestra en la barra superior, en Usuarios y en tu actividad.</p>
        </header>

        <div className={s.profileAvatarRow}>
          <Avatar email={user.email} name={name} avatarUrl={avatarUrl || null} size="lg" />
          <div className={s.profileAvatarActions}>
            <button
              type="button"
              className={s.btnSoft}
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? <Loader2 size={15} className={s.spin} /> : <ImagePlus size={15} />}
              {uploading ? 'Subiendo…' : 'Cambiar foto'}
            </button>
            {avatarUrl && (
              <button
                type="button"
                className={s.btnGhost}
                onClick={() => setAvatarUrl('')}
                disabled={uploading}
              >
                <Trash2 size={14} /> Quitar foto
              </button>
            )}
            <em className={s.fieldHelp}>JPG, PNG o WebP · máx. 5 MB</em>
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void pickFile(file);
            e.target.value = '';
          }}
        />
      </section>

      <section className={s.groupCard}>
        <header className={s.groupHead}>
          <h2>Datos personales</h2>
        </header>

        <label className={s.field}>
          <span>Nombre</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            maxLength={80}
          />
        </label>
        <label className={s.field}>
          <span>Email</span>
          <input value={user.email} disabled />
          <em className={s.fieldHelp}>
            El email de acceso se gestiona desde Administración → Usuarios.
          </em>
        </label>

        {error && <p className={s.error}>{error}</p>}

        <div className={s.formActions}>
          <button
            type="button"
            className={s.btnPrimary}
            onClick={() => void save()}
            disabled={!dirty || saving || uploading}
          >
            <Save size={15} /> {saving ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>
      </section>

      {toast && (
        <div className={s.toast} role="status">
          <Check size={15} /> {toast}
        </div>
      )}
    </div>
  );
};

export default Profile;
