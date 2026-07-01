import React from 'react';
import s from '../styles/admin.module.scss';

/** Editable list of strings with add / remove controls. */
export const StringList: React.FC<{
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  textarea?: boolean;
  addLabel?: string;
}> = ({ label, items, onChange, placeholder, textarea, addLabel = '+ Añadir' }) => {
  const setAt = (i: number, v: string) => onChange(items.map((x, j) => (j === i ? v : x)));
  const removeAt = (i: number) => onChange(items.filter((_, j) => j !== i));
  return (
    <div className={s.listField}>
      <span className={s.legendSm}>{label}</span>
      {items.map((v, i) => (
        <div key={i} className={s.listRow}>
          {textarea ? (
            <textarea rows={2} value={v} placeholder={placeholder}
              onChange={(e) => setAt(i, e.target.value)} />
          ) : (
            <input value={v} placeholder={placeholder} onChange={(e) => setAt(i, e.target.value)} />
          )}
          <button type="button" className={s.btnRemove} onClick={() => removeAt(i)}
            aria-label="Quitar">×</button>
        </div>
      ))}
      <button type="button" className={s.btnAddSm} onClick={() => onChange([...items, ''])}>
        {addLabel}
      </button>
    </div>
  );
};
