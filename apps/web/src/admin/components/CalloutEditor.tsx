import React from 'react';
import type { Callout } from '@eyb/shared';
import { StringList } from './fields';
import s from '../styles/admin.module.scss';

export const CALLOUT_LABELS: Record<Callout['type'], string> = {
  formula: 'Fórmula',
  countryNote: 'Nota de país (UK/US)',
  nerdyMode: 'Modo nerd',
  watchOut: 'Cuidado (error común)',
  keyQuestion: 'Preguntas clave',
  quickMap: 'Mapa rápido (columnas)',
};

export function makeCallout(type: Callout['type']): Callout {
  switch (type) {
    case 'formula':
      return { type, title: '', formula: '', examples: [] };
    case 'countryNote':
      return { type, topic: '', british: '', american: '', note: '' };
    case 'nerdyMode':
      return { type, term: '', definition: '', example: '' };
    case 'watchOut':
      return { type, wrong: '', correct: '', explanation: '' };
    case 'keyQuestion':
      return { type, questions: [{ question: '', answer: '' }] };
    case 'quickMap':
      return { type, columns: [{ header: '', items: [''] }] };
  }
}

interface Props {
  value: Callout;
  onChange: (c: Callout) => void;
  onRemove: () => void;
}

const CalloutEditor: React.FC<Props> = ({ value, onChange, onRemove }) => {
  const patch = (partial: Partial<Callout>) => onChange({ ...value, ...partial } as Callout);

  return (
    <div className={s.callout}>
      <div className={s.calloutHead}>
        <select
          value={value.type}
          onChange={(e) => onChange(makeCallout(e.target.value as Callout['type']))}
        >
          {(Object.keys(CALLOUT_LABELS) as Callout['type'][]).map((t) => (
            <option key={t} value={t}>{CALLOUT_LABELS[t]}</option>
          ))}
        </select>
        <button type="button" className={s.btnRemove} onClick={onRemove}>Quitar callout</button>
      </div>

      {value.type === 'formula' && (
        <>
          <Text label="Título" value={value.title} onChange={(v) => patch({ title: v })} />
          <Text label="Fórmula" value={value.formula} onChange={(v) => patch({ formula: v })} />
          <StringList label="Ejemplos" items={value.examples ?? []}
            onChange={(examples) => patch({ examples })} />
        </>
      )}

      {value.type === 'countryNote' && (
        <>
          <Text label="Tema" value={value.topic} onChange={(v) => patch({ topic: v })} />
          <Text label="Británico" value={value.british} onChange={(v) => patch({ british: v })} />
          <Text label="Americano" value={value.american} onChange={(v) => patch({ american: v })} />
          <Text label="Nota (opcional)" value={value.note ?? ''} onChange={(v) => patch({ note: v })} />
        </>
      )}

      {value.type === 'nerdyMode' && (
        <>
          <Text label="Término" value={value.term} onChange={(v) => patch({ term: v })} />
          <Text label="Definición" value={value.definition} onChange={(v) => patch({ definition: v })} textarea />
          <Text label="Ejemplo (opcional)" value={value.example ?? ''} onChange={(v) => patch({ example: v })} />
        </>
      )}

      {value.type === 'watchOut' && (
        <>
          <Text label="Incorrecto" value={value.wrong} onChange={(v) => patch({ wrong: v })} />
          <Text label="Correcto" value={value.correct} onChange={(v) => patch({ correct: v })} />
          <Text label="Explicación" value={value.explanation} onChange={(v) => patch({ explanation: v })} textarea />
        </>
      )}

      {value.type === 'keyQuestion' && (
        <div className={s.nested}>
          <span className={s.legendSm}>Preguntas y respuestas</span>
          {value.questions.map((q, i) => (
            <div key={i} className={s.qaRow}>
              <input placeholder="Pregunta" value={q.question}
                onChange={(e) => patch({
                  questions: value.questions.map((x, j) => j === i ? { ...x, question: e.target.value } : x),
                })} />
              <input placeholder="Respuesta" value={q.answer}
                onChange={(e) => patch({
                  questions: value.questions.map((x, j) => j === i ? { ...x, answer: e.target.value } : x),
                })} />
              <button type="button" className={s.btnRemove}
                onClick={() => patch({ questions: value.questions.filter((_, j) => j !== i) })}>×</button>
            </div>
          ))}
          <button type="button" className={s.btnAddSm}
            onClick={() => patch({ questions: [...value.questions, { question: '', answer: '' }] })}>
            + Pregunta
          </button>
        </div>
      )}

      {value.type === 'quickMap' && (
        <div className={s.nested}>
          <span className={s.legendSm}>Columnas</span>
          {value.columns.map((col, i) => (
            <div key={i} className={s.mapCol}>
              <div className={s.qaRow}>
                <input placeholder="Encabezado" value={col.header}
                  onChange={(e) => patch({
                    columns: value.columns.map((x, j) => j === i ? { ...x, header: e.target.value } : x),
                  })} />
                <button type="button" className={s.btnRemove}
                  onClick={() => patch({ columns: value.columns.filter((_, j) => j !== i) })}>Quitar columna</button>
              </div>
              <StringList label="Ítems" items={col.items}
                onChange={(items) => patch({
                  columns: value.columns.map((x, j) => j === i ? { ...x, items } : x),
                })} />
            </div>
          ))}
          <button type="button" className={s.btnAddSm}
            onClick={() => patch({ columns: [...value.columns, { header: '', items: [''] }] })}>
            + Columna
          </button>
        </div>
      )}
    </div>
  );
};

// Small labeled input/textarea used across callout types.
const Text: React.FC<{
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean;
}> = ({ label, value, onChange, textarea }) => (
  <label className={s.field}>
    <span>{label}</span>
    {textarea
      ? <textarea rows={2} value={value} onChange={(e) => onChange(e.target.value)} />
      : <input value={value} onChange={(e) => onChange(e.target.value)} />}
  </label>
);

export default CalloutEditor;
