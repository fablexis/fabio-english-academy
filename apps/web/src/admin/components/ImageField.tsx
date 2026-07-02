import React, { useRef, useState } from 'react';
import { ImagePlus, Loader2, RefreshCw } from 'lucide-react';
import { api, ApiError } from '../lib/client';
import s from '../styles/admin.module.scss';

/**
 * Image control for the editors: live preview of the current image, click or
 * drag & drop to upload a replacement (POST /admin/uploads → absolute URL),
 * plus a manual path input for existing /img and /blog-images assets.
 */
interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  help?: string;
}

const ImageField: React.FC<ImageFieldProps> = ({ label, value, onChange, help }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setError(null);
    setBusy(true);
    try {
      const { url } = await api.uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo subir la imagen.');
    } finally {
      setBusy(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (busy) return;
    const file = e.dataTransfer.files?.[0];
    if (file) void upload(file);
  };

  const openPicker = () => {
    if (!busy) inputRef.current?.click();
  };

  // '' and folder stubs like '/blog-images/' render the empty dropzone.
  const trimmed = value.trim();
  const showPreview =
    trimmed.length > 1 &&
    !trimmed.endsWith('/') &&
    (trimmed.startsWith('/') || trimmed.startsWith('http'));

  return (
    <div className={s.field}>
      <span>{label}</span>

      <div
        className={`${s.dropzone} ${dragging ? s.dropzoneActive : ''}`}
        role="button"
        tabIndex={0}
        aria-busy={busy}
        aria-label={`${label}: subir imagen`}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPicker();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        {showPreview ? (
          <>
            <img src={value} alt="" className={s.dropzoneThumb} loading="lazy" />
            <div className={s.dropzoneInfo}>
              <strong>{busy ? 'Subiendo…' : 'Imagen actual'}</strong>
              <small>{value}</small>
              <span className={s.btnSoft}>
                {busy ? <Loader2 size={14} className={s.spin} /> : <RefreshCw size={14} />}
                {busy ? 'Subiendo…' : 'Reemplazar imagen'}
              </span>
            </div>
          </>
        ) : (
          <div className={s.dropzoneEmpty}>
            {busy ? <Loader2 size={26} className={s.spin} /> : <ImagePlus size={26} />}
            <strong>
              {busy ? 'Subiendo…' : 'Arrastra una imagen aquí o haz clic para subirla'}
            </strong>
            <small>JPG, PNG, WebP, GIF o AVIF · máx. 5 MB</small>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
          e.target.value = ''; // allow re-selecting the same file
        }}
      />

      <input
        className={s.pathInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/img/… · /blog-images/… · https://…"
        aria-label={`${label}: ruta o URL`}
        spellCheck={false}
      />

      {error && <p className={s.error}>{error}</p>}
      {help && <em className={s.fieldHelp}>{help}</em>}
    </div>
  );
};

export default ImageField;
