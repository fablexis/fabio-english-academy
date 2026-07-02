// Canonical default content for every editable public page — the exact copy
// that used to be hardcoded in the frontend components. Used as:
//   1. the frontend fallback when the API has no saved override (or is down),
//   2. the base layer under saved documents (see mergePageContent),
//   3. the starting draft in the admin page editors.
import type {
  AboutContent,
  BlogPageContent,
  CoursesContent,
  HomeContent,
  PageContentMap,
  SiteContent,
} from './pages.js';

// ── Site chrome ─────────────────────────────────────────────────────────────

export const defaultSite: SiteContent = {
  whatsappNumber: '5491123310113',
  whatsappMessage:
    'Hola, quisiera obtener informacion para agendar una clase para Your English Buddy, gracias',
  navCtaLabel: 'Contacto',
  floatLabel: '¿Hablamos?',
  footer: {
    tagline:
      'Clases de inglés personalizadas para hispanohablantes. Habla con confianza en situaciones reales.',
    navTitle: 'Explora',
    contactTitle: '¿Listo para empezar?',
    contactText:
      'Tu primera clase diagnóstica es gratis. Escríbenos y encuentra la modalidad ideal para ti.',
    ctaLabel: 'Escríbenos por WhatsApp',
    copyrightName: 'Fabio Pernía',
    socials: [
      { label: 'TikTok', href: '#' },
      { label: 'YouTube', href: '#' },
      { label: 'Buy Me a Coffee', href: '#' },
    ],
  },
};

// ── Home ────────────────────────────────────────────────────────────────────

