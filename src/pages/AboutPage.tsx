import React, { useState, useEffect, useCallback, useRef } from 'react';
import s from '../styles/AboutPage.module.scss';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useInView } from '../hooks/useInView';
import phraseImage from '../assets/phrase-image.jpg';
import techHuman from '../assets/tech-human.jpg';

// ─── Progressive blur image ───────────────────────────────────────────────────

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
}

const BlurImage: React.FC<BlurImageProps> = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onLoad={() => setLoaded(true)}
      style={{
        filter: loaded ? 'blur(0px)' : 'blur(16px)',
        transform: loaded ? 'scale(1)' : 'scale(1.04)',
        transition: 'filter 0.7s ease, transform 0.7s ease',
      }}
    />
  );
};

// ─── Animation helper ────────────────────────────────────────────────────────

const anim = (
  inView: boolean,
  animClass: string,
  delayClass: string,
  ...extra: string[]
): string => {
  const base = extra.filter(Boolean).join(' ');
  return inView
    ? `${base} ${animClass} ${delayClass}`.trim()
    : `${base} anim-hidden`.trim();
};

// ─── Team data ────────────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  imageUrl: string;
  bio: string;
  fullBio: string;
  highlights: { label: string; value: string }[];
  functions: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: 'Fabio Pernía',
    role: 'Fundador y eterno enamorado del inglés',
    initials: 'FP',
    imageUrl: 'https://i.pravatar.cc/640?img=12',
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
    initials: 'AL',
    imageUrl: 'https://i.pravatar.cc/640?img=5',
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
    initials: 'FPn',
    imageUrl: 'https://i.pravatar.cc/640?img=13',
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
];

// ─── Pillars data ─────────────────────────────────────────────────────────────

