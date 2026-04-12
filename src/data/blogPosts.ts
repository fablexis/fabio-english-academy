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
    intro: string;
    sections: { heading: string; paragraphs: string[]; examples?: string[] }[];
    tip: string;
    closing: string;
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
      intro:
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
        },
        {
          heading: 'Un escenario real para unirlo todo',
          paragraphs: [
            'Imagina esto: es lunes por la mañana y estás en la oficina. Un colega te pregunta cómo fue tu fin de semana. Dices: "It was great — I went hiking on Saturday and visited my parents on Sunday." Ambas acciones están terminadas y ubicadas en el tiempo, por lo que usas el past simple en todo momento.',
            'Más tarde ese día, alguien te pregunta si terminaste el informe trimestral. Dices: "I haven\'t finished it yet, but I\'ve already done the data analysis." Aquí, el present perfect es correcto porque estás describiendo el estado actual del trabajo — lo que está y no está hecho ahora.',
            'Ahora viene lo interesante. Si alguien luego pregunta específicamente cuándo hiciste el análisis, cambias de tiempo: "Oh, I did most of it on Saturday morning before the hike." En el momento en que agregas un tiempo específico, vuelves al past simple. Ambos tiempos trabajan juntos, cada uno cumpliendo su función.',
          ],
        },
      ],
      tip: 'Hazte dos preguntas antes de elegir un tiempo verbal: (1) ¿Tengo una expresión de tiempo terminada en mi oración — como yesterday, last year o in 2018? Si es así, usa el past simple. (2) ¿Estoy hablando de algo que todavía es relevante ahora, o describiendo una experiencia de vida sin un tiempo específico? Si es así, usa el present perfect. Estas dos preguntas resuelven alrededor del 90% de los casos.',
      closing:
        'Esta distinción temporal no existe en muchos idiomas, por eso se siente poco natural al principio. La clave es dejar de traducir y comenzar a preguntarte: "¿Esta acción está terminada y fija en el tiempo, o se conecta con el presente?" Con esa única pregunta como guía, el tiempo verbal correcto llegará cada vez más de forma natural.',
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
      intro:
        'Acabas de sentarte a estudiar, así que decides "do your homework". Más tarde, tu mamá te pide que "make your bed". Después de cenar, ayudas a "do the dishes". Antes de dormir, "make a plan" para mañana. En un solo día usas ambas palabras decenas de veces — y confundirlas sonaría completamente mal para un hablante nativo. La parte frustrante es que en muchos idiomas un solo verbo cubre ambos conceptos. La buena noticia es que hay una lógica real detrás, y aprenderla hace que elegir la palabra correcta se sienta mucho menos arbitrario.',
      sections: [
        {
          heading: 'La idea central: crear vs. hacer',
          paragraphs: [
            '"Make" tiene que ver con la creación y la producción — algo pasa a existir como resultado. Cuando haces un pastel con make, ahora hay un pastel en el mundo que antes no existía. Cuando haces "make a decision", has producido una conclusión. Cuando haces "make a noise", se crea un sonido. El resultado es tangible o al menos identificable.',
            '"Do" tiene que ver con actividades y procesos — el énfasis está en la acción misma, no en un nuevo producto. Cuando haces "do homework", estás realizando una tarea. Cuando haces "do exercise", estás llevando a cabo una actividad. No se crea nada físico; la acción es el punto.',
            'Esta distinción central cubre muchos casos. Pero el inglés está lleno de excepciones y colocaciones fijas, por lo que aprender los patrones — y saber cuándo simplemente memorizar — es el enfoque más práctico.',
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
        },
      ],
      tip: 'Cuando tengas dudas, pregúntate: "¿Se está creando o produciendo algo nuevo?" Si es así, inclínate por "make". Si la oración es sobre una actividad, tarea o proceso, inclínate por "do". Y siempre trata las combinaciones verbo + sustantivo como unidades de vocabulario — aprende "make a decision" y "do homework" como bloques, no palabra por palabra.',
      closing:
        'La distinción make/do es algo que se facilita con la exposición constante. En lugar de estudiar listas aisladas, presta atención a qué palabra usan los hablantes nativos cada vez que lees o escuchas en inglés. En pocas semanas, comenzarás a elegir la correcta automáticamente — no porque recordaste una regla, sino porque simplemente empezará a sonar bien.',
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
      intro:
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
        },
      ],
      tip: 'Haz coincidir el tipo de condicional con el tiempo y la realidad de la situación. Zero = siempre verdadero (hechos). First = futuro posible (real). Second = ahora imaginario (irreal). Third = pasado imaginario (irreal). Pregúntate: "¿Esto es real o imaginario? ¿Pasado, presente o futuro?" Esas dos preguntas te llevan al condicional correcto cada vez.',
      closing:
        'Los condicionales están en todas partes en inglés — negociaciones, consejos, narrativas, arrepentimientos, predicciones. Una vez que captes la lógica en lugar de las fórmulas, dejarás de dudar y comenzarás a usarlos de forma instintiva. Escúchalos en podcasts y conversaciones, y te sorprenderá con qué frecuencia aparece cada tipo.',
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
      intro:
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
        },
      ],
      tip: 'Lleva un pequeño "cuaderno de preposiciones" — físico o digital. Cada vez que encuentres una combinación de verbo + preposición o adjetivo + preposición que te sorprenda, anótala en una oración completa. Repasa diez entradas cada mañana. En un mes, las combinaciones más comunes se sentirán automáticas.',
      closing:
        'Las preposiciones son un juego a largo plazo. Ninguna regla única cubre todos los casos, e incluso los estudiantes avanzados cometen errores ocasionales. El objetivo no es la perfección sino la mejora constante. Concéntrate primero en los patrones de este artículo — cubren la mayoría del uso cotidiano — y ve construyendo tu colección de combinaciones fijas una por una.',
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
      intro:
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
        },
      ],
      tip: 'La palabra más poderosa en un restaurante es "please". Transforma cualquier solicitud de una exigencia a una interacción educada. "The salmon, please" suena infinitamente más amigable que "I want the salmon." Combínala con "could" para un tono aún más suave: "Could I have the salmon, please?" — y siempre dejarás una gran impresión.',
      closing:
        'El inglés en restaurantes es maravillosamente repetitivo — las mismas frases funcionan tanto en Edimburgo como en Nueva York o Melbourne. Practica estos patrones en voz alta algunas veces antes de tu próxima visita, y ordenarás con verdadera confianza en cualquier lugar del mundo de habla inglesa.',
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
      intro:
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
        },
        {
          heading: 'Temas a evitar y notas culturales',
          paragraphs: [
            'En la mayoría de las culturas de habla inglesa — particularmente el Reino Unido, EE. UU., Canadá y Australia — el small talk tiene reglas no oficiales sobre lo que es demasiado personal. El dinero es el mayor: preguntar cuánto gana alguien, cuánto costó su casa o comentar sobre lo caro que fue algo que compró se considera intrusivo. La edad y el peso también son sensibles, especialmente con personas que no conoces bien.',
            'La religión y la política no están siempre prohibidas, pero requieren leer el ambiente. En un entorno casual con alguien que acabas de conocer, plantear un tema político controvertido puede poner a las personas a la defensiva. Un comentario ligero sobre un evento actual es diferente a abrir un debate.',
            'Quizás lo más importante: evita la negatividad sostenida. Una breve queja compartida — "This queue is taking forever, isn\'t it?" — es una herramienta clásica de conexión. Pero lanzarse en una larga lista de quejas hará que el otro se sienta agotado y busque una salida. El small talk debe sentirse ligero y energizante.',
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
      intro:
        'Un estudiante le pregunta a su profesor: "Can you look up this word for me?" El profesor dice: "Sure — let me look it up." El estudiante está confundido: ¿"look up" es el verbo o "look it up"? Ambos son el mismo phrasal verb — solo que se han separado de manera diferente. Los phrasal verbs son una de las características definitorias del inglés natural y fluido, y siguen reglas que la mayoría de los libros de texto nunca explican. Una vez que entiendes esas reglas, la confusión disminuye drásticamente.',
      sections: [
        {
          heading: 'Por qué los phrasal verbs parecen imposibles al principio',
          paragraphs: [
            'Un phrasal verb es un verbo principal combinado con una o dos partículas (preposiciones o adverbios) que juntos crean un nuevo significado — a menudo completamente ajeno al verbo original. "Run" significa correr. "Run into" significa encontrarse con alguien inesperadamente. "Run out of" significa no tener nada que quede. "Run away" significa escapar. El mismo verbo, cuatro significados completamente diferentes.',
            'Lo que hace esto especialmente desorientador es que incluso pequeños cambios en la partícula cambian completamente el significado. "Give up" significa dejar de intentarlo. "Give in" significa dejar de resistir. "Give back" significa devolver algo. "Give away" significa donar o revelar un secreto. No puedes adivinar uno a partir del otro.',
            'La buena noticia: hay alrededor de 200 phrasal verbs que cubren la gran mayoría del inglés cotidiano. Y hay patrones de partículas que te permiten hacer suposiciones razonables sobre nuevos que nunca has visto antes.',
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
        },
      ],
      tip: 'Aprende los phrasal verbs en contexto, no de forma aislada. Cuando encuentres uno nuevo, anota la oración completa en la que apareció — no solo el phrasal verb en sí. "She finally gave up trying to fix the printer" es mucho más memorable que "give up = quit" en una lista. La oración le da a tu memoria una historia a la que aferrarse.',
      closing:
        'Los phrasal verbs pueden parecer un laberinto sin fin, pero aproximadamente 150 de ellos cubren la gran mayoría del inglés cotidiano. Empieza con los de alta frecuencia en este artículo, apréndelos en oraciones y presta atención a cómo los usan los hablantes nativos en conversaciones, películas y podcasts. Tu vocabulario crecerá de manera natural desde allí.',
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
      intro:
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
        },
      ],
      tip: 'El cambio de tiempo verbal a veces es opcional cuando la información todavía es actualmente verdadera, pero aplicarlo de forma consistente siempre es gramaticalmente correcto. Si no estás seguro, cambia el tiempo — nunca estarás equivocado por hacerlo.',
      closing:
        'El estilo indirecto es algo que usas en cada conversación, todos los días. Las reglas mecánicas — cambio de tiempo, cambio de pronombre, cambio de expresión de tiempo — necesitan práctica para volverse automáticas, pero una vez que lo hacen, transmitirás conversaciones con fluidez y confianza, ya sea que estés actualizando a un colega, contándole a un amigo sobre una conversación o escribiendo un correo electrónico profesional.',
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
      intro:
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
        },
      ],
      tip: 'Practica tus respuestas en voz alta — no solo en tu cabeza. La diferencia entre saber mentalmente una respuesta y decirla con fluidez es enorme. Grábate en tu teléfono, escúchate de vuelta y refina. Tus respuestas deben sonar bien preparadas pero no memorizadas. Apunta a natural y seguro, no a guionado.',
      closing:
        'El éxito en entrevistas en inglés viene de la preparación, no de la perfección. No necesitas sonar como un hablante nativo. Necesitas comunicar tu valor claramente, responder preguntas predecibles con estructura y hacer preguntas que demuestren que estás pensando seriamente en el rol. Prepara los marcos en este artículo, llénalos con tu experiencia real y entrarás con verdadera confianza.',
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
      intro:
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
        },
      ],
      tip: 'Al elegir un artículo, hazte tres preguntas en este orden: (1) ¿Mi oyente ya sabe exactamente de qué cosa estoy hablando? → "the". (2) ¿Estoy presentando algo por primera vez o refiriéndome a uno de muchos? → "a/an". (3) ¿Estoy haciendo una afirmación general sobre toda una categoría? → sin artículo. Esta secuencia resuelve alrededor del 85% de los casos.',
      closing:
        'Los artículos son uno de esos puntos gramaticales donde la perfección lleva años, pero la comunicación clara se logra muy rápidamente. Los hablantes nativos te entienden incluso con errores ocasionales de artículo, así que no dejes que el miedo te frene de hablar. Concéntrate en las tres preguntas centrales de este artículo y tu precisión mejorará de forma constante con cada conversación.',
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
      intro:
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
        },
      ],
      tip: 'Lleva una entrada en tu cuaderno para cada uno de estos cuatro verbos con una o dos oraciones clave que muestren cómo funcionan. Cuando no estés seguro, pregúntate: ¿Me estoy enfocando en las palabras (say)? ¿Hay una persona recibiendo el mensaje (tell)? ¿Es formal o un idioma (speak)? ¿Es una conversación casual (talk)? Repasa las opciones y el verbo correcto surgirá.',
      closing:
        'Estos cuatro verbos aparecen decenas de veces en cada conversación, podcast y artículo que encuentras en inglés. Usarlos correctamente tiene un impacto inmediato en lo natural que suenas. Empieza a escuchar cuál usan los hablantes nativos en contextos reales — rápidamente notarás que los patrones descritos aquí se vuelven obvios.',
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
      intro:
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
        },
      ],
      tip: 'Cuando recibas indicaciones, siempre repite los pasos clave a la persona antes de que se vaya: "So I go straight, turn right at the church, and it\'s on the left?" Esto confirma tu comprensión y les da la oportunidad de corregir cualquier error antes de que te vayas en la dirección equivocada.',
      closing:
        'Pedir indicaciones es una de las interacciones más comunes que tendrás en un lugar de habla inglesa, y es mucho más manejable de lo que parece. Memoriza dos o tres iniciadores educados, aprende el vocabulario central — straight, turn, past, corner, opposite, next to, get on, get off — y nunca te sentirás verdaderamente perdido. Las personas casi siempre están dispuestas a ayudar cuando preguntas con educación.',
    },
  },
];