export const defaultHome: HomeContent = {
  hero: {
    chip: 'Primera clase diagnóstica gratis',
    titlePre: 'Bienvenido a',
    titleAccent: 'Your English Buddy',
    paragraph:
      'En Your English Buddy ayudamos a personas hispanohablantes a mejorar su inglés con explicaciones simples, acompañamiento real y clases pensadas para la vida diaria. Nuestro propósito es que ganes confianza al hablar, entender, escribir y usar el inglés en situaciones reales.',
    ctaPrimary: 'Empieza mi viaje',
    ctaSecondary: 'Ver cursos',
    badge1Title: 'Clases Personalizadas',
    badge1Sub: 'A Tu Ritmo',
    badge2Number: '24/7',
    badge2Text: 'Contenido Offline',
    phrases: [
      { en: "Hello! How's it going?", es: '¡Hola! ¿Cómo va todo?' },
      { en: "I'm learning English!", es: '¡Estoy aprendiendo inglés!' },
      { en: 'Could I get a coffee, please?', es: 'Un café, por favor.' },
      { en: 'I got the job!', es: '¡Conseguí el trabajo!' },
      { en: 'Practice makes perfect.', es: 'La práctica hace al maestro.' },
    ],
    words: [
      { en: 'confidence', es: 'confianza' },
      { en: 'achieve', es: 'lograr' },
      { en: 'fluently', es: 'con fluidez' },
      { en: 'improve', es: 'mejorar' },
    ],
  },
  why: {
    headingPre: '¿Por qué elegir',
    headingAccent: 'Your English Buddy',
    headingPost: '?',
    subtitle:
      'Aprenderás a desenvolverte con frases y estructuras que muchas academias y libros tradicionales no suelen enseñar, convirtiendo tu inglés en un espacio seguro desde el cual puedas expresarte y proyectarte con confianza en todos los ámbitos de tu vida.',
    cards: [
      {
        title: 'Clases en línea y personalizadas.',
        description: 'Aprende en línea con clases dinámicas y personalizadas.',
        details: [
          'Clases en vivo a través de Zoom.',
          'Adaptadas a tu nivel, tus objetivos y tu ritmo de aprendizaje.',
          'Accede desde cualquier lugar, en cualquier momento y desde cualquier dispositivo.',
          'Aprende de forma práctica, cómoda y enfocada en tus necesidades reales.',
          'Tus 8 clases incluyen una sesión adicional de 40 minutos sin costo extra.',
          'Esa sesión está dedicada exclusivamente a resolver dudas de gramática y vocabulario.',
        ],
      },
      {
        title: 'Material de apoyo a tu disposición.',
        description:
          'Accede a guías y recursos para seguir practicando fuera de clase.',
        details: [
          'Tendrás acceso a guías, materiales y recursos de apoyo.',
          'Todo está pensado para reforzar lo aprendido en cada sesión.',
          'Podrás repasar y practicar fuera del horario de clases.',
          'Te ayudará a ganar más seguridad y claridad con el inglés.',
          'Mantendrás un progreso más constante, organizado y estructurado.',
        ],
      },
      {
        title: 'Forma parte de una comunidad activa.',
        description:
          'Forma parte de un espacio donde seguirás en contacto con el inglés cada día.',
        details: [
          'Tendrás acceso a una comunidad de WhatsApp exclusiva para estudiantes.',
          'Comparto tips, ejercicios, explicaciones y material extra de apoyo.',
          'También recibirás información sobre fechas de clubes de conversación.',
          'Formarás parte de un grupo especialmente diseñado para practicar tu writing.',
          'Es un espacio dinámico, cercano y hasta divertido, donde incluso compartimos memes.',
          'Así, el inglés se convierte en parte de tu rutina diaria.',
        ],
      },
    ],
  },
  testimonials: {
    badge: 'Reseñas de estudiantes',
    heading: 'Resultados que hablan por sí solos',
    headingAccent: 'Historias de éxito reales',
    subtitle:
      'Descubre cómo Your English Buddy ha acompañado a personas como tú a llevar su inglés a otro nivel.',
    featured: [
      {
        quote:
          '"Antes me daba vergüenza hablar inglés, incluso con algunos profesores, porque sentía que me estaban juzgando. En Your English Buddy aprendí desde el primer día una frase que me cambió por completo la mentalidad: speak first and fix later. Gracias a eso, empecé a soltarme, gané confianza al hablar y comencé a ver el inglés más cercano y divertido. Hoy siento que me enamoré de un idioma que antes odiaba."',
        name: 'Yodarvis Medina',
        role: 'Indianapolis, Estados Unidos',
      },
      {
        quote:
          '"Your English Buddy me ha ayudado a organizar mejor mi aprendizaje. Hoy entiendo y uso expresiones como circle back, jump on a call y revisit, que realmente se utilizan en el entorno laboral. Gracias a eso, me siento mucho más segura en mi trabajo remoto, he dejado atrás el pánico y ahora tengo más confianza en mis reuniones y al redactar correos."',
        name: 'Francis Jiménez',
        role: 'Florida, Estados Unidos',
      },
    ],
    rotatingA: [
      {
        quote:
          '"En Your English Buddy encontré clases dinámicas y cero aburridas. Hoy puedo usar con amigos nativos frases como feeling like some beers?, are you up for that?, fancy a coffee? o let\'s grab a bite, lo que me ha permitido ampliar mi círculo social y sentirme más integrada a la cultura americana."',
        name: 'Antonieta Gómez',
        role: 'Virginia, Estados Unidos',
      },
    ],
    rotatingB: [
      {
        quote:
          '"Your English Buddy me ha ayudado a organizar mejor mi aprendizaje. Hoy entiendo y uso expresiones como circle back, jump on a call y revisit, que realmente se utilizan en el entorno laboral. Gracias a eso, me siento mucho más segura en mi trabajo remoto, he dejado atrás el pánico y ahora tengo más confianza en mis reuniones y al redactar correos."',
        name: 'Coromoto Godoy',
        role: 'Texas, Estados Unidos',
      },
    ],
  },
  cta: {
    heading: 'Conversemos y encuentra\nla modalidad ideal\npara ti.',
    subtitle:
      'Si quieres mejorar tu inglés de forma práctica, clara y personalizada, estamos aquí para ayudarte. Escríbenos directamente por WhatsApp y te orientamos según tu nivel, tus objetivos y la modalidad que mejor se adapte a ti.',
    buttonLabel: 'Escríbenos por WhatsApp',
  },
};

// ── About ───────────────────────────────────────────────────────────────────