const pillars = [
  {
    title: 'No Miedo',
    desc: 'Eliminamos la barrera del juicio. Aquí el error no es un fallo, es el material de construcción de tu fluidez. Un espacio seguro para soltarte.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="13" cy="13" r="9" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 13.5C9 13.5 10.5 16 13 16s4-2.5 4-2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="10" cy="10.5" r="1" fill="currentColor" />
        <circle cx="16" cy="10.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Confianza',
    desc: 'Te dotamos de las herramientas precisas para que tu voz suene con autoridad, ya sea en una reunión de negocios o en una cena informal.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path d="M13 3L4 7v6.5C4 19 8.5 22.5 13 24c4.5-1.5 9-5 9-10.5V7L13 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.5 13l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Conexión',
    desc: 'El inglés es solo el medio; el fin es la conexión humana. Aprende a transmitir no solo palabras, sino intenciones y emociones.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="8.5" cy="9" r="3" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.5" cy="9" r="3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3 21c0-3 2.5-5 5-5h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M16 16h2c2.5 0 5 2 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M13 14v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="13" cy="12" r="2" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
];

// ─── Team Member Modal ───────────────────────────────────────────────────────

interface TeamMemberModalProps {
  member: TeamMember;
  onClose: () => void;
  isVisible: boolean;
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ member, onClose, isVisible }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isVisible]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const paragraphs = member.fullBio.split('\n\n');
  const firstName = member.name.split(' ')[0];

  return (
    <div
      ref={overlayRef}
      className={`${s.tm__overlay} ${isVisible ? s['tm__overlay--visible'] : ''}`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`${s.tm__container} ${isVisible ? s['tm__container--visible'] : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={s.tm__close} onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        <div className={s.tm__left}>
          <BlurImage className={s.tm__photo} src={member.imageUrl} alt={member.name} />
        </div>

        <div className={s.tm__right}>
          <p className={s.tm__rightEyebrow}>{member.role}</p>
          <h3 className={s.tm__rightHeading}>
            Conoce a <span>{firstName}</span>
          </h3>
          <p className={s.tm__rightName}>{member.name}</p>

          <div className={s.tm__highlights}>
            {member.highlights.map((h) => (
              <div key={h.label} className={s.tm__highlight}>
                <span className={s.tm__highlightLabel}>{h.label}</span>
                <span className={s.tm__highlightValue}>{h.value}</span>
              </div>
            ))}
          </div>

          <div className={s.tm__bio}>
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {member.functions.length > 0 && (
            <div className={s.tm__functionsWrap}>
              <p className={s.tm__functionsTitle}>Rol dentro de la academia</p>
              <ul className={s.tm__functions}>
                {member.functions.map((fn, i) => (
                  <li key={i} className={s.tm__functionItem}>{fn}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═════════════════════════════════════════════════════════════════════════════

const AboutPage: React.FC = () => {
  const { ref: heroRef, ready: heroReady } = useInView({ threshold: 0.1 });
  const { ref: missionRef, ready: missionReady } = useInView({ threshold: 0.1 });
  const { ref: pillarsRef, ready: pillarsReady } = useInView({ threshold: 0.1 });
  const { ref: quoteRef, ready: quoteReady } = useInView({ threshold: 0.2 });
  const { ref: gridRef, ready: gridReady } = useInView({ threshold: 0.1 });

  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = useCallback((member: TeamMember) => {
    setActiveMember(member);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setModalVisible(true));
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setTimeout(() => setActiveMember(null), 350);
  }, []);

  return (
    <div className={s.page}>
      <Navbar />

      <main className={s.main}>

        {/* ─── Hero Section ─── */}
        <section
          className={s.heroSection}
          ref={heroRef as React.RefObject<HTMLElement>}
        >
          <div className={s.heroInner}>
            <div className={s.heroLeft}>
              <h1 className={anim(heroReady, 'anim-slide-right', 'delay-0', s.heroTitle)}>
                La maestría del inglés,{' '}
                <span className={s.heroTitleItalic}>con alma humana.</span>
              </h1>
              <p className={anim(heroReady, 'anim-slide-up', 'delay-100', s.heroSubtitle)}>
                Mucho más que una academia. Un santuario de aprendizaje donde la conexión
                trasciende las reglas gramaticales para dar voz a tu verdadero yo.
              </p>
              <div className={anim(heroReady, 'anim-slide-up', 'delay-200', s.heroCtas)}>
                <a
                  href="https://wa.me/5491123310113?text=Hola%2C%20quisiera%20obtener%20informacion%20para%20agendar%20una%20clase%20para%20Your%20English%20Buddy%2C%20gracias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.heroCta}
                >
                  Empieza mi viaje
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>

            <div className={anim(heroReady, 'anim-fade-scale', 'delay-100', s.heroRight)}>
              <div className={s.heroImgWrap}>
                <BlurImage
                  className={s.heroImg}
                  src={phraseImage}
                  alt="Ambiente de aprendizaje de inglés"
                />
              </div>
              <div className={s.heroFloatCard}>
                <p className={s.heroFloatCardQuote}>
                  "El lenguaje es la única cosa que vale la pena conocer incluso de manera pobre."
                </p>
                <p className={s.heroFloatCardCite}>Kató Lomb · Polyglot</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Mission Section ─── */}
        <section
          className={s.missionSection}
          ref={missionRef as React.RefObject<HTMLElement>}
        >
          <div className={s.missionInner}>
            <div className={s.missionGrid}>
              <div className={anim(missionReady, 'anim-fade-scale', 'delay-0', s.missionImgCol)}>
                <div className={s.missionImgBg} />
                <BlurImage
                  className={s.missionImg}
                  src={techHuman}
                  alt="Conexión humana en el aprendizaje"
                />
              </div>

              <div className={s.missionTextCol}>
                <span className={anim(missionReady, 'anim-slide-up', 'delay-100', s.missionEyebrow)}>
                  Nuestra Misión
                </span>
                <h2 className={anim(missionReady, 'anim-slide-up', 'delay-200', s.missionTitle)}>
                  Humanizando el aprendizaje en la era digital.
                </h2>
                <div className={anim(missionReady, 'anim-slide-up', 'delay-300', s.missionTextBlock)}>
                  <p>
                    En un mundo saturado de aplicaciones automáticas y correcciones frías,
                    nosotros elegimos el camino de la empatía. Creemos que aprender un idioma
                    es, ante todo, un acto de vulnerabilidad y valentía.
                  </p>
                  <p>
                    Nuestro enfoque no se basa en la repetición mecánica, sino en la
                    construcción de un puente real entre tu cultura y el mundo anglosajón,
                    guiado por personas que entienden que detrás de cada error hay un
                    intento de conexión.
                  </p>
                  <p>
                    Your English Buddy fue creada por personas que también estuvieron en ese
                    lugar de duda, frustración e inseguridad. Porque aprender un idioma no
                    debería sentirse como una presión constante, sino como una experiencia
                    profundamente transformadora.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Pillars Section ─── */}
        <section
          className={s.pillarsSection}
          ref={pillarsRef as React.RefObject<HTMLElement>}
        >
          <div className={s.pillarsInner}>
            {/* Header — split two-column */}
            <div className={anim(pillarsReady, 'anim-slide-up', 'delay-0', s.pillarsHeader)}>
              <div className={s.pillarsHeaderLeft}>
                <span className={s.pillarsEyebrow}>Metodología de Vanguardia</span>
                <h2 className={s.pillarsTitle}>
                  Los tres pilares de{' '}
                  <br />
                  <span className={s.pillarsTitleItalic}>tu evolución personal.</span>
                </h2>
              </div>
              <div className={s.pillarsHeaderRight}>
                <div className={s.pillarsHeaderDivider} />
                <p className={s.pillarsHeaderDesc}>
                  Un enfoque tridimensional diseñado para transformar el conocimiento
                  en expresión auténtica.
                </p>
              </div>
            </div>

            {/* Cards — asymmetric 4/5/3 bento */}
            <div className={s.pillarsGrid}>

              {/* Card 1 – No Miedo */}
              <div className={anim(pillarsReady, 'anim-fade-scale', 'delay-100', s.pillarCard)}>
                <span className={s.pillarBgNumber} aria-hidden="true">01</span>
                <div className={s.pillarIconOrg1}>
                  {pillars[0].icon}
                </div>
                <h3 className={s.pillarCardTitle}>
                  No <span className={s.pillarCardTitleItalic}>Miedo</span>
                </h3>
                <p className={s.pillarDesc}>{pillars[0].desc}</p>
              </div>

              {/* Card 2 – Confianza (accent) */}
              <div className={anim(pillarsReady, 'anim-fade-scale', 'delay-200', `${s.pillarCard} ${s.pillarCard__accent}`)}>
                <span className={`${s.pillarBgNumber} ${s.pillarBgNumber__accent}`} aria-hidden="true">02</span>
                <div className={s.pillarIconOrg2}>
                  {pillars[1].icon}
                </div>
                <h3 className={`${s.pillarCardTitle} ${s.pillarCardTitle__accent}`}>
                  La <span className={s.pillarCardTitleItalic}>Confianza</span>
                </h3>
                <p className={`${s.pillarDesc} ${s.pillarDesc__accent}`}>{pillars[1].desc}</p>
              </div>

              {/* Card 3 – Conexión */}
              <div className={anim(pillarsReady, 'anim-fade-scale', 'delay-300', `${s.pillarCard} ${s.pillarCard__light}`)}>
                <span className={s.pillarBgNumber} aria-hidden="true">03</span>
                <div className={s.pillarIconOrg3}>
                  {pillars[2].icon}
                </div>
                <h3 className={s.pillarCardTitle}>
                  Conexión <br />
                  <span className={s.pillarCardTitleItalic}>Humana</span>
                </h3>
                <p className={s.pillarDesc}>{pillars[2].desc}</p>
              </div>

            </div>
          </div>
        </section>

        {/* ─── Quote Section ─── */}
        <section
          className={s.quoteSection}
          ref={quoteRef as React.RefObject<HTMLElement>}
        >
          <div className={anim(quoteReady, 'anim-fade-scale', 'delay-0', s.quoteWrapper)}>
            <span className={s.quoteIcon} aria-hidden="true">"</span>
            <blockquote className={s.quoteBlockquote}>
              Language is the only thing{' '}
              <span className={s.quoteHighlight}>worth knowing</span>{' '}
              even poorly.
            </blockquote>
            <cite className={s.quoteCite}>— Kató Lomb, Polyglot Mastery</cite>
          </div>
        </section>

        {/* ─── Team section ─── */}
        <div className={s.teamSection}>
          <div className={s.inner}>
            <h2 className={anim(gridReady, 'anim-slide-up', 'delay-0', s.teamHeading)}>
              Las grandes mentes detrás de{' '}
              <span>Your English Buddy</span>
            </h2>

            <div
              className={s.grid}
              ref={gridRef as React.RefObject<HTMLDivElement>}
            >
              {teamMembers.map((member, i) => (
                <div
                  key={member.name}
                  className={anim(gridReady, 'anim-fade-scale', `delay-${(i + 1) * 100}`)}
                >
                  <div
                    className={s.card}
                    onClick={() => openModal(member)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Conocer más sobre ${member.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal(member);
                      }
                    }}
                  >
                    <div className={s.card__glow} />
                    <div className={s.card__avatarWrap}>
                      <BlurImage className={s.card__avatar} src={member.imageUrl} alt={member.name} />
                    </div>
                    <div className={s.card__overlay}>
                      <h3 className={s.card__name}>{member.name}</h3>
                      <p className={s.card__role}>{member.role}</p>
                      <p className={s.card__bio}>{member.bio}</p>
                      <div className={s.card__cta}>
                        <span>Ver perfil</span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      <Footer />

      {activeMember && (
        <TeamMemberModal
          member={activeMember}
          onClose={closeModal}
          isVisible={modalVisible}
        />
      )}
    </div>
  );
};

export default AboutPage;
