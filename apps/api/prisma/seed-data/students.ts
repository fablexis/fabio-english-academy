// Demo students for the portal (Lya, Marcos, Andreína, Fabio) — mirrors the
// design prototype so the whole flow is clickable right after `npm run seed`.
// All demo logins share the password below; delete these rows in production.

export const DEMO_PASSWORD = 'demo1234';

type NoteBlock =
  | { kind: 'p'; text: string }
  | { kind: 'tip'; text: string }
  | { kind: 'ex'; en: string; es: string };

interface Material {
  type: 'pdf' | 'blog';
  title: string;
  url: string;
}

interface SeedClass {
  num: number;
  date: string; // YYYY-MM-DD
  title: string;
  topics: string[];
  notes: NoteBlock[];
  materials: Material[];
  summary?: string;
}

interface SeedChat {
  from: 'student' | 'ai' | 'teacher';
  text: string;
}

export interface SeedStudent {
  name: string;
  username: string;
  level: string;
  streakWeeks: number;
  /** Unread student messages the tutor should see (drives readByTeacher). */
  unread: number;
  classes: SeedClass[];
  chat: SeedChat[];
}

export const DEMO_STUDENTS: SeedStudent[] = [
  {
    name: 'Lya Pernía',
    username: 'lya.pernia',
    level: 'B2',
    streakWeeks: 3,
    unread: 2,
    classes: [
      {
        num: 6,
        date: '2026-06-25',
        title: 'Phrasal verbs para el trabajo',
        topics: ['get across', 'follow up', 'put off', 'bring up'],
        summary:
          'Phrasal verbs frecuentes en contextos laborales: get across (hacerse entender), follow up (dar seguimiento), put off (posponer), bring up (mencionar un tema).',
        notes: [
          { kind: 'p', text: 'Hoy trabajamos los phrasal verbs que más aparecen en reuniones y correos de trabajo. La clave: no traducirlos palabra por palabra, sino aprenderlos como una sola unidad de significado.' },
          { kind: 'ex', en: "I couldn't get my idea across in the meeting.", es: 'No logré hacer entender mi idea en la reunión.' },
          { kind: 'ex', en: "Let's follow up on this by email tomorrow.", es: 'Demos seguimiento a esto por correo mañana.' },
          { kind: 'ex', en: 'We had to put off the launch until August.', es: 'Tuvimos que posponer el lanzamiento hasta agosto.' },
          { kind: 'tip', text: 'Truco: cuando escuches un phrasal verb nuevo, anota la frase completa donde apareció, no el verbo solo. El contexto es lo que te lo va a fijar.' },
          { kind: 'p', text: 'Tarea para la próxima clase: escribe 3 frases sobre tu semana de trabajo usando follow up, bring up y put off.' },
        ],
        materials: [
          { type: 'pdf', title: 'Guía: 20 phrasal verbs del trabajo', url: '' },
          { type: 'blog', title: '12 Phrasal Verbs que necesitas ya', url: '' },
        ],
      },
      {
        num: 5,
        date: '2026-06-18',
        title: 'Past perfect: contar historias',
        topics: ['past perfect', 'had + participio', 'secuencia de eventos'],
        summary:
          'Past perfect (had + participio) para ordenar dos eventos pasados: el past perfect marca el que ocurrió primero. Contraste con past simple al contar anécdotas.',
        notes: [
          { kind: 'p', text: 'El past perfect sirve para dejar claro qué pasó primero cuando cuentas dos cosas del pasado. Piensa en él como el "pasado del pasado".' },
          { kind: 'ex', en: 'When I arrived, the meeting had already started.', es: 'Cuando llegué, la reunión ya había empezado.' },
          { kind: 'ex', en: 'She told me she had seen that movie before.', es: 'Me dijo que ya había visto esa película.' },
          { kind: 'tip', text: 'Si los eventos van en orden y el orden es obvio, el past simple alcanza: "I woke up, had breakfast and left." No fuerces el past perfect donde no hace falta.' },
        ],
        materials: [
          { type: 'pdf', title: 'Timeline: past simple vs past perfect', url: '' },
          { type: 'blog', title: 'Present Perfect sin dolor de cabeza', url: '' },
        ],
      },
      {
        num: 4,
        date: '2026-06-11',
        title: 'Job interview: preguntas típicas',
        topics: ['tell me about yourself', 'strengths', 'STAR method'],
        summary:
          'Cómo responder preguntas típicas de entrevista laboral: "tell me about yourself", fortalezas, y el método STAR (Situation, Task, Action, Result).',
        notes: [
          { kind: 'p', text: 'Preparamos tu respuesta para "Tell me about yourself": presente → experiencia relevante → por qué este puesto. Máximo 90 segundos.' },
          { kind: 'ex', en: "I'm a designer with five years of experience in fintech products.", es: 'Soy diseñadora con cinco años de experiencia en productos fintech.' },
          { kind: 'tip', text: 'Método STAR para "cuéntame una vez que…": Situation, Task, Action, Result. Primero el contexto en una frase, y dedica más tiempo a la acción y el resultado.' },
        ],
        materials: [{ type: 'pdf', title: 'Cheat sheet: 15 preguntas de entrevista', url: '' }],
      },
      {
        num: 3,
        date: '2026-06-04',
        title: 'Small talk en la oficina',
        topics: ['small talk', 'weekend questions', 'safe topics'],
        summary:
          'Small talk profesional: iniciar y mantener conversaciones cortas, preguntas sobre el fin de semana, temas seguros y cómo cerrar la charla con naturalidad.',
        notes: [
          { kind: 'ex', en: 'How was your weekend? — Pretty good! We had a barbecue. How about yours?', es: '¿Qué tal tu finde? — ¡Muy bueno! Hicimos un asado. ¿Y el tuyo?' },
          { kind: 'tip', text: 'Regla de oro: siempre devuelve la pregunta ("How about you?"). Mantiene la conversación viva.' },
        ],
        materials: [{ type: 'pdf', title: '30 frases de small talk listas para usar', url: '' }],
      },
      {
        num: 2,
        date: '2026-05-28',
        title: 'Present perfect vs past simple',
        topics: ['present perfect', 'past simple', 'ever / never / yet'],
        summary:
          'Present perfect (experiencias con conexión al presente, sin tiempo específico) vs past simple (acciones terminadas en un momento concreto).',
        notes: [
          { kind: 'p', text: 'La pregunta clave: ¿importa CUÁNDO pasó? Si dices el momento exacto (yesterday, in 2020), usa past simple. Si hablas de la experiencia en sí, present perfect.' },
          { kind: 'ex', en: "I've been to London twice. / I went to London in 2023.", es: 'He estado en Londres dos veces. / Fui a Londres en 2023.' },
        ],
        materials: [{ type: 'pdf', title: 'Mapa de decisión: ¿perfect o simple?', url: '' }],
      },
      {
        num: 1,
        date: '2026-05-21',
        title: 'Reported speech: contar lo que dijeron',
        topics: ['reported speech', 'say vs tell', 'backshift'],
        summary:
          'Reported speech: contar lo que otra persona dijo. Backshift de tiempos verbales, say vs tell, y reported questions.',
        notes: [
          { kind: 'ex', en: '"I\'m tired" → She said she was tired.', es: '"Estoy cansada" → Dijo que estaba cansada.' },
          { kind: 'tip', text: 'Say vs tell: tell siempre lleva la persona (tell ME, tell HER). Say va solo o con "to".' },
        ],
        materials: [{ type: 'pdf', title: 'Tabla de backshift completa', url: '' }],
      },
    ],
    chat: [
      { from: 'student', text: '¿Cuál es la diferencia entre "put off" y "call off"?' },
      { from: 'ai', text: '¡Buena pregunta! Put off es posponer (mover para después) y call off es cancelar del todo.\n\nWe put off the meeting until Friday. (La pospusimos)\nWe called off the meeting. (La cancelamos)' },
      { from: 'student', text: '¿Y "bring up" se puede usar en un email o es muy informal?' },
      { from: 'ai', text: 'Se puede usar perfectamente en emails de trabajo. "I wanted to bring up the budget issue" suena natural y profesional. Si quieres algo más formal: "I would like to raise the issue of…".' },
    ],
  },
  {
    name: 'Marcos Gutiérrez',
    username: 'marcos.gutierrez',
    level: 'B1',
    streakWeeks: 5,
    unread: 0,
    classes: [
      {
        num: 3,
        date: '2026-06-27',
        title: 'Ordering food: en el restaurante',
        topics: ['ordering food', 'polite requests'],
        notes: [{ kind: 'ex', en: 'Could I get the steak, please?', es: '¿Me trae el bife, por favor?' }],
        materials: [{ type: 'blog', title: 'Ordering food like a local', url: '' }],
      },
      {
        num: 2,
        date: '2026-06-20',
        title: 'Present continuous vs simple',
        topics: ['present continuous', 'present simple'],
        notes: [{ kind: 'p', text: 'Rutinas → simple. Ahora mismo o planes cercanos → continuous.' }],
        materials: [{ type: 'pdf', title: 'Ejercicios: continuous vs simple', url: '' }],
      },
      {
        num: 1,
        date: '2026-06-13',
        title: 'Say, tell, speak y talk',
        topics: ['say vs tell', 'speak vs talk'],
        notes: [{ kind: 'tip', text: 'Tell siempre lleva persona: tell ME, tell HER.' }],
        materials: [{ type: 'blog', title: 'Say, tell, speak, talk: de una vez por todas', url: '' }],
      },
    ],
    chat: [
      { from: 'student', text: '¿"I am agree" está bien dicho?' },
      { from: 'ai', text: "Casi 🙂 Agree es un verbo, así que no lleva \"am\": I agree. / I don't agree. (o I disagree.)" },
      { from: 'teacher', text: 'Marcos, este error lo vimos en la clase 2 — repasa la nota sobre verbos de estado. ¡Vas muy bien!' },
    ],
  },
  {
    name: 'Andreína Luna',
    username: 'andreina.luna',
    level: 'A2',
    streakWeeks: 1,
    unread: 1,
    classes: [
      {
        num: 2,
        date: '2026-06-26',
        title: 'Preposiciones de lugar: in, on, at',
        topics: ['in / on / at', 'prepositions'],
        notes: [{ kind: 'ex', en: 'The keys are on the table, in the kitchen.', es: 'Las llaves están sobre la mesa, en la cocina.' }],
        materials: [{ type: 'pdf', title: 'Mapa visual: in, on, at', url: '' }],
      },
      {
        num: 1,
        date: '2026-06-19',
        title: 'Presentarse: greetings básicos',
        topics: ['greetings', 'introductions'],
        notes: [{ kind: 'ex', en: "Nice to meet you! I'm Andreína.", es: '¡Mucho gusto! Soy Andreína.' }],
        materials: [{ type: 'blog', title: 'Small talk: el arte de la charla corta', url: '' }],
      },
    ],
    chat: [
      { from: 'student', text: '¿Por qué es "AT night" pero "IN the morning"? No entiendo 😅' },
      { from: 'ai', text: 'Es una de esas rarezas del inglés: at night es una expresión fija. Para partes del día con "the" usa in: in the morning, in the afternoon… pero at night y at noon van con at. ¡Toca memorizarlas!' },
    ],
  },
  {
    name: 'Fabio Torres',
    username: 'fabio.torres',
    level: 'C1',
    streakWeeks: 8,
    unread: 0,
    classes: [
      {
        num: 4,
        date: '2026-06-24',
        title: 'Conditionals avanzados: mixed',
        topics: ['mixed conditionals', 'third conditional'],
        notes: [{ kind: 'ex', en: 'If I had studied medicine, I would be a doctor now.', es: 'Si hubiera estudiado medicina, ahora sería médico.' }],
        materials: [{ type: 'blog', title: 'Conditionals sin fórmulas', url: '' }],
      },
      {
        num: 3,
        date: '2026-06-17',
        title: 'Negociación: hedging language',
        topics: ['hedging', 'negotiation'],
        notes: [{ kind: 'ex', en: 'That might be somewhat difficult on our end.', es: 'Eso podría ser algo difícil de nuestro lado.' }],
        materials: [{ type: 'pdf', title: 'Frases de hedging para negociar', url: '' }],
      },
      {
        num: 2,
        date: '2026-06-10',
        title: 'Reported speech avanzado',
        topics: ['reported questions', 'reporting verbs'],
        notes: [{ kind: 'p', text: 'Más allá de say/tell: suggest, admit, deny, point out cambian el matiz de lo reportado.' }],
        materials: [{ type: 'pdf', title: 'Reporting verbs con ejemplos', url: '' }],
      },
      {
        num: 1,
        date: '2026-06-03',
        title: 'Presentaciones ejecutivas',
        topics: ['presentations', 'signposting'],
        notes: [{ kind: 'ex', en: "Let's move on to the next point.", es: 'Pasemos al siguiente punto.' }],
        materials: [{ type: 'pdf', title: 'Signposting: guía de presentaciones', url: '' }],
      },
    ],
    chat: [
      { from: 'student', text: '¿Hay diferencia entre "would have been" y "would be" en los mixed conditionals?' },
      { from: 'ai', text: 'Sí, y es la clave del mixed conditional: would have been habla de un resultado pasado, would be de un resultado presente.\n\nIf I had left earlier, I would have arrived on time. (resultado pasado)\nIf I had left earlier, I would be home now. (resultado presente)' },
    ],
  },
];

// A sensible default weekly availability (Mon–Sat), used to seed PortalSettings.
export const DEMO_AVAILABILITY = [
  { day: 1, on: true, ranges: [{ start: '09:00', end: '12:00' }, { start: '14:00', end: '18:00' }] },
  { day: 2, on: true, ranges: [{ start: '14:00', end: '19:00' }] },
  { day: 3, on: true, ranges: [{ start: '09:00', end: '12:00' }, { start: '14:00', end: '18:00' }] },
  { day: 4, on: true, ranges: [{ start: '09:00', end: '13:00' }] },
  { day: 5, on: true, ranges: [{ start: '14:00', end: '18:00' }] },
  { day: 6, on: false, ranges: [] },
];