export const defaultAbout: AboutContent = {
  hero: {
    title: 'La maestría del inglés,',
    titleItalic: 'con alma humana.',
    subtitle:
      'Mucho más que una academia. Un santuario de aprendizaje donde la conexión trasciende las reglas gramaticales para dar voz a tu verdadero yo.',
    ctaLabel: 'Empieza mi viaje',
    image: '/img/phrase-image.jpg',
    cardQuote:
      '"El lenguaje es la única cosa que vale la pena conocer incluso de manera pobre."',
    cardCite: 'Kató Lomb · Polyglot',
  },
  mission: {
    eyebrow: 'Nuestra Misión',
    title: 'Humanizando el aprendizaje en la era digital.',
    paragraphs: [
      'En un mundo saturado de aplicaciones automáticas y correcciones frías, nosotros elegimos el camino de la empatía. Creemos que aprender un idioma es, ante todo, un acto de vulnerabilidad y valentía.',
      'Nuestro enfoque no se basa en la repetición mecánica, sino en la construcción de un puente real entre tu cultura y el mundo anglosajón, guiado por personas que entienden que detrás de cada error hay un intento de conexión.',
      'Your English Buddy fue creada por personas que también estuvieron en ese lugar de duda, frustración e inseguridad. Porque aprender un idioma no debería sentirse como una presión constante, sino como una experiencia profundamente transformadora.',
    ],
    image: '/img/tech-human.jpg',
  },
  pillars: {
    eyebrow: 'Metodología de Vanguardia',
    title: 'Los tres pilares de',
    titleItalic: 'tu evolución personal.',
    headerDesc:
      'Un enfoque tridimensional diseñado para transformar el conocimiento en expresión auténtica.',
    cards: [
      {
        titleTop: 'No',
        titleItalic: 'Miedo',
        desc: 'Eliminamos la barrera del juicio. Aquí el error no es un fallo, es el material de construcción de tu fluidez. Un espacio seguro para soltarte.',
      },
      {
        titleTop: 'La',
        titleItalic: 'Confianza',
        desc: 'Te dotamos de las herramientas precisas para que tu voz suene con autoridad, ya sea en una reunión de negocios o en una cena informal.',
      },
      {
        titleTop: 'Conexión',
        titleItalic: 'Humana',
        desc: 'El inglés es solo el medio; el fin es la conexión humana. Aprende a transmitir no solo palabras, sino intenciones y emociones.',
      },
    ],
  },
  quote: {
    pre: 'Language is the only thing',
    highlight: 'worth knowing',
    post: 'even poorly.',
    cite: '— Kató Lomb, Polyglot Mastery',
  },
  team: {
    headingPre: 'Las grandes mentes detrás de',
    headingAccent: 'Your English Buddy',
    members: [
      {
        name: 'Fabio Pernía',
        role: 'Fundador y eterno enamorado del inglés',
        imageUrl: '/img/fabio-pernia-pic.png',
        bio: 'Ama compartir lo que sabe de inglés y cuenta cómo este idioma transformó su vida. En él encontró mucho más que un idioma: una forma de sentirse más presente en el mundo.',
        fullBio:
          'Fabio ama compartir lo que sabe de inglés con quienes lo rodean y contar cómo este idioma transformó su vida y la de su familia. Ha intentado aprender unos seis idiomas, pero su relación más estable, fiel y duradera ha sido con el inglés. En él encontró mucho más que un idioma: encontró una forma de sentirse más presente en el mundo.\n\nFabio vive en Argentina y, en su tiempo libre, disfruta de ver películas, tomar cerveza artesanal y compartir con su esposa, a quien considera su mayor inspiración y el mayor éxito de su vida.',
        highlights: [
          { label: 'Rol', value: 'Fundador & CEO' },
          { label: 'Especialidad', value: 'Inglés conversacional y laboral' },
          { label: 'Idiomas', value: 'Español & Inglés' },
        ],
        functions: [
          'Imparte todas las clases de inglés con paciencia, pasión y probablemente bastante café.',
          'Intenta no estresarse cuando no aparecen ideas para TikTok.',
          'Busca constantemente nuevas formas y recursos para que sus estudiantes se enamoren del inglés.',
          'Crea la identidad visual de todos los recursos de la academia (guías, ebooks, etc.).',
          'Sueña todos los días con hacer de Your English Buddy una comunidad donde aprender inglés se sienta como una herramienta de vida.',
          'Encuentra maneras de que la academia crezca y pueda sostenerse en el tiempo.',
        ],
      },
      {
        name: 'Andreina Luna',
        role: 'Cofundadora y Responsable Creativa',
        imageUrl: '/img/andreina-luna-pic.png',
        bio: 'Después de muchos años intentando aprender inglés, decidió convertir sus propias necesidades como estudiante en ideas para hacerles el camino más claro y menos empedrado a otros.',
        fullBio:
          'Andreina tiene una conexión muy personal con esta academia, porque nació también desde su propia historia con el inglés: una historia de esfuerzo, frustración y superación. Después de muchos años intentando aprenderlo, decidió convertir las necesidades que ella tuvo como estudiante en ideas para hacerles el camino más claro y menos empedrado a otros.\n\nAndreina vive en Argentina y, en su tiempo libre, ama crear ideas de contenido… porque sí, ¡también es YouTuber y Podcaster!',
        highlights: [
          { label: 'Background', value: 'Project Management' },
          { label: 'Focus', value: 'Operations & Creative Direction' },
          { label: 'Idiomas', value: 'Español & Inglés' },
        ],
        functions: [
          'Idea el contenido que se publica en TikTok, incluso cuando la inspiración decide no colaborar.',
          'Graba a Fabio para los videos y hace su mejor esfuerzo por no mandarlo todo "a la shit" tras la toma número 38.',
          'Edita cada video y trata de no odiar CapCut después de las revisiones de Fabio.',
          'Gestiona los pagos de los estudiantes.',
          'Crea y actualiza las políticas de la academia a medida que Your English Buddy sigue creciendo.',
        ],
      },
      {
        name: 'Fabián Pernía',
        role: 'Socio Gerente y Desarrollador Full-Stack',
        imageUrl: '/img/fabian-pernia-pic.png',
        bio: 'Una mente lógica e inquieta apasionada por convertir ideas en herramientas digitales reales. El inglés ha sido clave en toda su carrera como programador.',
        fullBio:
          'Fabián es un inteligente nato con una mente lógica, inquieta y peligrosamente buena para resolver problemas. Es un apasionado del código bien escrito y de convertir ideas en herramientas digitales reales, como este sitio web. Su relación con el inglés también ha sido clave en su carrera como programador, ya que el idioma ha estado presente en gran parte de su crecimiento profesional.\n\nFabián vive en Colombia con su esposa, su hija y su American Bully, Bruno. En su tiempo libre, disfruta estudiar nuevas formas de usar la inteligencia artificial para simplificar su vida y la de otros.',
        highlights: [
          { label: 'Rol', value: 'Socio Gerente & Dev' },
          { label: 'Stack', value: 'React, TypeScript, Node.js' },
          { label: 'Focus', value: 'Productos digitales' },
        ],
        functions: [
          'Fue el primer gran creyente e inversionista de Your English Buddy.',
          'Desarrolla y mantiene todos los productos digitales: sitio web, app móvil, automatizaciones y pasarelas de pago.',
          'Genera ideas para llevar la visión de la academia al mundo digital.',
          'Trabaja para que Your English Buddy sea una comunidad digital cada vez más útil, sólida y valiosa.',
        ],
      },
    ],
  },
};

