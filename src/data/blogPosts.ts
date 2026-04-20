import presentPerfectImg from '../assets/blog/present-perfect.jpg';
import makeVsDoImg from '../assets/blog/make-vs-do.jpg';
import conditionalsImg from '../assets/blog/conditionals.jpg';
import prepositionsImg from '../assets/blog/prepositions.jpg';
import orderingFoodImg from '../assets/blog/ordering-food.jpg';
import smallTalkImg from '../assets/blog/small-talk.jpg';
import phrasalVerbsImg from '../assets/blog/phrasal-verbs.jpg';
import reportedSpeechImg from '../assets/blog/reported-speech.jpg';
import jobInterviewImg from '../assets/blog/job-interview.jpg';
import articlesImg from '../assets/blog/articles.jpg';
import sayTellImg from '../assets/blog/say-tell-speak-talk.jpg';
import directionsImg from '../assets/blog/directions.jpg';

export type BlogVariant = 'teal' | 'lime' | 'dark' | 'plain';

// ── Callout types ──────────────────────────────────────────────────────────
export interface FormulaCallout {
  type: 'formula';
  title: string;
  formula: string;
  examples?: string[];
}
export interface CountryNoteCallout {
  type: 'countryNote';
  topic: string;
  british: string;
  american: string;
  note?: string;
}
export interface NerdyModeCallout {
  type: 'nerdyMode';
  term: string;
  definition: string;
  example?: string;
}
export interface WatchOutCallout {
  type: 'watchOut';
  wrong: string;
  correct: string;
  explanation: string;
}
export interface KeyQuestionCallout {
  type: 'keyQuestion';
  questions: { question: string; answer: string }[];
}
export interface QuickMapCallout {
  type: 'quickMap';
  columns: { header: string; items: string[] }[];
}
export type Callout =
  | FormulaCallout
  | CountryNoteCallout
  | NerdyModeCallout
  | WatchOutCallout
  | KeyQuestionCallout
  | QuickMapCallout;

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  examples?: string[];
  callouts?: Callout[];
}

