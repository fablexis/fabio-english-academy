import React from 'react';
import type { BlogBody, BlogSection, Callout } from '@eyb/shared';
import { StringList } from './fields';
import CalloutEditor, { makeCallout } from './CalloutEditor';
import s from '../styles/admin.module.scss';

interface Props {
  value: BlogBody;
  onChange: (body: BlogBody) => void;
}

/**
 * Structured editor for the rich BlogBody shape (hook, sections with
 * paragraphs/examples/callouts, tip, closing, common mistakes, exercise,
 * closing quote). All updates are immutable.
 */
const BodyEditor: React.FC<Props> = ({ value, onChange }) => {
  const patch = (partial: Partial<BlogBody>) => onChange({ ...value, ...partial });

  const setSection = (i: number, section: BlogSection) =>
    patch({ sections: value.sections.map((x, j) => (j === i ? section : x)) });
  const addSection = () =>
    patch({ sections: [...value.sections, { heading: '', paragraphs: [''] }] });
  const removeSection = (i: number) =>
    patch({ sections: value.sections.filter((_, j) => j !== i) });

  return (
    <div className={s.bodyEditor}>
      <label className={s.field}>
        <span>Gancho (hook)</span>
        <textarea rows={3} value={value.hook} onChange={(e) => patch({ hook: e.target.value })} />
      </label>

      {/* ── Sections ── */}
      <fieldset className={s.fieldset}>
        <legend>Secciones</legend>
        {value.sections.map((section, i) => (
          <div key={i} className={s.sectionCard}>
            <div className={s.sectionHead}>
              <strong>Sección {i + 1}</strong>
              <button type="button" className={s.btnRemove} onClick={() => removeSection(i)}>
                Quitar sección
              </button>
            </div>

            <label className={s.field}>
              <span>Encabezado</span>
              <input value={section.heading}
                onChange={(e) => setSection(i, { ...section, heading: e.target.value })} />
            </label>

            <StringList label="Párrafos" items={section.paragraphs} textarea
              addLabel="+ Párrafo"
              onChange={(paragraphs) => setSection(i, { ...section, paragraphs })} />

            <StringList label="Ejemplos (opcional)" items={section.examples ?? []}
              addLabel="+ Ejemplo"
              onChange={(examples) => setSection(i, { ...section, examples })} />

            {/* Callouts within the section */}
            <div className={s.nested}>
              <span className={s.legendSm}>Callouts (opcional)</span>
              {(section.callouts ?? []).map((c, ci) => (
                <CalloutEditor key={ci} value={c}
                  onChange={(callout: Callout) => setSection(i, {
                    ...section,
                    callouts: (section.callouts ?? []).map((x, j) => (j === ci ? callout : x)),
                  })}
                  onRemove={() => setSection(i, {
                    ...section,
                    callouts: (section.callouts ?? []).filter((_, j) => j !== ci),
                  })} />
              ))}
              <button type="button" className={s.btnAddSm}
                onClick={() => setSection(i, {
                  ...section,
                  callouts: [...(section.callouts ?? []), makeCallout('formula')],
                })}>
                + Callout
              </button>
            </div>
          </div>
        ))}
        <button type="button" className={s.btnAddSm} onClick={addSection}>+ Sección</button>
      </fieldset>

      <label className={s.field}>
        <span>Tip</span>
        <textarea rows={2} value={value.tip} onChange={(e) => patch({ tip: e.target.value })} />
      </label>

      <label className={s.field}>
        <span>Cierre</span>
        <textarea rows={2} value={value.closing} onChange={(e) => patch({ closing: e.target.value })} />
      </label>

      {/* ── Common mistakes ── */}
      <fieldset className={s.fieldset}>
        <legend>Errores comunes</legend>
        {value.commonMistakes.map((m, i) => (
          <div key={i} className={s.sectionCard}>
            <div className={s.sectionHead}>
              <strong>Error {i + 1}</strong>
              <button type="button" className={s.btnRemove}
                onClick={() => patch({ commonMistakes: value.commonMistakes.filter((_, j) => j !== i) })}>
                Quitar
              </button>
            </div>
            {(['wrong', 'correct', 'why'] as const).map((key) => (
              <label key={key} className={s.field}>
                <span>{key === 'wrong' ? 'Incorrecto' : key === 'correct' ? 'Correcto' : 'Por qué'}</span>
                <input value={m[key]}
                  onChange={(e) => patch({
                    commonMistakes: value.commonMistakes.map((x, j) =>
                      j === i ? { ...x, [key]: e.target.value } : x),
                  })} />
              </label>
            ))}
          </div>
        ))}
        <button type="button" className={s.btnAddSm}
          onClick={() => patch({
            commonMistakes: [...value.commonMistakes, { wrong: '', correct: '', why: '' }],
          })}>
          + Error común
        </button>
      </fieldset>

      {/* ── Exercise ── */}
      <fieldset className={s.fieldset}>
        <legend>Ejercicio</legend>
        <label className={s.field}>
          <span>Instrucciones</span>
          <textarea rows={2} value={value.exercise.instructions}
            onChange={(e) => patch({ exercise: { ...value.exercise, instructions: e.target.value } })} />
        </label>
        <StringList label="Preguntas" items={value.exercise.questions} addLabel="+ Pregunta"
          onChange={(questions) => patch({ exercise: { ...value.exercise, questions } })} />

        <div className={s.nested}>
          <span className={s.legendSm}>Respuestas</span>
          {value.exercise.answers.map((a, i) => (
            <div key={i} className={s.qaRow}>
              <input placeholder="Respuesta" value={a.answer}
                onChange={(e) => patch({
                  exercise: {
                    ...value.exercise,
                    answers: value.exercise.answers.map((x, j) => j === i ? { ...x, answer: e.target.value } : x),
                  },
                })} />
              <input placeholder="Explicación (opcional)" value={a.explanation ?? ''}
                onChange={(e) => patch({
                  exercise: {
                    ...value.exercise,
                    answers: value.exercise.answers.map((x, j) => j === i ? { ...x, explanation: e.target.value } : x),
                  },
                })} />
              <button type="button" className={s.btnRemove}
                onClick={() => patch({
                  exercise: { ...value.exercise, answers: value.exercise.answers.filter((_, j) => j !== i) },
                })}>×</button>
            </div>
          ))}
          <button type="button" className={s.btnAddSm}
            onClick={() => patch({
              exercise: { ...value.exercise, answers: [...value.exercise.answers, { answer: '' }] },
            })}>
            + Respuesta
          </button>
        </div>
      </fieldset>

      {/* ── Closing quote ── */}
      <fieldset className={s.fieldset}>
        <legend>Cita de cierre</legend>
        <label className={s.field}>
          <span>Cita</span>
          <input value={value.closingQuote.quote}
            onChange={(e) => patch({ closingQuote: { ...value.closingQuote, quote: e.target.value } })} />
        </label>
        <label className={s.field}>
          <span>Traducción</span>
          <input value={value.closingQuote.translation}
            onChange={(e) => patch({ closingQuote: { ...value.closingQuote, translation: e.target.value } })} />
        </label>
      </fieldset>
    </div>
  );
};

export default BodyEditor;