// ── Courses ─────────────────────────────────────────────────────────────────

const sharedCourseFeatures = [
  'Una primera clase diagnóstica gratis de 20 minutos.',
  '8 clases mensuales de 1 hora.',
  'Clases en línea vía Zoom, interactivas y personalizadas, adaptadas a tus necesidades.',
  'Acceso a guías y documentos de apoyo que puedes usar incluso fuera de clase.',
  'Comunidad de WhatsApp con tips, material extra y ejercicios para seguir practicando.',
];

export const defaultCourses: CoursesContent = {
  hero: {
    titlePre: 'Encuentra el curso ideal para',
    titleAccent: 'tu camino con el inglés',
    subtitle:
      'Desde conversaciones cotidianas hasta situaciones profesionales, nuestros cursos están diseñados para ofrecerte una experiencia práctica, personalizada y enfocada en ayudarte a comunicarte con más claridad, seguridad y confianza.',
    levels: [
      {
        label: 'A1 – A2',
        name: 'Principiante',
        desc: 'Sin experiencia previa. Construye tus bases desde el primer día.',
      },
      {
        label: 'B1 – B2',
        name: 'Intermedio',
        desc: 'Entiendes lo básico y quieres hablar con verdadera confianza.',
      },
      {
        label: 'C1 – C2',
        name: 'Avanzado',
        desc: 'Perfecciona tu fluidez, domina los matices y prepárate para exámenes de alto nivel.',
      },
    ],
  },
  section: {
    headingPre: 'Comienza Tu',
    headingAccent: 'English Journey Today!',
  },
  courses: [
    {
      category: 'Individual',
      title: 'Clases Individuales',
      description: '1 sola persona por clase personalizada.',
      priceLabel: '$290',
      priceUnit: '8 clases',
      popular: true,
      image: '/img/individual-class.jpg',
      features: [...sharedCourseFeatures],
    },
    {
      category: 'Dúo',
      title: 'Clases en Dúo',
      description: '2 personas por clase personalizada.',
      priceLabel: '$580',
      priceUnit: '8 clases',
      popular: false,
      image: '/img/duo-class.jpg',
      features: [...sharedCourseFeatures],
    },
    {
      category: 'Sabatinas',
      title: 'Clases Sabatinas',
      description: '1 sola persona por clase personalizada (consultar para dúos).',
      priceLabel: '$320',
      priceUnit: '8 clases',
      popular: false,
      image: '/img/saturday-class.jpg',
      features: [...sharedCourseFeatures],
    },
  ],
  perks: {
    kicker: 'Cada curso incluye',
    titlePre: 'Todo lo que necesitas para',
    titleAccent: 'lograrlo',
    cards: [
      {
        title: 'Clases personalizadas',
        desc: 'Cada clase está adaptada a tus objetivos, nivel y estilo de aprendizaje, sin un programa genérico.',
      },
      {
        title: 'Material de estudio especial',
        desc: 'Recursos hechos a medida y adaptados especialmente para ti, para que estudies de forma más inteligente.',
      },
      {
        title: 'Acceso a la comunidad',
        desc: 'Únete a grupos exclusivos de WhatsApp donde comparto tips diarios, vocabulario y expresiones reales.',
      },
      {
        title: 'App móvil — Próximamente',
        desc: 'Estamos desarrollando una app para iOS y Android para que puedas practicar y aprender desde cualquier lugar.',
        badge: 'Próximamente',
      },
    ],
  },
  cta: {
    badge: 'Llamada diagnóstica de 15 minutos',
    title: '¿Listo para empezar a hablar inglés',
    titleAccent: 'con confianza?',
    subtitle:
      'Evaluaré tu nivel, entenderé tus objetivos y te diré exactamente qué curso se adapta mejor a ti.',
    buttonLabel: 'Reserva tu clase ahora',
    trust: 'Sin compromiso  ·  Resultados en semanas',
  },
};

// ── Blog landing header ─────────────────────────────────────────────────────

export const defaultBlogPage: BlogPageContent = {
  header: {
    titlePre: 'Historias, consejos y',
    titleAccent: 'aprendizaje real',
    subtitle:
      'Artículos prácticos para mejorar tu inglés en situaciones cotidianas — lo suficientemente cortos para leer en un descanso.',
  },
};

// ── Aggregate ───────────────────────────────────────────────────────────────

export const PAGE_DEFAULTS: PageContentMap = {
  home: defaultHome,
  about: defaultAbout,
  courses: defaultCourses,
  blog: defaultBlogPage,
  site: defaultSite,
};