export interface BlogPost {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  level: string;
  variant: BlogVariant;
  image: string;
  body: {
    hook: string;
    sections: BlogSection[];
    tip: string;
    closing: string;
    commonMistakes: { wrong: string; correct: string; why: string }[];
    exercise: {
      instructions: string;
      questions: string[];
      answers: { answer: string; explanation?: string }[];
    };
    closingQuote: { quote: string; translation: string };
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'present-perfect-vs-past-simple',
    category: 'Gramática',
    title: 'Present Perfect vs. Past Simple: Por Fin Explicado',
    excerpt:
      'Uno de los puntos gramaticales más confusos para estudiantes de inglés. Aprende cuándo usar "I have done" versus "I did" con reglas claras y muchos ejemplos.',
    readTime: '6 min de lectura',
    level: 'Intermedio',
    variant: 'teal',
    image: presentPerfectImg,
    body: {
      hook:
        'Imagina a dos amigos reencontrándose después de mucho tiempo. Uno dice: "I visited Paris last spring" — el otro responde: "I have been to Paris three times." Ambas oraciones hablan de París, ambas son gramaticalmente correctas, pero señalan cosas completamente distintas. La primera clava una bandera en un momento específico del pasado. La segunda habla de la historia de vida de una persona hasta el momento presente. Ese es el núcleo de la diferencia entre el present perfect y el past simple — y una vez que sientes esa diferencia, nunca volverás a confundirlos.',
      sections: [
        {
          heading: 'El past simple: terminado y ubicado en el tiempo',
          paragraphs: [
            'El past simple es el tiempo de las historias cerradas. Cuando lo usas, le estás diciendo a tu interlocutor: "Esto sucedió, está terminado y sé exactamente cuándo." La acción tiene una ubicación clara en la línea del tiempo del pasado. No importa si ocurrió hace una hora o hace un siglo — lo que importa es que ese momento está cerrado.',
            'La señal más confiable para el past simple es una expresión de tiempo terminada. Palabras como yesterday, last week, in 2019, three years ago, when I was a child, at 9 a.m. y on Saturday anclan la acción a un punto específico. Si tu oración tiene una de estas, casi siempre necesitas el past simple.',
            'Piensa en una entrevista de trabajo. Si el reclutador te pregunta por tu experiencia, dirías "I worked at Google for two years" — porque ese trabajo está terminado. El past simple es correcto porque el período está cerrado.',
          ],
          examples: [
            '✓ She graduated in 2021.',
            '✓ We had dinner at that restaurant last Friday.',
            '✓ He called me twice yesterday.',
            '✗ She has graduated in 2021. (finished time = past simple)',
            '✗ We have had dinner there last Friday. (last Friday is a closed moment)',
          ],
          callouts: [
            {
              type: 'formula',
              title: 'Past Simple',
              formula: 'Subject + verb (past form) + finished time expression',
              examples: [
                '✓ I called her yesterday.',
                '✓ They moved to Madrid in 2019.',
                '✗ I have called her yesterday.  ← "yesterday" forces Past Simple',
              ],
            },
          ],
        },
        {
          heading: 'El present perfect: conectando el pasado con el presente',
          paragraphs: [
            'El present perfect es el tiempo de la relevancia. Lo usas cuando la acción pasada todavía importa en el presente — ya sea porque el resultado es continuo, porque el momento exacto se desconoce o no importa, o porque estás describiendo la experiencia de vida de alguien hasta este momento.',
            'Piénsalo como un puente. "I have lost my keys" no solo describe un evento pasado — explica tu situación actual. No puedes entrar. Las llaves siguen perdidas. El presente está afectado. Esa cualidad de puente es lo que hace al present perfect diferente de cualquier otro tiempo verbal.',
            'También hay un grupo de adverbios que casi siempre activan el present perfect: already, yet, just, ever, never, recently, so far y still. Estas palabras hablan de la conexión entre el pasado y el ahora — no nombran un punto terminado en el tiempo, describen un estado actual.',
          ],
          examples: [
            '✓ I have just finished the report. (very recent — result is now)',
            '✓ Have you ever tried sushi? (life experience, time unimportant)',
            '✓ She has worked here since 2020. (started in past, still happening)',
            '✓ They haven\'t called yet. (situation still ongoing)',
            '→ "I lived in Spain for a year." = I no longer live there.',
            '→ "I have lived in Spain for a year." = I still live there now.',
          ],
          callouts: [
            {
              type: 'nerdyMode',
              term: 'time expression',
              definition: 'Es una palabra o frase que dice CUÁNDO ocurrió algo. Ejemplos: yesterday, last week, already, yet, ever, recently, in 2021.',
              example: 'En este artículo son la pista número uno para elegir entre Past Simple y Present Perfect.',
            },
            {
              type: 'formula',
              title: 'Present Perfect',
              formula: 'Subject + have / has + past participle',
              examples: [
                '✓ I have finished the report.',
                '✓ She has lived here since 2020.',
                '✗ I have finished the report yesterday.  ← no mezclar con tiempo cerrado',
              ],
            },
            {
              type: 'quickMap',
              columns: [
                {
                  header: 'Past Simple',
                  items: [
                    '✓ Tiempo específico en el pasado',
                    '✓ Historia cerrada y terminada',
                    '✓ Con: yesterday, last year, in 2021',
                    '"I saw that film yesterday."',
                  ],
                },
                {
                  header: 'Present Perfect',
                  items: [
                    '✓ Sin tiempo exacto mencionado',
                    '✓ Conecta el pasado con el presente',
                    '✓ Con: already, yet, ever, recently',
                    '"I have seen that film."',
                  ],
                },
              ],
            },
          ],
        },
        {
          heading: 'Los errores más comunes — y cómo evitarlos',
          paragraphs: [
            'El error más frecuente es combinar el present perfect con una expresión de tiempo terminada. Este es el error número uno que cometen los estudiantes, y suele ocurrir por instinto porque en muchos idiomas un solo tiempo pasado cubre ambos casos.',
            'El segundo error clásico va en sentido contrario: usar el past simple cuando el resultado todavía importa ahora. Un estudiante le escribió una vez a su profesor: "I forgot to do the homework." Esa oración implica una acción pasada terminada — ¡pero la tarea todavía no está hecha! La versión correcta es "I have forgotten to do the homework" porque la situación es actual.',
            'Un matiz más que vale la pena conocer: el inglés británico y el americano manejan esto de manera ligeramente diferente. Los americanos suelen decir "Did you eat yet?" mientras que los hablantes británicos prefieren "Have you eaten yet?" Ambos se entienden en todas partes, pero en escritura formal el present perfect es siempre la opción más segura cuando la acción se conecta al presente.',
          ],
          examples: [
            '✗ I have seen that film yesterday.',
            '✓ I saw that film yesterday.',
            '✗ Did you ever try Ethiopian food? (asking about life experience)',
            '✓ Have you ever tried Ethiopian food?',
            '✗ I already finished the book. (in formal/written English)',
            '✓ I have already finished the book.',
          ],
          callouts: [
            {
              type: 'watchOut',
              wrong: '"I have seen it yesterday."',
              correct: '"I saw it yesterday."',
              explanation: 'Nunca combines el Present Perfect con una expresión de tiempo terminada como yesterday, last week o in 2021.',
            },
            {
              type: 'countryNote',
              topic: 'Preguntando por experiencias recientes',
              british: '"Have you eaten yet?" (Present Perfect preferido)',
              american: '"Did you eat yet?" (Past Simple casual aceptado)',
              note: 'Ambos se entienden — pero en escritura formal el Present Perfect es siempre la opción segura cuando la acción se conecta al presente.',
            },
          ],
        },
        {
          heading: 'Un escenario real para unirlo todo',
          paragraphs: [
            'Imagina esto: es lunes por la mañana y estás en la oficina. Un colega te pregunta cómo fue tu fin de semana. Dices: "It was great — I went hiking on Saturday and visited my parents on Sunday." Ambas acciones están terminadas y ubicadas en el tiempo, por lo que usas el past simple en todo momento.',
            'Más tarde ese día, alguien te pregunta si terminaste el informe trimestral. Dices: "I haven\'t finished it yet, but I\'ve already done the data analysis." Aquí, el present perfect es correcto porque estás describiendo el estado actual del trabajo — lo que está y no está hecho ahora.',
            'Ahora viene lo interesante. Si alguien luego pregunta específicamente cuándo hiciste el análisis, cambias de tiempo: "Oh, I did most of it on Saturday morning before the hike." En el momento en que agregas un tiempo específico, vuelves al past simple. Ambos tiempos trabajan juntos, cada uno cumpliendo su función.',
          ],
          callouts: [
            {
              type: 'keyQuestion',
              questions: [
                { question: '¿La oración tiene una expresión de tiempo terminada (yesterday, last week, in 2021)?', answer: 'Sí → usa Past Simple' },
                { question: '¿La acción conecta con el presente o describe una experiencia de vida?', answer: 'Sí → usa Present Perfect' },
              ],
            },
          ],
        },
      ],
      tip: 'Hazte dos preguntas antes de elegir un tiempo verbal: (1) ¿Tengo una expresión de tiempo terminada en mi oración — como yesterday, last year o in 2018? Si es así, usa el past simple. (2) ¿Estoy hablando de algo que todavía es relevante ahora, o describiendo una experiencia de vida sin un tiempo específico? Si es así, usa el present perfect. Estas dos preguntas resuelven alrededor del 90% de los casos.',
      closing:
        'Esta distinción temporal no existe en muchos idiomas, por eso se siente poco natural al principio. La clave es dejar de traducir y comenzar a preguntarte: "¿Esta acción está terminada y fija en el tiempo, o se conecta con el presente?" Con esa única pregunta como guía, el tiempo verbal correcto llegará cada vez más de forma natural.',
      commonMistakes: [
        { wrong: '"I have seen it yesterday."', correct: '"I saw it yesterday."', why: '"Yesterday" es un tiempo terminado y específico — siempre pide Past Simple.' },
        { wrong: '"Did you ever try sushi?"', correct: '"Have you ever tried sushi?"', why: '"Ever" pregunta por experiencia de vida sin fecha — usa Present Perfect.' },
        { wrong: '"She has graduated in 2021."', correct: '"She graduated in 2021."', why: '"In 2021" es un año específico y cerrado — usa Past Simple.' },
        { wrong: '"I have lived here since two years."', correct: '"I have lived here for two years."', why: 'Con un período de tiempo usa "for"; con un punto en el tiempo (2020), usa "since".' },
        { wrong: '"We have arrived yesterday at midnight."', correct: '"We arrived yesterday at midnight."', why: '"Yesterday" cierra el tiempo — el Past Simple es obligatorio.' },
      ],
      exercise: {
        instructions: 'Choose the correct form — Past Simple or Present Perfect. / Elige la forma correcta — Past Simple o Present Perfect.',
        questions: [
          'I ________ (never / try) Ethiopian food before. Have you?',
          'She ________ (graduate) from university in 2020.',
          'They ________ (just / arrive) at the airport — I can hear them outside.',
          'We ________ (visit) Paris last summer with my cousins.',
          'He ________ (work) at that company since 2018, and he still loves it.',
        ],
        answers: [
          { answer: 'have never tried', explanation: '"Never" + experiencia de vida sin fecha → Present Perfect.' },
          { answer: 'graduated', explanation: '"In 2020" es un tiempo cerrado → Past Simple.' },
          { answer: 'have just arrived', explanation: '"Just" indica acción muy reciente que importa ahora → Present Perfect.' },
          { answer: 'visited', explanation: '"Last summer" es un período terminado → Past Simple.' },
          { answer: 'has worked', explanation: '"Since 2018" continúa hasta el presente → Present Perfect.' },
        ],
      },
      closingQuote: {
        quote: 'To have another language is to possess a second soul.',
        translation: 'Tener otro idioma es poseer una segunda alma. — Carlomagno',
      },
    },
  },
  {
    id: 2,
    slug: 'make-vs-do-explained',
    category: 'Vocabulario',
    title: 'Make vs. Do: La Guía Definitiva',
    excerpt:
      '¿Por qué decimos "make a decision" pero "do homework"? Hay una lógica detrás de eso. Aprende los patrones que te ayudarán a elegir correctamente siempre.',
    readTime: '5 min de lectura',
    level: 'Principiante',
    variant: 'lime',
    image: makeVsDoImg,
    body: {
      hook:
        'Acabas de sentarte a estudiar, así que decides "do your homework". Más tarde, tu mamá te pide que "make your bed". Después de cenar, ayudas a "do the dishes". Antes de dormir, "make a plan" para mañana. En un solo día usas ambas palabras decenas de veces — y confundirlas sonaría completamente mal para un hablante nativo. La parte frustrante es que en muchos idiomas un solo verbo cubre ambos conceptos. La buena noticia es que hay una lógica real detrás, y aprenderla hace que elegir la palabra correcta se sienta mucho menos arbitrario.',
      sections: [
        {
          heading: 'La idea central: crear vs. hacer',
          paragraphs: [
            '"Make" tiene que ver con la creación y la producción — algo pasa a existir como resultado. Cuando haces un pastel con make, ahora hay un pastel en el mundo que antes no existía. Cuando haces "make a decision", has producido una conclusión. Cuando haces "make a noise", se crea un sonido. El resultado es tangible o al menos identificable.',
            '"Do" tiene que ver con actividades y procesos — el énfasis está en la acción misma, no en un nuevo producto. Cuando haces "do homework", estás realizando una tarea. Cuando haces "do exercise", estás llevando a cabo una actividad. No se crea nada físico; la acción es el punto.',
            'Esta distinción central cubre muchos casos. Pero el inglés está lleno de excepciones y colocaciones fijas, por lo que aprender los patrones — y saber cuándo simplemente memorizar — es el enfoque más práctico.',
          ],
          callouts: [
            {
              type: 'nerdyMode',
              term: 'colocación',
              definition: 'Es una combinación fija de palabras que los hablantes nativos usan juntas "porque sí" — no por una regla gramatical, sino por costumbre del idioma.',
              example: '"Make a decision" y "do homework" son colocaciones. Apréndelas como bloques, no palabra por palabra.',
            },
          ],
        },
        {
          heading: 'Colocaciones esenciales con "make"',
          paragraphs: [
            'Aprender las colocaciones con "make" en grupos temáticos hace que se fijen más rápido. Piensa en cuatro grupos: crear cosas, comunicación, dinero y planes, y errores.',
            'El grupo de "comunicación" es especialmente importante para los estudiantes porque aparece constantemente en el inglés cotidiano y profesional. You make a call, make an appointment, make a suggestion, make a complaint, make a promise y make an announcement. Nota que cada uno implica producir un mensaje o un compromiso — algo nuevo que entra al mundo.',
          ],
          examples: [
            '✓ She made a reservation at the Italian place.',
            '✓ Can you make a copy of this document?',
            '✓ He made a lot of friends in his first week.',
            '✓ I made a mistake in the third question.',
            '✓ They made an effort to arrive on time.',
            '✓ Let\'s make a plan for Saturday.',
          ],
        },
        {
          heading: 'Colocaciones esenciales con "do"',
          paragraphs: [
            '"Do" domina el mundo de las tareas, obligaciones y actividades en general. Un atajo mental útil: si pudieras reemplazar la palabra con "perform" o "carry out", probablemente llevaría "do".',
            'En el trabajo y la escuela, you do assignments, do research, do a report y do a presentation. En casa, do the laundry, do the cleaning, do the shopping y do the ironing. Para actividades generales, do sport, do yoga, do business y do someone a favour. Nota cómo ninguna de estas produce un objeto nuevo — son procesos.',
            'También hay un grupo de expresiones evaluativas: do well, do badly, do your best, do better. Estas miden el desempeño en lugar de producir algo, y siempre usan "do".',
          ],
          examples: [
            '✓ I need to do the dishes before my parents arrive.',
            '✓ She did her best on the exam.',
            '✓ Can you do me a favour?',
            '✓ He does yoga every morning.',
            '✓ We are doing business with a company in Japan.',
            '✓ You did a great job on that presentation.',
          ],
        },
        {
          heading: 'Casos complicados y excepciones',
          paragraphs: [
            'Algunas colocaciones parecen romper las reglas, por lo que vale la pena abordarlas directamente. "Do your hair" podría parecer creación — lo estás peinando — pero se trata como una tarea de rutina, así que gana "do". Del mismo modo, "do your nails" y "do your makeup" siguen la misma lógica: son actividades de arreglo personal, no productos que se construyen.',
            '"Make the bed" puede confundir porque la cama ya existe — no la estás creando. Pero en inglés, la frase significa arreglarla y ordenarla, y simplemente es una expresión fija con "make". Del mismo modo, "make a journey" y "make a trip" usan "make" aunque un viaje sea una actividad. Estas simplemente hay que memorizarlas como unidades.',
            'Cuando realmente no estés seguro, opta por "do" para actividades y tareas, y "make" cuando el resultado es algo nuevo o una comunicación. Y si aún no está claro, la expresión probablemente es una colocación fija — búscala y memorízala como un todo.',
          ],
          examples: [
            '✓ She made the bed before breakfast.',
            '✓ He did his hair in about two minutes.',
            '✗ She did the bed. (fixed expression with "make")',
            '✗ He made his hair. (grooming activity = "do")',
            '✓ They made a long journey across the country.',
            '✓ I need to do some research before the meeting.',
          ],
          callouts: [
            {
              type: 'watchOut',
              wrong: '"She did the bed before leaving."',
              correct: '"She made the bed before leaving."',
              explanation: '"Make the bed" es una colocación fija — aunque la cama ya existe, usamos make porque estamos "dándole forma" al arreglarla.',
            },
          ],
        },
      ],
      tip: 'Cuando tengas dudas, pregúntate: "¿Se está creando o produciendo algo nuevo?" Si es así, inclínate por "make". Si la oración es sobre una actividad, tarea o proceso, inclínate por "do". Y siempre trata las combinaciones verbo + sustantivo como unidades de vocabulario — aprende "make a decision" y "do homework" como bloques, no palabra por palabra.',
      closing:
        'La distinción make/do es algo que se facilita con la exposición constante. En lugar de estudiar listas aisladas, presta atención a qué palabra usan los hablantes nativos cada vez que lees o escuchas en inglés. En pocas semanas, comenzarás a elegir la correcta automáticamente — no porque recordaste una regla, sino porque simplemente empezará a sonar bien.',
      commonMistakes: [
        { wrong: '"She did a mistake in the email."', correct: '"She made a mistake in the email."', why: 'Los errores se "producen" — siempre usa make con mistake.' },
        { wrong: '"I did a reservation for Friday."', correct: '"I made a reservation for Friday."', why: 'Crear/establecer una reserva es make — el resultado es algo nuevo.' },
        { wrong: '"Can you make me a favour?"', correct: '"Can you do me a favour?"', why: '"Favour" va con do — es una acción que realizas por alguien, no un producto.' },
        { wrong: '"He makes yoga every morning."', correct: '"He does yoga every morning."', why: 'Las actividades físicas y deportivas usan do: do yoga, do exercise, do sport.' },
        { wrong: '"They made good work on the report."', correct: '"They did good work on the report."', why: '"Work" como actividad/esfuerzo siempre usa do. Pero "make work difficult" (verbo) es distinto.' },
      ],
      exercise: {
        instructions: 'Complete each sentence with the correct form of MAKE or DO. / Completa cada oración con la forma correcta de MAKE o DO.',
        questions: [
          'Could you ________ me a favour and close the window?',
          'She ________ a reservation at the new Italian restaurant.',
          'I try to ________ yoga three times a week.',
          'Don\'t worry about it — everyone ________ mistakes sometimes.',
          'We need to ________ a decision by Friday at the latest.',
          'He usually ________ the dishes right after dinner.',
        ],
        answers: [
          { answer: 'do', explanation: '"Do a favour" — favours son acciones, no productos.' },
          { answer: 'made', explanation: '"Make a reservation" — crear algo nuevo.' },
          { answer: 'do', explanation: 'Actividades/deportes siempre usan do.' },
          { answer: 'makes', explanation: '"Make mistakes" — los errores se producen.' },
          { answer: 'make', explanation: '"Make a decision" — una decisión es un producto mental.' },
          { answer: 'does', explanation: '"Do the dishes" — tarea doméstica = do.' },
        ],
      },
      closingQuote: {
        quote: 'A different language is a different vision of life.',
        translation: 'Un idioma diferente es una visión diferente de la vida. — Federico Fellini',
      },
    },
  },
  {
    id: 3,
    slug: 'mastering-conditional-sentences',
    category: 'Gramática',
    title: 'Dominando los Condicionales (If Clauses)',
    excerpt:
      'Zero, first, second, third — los condicionales tienen reglas claras una vez que entiendes la lógica detrás de cada tipo. Una guía completa con ejemplos para todos los niveles.',
    readTime: '6 min de lectura',
    level: 'Intermedio',
    variant: 'dark',
    image: conditionalsImg,
    body: {
      hook:
        'Los condicionales son la gramática de la posibilidad. Te permiten describir qué sucede cuando se cumplen ciertas condiciones, qué pasaría en un mundo imaginario y qué podría haber sido diferente en el pasado. Sin ellos, no puedes expresar arrepentimiento, dar consejos, especular ni advertir a alguien. La mayoría de los estudiantes memoriza los cuatro tipos de forma mecánica ("if + present → will"), pero ese enfoque falla en las conversaciones reales. Entender la lógica — por qué cada tipo usa los tiempos que usa — hace que sean mucho más fáciles de producir de manera natural.',
      sections: [
        {
          heading: 'Zero conditional: hechos y verdades universales',
          paragraphs: [
            'El zero conditional describe cosas que siempre son verdaderas — hechos científicos, verdades generales y relaciones de causa y efecto que nunca cambian. La fórmula es if + present simple, present simple. La razón por la que ambas cláusulas usan el present simple es que no hay incertidumbre: el resultado siempre sigue a la condición.',
            'Este condicional también se usa para instrucciones y hábitos: "If you heat metal, it expands" (hecho) o "If it is raining when I wake up, I take the bus" (un hábito personal). La prueba clave es: ¿el resultado siempre ocurre cuando la condición es verdadera? Si es así, usa el zero conditional.',
          ],
          examples: [
            '✓ If you mix blue and yellow, you get green.',
            '✓ If water reaches 0°C, it freezes.',
            '✓ If she doesn\'t sleep well, she gets headaches.',
            '✓ If there\'s traffic, I leave an hour earlier.',
          ],
          callouts: [
            {
              type: 'formula',
              title: 'Zero Conditional',
              formula: 'If + present simple  ,  present simple',
              examples: [
                '✓ If you heat water to 100°C, it boils.',
                '✓ If I drink coffee late, I don\'t sleep well.',
              ],
            },
          ],
        },
        {
          heading: 'First conditional: situaciones futuras reales y probables',
          paragraphs: [
            'El first conditional describe situaciones que genuinamente crees que podrían suceder. La fórmula es if + present simple, will + infinitive. Nota: aunque estás hablando del futuro, la cláusula if usa el present simple — nunca "if it will rain". Este es un error muy común.',
            'Los first conditionals están en todas partes en la vida cotidiana: hacer planes, dar advertencias, establecer condiciones y hablar de resultados realistas. Cuando un gerente dice "If you finish early, you can leave at 4," genuinamente cree que terminar temprano es posible. Cuando un amigo dice "If it rains tonight, the match will be cancelled," piensa que la lluvia es una posibilidad real.',
            'También puedes usar "unless" (= if not), "as long as" y "provided that" para variar los first conditionals. "Unless you hurry, you will miss the train" es lo mismo que "If you do not hurry, you will miss the train."',
          ],
          examples: [
            '✓ If you study tonight, you\'ll feel more confident tomorrow.',
            '✓ I\'ll call you if anything changes.',
            '✓ Unless she apologises, I won\'t speak to her.',
            '✗ If you will be late, please let me know. (no "will" in if-clause)',
            '✓ If you will be late, please let me know. → If you are late, please let me know.',
          ],
          callouts: [
            {
              type: 'formula',
              title: 'First Conditional',
              formula: 'If + present simple  ,  will + base verb',
              examples: [
                '✓ If it rains, I will stay home.',
                '✓ If you study tonight, you will feel more confident.',
                '✗ If it will rain, I will stay home.  ← no "will" después de "if"',
              ],
            },
            {
              type: 'watchOut',
              wrong: '"If you will be late, please let me know."',
              correct: '"If you are late, please let me know."',
              explanation: 'Nunca uses "will" inmediatamente después de "if" en el First Conditional — aunque estés hablando del futuro, la cláusula if usa present simple.',
            },
          ],
        },
        {
          heading: 'Second conditional: presente o futuro imaginario',
          paragraphs: [
            'El second conditional describe situaciones hipotéticas — cosas que no son verdad ahora, o que consideras poco probables o imposibles. La fórmula es if + past simple, would + infinitive. Crucialmente, el past simple aquí no se refiere al pasado — señala irrealidad.',
            'Aquí es donde muchos estudiantes se confunden. "If I had more time" no significa "si hubiera tenido más tiempo en el pasado". Significa "en este escenario imaginario donde tengo más tiempo ahora". El tiempo pasado es un marcador de distancia gramatical, no un marcador de tiempo.',
            'El second conditional es perfecto para dar consejos con "if I were you" — una de las frases más útiles en inglés. En inglés formal usamos "were" para todas las personas, no "was": "If I were you, I would talk to her directly." En el habla informal, "If I was you" es común y ampliamente entendido.',
          ],
          examples: [
            '✓ If I spoke Japanese, I would move to Tokyo.',
            '✓ If she had more experience, she would apply for the job.',
            '✓ If I were you, I would see a doctor.',
            '✗ If I would have more time, I would exercise. (no "would" in if-clause)',
            '→ "If I had a car" = I don\'t have a car (imaginary)',
            '→ "If I have a car by then" = it\'s possible I will (first conditional)',
          ],
          callouts: [
            {
              type: 'formula',
              title: 'Second Conditional',
              formula: 'If + past simple  ,  would + base verb',
              examples: [
                '✓ If I had more time, I would exercise more.',
                '✓ If I were you, I would call her.',
                '✗ If I would have more money, I would travel.  ← no "would" en la cláusula if',
              ],
            },
            {
              type: 'nerdyMode',
              term: 'cláusula',
              definition: 'Una cláusula es una parte de la oración con su propio sujeto y verbo. En los condicionales hay dos: la cláusula IF (la condición) y la cláusula resultado (lo que ocurre).',
              example: 'En "If it rains, I will stay home" — "If it rains" es la cláusula if; "I will stay home" es la cláusula resultado.',
            },
          ],
        },
        {
          heading: 'Third conditional: pasado imaginario y condicionales mixtos',
          paragraphs: [
            'El third conditional describe situaciones que no ocurrieron en el pasado. Estás imaginando una historia alternativa. La fórmula es if + past perfect, would have + past participle. Este es el condicional del arrepentimiento, las oportunidades perdidas y el pensamiento de "qué hubiera pasado si".',
            'Escenario real: tuviste una discusión con un amigo y luego deseas haber actuado de otra manera. Piensas: "If I had stayed calm, we wouldn\'t have argued." No te mantuviste calmado — eso es un hecho cerrado — pero estás imaginando el resultado alternativo.',
            'Los condicionales mixtos combinan elementos de diferentes tipos. La mezcla más común es una condición pasada imaginaria con un resultado presente: "If I had studied medicine, I would be a doctor now." La cláusula if es third conditional (pasado imaginario), pero la cláusula resultado es second conditional (presente imaginario). Suenan muy naturales en el habla una vez que entiendes la lógica detrás de cada parte.',
          ],
          examples: [
            '✓ If she had left earlier, she would have caught the train.',
            '✓ If I hadn\'t met him, my life would have been very different.',
            '✓ If you had told me, I could have helped. (missed opportunity)',
            '→ Mixed: "If I had studied harder, I would have a better job now."',
            '→ Past condition (didn\'t study) + present result (no good job now)',
            '✗ If I would have known, I would have told you.',
            '✓ If I had known, I would have told you.',
          ],
          callouts: [
            {
              type: 'formula',
              title: 'Third Conditional',
              formula: 'If + past perfect  ,  would have + past participle',
              examples: [
                '✓ If I had studied harder, I would have passed.',
                '✓ If she had called, I would have answered.',
                '✗ If I would have known, I would have told you.  ← no "would have" en la cláusula if',
              ],
            },
            {
              type: 'watchOut',
              wrong: '"If I would have known, I would have told you."',
              correct: '"If I had known, I would have told you."',
              explanation: 'En el Third Conditional, la cláusula if siempre usa "had + past participle" — nunca "would have" en esa parte.',
            },
            {
              type: 'quickMap',
              columns: [
                {
                  header: 'Zero / First (reales)',
                  items: [
                    'Zero: If + present → present',
                    'Hechos: "If you heat water, it boils"',
                    'First: If + present → will + base',
                    'Futuro probable: "If it rains, I will stay"',
                  ],
                },
                {
                  header: 'Second / Third (imaginarios)',
                  items: [
                    'Second: If + past → would + base',
                    'Presente irreal: "If I had a car, I would drive"',
                    'Third: If + past perfect → would have + PP',
                    'Pasado irreal: "If I had known, I would have helped"',
                  ],
                },
              ],
            },
            {
              type: 'keyQuestion',
              questions: [
                { question: '¿La situación es real/posible o imaginaria/irreal?', answer: 'Real → Zero o First  |  Imaginario → Second o Third' },
                { question: '¿Es pasado, presente o futuro?', answer: 'Pasado imaginario → Third  |  Presente/futuro imaginario → Second' },
              ],
            },
          ],
        },
      ],
      tip: 'Haz coincidir el tipo de condicional con el tiempo y la realidad de la situación. Zero = siempre verdadero (hechos). First = futuro posible (real). Second = ahora imaginario (irreal). Third = pasado imaginario (irreal). Pregúntate: "¿Esto es real o imaginario? ¿Pasado, presente o futuro?" Esas dos preguntas te llevan al condicional correcto cada vez.',
      closing:
        'Los condicionales están en todas partes en inglés — negociaciones, consejos, narrativas, arrepentimientos, predicciones. Una vez que captes la lógica en lugar de las fórmulas, dejarás de dudar y comenzarás a usarlos de forma instintiva. Escúchalos en podcasts y conversaciones, y te sorprenderá con qué frecuencia aparece cada tipo.',
      commonMistakes: [
        { wrong: '"If it will rain, I will stay home."', correct: '"If it rains, I will stay home."', why: 'Nunca uses "will" después de "if" en el First Conditional — la cláusula if usa present simple.' },
        { wrong: '"If I would have more money, I would travel."', correct: '"If I had more money, I would travel."', why: 'En el Second Conditional, la cláusula if usa past simple, no "would".' },
        { wrong: '"If I would have known, I would have called."', correct: '"If I had known, I would have called."', why: 'En el Third Conditional, la cláusula if usa past perfect (had + PP), no "would have".' },
        { wrong: '"If she was here, I would be happy."', correct: '"If she were here, I would be happy."', why: 'En inglés formal del Second Conditional, usa "were" para todas las personas — no "was".' },
        { wrong: '"Unless you don\'t hurry, you\'ll miss the train."', correct: '"Unless you hurry, you\'ll miss the train."', why: '"Unless" ya significa "if not" — nunca lo uses con otro negativo.' },
      ],
      exercise: {
        instructions: 'Identify which type of conditional each sentence is — Zero, First, Second or Third. / Identifica qué tipo de condicional es cada oración.',
        questions: [
          'If water boils, it turns into steam.',
          'If I had more money, I would buy a new laptop.',
          'If you finish the report tonight, I will review it tomorrow.',
          'If she had studied more, she would have passed the exam.',
          'If I were you, I would apologise immediately.',
          'If you press this button, the machine starts.',
        ],
        answers: [
          { answer: 'Zero Conditional', explanation: 'Hecho universal — present + present.' },
          { answer: 'Second Conditional', explanation: 'Situación imaginaria ahora — past + would.' },
          { answer: 'First Conditional', explanation: 'Futuro real y probable — present + will.' },
          { answer: 'Third Conditional', explanation: 'Pasado imaginario — past perfect + would have.' },
          { answer: 'Second Conditional', explanation: '"If I were you" es la frase clásica del Second Conditional.' },
          { answer: 'Zero Conditional', explanation: 'Instrucción/hecho general — present + present.' },
        ],
      },
      closingQuote: {
        quote: 'One language sets you in a corridor for life. Two languages open every door along the way.',
        translation: 'Un idioma te pone en un pasillo de por vida. Dos idiomas abren cada puerta del camino. — Frank Smith',
      },
    },
  },
  {
    id: 4,
    slug: 'common-preposition-mistakes',
    category: 'Gramática',
    title: 'Errores Comunes con las Preposiciones y Cómo Corregirlos',
    excerpt:
      'Las preposiciones son palabras pequeñas que causan grandes problemas. Aprende los errores más frecuentes con in, on, at, to y for — y cómo evitarlos.',
    readTime: '5 min de lectura',
    level: 'Principiante',
    variant: 'plain',
    image: prepositionsImg,
    body: {
      hook:
        'Un estudiante escribe: "I will meet you in the station at Monday in 6 o\'clock." Cada preposición de esa oración es incorrecta. "At the station, on Monday, at 6 o\'clock." Las preposiciones son algunas de las palabras más pequeñas del inglés y de las más implacables. A diferencia de las reglas gramaticales que siguen una lógica clara, las preposiciones dependen a menudo de la convención — los hablantes nativos las aprendieron por exposición, no por reglas. Pero hay patrones sólidos que cubren la mayoría de las situaciones, y aprenderlos eliminará la mayor parte de los errores que cometes ahora mismo.',
      sections: [
        {
          heading: 'Preposiciones de tiempo: at, on, in',
          paragraphs: [
            'Piensa en las preposiciones de tiempo como un zoom. "At" es el zoom más ajustado — una hora de reloj precisa o un momento específico: at 7 p.m., at noon, at midnight, at the weekend (inglés británico), at Christmas. "On" hace un zoom ligeramente más amplio a un día específico: on Monday, on 3 July, on my birthday, on New Year\'s Eve. "In" es el zoom más amplio — un mes, una estación, un año o un período más largo: in March, in 2015, in the summer, in the 19th century.',
            'El par que más confunde es "at night" vs. "in the morning / evening / afternoon". Aunque la noche es un período largo (igual que la mañana), el inglés trata "at night" como una expresión fija. Todo lo demás sigue el patrón de "in": in the morning, in the afternoon, in the evening. "At night" es el que simplemente hay que memorizar.',
          ],
          examples: [
            '✓ The class starts at 9 a.m. on Thursday.',
            '✓ She was born in 1998.',
            '✓ I usually go for a walk in the morning.',
            '✓ The office is closed at night.',
            '✗ See you in Monday. → ✓ See you on Monday.',
            '✗ I\'ll call you at the morning. → ✓ I\'ll call you in the morning.',
            '✗ The meeting is in 3 p.m. → ✓ The meeting is at 3 p.m.',
          ],
          callouts: [
            {
              type: 'formula',
              title: 'At / On / In — tiempo',
              formula: 'AT → hora exacta  •  ON → día/fecha  •  IN → mes/año/período largo',
              examples: [
                '✓ at 7 p.m.  ·  at noon  ·  at night',
                '✓ on Monday  ·  on 3 July  ·  on my birthday',
                '✓ in March  ·  in 2015  ·  in the morning',
              ],
            },
            {
              type: 'watchOut',
              wrong: '"See you in Monday at 3 p.m."',
              correct: '"See you on Monday at 3 p.m."',
              explanation: 'Los días de la semana siempre usan ON, nunca IN. Usa IN solo para meses, años o períodos largos.',
            },
          ],
        },
        {
          heading: 'Preposiciones de lugar: at, on, in',
          paragraphs: [
            'Las mismas tres preposiciones siguen una lógica similar para el lugar. "At" marca un punto o ubicación específica — tratas el lugar como un punto en el mapa: at the bus stop, at the airport, at the corner, at home. "On" marca una superficie o línea: on the table, on the wall, on the floor, on the second floor, on the left side. "In" marca un espacio cerrado o delimitado: in the room, in the car, in the city, in the box.',
            'Una prueba muy práctica: si el lugar es un volumen (puedes entrar en él), usa "in". Si el lugar es una superficie (descansas encima), usa "on". Si el lugar es un punto o destino (llegas allí), usa "at". Esta regla general resuelve la mayoría de las situaciones cotidianas.',
            'Las preposiciones de transporte siguen un patrón separado pero consistente. Usa "on" para vehículos grandes donde te paras o caminas: on the bus, on the train, on the plane, on the subway. Usa "in" para vehículos pequeños donde te sientas encerrado: in the car, in the taxi, in the van. "By" describe el método de viaje sin artículo: by bus, by car, by train, by bike.',
          ],
          examples: [
            '✓ I\'ll meet you at the main entrance.',
            '✓ The cat is sleeping on the sofa.',
            '✓ She lives in a small apartment in the city centre.',
            '✗ I am in home. → ✓ I am at home.',
            '✗ She is at the kitchen. → ✓ She is in the kitchen.',
            '✓ We came by train, but she came in her own car.',
            '✗ I travel by the bus. → ✓ I travel by bus. (no article with "by")',
          ],
          callouts: [
            {
              type: 'watchOut',
              wrong: '"I am in home."',
              correct: '"I am at home."',
              explanation: '"Home" se trata como un punto, no un volumen — siempre "at home". Lo mismo con "at work", "at school", "at the airport".',
            },
          ],
        },
        {
          heading: 'Preposiciones después de verbos y adjetivos',
          paragraphs: [
            'Muchos verbos y adjetivos llevan una preposición fija que no puede predecirse por el significado — debe aprenderse como unidad. Esta es una de las fuentes más comunes de errores con preposiciones, porque los estudiantes a menudo traducen la preposición directamente desde su idioma nativo.',
            'Para verbos, los más propensos a errores son: listen to (no listen at), wait for, arrive at/in (at a building or point, in a city or country), depend on, apologise for, apply for y pay for. Para adjetivos, pares fijos comunes incluyen: good at, interested in, afraid of, tired of, responsible for, different from, proud of y similar to.',
            'La mejor estrategia aquí no es memorizar listas abstractas, sino registrar cada nuevo verbo o adjetivo junto con su preposición en oraciones completas. "I am good at maths" es mucho más memorable que "good + at" en una lista.',
          ],
          examples: [
            '✓ She apologised for being late.',
            '✓ I am really interested in photography.',
            '✓ He is good at explaining complex topics.',
            '✓ We arrived in Paris at noon and went straight to the hotel.',
            '✗ She is interested to cooking. → ✓ She is interested in cooking.',
            '✗ I arrived to the office early. → ✓ I arrived at the office early.',
            '✗ He is good in tennis. → ✓ He is good at tennis.',
          ],
          callouts: [
            {
              type: 'watchOut',
              wrong: '"I arrived to the office at 9."',
              correct: '"I arrived at the office at 9."',
              explanation: 'El verbo "arrive" va con "at" (punto específico) o "in" (ciudad/país), nunca con "to". Compara: "arrive at the airport", "arrive in Spain".',
            },
            {
              type: 'keyQuestion',
              questions: [
                { question: '¿Es un punto específico (stop, door, home, airport)?', answer: 'Usa AT' },
                { question: '¿Es una superficie o línea (table, wall, floor)?', answer: 'Usa ON' },
                { question: '¿Es un espacio cerrado o un país/ciudad (room, car, Madrid)?', answer: 'Usa IN' },
              ],
            },
          ],
        },
      ],
      tip: 'Lleva un pequeño "cuaderno de preposiciones" — físico o digital. Cada vez que encuentres una combinación de verbo + preposición o adjetivo + preposición que te sorprenda, anótala en una oración completa. Repasa diez entradas cada mañana. En un mes, las combinaciones más comunes se sentirán automáticas.',
      closing:
        'Las preposiciones son un juego a largo plazo. Ninguna regla única cubre todos los casos, e incluso los estudiantes avanzados cometen errores ocasionales. El objetivo no es la perfección sino la mejora constante. Concéntrate primero en los patrones de este artículo — cubren la mayoría del uso cotidiano — y ve construyendo tu colección de combinaciones fijas una por una.',
      commonMistakes: [
        { wrong: '"I\'ll meet you in the station."', correct: '"I\'ll meet you at the station."', why: '"Station" se trata como un punto de encuentro — usa AT, no IN.' },
        { wrong: '"See you in Monday."', correct: '"See you on Monday."', why: 'Los días de la semana siempre usan ON.' },
        { wrong: '"She is interested to cooking."', correct: '"She is interested in cooking."', why: '"Interested" siempre va con "in" + -ing o sustantivo.' },
        { wrong: '"I travel by the bus every day."', correct: '"I travel by bus every day."', why: 'Con "by" para medios de transporte, no se usa artículo: by bus, by car, by train.' },
        { wrong: '"He is good in tennis."', correct: '"He is good at tennis."', why: '"Good" va con "at" cuando hablas de habilidades o actividades.' },
      ],
      exercise: {
        instructions: 'Fill in the blank with AT, ON, or IN. / Completa con AT, ON o IN.',
        questions: [
          'The meeting is ________ Monday ________ 10 a.m.',
          'She was born ________ 1998, ________ the 3rd of May.',
          'I\'ll see you ________ the bus stop ________ the morning.',
          'He\'s really good ________ playing the guitar.',
          'We arrived ________ the airport just ________ time.',
        ],
        answers: [
          { answer: 'on / at', explanation: 'Días → ON  ·  Hora exacta → AT.' },
          { answer: 'in / on', explanation: 'Años → IN  ·  Fecha específica → ON.' },
          { answer: 'at / in', explanation: 'Punto específico (bus stop) → AT  ·  Período del día → IN.' },
          { answer: 'at', explanation: '"Good at" es una colocación fija.' },
          { answer: 'at / in', explanation: '"Arrive at" (lugar específico) + "in time" (a tiempo, expresión fija).' },
        ],
      },
      closingQuote: {
        quote: 'Language is the road map of a culture. It tells you where its people come from and where they are going.',
        translation: 'El idioma es el mapa de una cultura. Te dice de dónde viene su gente y hacia dónde va. — Rita Mae Brown',
      },
    },
  },
  {
    id: 5,
    slug: 'ordering-food-in-english',
    category: 'Situaciones',
    title: 'Cómo Ordenar Comida en un Restaurante en Inglés',
    excerpt:
      'Desde hacer una reserva hasta pedir la cuenta — todas las frases que necesitas para sentirte seguro en cualquier restaurante de habla inglesa.',
    readTime: '5 min de lectura',
    level: 'Principiante',
    variant: 'lime',
    image: orderingFoodImg,
    body: {
      hook:
        'Estás sentado en un restaurante en Londres. El mesero se acerca, sonríe y dice: "Are you ready to order, or do you need a few more minutes?" Ese único momento puede causar una ola de pánico si no estás preparado. Pero aquí está la realidad — las conversaciones en restaurantes son de las más predecibles del idioma inglés. El mesero hace prácticamente las mismas preguntas cada vez. Las frases que necesitas son menos de treinta. Con una pequeña preparación, puedes manejar cada etapa de una visita al restaurante con facilidad y confianza.',
      sections: [
        {
          heading: 'Antes de llegar: hacer una reserva',
          paragraphs: [
            'Reservar por teléfono es sencillo una vez que conoces la fórmula. Indica qué quieres, cuántas personas y cuándo. Agregar "please" al final es esencial — te hace sonar educado en lugar de exigente.',
            'Cuando llegas y te registras, ten tu nombre listo. Si hay espera, las frases a continuación te ayudarán a navegar la situación sin sentirte incómodo.',
          ],
          examples: [
            '✓ "Hi, I\'d like to make a reservation for two people for Saturday at 8 p.m., please."',
            '✓ "Good evening — we have a reservation under the name Torres."',
            '✓ "We don\'t have a reservation — do you have a table for three available?"',
            '✓ "How long is the wait?" / "Is it possible to sit at the bar while we wait?"',
          ],
          callouts: [
            {
              type: 'formula',
              title: 'Hacer una reserva — fórmula universal',
              formula: 'I\'d like to make a reservation for [#] people for [día] at [hora], please.',
              examples: [
                '✓ "I\'d like to make a reservation for four people for Saturday at 7 p.m., please."',
                '✓ "Could I book a table for two for tomorrow evening?"',
              ],
            },
          ],
        },
        {
          heading: 'Ordenar bebidas y comida',
          paragraphs: [
            'Los meseros en países de habla inglesa están entrenados para ser amables y pacientes, así que no hay presión para apresurarse. Si necesitas un momento, simplemente di "Could we have a few more minutes, please?" A nadie le molestará.',
            'Cuando estés listo, usa "I\'d like" o "Could I have" — ambas suenan naturales y educadas. Evita el directo "I want", que es gramaticalmente correcto pero puede sonar grosero en un contexto de servicio. Si quieres pedir una recomendación, los meseros genuinamente aprecian la pregunta — les da la oportunidad de hablar sobre el menú.',
            'Para restricciones dietéticas, siempre consulta directamente con el mesero en lugar de asumir. Frases como "I\'m allergic to" son importantes porque señalan una preocupación de salud, no solo una preferencia — y el personal tomará precauciones extra en la cocina.',
          ],
          examples: [
            '✓ "Could I have the grilled chicken with a side salad, please?"',
            '✓ "I\'d like the pasta, but could I have it without the cheese?"',
            '✓ "What do you recommend for a starter?"',
            '✓ "Is the curry very spicy, or is it mild?"',
            '✓ "I\'m allergic to shellfish — does this dish contain any?"',
            '✓ "Do you have any vegetarian or vegan options?"',
          ],
          callouts: [
            {
              type: 'watchOut',
              wrong: '"I want the salmon."',
              correct: '"I\'d like the salmon, please." / "I\'ll have the salmon."',
              explanation: '"I want" es gramaticalmente correcto pero suena exigente en un restaurante. Usa "I\'d like" o "I\'ll have" + "please" para sonar educado y natural.',
            },
            {
              type: 'keyQuestion',
              questions: [
                { question: '¿Quieres sonar muy educado y formal?', answer: 'Usa "Could I have…, please?"' },
                { question: '¿Quieres sonar educado y casual?', answer: 'Usa "Can I have…, please?" o "I\'ll have…"' },
                { question: '¿Quieres expresar una preferencia clara?', answer: 'Usa "I\'d like…, please."' },
              ],
            },
          ],
        },
        {
          heading: 'Durante la comida: manejar problemas con educación',
          paragraphs: [
            'Los errores ocurren en los restaurantes — un plato equivocado, un artículo faltante, algo que no está del todo bien. Manejarlos con educación en inglés es una habilidad real, y la clave es mantenerse calmado y usar un lenguaje suavizador. En lugar de "This is wrong," di "I think there might be a small mix-up."',
            'Si necesitas llamar la atención del mesero, "Excuse me" dicho con contacto visual siempre es apropiado. Evita agitar la mano o chasquear los dedos — en la mayoría de los restaurantes de habla inglesa, esto se considera de mala educación.',
          ],
          examples: [
            '✓ "Excuse me — I think I ordered the salmon, not the tuna."',
            '✓ "Sorry to bother you — could we get some more bread, please?"',
            '✓ "This is a little cold — would it be possible to warm it up?"',
            '✓ "Everything is delicious, thank you so much."',
          ],
          callouts: [
            {
              type: 'watchOut',
              wrong: '"This is wrong. I didn\'t order this."',
              correct: '"I think there might be a small mix-up — I ordered the salmon."',
              explanation: 'Siempre suaviza las quejas en inglés. Usa "I think there might be…" o "Sorry, I believe…" en lugar de confrontar directamente.',
            },
          ],
        },
        {
          heading: 'Pagar la cuenta',
          paragraphs: [
            'Pedir la cuenta es simple, pero el vocabulario difiere entre el inglés británico y el americano. Ambos se entienden en todas partes, así que usa el que se sienta más natural.',
            'Dividir la cuenta es común, especialmente entre amigos o colegas. Los meseros están muy acostumbrados a la solicitud y generalmente preguntan en cuántas partes quieres dividirla. En EE. UU., Canadá y el Reino Unido, dejar propina es costumbre — alrededor del 10–20% dependiendo del país y la calidad del servicio. Si no estás seguro, "Is service included?" es una pregunta perfectamente educada.',
          ],
          examples: [
            '✓ "Could we have the bill, please?" (British English)',
            '✓ "Can we get the check, please?" (American English)',
            '✓ "Could we split the bill between four people?"',
            '✓ "I\'ll take care of it — it\'s on me."',
            '✓ "Is service included, or should we leave a tip?"',
            '✓ "Do you take credit cards / contactless payment?"',
          ],
          callouts: [
            {
              type: 'countryNote',
              topic: 'Pedir la cuenta',
              british: '"Could we have the bill, please?"',
              american: '"Can we get the check, please?"',
              note: 'Ambas son correctas — pero suenan muy distintas según el país. En Australia y Nueva Zelanda se usa "bill" (como en UK).',
            },
            {
              type: 'countryNote',
              topic: 'Dejar propina',
              british: 'UK: 10-12.5% es estándar  ·  a menudo "service is included"',
              american: 'US: 18-22% es la norma  ·  casi siempre se espera, incluso con mal servicio',
              note: 'Si no estás seguro, pregunta "Is service included?" — es una pregunta perfectamente educada.',
            },
          ],
        },
      ],
      tip: 'La palabra más poderosa en un restaurante es "please". Transforma cualquier solicitud de una exigencia a una interacción educada. "The salmon, please" suena infinitamente más amigable que "I want the salmon." Combínala con "could" para un tono aún más suave: "Could I have the salmon, please?" — y siempre dejarás una gran impresión.',
      closing:
        'El inglés en restaurantes es maravillosamente repetitivo — las mismas frases funcionan tanto en Edimburgo como en Nueva York o Melbourne. Practica estos patrones en voz alta algunas veces antes de tu próxima visita, y ordenarás con verdadera confianza en cualquier lugar del mundo de habla inglesa.',
      commonMistakes: [
        { wrong: '"I want the salmon."', correct: '"I\'d like the salmon, please."', why: '"I want" suena exigente en contexto de servicio — usa "I\'d like" o "I\'ll have" con "please".' },
        { wrong: '"Waiter! Waiter!" (gritando o agitando la mano)', correct: '"Excuse me…" (con contacto visual)', why: 'En UK/US llamar al mesero directamente o agitar la mano se considera grosero — usa "Excuse me" con contacto visual.' },
        { wrong: '"This is wrong."', correct: '"I think there might be a small mix-up."', why: 'Suaviza siempre las quejas. El inglés prefiere indirectas educadas sobre confrontaciones directas.' },
        { wrong: '"Give me the menu."', correct: '"Could we see the menu, please?"', why: 'Comandos directos sin "please" suenan groseros. Siempre usa "Could we..." o "Can I have..." + "please".' },
        { wrong: '"Do you have vegetarian option?"', correct: '"Do you have any vegetarian options?"', why: 'Usa "any" con plurales contables para preguntas de disponibilidad: any options, any allergies, any specials.' },
      ],
      exercise: {
        instructions: 'Choose the most polite and natural phrase for each situation. / Elige la frase más educada y natural para cada situación.',
        questions: [
          'You just sat down. How do you ask for the menu?',
          'You\'re ready to order your main course. What do you say?',
          'The waiter brought the wrong dish. How do you tell them?',
          'You\'ve finished eating and want to pay. What do you ask for in the US?',
          'You want to split the bill with your friends. What do you say?',
        ],
        answers: [
          { answer: '"Could we see the menu, please?"', explanation: '"Could we…, please?" es el opener más seguro y educado.' },
          { answer: '"I\'ll have / I\'d like the grilled chicken, please."', explanation: 'Ambas opciones suenan naturales y educadas. Nunca uses "I want".' },
          { answer: '"Excuse me — I think there might be a mix-up."', explanation: 'Suaviza con "I think there might be" en lugar de "This is wrong".' },
          { answer: '"Can we get the check, please?"', explanation: 'En EE. UU. se dice "check". En UK sería "Could we have the bill, please?"' },
          { answer: '"Could we split the bill, please?"', explanation: 'Siempre "could" + "please" — es la fórmula mágica.' },
        ],
      },
      closingQuote: {
        quote: 'Learning is not attained by chance, it must be sought for with ardour and diligence.',
        translation: 'Aprender no se logra por casualidad; debe buscarse con pasión y disciplina. — Abigail Adams',
      },
    },
  },
  {
    id: 6,
    slug: 'how-to-make-small-talk',
    category: 'Conversación',
    title: 'Cómo Hacer Small Talk Como un Hablante Nativo',
    excerpt:
      'La conversación casual no es insignificante — construye confianza y abre puertas. Aprende los temas, las frases y las reglas no escritas que hacen que la conversación fluya naturalmente.',
    readTime: '6 min de lectura',
    level: 'Intermedio',
    variant: 'teal',
    image: smallTalkImg,
    body: {
      hook:
        'Entras a un ascensor con un colega. Faltan treinta segundos para tu piso. ¿Miras tu teléfono? ¿Comentas el clima? En las culturas de habla inglesa, esos treinta segundos son una oportunidad — un pequeño pero real momento de conexión humana. El small talk no es un relleno superficial. Es cómo las personas construyen confianza, establecen rapport y hacen la transición hacia conversaciones más profundas y significativas. Y para los estudiantes de inglés, dominarlo es una de las habilidades de mayor retorno que puedes desarrollar, porque abre puertas que el puro conocimiento gramatical nunca abrirá.',
      sections: [
        {
          heading: 'Temas seguros y frases de apertura probadas',
          paragraphs: [
            'Los temas clásicamente seguros en inglés son: el clima, planes para el fin de semana, viajes, comida, eventos locales y contexto compartido (la reunión en la que están ambos, la oficina, el curso que toman). Estos funcionan porque son de bajo riesgo — nadie se siente juzgado por su opinión sobre el clima.',
            'Los mejores arranques son preguntas abiertas que invitan a una respuesta real en lugar de un sí o no. Compara "Is it cold outside?" (sí/no) con "How are you finding this weather lately?" (abre un intercambio real). La segunda versión le da al otro la oportunidad de responder con su propia experiencia.',
            'Los arranques específicos al contexto suelen ser los más naturales. En un evento de trabajo: "How do you know the organiser?" En una conferencia: "Have you been to this event before?" Un lunes: "Did you do anything nice over the weekend?" Se sienten más genuinos que un arranque genérico porque reconocen la situación compartida en la que ambos están.',
          ],
          examples: [
            '✓ "Lovely day, isn\'t it? Finally some sunshine."',
            '✓ "How are you finding the new office space?"',
            '✓ "Have you been anywhere nice recently?"',
            '✓ "Did you catch the game last night?"',
            '✓ "I\'ve been meaning to try that café — have you been?"',
          ],
          callouts: [
            {
              type: 'keyQuestion',
              questions: [
                { question: '¿Mi pregunta se puede responder solo con "sí" o "no"?', answer: 'Mala señal — reformula para abrir un intercambio real' },
                { question: '¿Invita al otro a compartir una experiencia o una opinión?', answer: 'Buena señal — "How are you finding…?" es mejor que "Is it good?"' },
              ],
            },
          ],
        },
        {
          heading: 'Temas a evitar y notas culturales',
          paragraphs: [
            'En la mayoría de las culturas de habla inglesa — particularmente el Reino Unido, EE. UU., Canadá y Australia — el small talk tiene reglas no oficiales sobre lo que es demasiado personal. El dinero es el mayor: preguntar cuánto gana alguien, cuánto costó su casa o comentar sobre lo caro que fue algo que compró se considera intrusivo. La edad y el peso también son sensibles, especialmente con personas que no conoces bien.',
            'La religión y la política no están siempre prohibidas, pero requieren leer el ambiente. En un entorno casual con alguien que acabas de conocer, plantear un tema político controvertido puede poner a las personas a la defensiva. Un comentario ligero sobre un evento actual es diferente a abrir un debate.',
            'Quizás lo más importante: evita la negatividad sostenida. Una breve queja compartida — "This queue is taking forever, isn\'t it?" — es una herramienta clásica de conexión. Pero lanzarse en una larga lista de quejas hará que el otro se sienta agotado y busque una salida. El small talk debe sentirse ligero y energizante.',
          ],
          callouts: [
            {
              type: 'watchOut',
              wrong: '"So, how much do you earn?" / "What religion are you?"',
              correct: '"How are you finding the new office?" / "Have you seen any good films lately?"',
              explanation: 'Dinero, edad, peso, política y religión son temas tabú en el small talk anglófono. Empieza con temas neutros y deja que la conversación se profundice sola.',
            },
          ],
        },
        {
          heading: 'Cómo mantener la conversación',
          paragraphs: [
            'El secreto de un buen small talk es aparecer genuinamente interesado en la respuesta del otro — y la manera más fácil de aparecer genuinamente interesado es estarlo de verdad. Haz preguntas de seguimiento basadas en lo que dicen, no en lo que planeabas preguntar.',
            'Si alguien menciona que fue de senderismo el fin de semana, no solo digas "Nice" y sigas adelante. Di "Oh, where did you go?" o "I\'ve always wanted to try hiking — do you go often?" Esta técnica, llamada el método "echo and extend", muestra que estabas escuchando y crea un intercambio natural.',
            'Conectar su historia con la tuya — brevemente — también ayuda: "That reminds me of a trip I took to..." Solo asegúrate de devolver el foco a ellos rápidamente. Un buen small talk es más como el tenis que un monólogo.',
          ],
          examples: [
            '✓ "Oh really? How long have you been doing that?"',
            '✓ "That sounds amazing — I\'ve always wanted to visit there."',
            '✓ "Wow, that must have been quite an experience."',
            '✓ "I did something similar once — it\'s funny you mention that."',
            '✓ "Tell me more — how did it turn out?"',
          ],
        },
        {
          heading: 'Cómo terminar una conversación con gracia',
          paragraphs: [
            'Terminar una conversación de small talk es una habilidad que los estudiantes raramente practican — sin embargo, terminar mal puede deshacer la calidez de todo lo anterior. La clave es dar una "señal de pre-cierre" antes de irte realmente. Esto prepara al otro y evita cualquier brusquedad.',
            'Frases útiles de pre-cierre: "Anyway, I should let you get back to it" o "I don\'t want to keep you — I know you\'re busy". Estas reconocen el tiempo del otro. Luego cierra calurosamente con algo que mire al futuro: "It was great chatting — let\'s do it again soon" o "I\'ll see you at the meeting on Thursday."',
            'Si quieres continuar la conexión más allá de la conversación, un simple "We should grab a coffee sometime" es una forma natural y sin presiones de sugerirlo. En la cultura profesional de habla inglesa, este tipo de seguimiento social ligero es normal y apreciado.',
          ],
          examples: [
            '✓ "Anyway, I\'ll let you get back to it — it was nice catching up."',
            '✓ "I should head off, but this was really fun."',
            '✓ "Let\'s do this again — I\'ll see you Thursday."',
            '✓ "We should grab coffee sometime. I\'d love to hear more about that."',
          ],
        },
      ],
      tip: 'Antes de cualquier evento social, reunión de trabajo o sesión de networking, prepara tres temas de small talk listos para usar. Tenerlos preparados elimina el pánico de "¿Qué digo?" y libera tu cerebro para concentrarte realmente en el otro. Descubrirás que raramente usas los tres — pero tenerlos en reserva te hace sentir mucho más relajado.',
      closing:
        'El small talk es una habilidad, no un talento — y como cualquier habilidad, mejora con práctica deliberada. Empieza con pequeñas cosas: un comentario al barista, una pregunta a un colega en el ascensor, una observación a alguien en el gimnasio. Cada pequeña interacción construye el hábito, y el hábito construye la fluidez.',
      commonMistakes: [
        { wrong: 'Preguntar "How much do you earn?" en la primera conversación', correct: 'Quedarse en temas neutros: clima, fin de semana, el evento actual', why: 'En la cultura anglófona hablar de dinero con desconocidos o colegas nuevos se considera invasivo.' },
        { wrong: 'Responder "How are you?" con un informe médico detallado', correct: 'Responder "I\'m good, thanks! You?"', why: '"How are you?" en anglófono es casi un saludo, no una pregunta real. La respuesta esperada es corta y positiva.' },
        { wrong: 'Decir "Cool" y quedarse en silencio tras una respuesta', correct: 'Hacer una pregunta de seguimiento ("Oh really? Where did you go?")', why: 'El silencio después de una respuesta mata la conversación. Usa el método "echo and extend".' },
        { wrong: 'Hablar solo de ti mismo durante toda la conversación', correct: 'Devolver la pelota con "What about you?" o "Have you tried it?"', why: 'El small talk es como el tenis — debe ir y venir. Un monólogo agota al otro.' },
        { wrong: 'Irse bruscamente sin transición ("Bye")', correct: 'Usar un pre-cierre: "Anyway, I\'ll let you get back to it — it was great chatting!"', why: 'Terminar mal deshace toda la calidez anterior. Siempre usa una señal de pre-cierre.' },
      ],
      exercise: {
        instructions: 'Choose the best small-talk response for each situation. / Elige la mejor respuesta de small talk para cada situación.',
        questions: [
          'A colleague says: "Lovely weather today, isn\'t it?" What\'s a good response?',
          'Someone at a networking event asks: "How do you know the organiser?" You\'re a mutual friend.',
          'At work on Monday morning, you want to start small talk. What do you say?',
          'You need to leave a conversation gracefully. What do you say?',
          'A stranger asks "How are you?" at the coffee shop. What\'s the expected response?',
        ],
        answers: [
          { answer: '"Finally some sunshine! Are you doing anything outdoors this weekend?"', explanation: 'Confirma + pregunta abierta → mantiene la conversación viva.' },
          { answer: '"Oh, we went to uni together — have you known them long?"', explanation: 'Comparte + devuelve con pregunta abierta.' },
          { answer: '"Did you do anything nice over the weekend?"', explanation: 'Clásico lunes — contextual y abierto.' },
          { answer: '"Anyway, I should let you get back to it — it was great catching up."', explanation: 'Pre-cierre educado + cierre cálido.' },
          { answer: '"I\'m good, thanks! You?"', explanation: 'Respuesta esperada: corta, positiva, y devolviendo la pregunta.' },
        ],
      },
      closingQuote: {
        quote: 'The more languages you know, the more you are human.',
        translation: 'Cuantos más idiomas sabes, más humano eres. — Tomáš Masaryk',
      },
    },
  },
  {
    id: 7,
    slug: 'understanding-phrasal-verbs',
    category: 'Vocabulario',
    title: 'El Complicado Mundo de los Phrasal Verbs',
    excerpt:
      '¿Por qué "give up" significa rendirse y "give in" significa ceder? Los phrasal verbs siguen patrones que los hacen más fáciles de aprender de lo que crees.',
    readTime: '6 min de lectura',
    level: 'Intermedio',
    variant: 'dark',
    image: phrasalVerbsImg,
    body: {
      hook:
        'Un estudiante le pregunta a su profesor: "Can you look up this word for me?" El profesor dice: "Sure — let me look it up." El estudiante está confundido: ¿"look up" es el verbo o "look it up"? Ambos son el mismo phrasal verb — solo que se han separado de manera diferente. Los phrasal verbs son una de las características definitorias del inglés natural y fluido, y siguen reglas que la mayoría de los libros de texto nunca explican. Una vez que entiendes esas reglas, la confusión disminuye drásticamente.',
      sections: [
        {
          heading: 'Por qué los phrasal verbs parecen imposibles al principio',
          paragraphs: [
            'Un phrasal verb es un verbo principal combinado con una o dos partículas (preposiciones o adverbios) que juntos crean un nuevo significado — a menudo completamente ajeno al verbo original. "Run" significa correr. "Run into" significa encontrarse con alguien inesperadamente. "Run out of" significa no tener nada que quede. "Run away" significa escapar. El mismo verbo, cuatro significados completamente diferentes.',
            'Lo que hace esto especialmente desorientador es que incluso pequeños cambios en la partícula cambian completamente el significado. "Give up" significa dejar de intentarlo. "Give in" significa dejar de resistir. "Give back" significa devolver algo. "Give away" significa donar o revelar un secreto. No puedes adivinar uno a partir del otro.',
            'La buena noticia: hay alrededor de 200 phrasal verbs que cubren la gran mayoría del inglés cotidiano. Y hay patrones de partículas que te permiten hacer suposiciones razonables sobre nuevos que nunca has visto antes.',
          ],
          callouts: [
            {
              type: 'nerdyMode',
              term: 'partícula',
              definition: 'Es la palabra pequeña que se combina con un verbo para formar un phrasal verb. Puede ser una preposición (in, on, at) o un adverbio (up, down, out, off, away).',
              example: 'En "give up", "up" es la partícula. Cambiarla por otra cambia totalmente el significado: give in (ceder), give back (devolver), give away (donar).',
            },
          ],
        },
        {
          heading: 'Patrones de partículas que te ayudan a descifrar nuevos',
          paragraphs: [
            '"Up" tiene dos significados amplios en muchos phrasal verbs. El primero es completitud o finalización: eat up (terminar de comer), use up (agotar), save up (acumular), clean up (limpiar completamente). El segundo es aumento o intensidad: speak up (hablar más fuerte), turn up (aumentar el volumen o llegar), cheer up (animarse), speed up (acelerar).',
            '"Down" a menudo sugiere lo opuesto — disminución, calmarse o fracaso: slow down, calm down, break down (dejar de funcionar o desbordarse emocionalmente), turn down (rechazar o disminuir), narrow down (reducir opciones). "Out" frecuentemente significa hasta completar o hasta el final: figure out, find out, run out of, fill out, work out, burn out. "Off" a menudo señala separación o partida: take off, go off (explotar o echarse a perder), put off (posponer), cut off, log off.',
            'Estos patrones no te llevarán al significado exacto siempre, pero son lo suficientemente poderosos como para permitirte hacer una suposición razonable cuando encuentras un phrasal verb desconocido en contexto.',
          ],
          examples: [
            '→ "up" = completion: eat up, drink up, finish up, use up, save up',
            '→ "up" = increase: speed up, turn up, cheer up, step up',
            '→ "down" = decrease: slow down, turn down, cut down, narrow down',
            '→ "out" = to completion: figure out, find out, run out, work out',
            '→ "off" = separation/departure: take off, call off, put off, log off',
          ],
          callouts: [
            {
              type: 'quickMap',
              columns: [
                {
                  header: 'UP / OUT (completitud, aumento)',
                  items: [
                    'UP = terminar algo: eat up, use up, finish up',
                    'UP = aumentar: speed up, cheer up, turn up',
                    'OUT = hasta el final: figure out, find out, work out',
                    'OUT = completar: fill out, sort out, carry out',
                  ],
                },
                {
                  header: 'DOWN / OFF (disminución, separación)',
                  items: [
                    'DOWN = reducir: slow down, cut down, narrow down',
                    'DOWN = fallar/colapsar: break down, let down',
                    'OFF = separar/partir: take off, cut off, log off',
                    'OFF = cancelar/posponer: call off, put off',
                  ],
                },
              ],
            },
          ],
        },
        {
          heading: 'Separables vs. inseparables: la gramática detrás de la confusión',
          paragraphs: [
            'Algunos phrasal verbs son separables — puedes poner un objeto entre el verbo y la partícula. Otros son inseparables — el verbo y la partícula deben quedarse juntos. Esta es la fuente de la confusión del estudiante al principio de este artículo.',
            'Phrasal verbs separables: "turn off the light" y "turn the light off" son ambos correctos. Pero aquí está la regla clave: si el objeto es un pronombre (it, him, her, them), debe ir entre el verbo y la partícula. "Turn it off" — nunca "turn off it".',
            'Los phrasal verbs inseparables deben permanecer juntos y el objeto viene después del phrasal verb completo. "Look after the baby" — nunca "look the baby after". "Come across an old photo" — nunca "come an old photo across". Simplemente tienes que aprender qué tipo es cada phrasal verb.',
          ],
          examples: [
            '✓ She turned off the music. / She turned the music off.',
            '✓ She turned it off. (pronoun → must go in the middle)',
            '✗ She turned off it.',
            '✓ Can you look after my dog this weekend? (inseparable)',
            '✗ Can you look my dog after?',
            '✓ I ran into Maria at the supermarket. (inseparable)',
          ],
          callouts: [
            {
              type: 'nerdyMode',
              term: 'separable vs. inseparable',
              definition: 'Separable: puedes poner el objeto entre el verbo y la partícula (turn the light off). Inseparable: el verbo y la partícula siempre van juntos (look after the baby).',
              example: 'Regla crítica: si el objeto es un pronombre (it, him, them) con un phrasal verb separable, el pronombre SIEMPRE va en el medio. "Turn it off" — nunca "turn off it".',
            },
            {
              type: 'watchOut',
              wrong: '"She turned off it."',
              correct: '"She turned it off."',
              explanation: 'Con los phrasal verbs separables, los pronombres (it, him, her, them) SIEMPRE van entre el verbo y la partícula. Con sustantivos completos puedes elegir la posición.',
            },
          ],
        },
        {
          heading: 'Phrasal verbs de alta frecuencia para aprender primero',
          paragraphs: [
            'En lugar de intentar aprender cientos a la vez, concéntrate en los que aparecen con más frecuencia en la conversación cotidiana y el inglés profesional. Estos son los que mejorarán inmediatamente lo natural que suenas.',
            'Para la vida diaria y las relaciones: pick up (recoger o aprender informalmente), come up with (pensar una idea), get along with (llevarse bien), put off (posponer), end up (terminar en una situación), bring up (mencionar un tema o criar a un hijo), fall out with (tener una discusión y dejar de ser amigos).',
            'Para contextos profesionales y académicos: set up (organizar o instalar), carry out (realizar o ejecutar), go over (revisar), hand in (entregar), point out (señalar), take on (aceptar responsabilidad), follow up (continuar el contacto), look into (investigar).',
          ],
          examples: [
            '✓ "We need to set up a meeting before Friday."',
            '✓ "Can you go over the report one more time?"',
            '✓ "She came up with an excellent solution."',
            '✓ "I\'ll follow up with you by email tomorrow."',
            '✓ "Don\'t put off the conversation — it will just get harder."',
            '✓ "He ended up staying three extra hours."',
          ],
          callouts: [
            {
              type: 'countryNote',
              topic: 'Resolver un problema',
              british: '"I\'ll sort it out by tomorrow." (sort out = resolver)',
              american: '"I\'ll figure it out by tomorrow." (figure out = resolver)',
              note: 'Ambos se entienden en todas partes, pero escucharás "sort out" mucho más en UK y "figure out" más en EE. UU. — útil saber cuál usar según el público.',
            },
          ],
        },
      ],
      tip: 'Aprende los phrasal verbs en contexto, no de forma aislada. Cuando encuentres uno nuevo, anota la oración completa en la que apareció — no solo el phrasal verb en sí. "She finally gave up trying to fix the printer" es mucho más memorable que "give up = quit" en una lista. La oración le da a tu memoria una historia a la que aferrarse.',
      closing:
        'Los phrasal verbs pueden parecer un laberinto sin fin, pero aproximadamente 150 de ellos cubren la gran mayoría del inglés cotidiano. Empieza con los de alta frecuencia en este artículo, apréndelos en oraciones y presta atención a cómo los usan los hablantes nativos en conversaciones, películas y podcasts. Tu vocabulario crecerá de manera natural desde allí.',
      commonMistakes: [
        { wrong: '"She turned off it."', correct: '"She turned it off."', why: 'Los pronombres siempre van en el medio con phrasal verbs separables — nunca al final.' },
        { wrong: '"Can you look after of my dog?"', correct: '"Can you look after my dog?"', why: '"Look after" es inseparable y no lleva "of" — el objeto va directamente después.' },
        { wrong: '"I gave up to try."', correct: '"I gave up trying."', why: 'Después de "give up" usa -ing, no "to" + infinitivo.' },
        { wrong: 'Memorizar listas de phrasal verbs sin contexto', correct: 'Memorizar oraciones completas donde aparecen', why: 'Los phrasal verbs son contextuales — una oración te da una historia a la que aferrarte; una lista se olvida en días.' },
        { wrong: 'Confundir "give up" (rendirse) con "give in" (ceder)', correct: 'Recordar: "up" = stop trying  ·  "in" = stop resisting', why: 'Un cambio de partícula = un cambio completo de significado. Presta atención a cuál aparece en cada contexto.' },
      ],
      exercise: {
        instructions: 'Choose the correct phrasal verb form or classify as separable / inseparable. / Elige la forma correcta o clasifica como separable / inseparable.',
        questions: [
          'Complete: "Turn ________ (it / off) please, I\'m trying to sleep."',
          'Is "look after" separable or inseparable? → "Can you look ________ (after the kids / the kids after)?"',
          'Complete: "She came ________ a brilliant idea during the meeting." (up with / up / on)',
          'Complete: "Let\'s ________ off the meeting until next week." (put / turn / take)',
          'Complete: "I ran ________ an old friend at the supermarket." (into / over / on)',
          'Separable or inseparable? "give up trying"',
        ],
        answers: [
          { answer: '"Turn it off"', explanation: 'Pronombre → siempre en el medio con verbos separables.' },
          { answer: 'Inseparable: "look after the kids"', explanation: '"Look after" no admite objeto en el medio, incluso con pronombres.' },
          { answer: '"came up with"', explanation: '"Come up with" = pensar/producir una idea.' },
          { answer: '"put off"', explanation: '"Put off" = posponer.' },
          { answer: '"ran into"', explanation: '"Run into" = encontrarse con alguien inesperadamente (inseparable).' },
          { answer: 'Inseparable (en la práctica)', explanation: '"Give up" con un objeto puede separarse ("give it up"), pero con -ing siempre va junto: "give up trying".' },
        ],
      },
      closingQuote: {
        quote: 'Language is the dress of thought.',
        translation: 'El idioma es el vestido del pensamiento. — Samuel Johnson',
      },
    },
  },
  {
    id: 8,
    slug: 'reported-speech-explained',
    category: 'Gramática',
    title: 'Estilo Indirecto: Cómo Reportar lo que Otros Dijeron',
    excerpt:
      'Aprende a reportar con precisión lo que alguien más dijo sin citarlo directamente. Domina los cambios de tiempo verbal, de pronombres y de expresiones de tiempo.',
    readTime: '6 min de lectura',
    level: 'Intermedio',
    variant: 'plain',
    image: reportedSpeechImg,
    body: {
      hook:
        'Llamas a un amigo después de una entrevista de trabajo y quieres contarle todo lo que se dijo. "The interviewer told me she was impressed with my background. She said she would be in touch by Friday. She asked me whether I had any questions about the role." Sin saberlo, acabas de usar el estilo indirecto tres veces. El estilo indirecto no es un tema gramatical exótico — es algo que usas todos los días cada vez que transmites información de una persona a otra. La mecánica es simple una vez que entiendes el principio subyacente: todo retrocede un paso en el tiempo.',
      sections: [
        {
          heading: 'El cambio de tiempo verbal: todo retrocede un paso',
          paragraphs: [
            'Cuando reportas lo que alguien dijo, cada tiempo verbal retrocede un paso más hacia el pasado. La razón es lógica: estás reportando algo que se dijo en un momento anterior, y el inglés marca esa distancia gramaticalmente.',
            'El present simple se convierte en past simple. El present continuous se convierte en past continuous. El present perfect se convierte en past perfect. El past simple también se convierte en past perfect. Will se convierte en would. Can se convierte en could. May se convierte en might. El patrón es consistente — siempre un paso atrás.',
            'Esto puede sentirse mecánico al principio, pero rápidamente se vuelve instintivo. La clave es practicar la conversión de discurso directo a indirecto hasta que el cambio se sienta automático.',
          ],
          examples: [
            '→ "I am tired." → She said she was tired.',
            '→ "I\'m working on the report." → He said he was working on the report.',
            '→ "I have finished the project." → She said she had finished the project.',
            '→ "I saw the film last week." → He said he had seen the film the week before.',
            '→ "I will call you tomorrow." → She said she would call me the next day.',
            '→ "I can help you." → He said he could help me.',
          ],
          callouts: [
            {
              type: 'nerdyMode',
              term: 'retroceso temporal (backshift)',
              definition: 'Es la regla clave del estilo indirecto: cada tiempo verbal retrocede un paso hacia el pasado cuando reportas lo que alguien dijo.',
              example: 'Present → Past  ·  Past → Past Perfect  ·  Will → Would  ·  Can → Could. Es mecánico, pero una vez que lo interiorizas, se vuelve automático.',
            },
            {
              type: 'formula',
              title: 'Backshift — tabla esencial',
              formula: 'Present simple  →  Past simple\nPresent continuous  →  Past continuous\nPresent perfect  →  Past perfect\nPast simple  →  Past perfect\nWill  →  Would\nCan  →  Could\nMay  →  Might',
            },
          ],
        },
        {
          heading: 'Pronombres y expresiones de tiempo: qué más cambia',
          paragraphs: [
            'No son solo los tiempos verbales los que cambian — los pronombres también deben cambiar para reflejar la perspectiva de quien reporta, no la del hablante original. "I" típicamente se convierte en "he" o "she". "My" se convierte en "his" o "her". "We" se convierte en "they". "You" depende del contexto — si el hablante original te hablaba directamente a ti, "you" se convierte en "I".',
            'Las expresiones de tiempo y lugar también cambian porque el momento de reportar es diferente del momento en que se habló. "Today" se convierte en "that day". "Yesterday" se convierte en "the day before" o "the previous day". "Tomorrow" se convierte en "the following day" o "the next day". "Here" se convierte en "there". "This" se convierte en "that".',
            'Estos cambios pueden parecer abrumadores cuando se enumeran todos a la vez, pero en la práctica solo lidias con los que aparecen en la oración que estás reportando. La mayoría del estilo indirecto solo requiere dos o tres cambios por oración.',
          ],
          examples: [
            '→ "I\'ll see you tomorrow." → She said she would see me the following day.',
            '→ "I lost my bag yesterday." → He said he had lost his bag the day before.',
            '→ "I love this city." → She said she loved that city.',
            '→ "We are leaving now." → They said they were leaving then.',
            '→ "Come here, please." → He asked me to go there.',
          ],
          callouts: [
            {
              type: 'watchOut',
              wrong: '"She said she loves this city." (si ella ya no está allí)',
              correct: '"She said she loved that city."',
              explanation: 'No olvides cambiar TAMBIÉN las expresiones de lugar y tiempo: "this" → "that", "here" → "there", "today" → "that day", "tomorrow" → "the next day".',
            },
          ],
        },
        {
          heading: 'Preguntas reportadas: el orden de las palabras es crítico',
          paragraphs: [
            'Las preguntas reportadas siguen reglas diferentes a las declaraciones reportadas, y el error más común es mantener el orden de las palabras de la pregunta en una pregunta reportada. En las preguntas directas, el sujeto y el verbo están invertidos: "Where do you live?" En las preguntas reportadas, vuelves al orden normal de declaración.',
            'Para preguntas de sí/no, usa "if" o "whether" para introducir la pregunta reportada. Para preguntas con palabra interrogativa (wh-questions), mantén la palabra interrogativa pero cambia al orden de declaración. El verbo cambia exactamente como lo hace en las declaraciones reportadas.',
          ],
          examples: [
            '→ "Do you speak Spanish?" → She asked me if I spoke Spanish.',
            '→ "Are you coming to the party?" → He asked whether I was coming to the party.',
            '→ "Where do you work?" → She asked where I worked. (not "where did I work")',
            '→ "What time does the train leave?" → He asked what time the train left.',
            '✗ She asked me where did I work.',
            '✓ She asked me where I worked.',
          ],
          callouts: [
            {
              type: 'watchOut',
              wrong: '"She asked me where did I work."',
              correct: '"She asked me where I worked."',
              explanation: 'En preguntas reportadas, el orden de palabras vuelve al de una declaración: sujeto + verbo. No mantienes la inversión ("did I") de la pregunta directa.',
            },
            {
              type: 'formula',
              title: 'Reported Questions',
              formula: 'Yes/No question:  asked + if / whether + subject + verb\nWh- question:  asked + wh-word + subject + verb',
              examples: [
                '✓ "Do you live here?" → She asked if I lived there.',
                '✓ "Where is the station?" → He asked where the station was.',
              ],
            },
          ],
        },
        {
          heading: 'Reportar órdenes y solicitudes — y cuándo no hacer el cambio de tiempo',
          paragraphs: [
            'Las órdenes y solicitudes en estilo indirecto usan "told/asked + persona + infinitivo". Para órdenes negativas, agrega "not" antes del infinitivo. Esta estructura es muy común en contextos profesionales y cotidianos.',
            'Una nota importante sobre la regla del cambio de tiempo: a veces es opcional. Si la información reportada todavía es verdadera en el momento de reportar, puedes mantener el tiempo original. "She said she works in a bank" es aceptable si todavía trabaja allí. Sin embargo, "she said she worked in a bank" es siempre gramaticalmente correcto — así que cuando tengas dudas, aplica el cambio.',
          ],
          examples: [
            '→ "Close the window." → She told me to close the window.',
            '→ "Don\'t be late." → He told me not to be late.',
            '→ "Could you send me the file?" → She asked me to send her the file.',
            '→ "Please wait outside." → He asked us to wait outside.',
            '✓ Optional: She said she lives in Madrid. (still true now)',
            '✓ Always safe: She said she lived in Madrid. (backshift applied)',
          ],
          callouts: [
            {
              type: 'keyQuestion',
              questions: [
                { question: '¿La información reportada sigue siendo verdadera ahora mismo?', answer: 'Backshift es OPCIONAL — puedes mantener el tiempo original' },
                { question: '¿No estás seguro o la información ya no es vigente?', answer: 'Aplica el backshift — siempre es gramaticalmente correcto' },
              ],
            },
          ],
        },
      ],
      tip: 'El cambio de tiempo verbal a veces es opcional cuando la información todavía es actualmente verdadera, pero aplicarlo de forma consistente siempre es gramaticalmente correcto. Si no estás seguro, cambia el tiempo — nunca estarás equivocado por hacerlo.',
      closing:
        'El estilo indirecto es algo que usas en cada conversación, todos los días. Las reglas mecánicas — cambio de tiempo, cambio de pronombre, cambio de expresión de tiempo — necesitan práctica para volverse automáticas, pero una vez que lo hacen, transmitirás conversaciones con fluidez y confianza, ya sea que estés actualizando a un colega, contándole a un amigo sobre una conversación o escribiendo un correo electrónico profesional.',
      commonMistakes: [
        { wrong: '"She said me she was tired."', correct: '"She told me she was tired." / "She said she was tired."', why: '"Say" no lleva persona directamente — usa "tell + persona" o "say + (to + persona)".' },
        { wrong: '"He said he will come tomorrow."', correct: '"He said he would come the next day."', why: 'Will → Would. Y "tomorrow" cambia a "the next day" / "the following day".' },
        { wrong: '"She asked where did I live."', correct: '"She asked where I lived."', why: 'En preguntas reportadas se vuelve al orden de declaración: sujeto + verbo (sin inversión).' },
        { wrong: '"He told that he was happy."', correct: '"He said that he was happy." / "He told me that he was happy."', why: '"Tell" siempre necesita una persona como objeto directo. "Say" no.' },
        { wrong: '"She said me to be quiet."', correct: '"She told me to be quiet." / "She asked me to be quiet."', why: 'Para órdenes y solicitudes usa "tell/ask + persona + to + infinitivo", no "say".' },
      ],
      exercise: {
        instructions: 'Convert each direct statement into reported speech. / Convierte cada oración en estilo directo a estilo indirecto.',
        questions: [
          '"I am really tired today." (she said)',
          '"I\'ll call you tomorrow." (he said)',
          '"Do you speak French?" (she asked)',
          '"Close the door, please." (he told me)',
          '"I have already finished the report." (she said)',
        ],
        answers: [
          { answer: 'She said (that) she was really tired that day.', explanation: 'Present → Past  ·  "today" → "that day".' },
          { answer: 'He said (that) he would call me the next day.', explanation: 'Will → Would  ·  "tomorrow" → "the next day".' },
          { answer: 'She asked if / whether I spoke French.', explanation: 'Pregunta Yes/No → "if/whether" + orden de declaración.' },
          { answer: 'He told me to close the door.', explanation: 'Órdenes → "told + persona + to + infinitivo".' },
          { answer: 'She said (that) she had already finished the report.', explanation: 'Present Perfect → Past Perfect.' },
        ],
      },
      closingQuote: {
        quote: 'Every language is a world. Without translation, we would inhabit provinces bordering on silence.',
        translation: 'Cada idioma es un mundo. Sin traducción, habitaríamos provincias al borde del silencio. — George Steiner',
      },
    },
  },
  {
    id: 9,
    slug: 'job-interview-english',
    category: 'Situaciones',
    title: 'Inglés para Entrevistas de Trabajo: Preguntas, Respuestas y Consejos',
    excerpt:
      'Prepárate para tu próxima entrevista de trabajo en inglés con las preguntas más comunes, marcos de respuesta sólidos y frases que dejan una impresión profesional.',
    readTime: '7 min de lectura',
    level: 'Avanzado',
    variant: 'teal',
    image: jobInterviewImg,
    body: {
      hook:
        'Una entrevista de trabajo en un segundo idioma es una de las situaciones de inglés de mayor presión que enfrentarás. Las apuestas son altas, la presión es real y el vocabulario es especializado. Pero aquí está la realidad sobre las entrevistas: son profundamente predecibles. Los reclutadores y gerentes de contratación hacen variaciones de las mismas quince o veinte preguntas en casi todas las entrevistas, en casi todas las industrias. Si preparas respuestas sólidas para esas preguntas y practicas diciéndolas en voz alta hasta que fluyan naturalmente, eliminas el mayor obstáculo — no saber qué decir — y puedes concentrarte en mostrar tu personalidad y habilidades genuinas.',
      sections: [
        {
          heading: '"Tell me about yourself" — cómo estructurar tu apertura',
          paragraphs: [
            'Esta es casi siempre la primera pregunta, y no es una invitación a narrar toda tu historia de vida. Los entrevistadores quieren entender tu identidad profesional rápidamente. Una estructura práctica de tres partes funciona siempre: presente, pasado y futuro.',
            'Presente: describe tu rol actual y tu área principal de responsabilidad en una o dos oraciones. Pasado: menciona la experiencia o logro más relevante que te llevó a este punto. Futuro: explica por qué este rol y empresa específicos te entusiasman. Mantén toda la respuesta en menos de dos minutos. El entrevistador hará preguntas de seguimiento sobre lo que encuentre interesante.',
          ],
          examples: [
            '✓ "Currently, I work as a marketing coordinator at a B2B tech company..."',
            '✓ "Before that, I spent three years in content strategy, where I grew organic traffic by 60%..."',
            '✓ "I\'m particularly drawn to this role because your focus on user education aligns with..."',
          ],
          callouts: [
            {
              type: 'formula',
              title: 'Tell me about yourself — estructura Present / Past / Future',
              formula: 'PRESENT (rol actual)  →  PAST (experiencia clave)  →  FUTURE (por qué este rol)',
              examples: [
                '✓ "Currently, I\'m a [role] at [company], focused on [area]."',
                '✓ "Before that, I spent [X years] in [field], where I [key achievement]."',
                '✓ "I\'m drawn to this role because [specific reason that connects to the company]."',
              ],
            },
          ],
        },
        {
          heading: 'Preguntas de comportamiento: el método STAR',
          paragraphs: [
            'Las preguntas de comportamiento preguntan sobre tu experiencia pasada como forma de predecir el desempeño futuro. Siempre comienzan con frases como "Tell me about a time when…" o "Can you give me an example of…" o "Describe a situation where…" El método STAR es el marco más efectivo para responder estas.',
            'STAR significa: Situation (establece el contexto brevemente — dónde, cuándo, qué estaba pasando), Task (tu rol o responsabilidad específica en esa situación), Action (lo que personalmente hiciste — usa "I" no "we"), Result (el resultado, idealmente con un número o cambio medible).',
            'Los temas STAR más comunes: manejar un colega o cliente difícil, gestionar un plazo ajustado, tomar una decisión difícil, demostrar liderazgo, recuperarse de un fracaso y adaptarse al cambio. Prepara una historia STAR sólida para cada uno de estos y estarás listo para la gran mayoría de las preguntas de comportamiento.',
          ],
          examples: [
            '✓ Situation: "In my previous role, we lost a key client unexpectedly..."',
            '✓ Task: "I was responsible for managing the account recovery plan..."',
            '✓ Action: "I scheduled individual calls with each stakeholder to identify their concerns..."',
            '✓ Result: "Within six weeks, we had retained 80% of the lost revenue and rebuilt the relationship."',
          ],
          callouts: [
            {
              type: 'formula',
              title: 'Método STAR — cómo responder preguntas de comportamiento',
              formula: 'S ituation  →  T ask  →  A ction  →  R esult',
              examples: [
                '✓ S: Briefly set the context (where, when, what was happening).',
                '✓ T: Your specific role in that situation.',
                '✓ A: What YOU did — use "I" not "we".',
                '✓ R: The outcome, ideally with a number or measurable change.',
              ],
            },
            {
              type: 'nerdyMode',
              term: 'behavioural questions',
              definition: 'Son preguntas que empiezan con "Tell me about a time when...", "Can you give me an example of...", o "Describe a situation where...". Los entrevistadores las usan porque el comportamiento pasado predice el comportamiento futuro.',
              example: 'Prepara una historia STAR para cada uno de estos temas: cliente difícil, plazo ajustado, decisión difícil, liderazgo, fracaso, cambio inesperado. Cubren el 80% de las preguntas de comportamiento.',
            },
          ],
        },
        {
          heading: 'Preguntas difíciles y cómo manejarlas',
          paragraphs: [
            '"What is your greatest weakness?" es una de las preguntas más temidas, pero tiene una fórmula confiable. Elige una debilidad real pero no crítica, e inmediatamente síguela con un paso concreto que hayas tomado para mejorar. Esto muestra autoconciencia y mentalidad de crecimiento — dos cosas que todo buen entrevistador valora.',
            '"Why are you leaving your current job?" requiere honestidad sin negatividad. Nunca critiques a tu empleador actual, incluso si la situación es genuinamente mala. Enmarca tu respuesta en torno a lo que te estás moviendo hacia, no de lo que estás escapando: "I have learned a lot in my current role, but I am looking for an environment where I can take on more strategic responsibility."',
            '"Where do you see yourself in five years?" no es una pregunta sobre tus sueños personales — es una pregunta sobre tu compromiso y ambición. Muestra que estás pensando en el crecimiento dentro del campo, idealmente en una dirección que se alinee con lo que la empresa ofrece.',
          ],
          examples: [
            '✓ Weakness: "I used to find it difficult to delegate. I\'ve been working on this by..."',
            '✗ Weakness: "I\'m a perfectionist." (overused and not credible)',
            '✓ Leaving: "I\'m looking for a larger team and more complex projects."',
            '✗ Leaving: "My boss is very difficult to work with." (never do this)',
            '✓ Five years: "I see myself in a senior role focused on X, ideally having built expertise in Y."',
          ],
          callouts: [
            {
              type: 'watchOut',
              wrong: '"My biggest weakness is that I\'m a perfectionist."',
              correct: '"I used to find it hard to delegate — I\'ve been working on this by [specific step]."',
              explanation: 'La respuesta "soy perfeccionista" está tan sobreusada que suena deshonesta. Escoge una debilidad real pero no crítica, e incluye un paso concreto que estás tomando para mejorar.',
            },
          ],
        },
        {
          heading: 'Preguntas para el entrevistador y cómo cerrar',
          paragraphs: [
            'Al final de casi toda entrevista, te preguntarán: "Do you have any questions for us?" Decir "No, I think you covered everything" es una oportunidad perdida. Hacer preguntas reflexivas señala interés genuino y te ayuda a evaluar si el rol es adecuado para ti.',
            'Las preguntas sólidas se centran en los detalles del rol, la cultura del equipo y cómo se mide el éxito — no en el salario o las vacaciones en esta etapa. Guarda las preguntas prácticas para una segunda entrevista o la etapa de oferta.',
            'Cierra la entrevista reafirmando tu entusiasmo de forma breve y clara. Un cierre sólido deja una impresión memorable y le facilita al entrevistador abogarte internamente.',
          ],
          examples: [
            '✓ "What does success in this role look like after the first six months?"',
            '✓ "How would you describe the team culture?"',
            '✓ "What are the biggest challenges the team is currently facing?"',
            '✓ "What are the next steps in the process?"',
            '✓ Closing: "Thank you so much for your time. I\'m really excited about this opportunity and feel strongly that my experience in X would add real value to your team."',
          ],
          callouts: [
            {
              type: 'keyQuestion',
              questions: [
                { question: '¿Estás en una primera entrevista (recruiter / screening)?', answer: 'Pregunta sobre el rol y el proceso — no toques salario todavía' },
                { question: '¿Estás en una entrevista con el equipo / hiring manager?', answer: 'Pregunta sobre cultura, desafíos del equipo y cómo se mide el éxito' },
                { question: '¿Estás en la etapa final o de oferta?', answer: 'Ahora sí — salario, beneficios, horario, flexibilidad' },
              ],
            },
          ],
        },
      ],
      tip: 'Practica tus respuestas en voz alta — no solo en tu cabeza. La diferencia entre saber mentalmente una respuesta y decirla con fluidez es enorme. Grábate en tu teléfono, escúchate de vuelta y refina. Tus respuestas deben sonar bien preparadas pero no memorizadas. Apunta a natural y seguro, no a guionado.',
      closing:
        'El éxito en entrevistas en inglés viene de la preparación, no de la perfección. No necesitas sonar como un hablante nativo. Necesitas comunicar tu valor claramente, responder preguntas predecibles con estructura y hacer preguntas que demuestren que estás pensando seriamente en el rol. Prepara los marcos en este artículo, llénalos con tu experiencia real y entrarás con verdadera confianza.',
      commonMistakes: [
        { wrong: '"My biggest weakness is that I\'m a perfectionist."', correct: '"I used to struggle with delegation — I\'ve been working on this by…"', why: 'La respuesta "perfeccionista" está tan sobreusada que los entrevistadores la descartan automáticamente — suena como una evasión.' },
        { wrong: '"I\'m leaving because my boss is terrible."', correct: '"I\'m looking for a larger team and more complex projects."', why: 'Nunca critiques a un empleador anterior. Enmarca tu salida en términos de hacia dónde quieres ir, no de qué escapas.' },
        { wrong: 'Responder "No, I think you covered everything" al final', correct: 'Tener 2-3 preguntas sólidas preparadas', why: 'No tener preguntas señala falta de interés o preparación. Es una oportunidad perdida de dejar una impresión final memorable.' },
        { wrong: 'Usar "we" cuando describes logros: "We grew revenue 40%"', correct: 'Usar "I" para tu contribución: "I led the initiative that grew revenue 40%"', why: 'El entrevistador quiere saber qué hiciste TÚ. El "we" difuso hace imposible evaluar tu impacto personal.' },
        { wrong: 'Responder "Tell me about yourself" con tu historia de vida completa', correct: 'Usar Present → Past → Future en menos de 2 minutos', why: 'Los entrevistadores quieren tu identidad profesional, no tu biografía. Deja que hagan preguntas de seguimiento.' },
      ],
      exercise: {
        instructions: 'Identify what\'s wrong (if anything) with each interview answer. / Identifica qué está mal (si lo hay) en cada respuesta.',
        questions: [
          '"My biggest weakness is that I care too much about my work."',
          '"Why are you leaving your current job?" → "My manager is impossible and the culture is toxic."',
          '"Tell me about a time you handled conflict." → "We solved it by talking and it was fine."',
          '"Where do you see yourself in 5 years?" → "Honestly, I have no idea — life is unpredictable!"',
          '"Do you have any questions for us?" → "No, I think you\'ve covered everything. Thanks."',
        ],
        answers: [
          { answer: 'Cliché "perfeccionista disfrazado"', explanation: 'Elige una debilidad real + un paso concreto que estás tomando para mejorarla.' },
          { answer: 'Nunca critiques al empleador actual', explanation: 'Enmarca hacia lo positivo: "I\'m looking for more strategic responsibility / a larger team".' },
          { answer: 'No usa el método STAR — falta Situation, Task, Action específica, Result medible', explanation: 'Usa Situation/Task/Action/Result con "I" y un resultado medible.' },
          { answer: 'Falta de visión profesional', explanation: 'Muestra ambición alineada con el rol: "I see myself in a senior role focused on X."' },
          { answer: 'Oportunidad perdida', explanation: 'Siempre ten 2-3 preguntas preparadas sobre éxito, cultura o desafíos del equipo.' },
        ],
      },
      closingQuote: {
        quote: 'Success is where preparation and opportunity meet.',
        translation: 'El éxito es donde la preparación se encuentra con la oportunidad. — Bobby Unser',
      },
    },
  },
  {
    id: 10,
    slug: 'articles-a-an-the',
    category: 'Gramática',
    title: 'Artículos en Inglés: Cuándo Usar A, An y The',
    excerpt:
      'Los artículos son palabras pequeñas con gran impacto. Aprende las reglas detrás de "a", "an" y "the" — incluyendo cuándo no usar ningún artículo.',
    readTime: '5 min de lectura',
    level: 'Principiante',
    variant: 'lime',
    image: articlesImg,
    body: {
      hook:
        'Un estudiante escribe: "I saw film last night. Film was amazing." Un hablante nativo inmediatamente siente que algo está mal — pero el contenido es perfectamente claro. Los artículos son uno de esos elementos gramaticales que no bloquean la comunicación pero afectan dramáticamente lo natural que suenas. Muchos idiomas no tienen artículos en absoluto, e incluso los que los tienen los usan de manera diferente al inglés. La buena noticia: una vez que entiendes las dos preguntas centrales detrás de los artículos, las reglas se vuelven mucho más intuitivas de lo que parecen al principio.',
      sections: [
        {
          heading: '"A" y "an": presentando algo por primera vez',
          paragraphs: [
            'Usas "a" o "an" — los artículos indefinidos — cuando presentas algo por primera vez o te refieres a uno de muchos (cualquier ejemplo de una categoría, no uno específico). "I saw a dog in the park" significa cualquier perro — aún no sabemos cuál. "She is a teacher" significa que pertenece a la categoría de profesores.',
            'La elección entre "a" y "an" se trata del sonido, no de la ortografía. Usa "an" antes de un sonido vocálico: an apple, an hour (la H es muda así que comienza con un sonido "ow"), an MBA (pronunciado "em"). Usa "a" antes de un sonido consonántico: a university (comienza con "yoo"), a European country (comienza con "yoo"), a one-way street (comienza con "wuh"). La letra al inicio de la palabra no importa — el sonido sí.',
          ],
          examples: [
            '✓ She is an engineer at a tech startup.',
            '✓ It took an hour to get there.',
            '✓ He is studying at a university in the US.',
            '✓ It\'s an MBA programme, not a BA.',
            '✗ She is engineer. (needs an article)',
            '✗ It took a hour. (vowel sound → "an")',
          ],
          callouts: [
            {
              type: 'formula',
              title: 'A vs. AN — regla del sonido',
              formula: 'AN → antes de sonido vocálico  ·  A → antes de sonido consonántico',
              examples: [
                '✓ an hour (la H es muda → sonido "ow")',
                '✓ a university (suena "yoo" → consonante)',
                '✓ an MBA (se pronuncia "em" → vocal)',
                '✓ a one-way street (suena "wun" → consonante)',
              ],
            },
            {
              type: 'nerdyMode',
              term: 'indefinite article',
              definition: 'Son "a" y "an" — los artículos que usas cuando presentas algo por primera vez o te refieres a "cualquier ejemplo" de una categoría, no a uno específico.',
              example: '"I saw a dog" = cualquier perro. "I saw the dog" = un perro que ambos conocemos.',
            },
            {
              type: 'watchOut',
              wrong: '"It took a hour to finish."',
              correct: '"It took an hour to finish."',
              explanation: 'La H de "hour" es muda, así que la palabra empieza con sonido vocálico. El sonido importa — no la letra escrita.',
            },
          ],
        },
        {
          heading: '"The": hablando de algo específico y compartido',
          paragraphs: [
            '"The" — el artículo definido — señala que tanto el hablante como el oyente saben exactamente de qué cosa se está hablando. Este principio de "conocimiento compartido" cubre la mayoría de los usos de "the".',
            'El caso más común es la segunda mención: "I bought a book. The book was brilliant." La primera mención lo introduce (a book), la segunda mención se refiere al mismo específico (the book). Otro caso muy común son las cosas únicas: solo hay un sol, una luna, un presidente a la vez — así que decimos "the sun", "the moon", "the president".',
            'Los superlativos siempre usan "the" porque un superlativo ya señala unicidad: the best, the tallest, the most interesting. Del mismo modo, los números ordinales usan "the": the first, the second, the last. Y cuando una frase o cláusula especifica exactamente cuál, se necesita "the": "the woman in the red dress", "the coffee I made this morning".',
          ],
          examples: [
            '✓ Can you close the door? (both people know which door)',
            '✓ The Eiffel Tower is in Paris. (unique, well-known)',
            '✓ That was the best meal I\'ve had in years.',
            '✓ She was the first person to arrive.',
            '✓ The book on your desk is mine.',
            '✗ Can you close a door? (wrong — both people know the specific door)',
          ],
          callouts: [
            {
              type: 'formula',
              title: 'Cuándo usar THE',
              formula: 'THE = conocimiento compartido  •  únicos  •  superlativos  •  ordinales  •  segunda mención',
              examples: [
                '✓ "The sun, the moon, the president" → únicos',
                '✓ "The best coffee, the first person" → superlativo / ordinal',
                '✓ "I bought a book. The book was great." → segunda mención',
              ],
            },
            {
              type: 'watchOut',
              wrong: '"I saw film yesterday. Film was amazing."',
              correct: '"I saw a film yesterday. The film was amazing."',
              explanation: 'Primera mención → "a" (cualquiera). Segunda mención → "the" (el mismo que ya introdujiste).',
            },
          ],
        },
        {
          heading: 'Artículo cero: cuando no usas nada',
          paragraphs: [
            'A veces la respuesta correcta es ningún artículo — lo que los gramáticos llaman el "artículo cero". Esto se aplica más comúnmente cuando se hacen afirmaciones generales sobre sustantivos incontables y sustantivos en plural.',
            '"Water is essential for life" — agua en general, sin artículo. "Dogs are loyal animals" — perros en general, sin artículo. Agrega "the" y se vuelve específico: "the water in this river", "the dogs next door". El mismo patrón aplica a los sustantivos abstractos en afirmaciones generales: love is complicated, money doesn\'t buy happiness.',
            'Los nombres propios — nombres de personas, la mayoría de países, ciudades y montañas — no llevan artículo: London, France, Mount Everest. Pero hay excepciones notables que simplemente deben memorizarse: the United States, the United Kingdom, the Netherlands, the Philippines (países que son uniones o nombres en plural), y ríos, océanos y cordilleras: the Nile, the Pacific, the Alps.',
          ],
          examples: [
            '✓ Music is my biggest passion. (general abstract noun)',
            '✓ She drinks coffee every morning. (uncountable in general)',
            '✓ I love cats. (plural in general)',
            '✓ We visited France and the Netherlands on the same trip.',
            '✗ The life is short. → ✓ Life is short. (general statement)',
            '✗ She plays the tennis. → ✓ She plays tennis. (sport = no article)',
          ],
          callouts: [
            {
              type: 'watchOut',
              wrong: '"The life is short, so enjoy the music and the sport."',
              correct: '"Life is short, so enjoy music and sport."',
              explanation: 'Afirmaciones generales sobre sustantivos incontables o abstractos → sin artículo. Deportes y idiomas también → sin artículo: play tennis, speak English.',
            },
            {
              type: 'keyQuestion',
              questions: [
                { question: '¿Mi oyente ya sabe exactamente de qué estoy hablando?', answer: 'Sí → usa THE' },
                { question: '¿Estoy presentando algo por primera vez o es uno de muchos?', answer: 'Sí → usa A / AN (según el sonido)' },
                { question: '¿Estoy haciendo una afirmación general sobre toda una categoría?', answer: 'Sí → sin artículo (cero)' },
              ],
            },
          ],
        },
      ],
      tip: 'Al elegir un artículo, hazte tres preguntas en este orden: (1) ¿Mi oyente ya sabe exactamente de qué cosa estoy hablando? → "the". (2) ¿Estoy presentando algo por primera vez o refiriéndome a uno de muchos? → "a/an". (3) ¿Estoy haciendo una afirmación general sobre toda una categoría? → sin artículo. Esta secuencia resuelve alrededor del 85% de los casos.',
      closing:
        'Los artículos son uno de esos puntos gramaticales donde la perfección lleva años, pero la comunicación clara se logra muy rápidamente. Los hablantes nativos te entienden incluso con errores ocasionales de artículo, así que no dejes que el miedo te frene de hablar. Concéntrate en las tres preguntas centrales de este artículo y tu precisión mejorará de forma constante con cada conversación.',
      commonMistakes: [
        { wrong: '"She is engineer."', correct: '"She is an engineer."', why: 'Las profesiones cuentan como categorías — necesitan artículo indefinido: a doctor, an architect, a teacher.' },
        { wrong: '"I saw the film yesterday. Film was brilliant."', correct: '"I saw a film yesterday. The film was brilliant."', why: 'Primera mención → "a/an". Segunda mención → "the" (ahora ambos sabemos cuál).' },
        { wrong: '"The life is short."', correct: '"Life is short."', why: 'Afirmaciones generales sobre sustantivos abstractos no llevan artículo.' },
        { wrong: '"She plays the tennis every weekend."', correct: '"She plays tennis every weekend."', why: 'Los deportes nunca llevan artículo: play football, play chess, play tennis.' },
        { wrong: '"It took a hour to arrive."', correct: '"It took an hour to arrive."', why: 'La H de "hour" es muda → sonido vocálico → usa "an". Lo que importa es el sonido, no la letra.' },
      ],
      exercise: {
        instructions: 'Add A, AN, THE or leave blank (—) in each gap. / Añade A, AN, THE o deja en blanco (—).',
        questions: [
          'I bought ____ interesting book yesterday. ____ book was written by a Japanese author.',
          '____ Eiffel Tower is ____ most famous landmark in Paris.',
          'She plays ____ piano beautifully, but she doesn\'t speak ____ English well.',
          'It takes ____ hour to get to ____ airport by car.',
          '____ life is short. ____ happiness is the goal.',
        ],
        answers: [
          { answer: 'an / The', explanation: 'Primera mención con sonido vocálico → "an". Segunda mención → "the".' },
          { answer: 'The / the', explanation: 'Cosas únicas siempre con "the". Superlativos también.' },
          { answer: 'the / — (blank)', explanation: 'Instrumentos musicales llevan "the"; idiomas no llevan artículo.' },
          { answer: 'an / the', explanation: '"Hour" = sonido vocálico → "an". "Airport" es específico entre ambos → "the".' },
          { answer: '— / — (blank both)', explanation: 'Afirmaciones generales sobre conceptos abstractos → sin artículo.' },
        ],
      },
      closingQuote: {
        quote: 'The limits of my language mean the limits of my world.',
        translation: 'Los límites de mi lenguaje son los límites de mi mundo. — Ludwig Wittgenstein',
      },
    },
  },
  {
    id: 11,
    slug: 'say-tell-speak-talk',
    category: 'Vocabulario',
    title: 'Say, Tell, Speak, Talk: ¿Cuál es la Diferencia?',
    excerpt:
      'Estos cuatro verbos se relacionan con la comunicación, pero no son intercambiables. Aprende exactamente cuándo usar cada uno con reglas simples y ejemplos reales.',
    readTime: '5 min de lectura',
    level: 'Principiante',
    variant: 'dark',
    image: sayTellImg,
    body: {
      hook:
        'Un estudiante le escribe un correo a su profesor: "My friend said me that the exam was postponed." El profesor sabe lo que quieren decir — pero el verbo es incorrecto. Debería ser "told me". Otro estudiante dice: "Can you talk English?" Su compañero entiende — pero el verbo correcto es "speak". Estas cuatro palabras — say, tell, speak y talk — confunden constantemente a los estudiantes, precisamente porque todas implican comunicación y a menudo se superponen en significado. Pero cada una tiene un uso distinto, y las reglas, una vez entendidas, son claras y consistentes.',
      sections: [
        {
          heading: 'Say: el foco está en las palabras mismas',
          paragraphs: [
            '"Say" pone el foco en lo que se comunicó — el contenido del mensaje. You say something, you say a word, you say hello, you say goodbye. La característica estructural clave: "say" no lleva una persona directamente después. No puedes escribir "She said me." Si quieres incluir al oyente, necesitas "to": "She said to me."',
            '"Say" también se usa en el estilo indirecto para introducir el contenido de lo que alguien dijo: "He said that he was running late" — el foco está en el mensaje (que llegaba tarde), no en quién lo recibió.',
          ],
          examples: [
            '✓ He said that the meeting was cancelled.',
            '✓ She said goodbye and walked out.',
            '✓ He said to me that he needed help.',
            '✓ What did you say? I didn\'t hear you.',
            '✗ She said me the answer. → ✓ She told me the answer.',
            '✗ He said me to come early. → ✓ He told me to come early.',
          ],
          callouts: [
            {
              type: 'formula',
              title: 'SAY — sin persona directa',
              formula: 'say + (that) + message  ·  say something  ·  say + to + person',
              examples: [
                '✓ "He said (that) he was tired."',
                '✓ "She said hello."',
                '✓ "He said to me that he was late."',
              ],
            },
            {
              type: 'watchOut',
              wrong: '"She said me the answer."',
              correct: '"She told me the answer." / "She said the answer to me."',
              explanation: '"Say" nunca va con una persona como objeto directo. Para incluir a la persona, usa "tell + persona" o "say + to + persona".',
            },
          ],
        },
        {
          heading: 'Tell: siempre le dices a alguien',
          paragraphs: [
            '"Tell" requiere una persona — siempre le dices algo a alguien. Esta es la diferencia estructural crítica con "say". Si no hay una persona recibiendo la información en tu oración, "tell" no funciona. "She told the story" (told + persona implícita), "She told us the truth" (told + persona explícita), "She told me to leave" (told + persona + infinitivo para órdenes).',
            '"Tell" también se usa para un conjunto de expresiones fijas que es importante memorizar porque nunca usan "say": tell the truth, tell a lie, tell a story, tell a joke, tell the time (leer un reloj), tell the difference (distinguir entre cosas). Estas son colocaciones bloqueadas con "tell".',
          ],
          examples: [
            '✓ She told me she was nervous.',
            '✓ Can you tell us what happened?',
            '✓ He always tells the best stories.',
            '✓ I can\'t tell the difference between these two colours.',
            '✓ She told me to wait outside.',
            '✗ Can you say me what happened? → ✓ Can you tell me what happened?',
          ],
          callouts: [
            {
              type: 'formula',
              title: 'TELL — siempre con persona',
              formula: 'tell + person + (that) + message  ·  tell + person + to + infinitive',
              examples: [
                '✓ "She told me (that) she was tired."',
                '✓ "He told us to wait outside."',
                '✓ Fixed: tell the truth, tell a lie, tell a story, tell the time, tell a joke',
              ],
            },
            {
              type: 'watchOut',
              wrong: '"He told that he was ready."',
              correct: '"He told me (that) he was ready." / "He said (that) he was ready."',
              explanation: '"Tell" siempre necesita una persona como objeto directo. Si no hay persona, usa "say".',
            },
          ],
        },
        {
          heading: 'Speak y talk: el acto de producir habla',
          paragraphs: [
            '"Speak" y "talk" se refieren ambos a la actividad de producir habla, pero difieren en formalidad y dirección. "Speak" es ligeramente más formal y tiende a describir comunicación unidireccional u oficial: una presentación, una solicitud formal o una habilidad. "Talk" es más casual y sugiere una conversación informal y bidireccional.',
            'El uso fijo más importante de "speak": idiomas. Siempre "speak a language" — nunca "talk a language". "She speaks four languages" es correcto; "she talks four languages" no lo es.',
            'En entornos profesionales, "Can I speak to the manager?" es formal. En entornos personales, "We talked for hours" es natural. En un evento público, "She spoke to an audience of 500 people" encaja bien. Entre amigos, "We need to talk" establece un tono más serio y personal.',
          ],
          examples: [
            '✓ He speaks three languages fluently.',
            '✓ She spoke at the conference last week.',
            '✓ Can I speak to someone in customer service?',
            '✓ We talked about everything on that long drive.',
            '✓ Stop talking and start listening.',
            '✗ Can you talk French? → ✓ Can you speak French?',
          ],
          callouts: [
            {
              type: 'nerdyMode',
              term: 'formalidad speak vs. talk',
              definition: '"Speak" es más formal y tiende a ser unidireccional o oficial (un discurso, una llamada formal, idiomas). "Talk" es casual y bidireccional (una conversación entre amigos).',
              example: '"She spoke at the conference" (formal, unidireccional) vs. "We talked for hours" (casual, bidireccional). Pero IDIOMAS siempre usan "speak", no "talk".',
            },
            {
              type: 'countryNote',
              topic: 'Pedir hablar con alguien al teléfono',
              british: '"Could I speak to Mr. Smith, please?"',
              american: '"Can I speak with Mr. Smith, please?" (also "talk to" casual)',
              note: 'Tanto "speak to" como "speak with" son correctos. UK prefiere "speak to", US usa más "speak with", especialmente en contextos profesionales.',
            },
          ],
        },
        {
          heading: 'Uniéndolo todo: una referencia rápida',
          paragraphs: [
            'Los cuatro verbos cubren diferentes aspectos de la comunicación y cada uno tiene un contexto dominante. "Say" se enfoca en el contenido de un mensaje. "Tell" requiere una persona específica que recibe el mensaje. "Speak" es para comunicación formal u oficial y para idiomas. "Talk" es para conversación informal y bidireccional.',
            'Un recurso mnemónico útil: SAY the words → TELL a person → SPEAK a language → TALK to a friend. Esa única oración captura el uso más importante de cada verbo en una línea.',
          ],
          examples: [
            '✓ He said that he was sorry. (content of message)',
            '✓ He told her he was sorry. (said it to a specific person)',
            '✓ She speaks English and Portuguese. (language ability)',
            '✓ They talked for an hour about the project. (informal back-and-forth)',
            '→ SAY the words → TELL a person → SPEAK a language → TALK to a friend',
          ],
          callouts: [
            {
              type: 'quickMap',
              columns: [
                {
                  header: 'SAY / TELL (transmitir mensaje)',
                  items: [
                    'SAY → foco en las palabras (sin persona directa)',
                    '"She said she was late."',
                    'TELL → siempre con persona + mensaje',
                    '"She told me she was late."',
                  ],
                },
                {
                  header: 'SPEAK / TALK (acto de hablar)',
                  items: [
                    'SPEAK → formal, idiomas, profesional',
                    '"She speaks French." / "Can I speak to the manager?"',
                    'TALK → casual, conversación bidireccional',
                    '"We talked for hours about films."',
                  ],
                },
              ],
            },
          ],
        },
      ],
      tip: 'Lleva una entrada en tu cuaderno para cada uno de estos cuatro verbos con una o dos oraciones clave que muestren cómo funcionan. Cuando no estés seguro, pregúntate: ¿Me estoy enfocando en las palabras (say)? ¿Hay una persona recibiendo el mensaje (tell)? ¿Es formal o un idioma (speak)? ¿Es una conversación casual (talk)? Repasa las opciones y el verbo correcto surgirá.',
      closing:
        'Estos cuatro verbos aparecen decenas de veces en cada conversación, podcast y artículo que encuentras en inglés. Usarlos correctamente tiene un impacto inmediato en lo natural que suenas. Empieza a escuchar cuál usan los hablantes nativos en contextos reales — rápidamente notarás que los patrones descritos aquí se vuelven obvios.',
      commonMistakes: [
        { wrong: '"She said me the truth."', correct: '"She told me the truth."', why: '"Say" nunca lleva persona directa. Para incluir a la persona, cambia a "tell + persona".' },
        { wrong: '"Can you talk French?"', correct: '"Can you speak French?"', why: 'Los idiomas siempre usan "speak": speak English, speak Spanish, speak Chinese.' },
        { wrong: '"He told that he was late."', correct: '"He said (that) he was late." / "He told me (that) he was late."', why: '"Tell" siempre necesita una persona como objeto directo; "say" no.' },
        { wrong: '"I\'ll say you about it later."', correct: '"I\'ll tell you about it later."', why: 'Cuando comunicas información a una persona específica, siempre usa "tell".' },
        { wrong: '"She talked a great speech."', correct: '"She gave / made a great speech."', why: 'Los "speeches" no se "talk" — se dan (give) o se hacen (make). "Talk" es para conversación bidireccional informal.' },
      ],
      exercise: {
        instructions: 'Choose SAY, TELL, SPEAK or TALK for each sentence. / Elige SAY, TELL, SPEAK o TALK para cada oración.',
        questions: [
          'Can you ________ me what time the meeting starts?',
          'She ________ three languages — English, French, and Arabic.',
          'He ________ that he was too tired to come.',
          'We ________ for hours about our trip to Japan.',
          'The CEO ________ at the annual conference last month.',
          'Don\'t ________ lies — it always ends badly.',
        ],
        answers: [
          { answer: 'tell', explanation: 'Hay una persona (me) recibiendo la información → tell.' },
          { answer: 'speaks', explanation: 'Idiomas siempre van con "speak".' },
          { answer: 'said', explanation: 'Sin persona directa después del verbo → say. "Said that he was tired".' },
          { answer: 'talked', explanation: 'Conversación informal bidireccional → talk.' },
          { answer: 'spoke', explanation: 'Contexto formal (conference, audiencia) → speak.' },
          { answer: 'tell', explanation: '"Tell a lie" es una colocación fija — siempre con "tell", nunca con "say".' },
        ],
      },
      closingQuote: {
        quote: 'If you talk to a man in a language he understands, that goes to his head. If you talk to him in his language, that goes to his heart.',
        translation: 'Si le hablas a un hombre en un idioma que entiende, le llega a la cabeza. Si le hablas en su propio idioma, le llega al corazón. — Nelson Mandela',
      },
    },
  },
  {
    id: 12,
    slug: 'asking-giving-directions',
    category: 'Situaciones',
    title: 'Cómo Pedir y Dar Indicaciones en Inglés',
    excerpt:
      '¿Perdido en una ciudad de habla inglesa? Esta guía te da las frases exactas para preguntar dónde están las cosas, entender la respuesta y ayudar a otros a encontrar su camino.',
    readTime: '6 min de lectura',
    level: 'Principiante',
    variant: 'plain',
    image: directionsImg,
    body: {
      hook:
        'Imagina esto: acabas de llegar a Edimburgo. Tu hotel está en algún lugar cercano pero tu teléfono no tiene señal y el mapa que descargaste no cargará. Necesitas preguntarle a alguien. Este momento — pedirle indicaciones a un extraño en la calle — es una de las situaciones de inglés más reales que encontrarás. La buena noticia es que las conversaciones de indicaciones siguen un guión extremadamente predecible. Una vez que conoces los iniciadores, el vocabulario central y cómo confirmar que entendiste, puedes navegar cualquier ciudad de habla inglesa con confianza.',
      sections: [
        {
          heading: 'Cómo preguntar: iniciadores educados que siempre funcionan',
          paragraphs: [
            'Nunca vayas directamente a "Where is the station?" — suena brusco incluso en tu idioma nativo. Siempre comienza con un breve iniciador educado que llame la atención de la persona y reconozca su tiempo. Las tres estructuras a continuación funcionan en todos los países de habla inglesa, con cualquier extraño.',
            'Después del iniciador, haz tu pregunta de forma simple y directa. Las personas que dan indicaciones quieren entender tu pregunta rápidamente para poder ayudar. Corto y claro es mejor que elaborado y confuso.',
          ],
          examples: [
            '✓ "Excuse me, could you tell me how to get to the city centre?"',
            '✓ "Sorry to bother you — do you know where the nearest pharmacy is?"',
            '✓ "Hi, I\'m a bit lost. Is there a supermarket near here?"',
            '✓ "Excuse me, is this the right way to the train station?"',
            '✓ "How far is it from here?" (to find out the distance)',
            '✓ "Is it within walking distance?" (to know if you need transport)',
          ],
          callouts: [
            {
              type: 'formula',
              title: 'Pedir indicaciones — fórmula universal',
              formula: '[iniciador educado]  +  [pregunta directa]  +  "please"',
              examples: [
                '✓ "Excuse me, could you tell me how to get to [destino]?"',
                '✓ "Sorry to bother you — do you know where [lugar] is?"',
                '✓ "Hi, is there a [lugar] near here?"',
              ],
            },
          ],
        },
        {
          heading: 'Entender la respuesta: el vocabulario esencial',
          paragraphs: [
            'Cuando alguien te da indicaciones, usará un pequeño conjunto de palabras repetidamente. Conocer estas palabras de antemano significa que puedes concentrarte en la información específica — los nombres de calles, los puntos de referencia — en lugar de gastar energía mental descifrando el vocabulario básico.',
            'Aquí hay un ejemplo real de indicaciones que podrías recibir: "Go straight down this road for about two blocks. You\'ll see a big church on your left — go past it. Then take the next right. The hotel is halfway down that street on your right, next to a coffee shop." Desglosándolo: straight → two blocks → pass church on the left → right turn → halfway down → on the right. Esa es toda la información que necesitas para llegar.',
            'Si alguien habla demasiado rápido o te pierdes parte de la respuesta, es completamente normal pedirle que repita o vaya más despacio. Nadie espera que un hablante no nativo capture el habla rápida al primer intento.',
          ],
          examples: [
            '→ "Go straight" / "Keep going" = continue forward',
            '→ "Turn left / right" = change direction at a corner',
            '→ "Take the first / second left" = count the streets',
            '→ "Go past the church / park" = walk beyond that landmark',
            '→ "It\'s on your left / right" = the destination is on that side',
            '→ "It\'s opposite the bank" = directly facing the bank',
            '→ "It\'s at the corner of Oak Street and Main" = where two streets meet',
            '✓ "Sorry, could you repeat that more slowly, please?"',
            '✓ "I\'m sorry — I didn\'t catch that. Did you say turn left or right?"',
          ],
          callouts: [
            {
              type: 'nerdyMode',
              term: 'landmark (punto de referencia)',
              definition: 'Un "landmark" es cualquier edificio, monumento o señal visible que se usa para orientarse: a church, a park, a pharmacy, a red building. Los hablantes nativos los usan mucho en indicaciones.',
              example: 'Escucha palabras como "past the church", "opposite the bank", "next to the pharmacy" — son la forma más clara y visual de dar indicaciones.',
            },
            {
              type: 'watchOut',
              wrong: '"Turn at the traffic light."',
              correct: '"Turn left / right at the traffic light."',
              explanation: 'Siempre especifica la dirección al dar o pedir indicaciones. "Turn" solo, sin left/right, es ambiguo y confunde.',
            },
          ],
        },
        {
          heading: 'Dar indicaciones a alguien más',
          paragraphs: [
            'Cuando alguien te pide ayuda, la clave es mantener tu respuesta simple y visual. Usa puntos de referencia siempre que sea posible — "you\'ll see a big red church on your left" es mucho más fácil de seguir que "turn at the junction of Canongate and St Mary\'s Street".',
            'Divide tus indicaciones en pasos cortos y numerados y haz una pausa entre ellos para dar a la persona tiempo de procesar. Si el destino está lejos o es complicado, sé honesto — enviar a alguien con confianza en la dirección equivocada es peor que admitir que no estás seguro.',
            'Si genuinamente no conoces la zona, dilo claramente y sugiere una alternativa. Las personas aprecian la honestidad mucho más que una respuesta incorrecta pero confiada.',
          ],
          examples: [
            '✓ "Sure! Go straight for about five minutes. You\'ll see a park on your right. Turn left there, and it\'s the second building on the left."',
            '✓ "It\'s really close — just cross the street, turn right, and you\'ll see it next to the bakery."',
            '✓ "Honestly, it\'s a bit far to walk. I\'d recommend taking the bus — there\'s a stop right over there."',
            '✓ "I\'m sorry, I\'m not from around here."',
            '✓ "I\'m not sure, but there\'s a tourist information centre just around that corner — they\'ll know for certain."',
          ],
          callouts: [
            {
              type: 'keyQuestion',
              questions: [
                { question: '¿Es cerca y sencillo de explicar caminando?', answer: 'Da pasos cortos con landmarks: "Go straight, past the church, turn right"' },
                { question: '¿Es lejos o complicado?', answer: 'Sugiere transporte público: "I\'d recommend taking the bus / metro"' },
                { question: '¿No conoces la zona?', answer: 'Sé honesto: "I\'m sorry, I\'m not from around here" — y sugiere un tourist info point' },
              ],
            },
          ],
        },
        {
          heading: 'Usar el transporte público: vocabulario extra',
          paragraphs: [
            'En ciudades más grandes, la persona a quien le preguntes puede decirte que tomes el autobús, el metro o el tranvía. Conocer el vocabulario clave para las indicaciones de transporte público significa que no te perderás cuando la respuesta involucre más que caminar.',
            'Frases comunes que podrías escuchar: "Take the number 24 bus from that stop over there", "Get off at Victoria station", "Change at Green Park and take the Jubilee line", "It\'s about three stops from here". Los verbos "take", "get on", "get off" y "change" hacen la mayor parte del trabajo en las indicaciones de transporte.',
          ],
          examples: [
            '✓ "Take the Circle line and get off at Paddington."',
            '✓ "Get on the number 15 bus — it stops right outside."',
            '✓ "You\'ll need to change at Central station."',
            '✓ "It\'s only two stops — about five minutes."',
            '✓ "Is this the right platform for the train to Brighton?"',
            '✓ "Which exit should I use for Oxford Street?"',
          ],
          callouts: [
            {
              type: 'formula',
              title: 'Verbos clave de transporte público',
              formula: 'TAKE (línea/autobús)  ·  GET ON (subir)  ·  GET OFF (bajar)  ·  CHANGE (hacer trasbordo)',
              examples: [
                '✓ "Take the number 24 bus."',
                '✓ "Get on at Oxford Street and get off at Waterloo."',
                '✓ "Change at Green Park to the Jubilee line."',
              ],
            },
          ],
        },
      ],
      tip: 'Cuando recibas indicaciones, siempre repite los pasos clave a la persona antes de que se vaya: "So I go straight, turn right at the church, and it\'s on the left?" Esto confirma tu comprensión y les da la oportunidad de corregir cualquier error antes de que te vayas en la dirección equivocada.',
      closing:
        'Pedir indicaciones es una de las interacciones más comunes que tendrás en un lugar de habla inglesa, y es mucho más manejable de lo que parece. Memoriza dos o tres iniciadores educados, aprende el vocabulario central — straight, turn, past, corner, opposite, next to, get on, get off — y nunca te sentirás verdaderamente perdido. Las personas casi siempre están dispuestas a ayudar cuando preguntas con educación.',
      commonMistakes: [
        { wrong: 'Ir directamente: "Where is the station?"', correct: '"Excuse me, could you tell me where the station is, please?"', why: 'Sin un iniciador educado ("Excuse me", "Sorry to bother you") la pregunta suena brusca — incluso si gramaticalmente es correcta.' },
        { wrong: '"I am in home / in work."', correct: '"I am at home / at work."', why: '"Home" y "work" se tratan como puntos de referencia — siempre van con "at", nunca con "in".' },
        { wrong: '"Turn at the traffic light."', correct: '"Turn left / right at the traffic light."', why: 'Siempre especifica la dirección — "turn" sin left/right es ambiguo.' },
        { wrong: '"Get down at Victoria station."', correct: '"Get off at Victoria station."', why: 'En inglés se dice "get off" para bajarse de un bus, tren o metro — nunca "get down".' },
        { wrong: 'No confirmar los pasos recibidos', correct: '"So I go straight, turn right at the church, and it\'s on the left?"', why: 'Repetir los pasos clave confirma que entendiste y deja que la persona te corrija antes de irte en la dirección equivocada.' },
      ],
      exercise: {
        instructions: 'Complete each direction sentence with the correct word. / Completa cada oración con la palabra correcta.',
        questions: [
          '"________ me, could you tell me how to get to the museum?"',
          '"Go ________ for about two blocks, then turn right at the bakery."',
          '"The pharmacy is ________ the bank — directly facing it."',
          '"________ the number 15 bus and get off at the third stop."',
          '"You\'ll need to ________ at Central station to the red line."',
          '"Is it within ________ distance, or should I take a taxi?"',
        ],
        answers: [
          { answer: 'Excuse', explanation: '"Excuse me" es el iniciador educado universal.' },
          { answer: 'straight', explanation: '"Go straight" = seguir derecho/recto sin girar.' },
          { answer: 'opposite', explanation: '"Opposite" = exactamente al otro lado, cara a cara.' },
          { answer: 'Take', explanation: 'Usas "take" para una línea de transporte o un número de bus específico.' },
          { answer: 'change', explanation: '"Change" = hacer trasbordo, cambiar de línea/tren.' },
          { answer: 'walking', explanation: '"Within walking distance" = suficientemente cerca para ir caminando.' },
        ],
      },
      closingQuote: {
        quote: 'The world is a book, and those who do not travel read only one page.',
        translation: 'El mundo es un libro, y quienes no viajan solo leen una página. — San Agustín',
      },
    },
  },
];
