import React, { useState } from 'react';
import { ChevronDown, ChevronUp, GripHorizontal, Plus, Trash2 } from 'lucide-react';
import type { FieldSpec } from '../pageSchemas';
import { emptyItem, getAt, setAt } from '../lib/paths';
import { StringList } from './fields';
import ImageField from './ImageField';
import s from '../styles/admin.module.scss';

/**
 * Generic renderer for the page-content schemas: walks FieldSpec[] against a
 * JSON document and edits it immutably via dot paths. Repeaters render as
 * collapsible cards with add / move / remove controls and recurse for nested
 * structures (e.g. team member → highlights).
 */
interface ContentFieldsProps {
  fields: FieldSpec[];
  value: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
}

const ContentFields: React.FC<ContentFieldsProps> = ({ fields, value, onChange }) => (
  <>
    {fields.map((field) => (
      <FieldControl
        key={field.path}
        spec={field}
        value={getAt(value, field.path)}
        onChange={(v) => onChange(setAt(value, field.path, v))}
      />
    ))}
  </>
);

// ─── Single field ────────────────────────────────────────────────────────────

const FieldControl: React.FC<{
  spec: FieldSpec;
  value: unknown;
  onChange: (v: unknown) => void;
}> = ({ spec, value, onChange }) => {
  switch (spec.kind) {
    case 'image':
      return (
        <ImageField
          label={spec.label}
          value={typeof value === 'string' ? value : ''}
          onChange={(v) => onChange(v)}
          help={spec.help}
        />
      );
    case 'text':
      return (
        <label className={s.field}>
          <span>{spec.label}</span>
          <input
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onChange(e.target.value)}
          />
          {spec.help && <em className={s.fieldHelp}>{spec.help}</em>}
        </label>
      );
    case 'textarea':
      return (
        <label className={s.field}>
          <span>{spec.label}</span>
          <textarea
            rows={spec.rows ?? 3}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onChange(e.target.value)}
          />
          {spec.help && <em className={s.fieldHelp}>{spec.help}</em>}
        </label>
      );
    case 'toggle':
      return (
        <label className={s.checkbox}>
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span>{spec.label}</span>
        </label>
      );
    case 'stringList':
      return (
        <StringList
          label={spec.label}
          items={Array.isArray(value) ? (value as string[]) : []}
          textarea={spec.textarea}
          onChange={(items) => onChange(items)}
        />
      );
    case 'repeater':
      return <Repeater spec={spec} value={value} onChange={onChange} />;
  }
};

// ─── Repeater (list of objects) ──────────────────────────────────────────────

const Repeater: React.FC<{
  spec: Extract<FieldSpec, { kind: 'repeater' }>;
  value: unknown;
  onChange: (v: unknown) => void;
}> = ({ spec, value, onChange }) => {
  const items = Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
  // Collapse all items by default — most edits touch one item at a time.
  const [open, setOpen] = useState<Record<number, boolean>>({});

  const update = (next: Record<string, unknown>[]) => onChange(next);
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [it] = next.splice(from, 1);
    next.splice(to, 0, it);
    // Keep the moved card open so it can be tracked visually.
    setOpen((o) => ({ ...o, [from]: o[to] ?? false, [to]: o[from] ?? true }));
    update(next);
  };

  return (
    <div className={s.repeater}>
      <div className={s.repeaterHead}>
        <span className={s.legendSm}>{spec.label}</span>
        {spec.help && <em className={s.fieldHelp}>{spec.help}</em>}
      </div>

      {items.map((item, i) => {
        const title =
          (spec.titleField && typeof item[spec.titleField] === 'string' && (item[spec.titleField] as string)) ||
          `${spec.itemLabel} ${i + 1}`;
        const isOpen = open[i] ?? false;
        return (
          <div key={i} className={s.repeaterItem}>
            <div className={s.repeaterItemHead}>
              <button
                type="button"
                className={`${s.repeaterToggle} ${s.tip} ${s.tipEnd}`}
                data-tip={isOpen ? 'Ocultar campos' : 'Editar campos'}
                onClick={() => setOpen((o) => ({ ...o, [i]: !isOpen }))}
                aria-expanded={isOpen}
              >
                <GripHorizontal size={14} className={s.repeaterGrip} />
                <span className={s.repeaterTitle}>{title}</span>
                {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
              <div className={s.repeaterActions}>
                <button type="button" className={`${s.btnIcon} ${s.tip}`}
                  data-tip="Mover arriba" aria-label={`Mover "${title}" arriba`}
                  onClick={() => move(i, i - 1)} disabled={i === 0}>
                  <ChevronUp size={15} />
                </button>
                <button type="button" className={`${s.btnIcon} ${s.tip}`}
                  data-tip="Mover abajo" aria-label={`Mover "${title}" abajo`}
                  onClick={() => move(i, i + 1)} disabled={i === items.length - 1}>
                  <ChevronDown size={15} />
                </button>
                <button
                  type="button"
                  className={`${s.btnIcon} ${s.btnIconDanger} ${s.tip}`}
                  data-tip="Eliminar"
                  aria-label={`Eliminar "${title}"`}
                  onClick={() => {
                    if (confirm(`¿Eliminar "${title}"?`)) update(items.filter((_, j) => j !== i));
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {isOpen && (
              <div className={s.repeaterItemBody}>
                <ContentFields
                  fields={spec.fields}
                  value={item}
                  onChange={(next) => update(items.map((x, j) => (j === i ? next : x)))}
                />
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        className={s.btnAddSm}
        onClick={() => {
          update([...items, emptyItem(spec.fields)]);
          setOpen((o) => ({ ...o, [items.length]: true }));
        }}
      >
        <Plus size={14} /> Añadir {spec.itemLabel}
      </button>
    </div>
  );
};

export default ContentFields;
