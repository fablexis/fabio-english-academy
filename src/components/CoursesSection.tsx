import React, { useState, useEffect, useCallback } from 'react';
import {
  Clock, FileText, ArrowUpRight, X, Check, Image,
} from 'lucide-react';
import s from '../styles/CoursesSection.module.scss';
import { useInView } from '../hooks/useInView';

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

// ─── Data ────────────────────────────────────────────────────────────────────

interface Module {
  week: string;
  title: string;
  topics: string[];
}

interface Course {
  id: number;
  category: string;
  title: string;
  description?: string;
  duration: string;
  lectures: number;
  price: number;
  popular?: boolean;
  image: string;
  modules?: Module[];
}

const featuredCourse: Course = {
  id: 1,
  category: 'Speaking',
  title: 'Domina el inglés conversacional',
  description:
    'Este curso ofrece un enfoque profundo para ganar confianza en conversaciones cotidianas, presentaciones y comunicación profesional en inglés.',
  duration: '4 semanas',
  lectures: 28,
  price: 89.0,
  popular: true,
  image: '',
  modules: [
    { week: 'Semana 1', title: 'Fundamentos de la fluidez', topics: ['Romper la barrera del silencio', 'Saludos cotidianos y conversación informal', 'Construir un kit de conversación'] },
    { week: 'Semana 2', title: 'Pronunciación y entonación', topics: ['Ejercicios de claridad en vocales y consonantes', 'Patrones de énfasis en oraciones', 'Ritmo natural y enlace de sonidos'] },
    { week: 'Semana 3', title: 'Conversaciones del mundo real', topics: ['Diálogos de pedidos, compras y viajes', 'Expresar opiniones y emociones', 'Manejar malentendidos con elegancia'] },
    { week: 'Semana 4', title: 'Habilidades profesionales y de presentación', topics: ['Estructurar un discurso corto', 'Técnicas de lenguaje persuasivo', 'Evaluación final de conversación en vivo'] },
  ],
};

const courses: Course[] = [
  // Only the first two are shown in the grid (slice applied in the render)
  {
    id: 2,
    category: 'Grammar',
    title: 'Gramática avanzada y escritura',
    description:
      'Domina los fundamentos de la gramática inglesa y desarrolla habilidades de escritura sólidas con lecciones estructuradas, ejercicios prácticos y retroalimentación experta.',
    duration: '6 semanas',
    lectures: 32,
    price: 79.0,
    popular: true,
    image: '',
    modules: [
      { week: 'Semana 1', title: 'Fundamentos de la estructura oracional', topics: ['Revisión de partes del discurso', 'Tipos de cláusulas y patrones oracionales', 'Concordancia sujeto-verbo'] },
      { week: 'Semana 2', title: 'Tiempos verbales y formas', topics: ['Tiempos perfectos vs. continuos', 'Estructuras condicionales', 'Verbos modales para matices'] },
      { week: 'Semana 3', title: 'Puntuación y estilo', topics: ['Reglas avanzadas de la coma', 'Punto y coma, dos puntos y guiones', 'Estructura paralela en la escritura'] },
      { week: 'Semana 4', title: 'Oraciones complejas', topics: ['Cláusulas relativas', 'Estilo indirecto', 'Inversión y técnicas de énfasis'] },
      { week: 'Semana 5', title: 'Redacción de ensayos y párrafos', topics: ['Desarrollo de tesis', 'Coherencia y cohesión', 'Registro formal vs. informal'] },
      { week: 'Semana 6', title: 'Edición y corrección', topics: ['Patrones de errores comunes', 'Estrategias de auto-edición', 'Entrega final del portafolio'] },
    ],
  },
  {
    id: 3,
    category: 'Business English',
    title: 'Inglés de negocios esencial',
    description:
      'Desarrolla habilidades de comunicación profesional para reuniones, correos, presentaciones y negociaciones en entornos de negocios internacionales.',
    duration: '5 semanas',
    lectures: 24,
    price: 99.0,
    image: '',
    modules: [
      { week: 'Semana 1', title: 'Correo profesional y correspondencia', topics: ['Plantillas de correo formal', 'Tono y registro en los negocios', 'Correos de seguimiento y escalación'] },
      { week: 'Semana 2', title: 'Reuniones y llamadas de conferencia', topics: ['Liderar y participar en reuniones', 'Estar de acuerdo, disentir y negociar', 'Vocabulario para toma de actas'] },
      { week: 'Semana 3', title: 'Presentaciones y oratoria', topics: ['Estructurar una presentación de negocios', 'Lenguaje para apoyos visuales', 'Manejo de sesiones de preguntas'] },
      { week: 'Semana 4', title: 'Negociación y persuasión', topics: ['Patrones de lenguaje diplomático', 'Hacer propuestas y contraofertas', 'Comunicación intercultural'] },
      { week: 'Semana 5', title: 'Informes y documentos profesionales', topics: ['Redacción de resumen ejecutivo', 'Lenguaje para descripción de datos', 'Proyecto final de simulación de negocios'] },
    ],
  },
  {
    id: 4,
    category: 'Exam Prep',
    title: 'Preparación IELTS & TOEFL',
    description:
      'Preparación integral para exámenes internacionales de inglés con pruebas prácticas, estrategias y planes de estudio personalizados.',
    duration: '8 semanas',
    lectures: 40,
    price: 129.0,
    popular: true,
    image: '',
    modules: [
      { week: 'Semanas 1–2', title: 'Estrategias de comprensión auditiva', topics: ['Técnicas de toma de notas', 'Predecir respuestas', 'Ejercicios de familiarización con acentos'] },
      { week: 'Semanas 3–4', title: 'Comprensión lectora', topics: ['Métodos de lectura rápida y scanning', 'Dominio de Verdadero/Falso/No mencionado', 'Ejercicios de velocidad de lectura académica'] },
      { week: 'Semanas 5–6', title: 'Tareas de escritura', topics: ['Tarea 1: Descripción de datos (IELTS)', 'Tarea 2: Ensayos argumentativos', 'Escritura integrada (TOEFL)'] },
      { week: 'Semana 7', title: 'Práctica de expresión oral', topics: ['Partes 1, 2 y 3 (IELTS)', 'Tareas independientes e integradas (TOEFL)', 'Coaching de fluidez y pronunciación'] },
      { week: 'Semana 8', title: 'Exámenes simulacro y revisión', topics: ['Pruebas completas cronometradas', 'Análisis de puntaje y áreas débiles', 'Estrategias finales y consejos para el examen'] },
    ],
  },
];

// ─── Placeholder image component ─────────────────────────────────────────────

const PlaceholderImg: React.FC<{ label: string; className?: string }> = ({
  label,
  className,
}) => (
  <div className={`${s.placeholder} ${className || ''}`}>
    <Image size={40} opacity={0.35} color="currentColor" />
    <span>{label}</span>
  </div>
);

// ─── Course Modal ───────────────────────────────────────────────────────────

interface CourseModalProps {
  course: Course;
  onClose: () => void;
  isVisible: boolean;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, onClose, isVisible }) => {
  // Lock body scroll when open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isVisible) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isVisible, onClose]);

  const modules = course.modules || [];

  return (
    <div
      className={`${s.modal__overlay} ${isVisible ? s['modal__overlay--visible'] : ''}`}
      onClick={onClose}
    >
      <div
        className={`${s.modal__container} ${isVisible ? s['modal__container--visible'] : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button className={s.modal__close} onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {/* ── Header banner ── */}
        <div className={s.modal__header}>
          <div className={s.modal__headerBg}>
            <PlaceholderImg label={course.title} />
          </div>
          <div className={s.modal__headerOverlay} />
          <div className={s.modal__headerContent}>
            <div className={s.modal__tags}>
              <span className={s.modal__tagLight}>{course.category}</span>
              {course.popular && (
                <span className={s.modal__popularBadge}>
                  <span className={s.courses__popularDot} />
                  Popular
                </span>
              )}

            </div>
            <h3 className={s.modal__title}>{course.title}</h3>
            <p className={s.modal__desc}>{course.description}</p>
            <div className={s.modal__headerMeta}>
              <span className={s.modal__metaChip}>
                <Clock size={14} />
                {course.duration}
              </span>
              <span className={s.modal__metaChip}>
                <FileText size={14} />
                {course.lectures} clases
              </span>
              <span className={s.modal__priceChip}>
                ${course.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* ── Scrollable body with timeline ── */}
        <div className={s.modal__body}>
          <h4 className={s.modal__sectionTitle}>Programa del curso</h4>

          <div className={s.timeline}>
            {modules.map((mod, i) => (
              <div
                key={i}
                className={`${s.timeline__item} ${i === modules.length - 1 ? s['timeline__item--last'] : ''}`}
              >
                {/* Line + node */}
                <div className={s.timeline__rail}>
                  <div className={s.timeline__node}>
                    <span className={s.timeline__nodeInner}>{i + 1}</span>
                  </div>
                  {i < modules.length - 1 && <div className={s.timeline__line} />}
                </div>

                {/* Content card */}
                <div className={s.timeline__card}>
                  <span className={s.timeline__week}>{mod.week}</span>
                  <h5 className={s.timeline__cardTitle}>{mod.title}</h5>
                  <ul className={s.timeline__topics}>
                    {mod.topics.map((topic, j) => (
                      <li key={j} className={s.timeline__topic}>
                        <span className={s.timeline__topicCheck}><Check size={14} /></span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom CTA ── */}
          <div className={s.modal__cta}>
            <button className={s.courses__viewBtn}>
              Inscribirme ahora
              <span className={s.courses__viewBtnIcon}>
                <ArrowUpRight size={14} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// COURSES SECTION COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

const CoursesSection: React.FC = () => {
  const [modalCourse, setModalCourse] = useState<Course | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { ref, ready } = useInView({ threshold: 0.1 });

  const openModal = useCallback((course: Course) => {
    setModalCourse(course);
    // Small delay to trigger CSS transition after mount
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setModalVisible(true));
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setTimeout(() => setModalCourse(null), 350); // wait for exit animation
  }, []);

  return (
    <section className={s.courses} ref={ref as React.RefObject<HTMLElement>}>
      <div className={s.courses__inner}>
        {/* ─── Heading ─── */}
        <h2 className={anim(ready, 'anim-slide-up', 'delay-0', s.courses__heading)}>
          Comienza Tu{' '}
          <span className={s.courses__headingAccent}>English Journey Today!</span>
        </h2>

        {/* ─── Featured Course ─── */}
        <div
          className={anim(ready, 'anim-slide-up', 'delay-200', s.courses__featured)}
          onClick={() => openModal(featuredCourse)}
          style={{ cursor: 'pointer' }}
        >
          <div className={s.courses__featuredImage}>
            <PlaceholderImg label="Course Image" />
          </div>
          <div className={s.courses__featuredContent}>
            <div className={s.courses__featuredTop}>
              <span className={s.courses__tag}>{featuredCourse.category}</span>
              {featuredCourse.popular && (
                <span className={s.courses__popular}>
                  <span className={s.courses__popularDot} />
                  Popular
                </span>
              )}
            </div>

            <h3 className={s.courses__featuredTitle}>{featuredCourse.title}</h3>
            <p className={s.courses__featuredDesc}>{featuredCourse.description}</p>

            <div className={s.courses__featuredMeta}>
              <span className={s.courses__metaItem}>
                <Clock size={14} />
                {featuredCourse.duration}
              </span>
              <span className={s.courses__metaItem}>
                <FileText size={14} />
                {featuredCourse.lectures} clases
              </span>
            </div>

            <div className={s.courses__featuredDivider} />

            <div className={s.courses__featuredBottom}>
              <span className={s.courses__price}>
                ${featuredCourse.price.toFixed(2)}
              </span>
              <button
                className={s.courses__viewBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(featuredCourse);
                }}
              >
                Ver detalles
                <span className={s.courses__viewBtnIcon}>
                  <ArrowUpRight size={14} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ─── Course Grid ─── */}
        <div className={s.courses__grid}>
          {courses.slice(0, 2).map((course, index) => (
            <div
              key={course.id}
              className={anim(
                ready,
                'anim-fade-scale',
                `delay-${400 + index * 100}`,
                s.courses__card
              )}
              onClick={() => openModal(course)}
            >
              <div className={s.courses__cardImage}>
                <PlaceholderImg label={course.title} />
              </div>
              <div className={s.courses__cardBody}>
                <div className={s.courses__cardTop}>
                  <span className={s.courses__tag}>{course.category}</span>
                  <span className={s.courses__cardPrice}>
                    ${course.price.toFixed(0)}
                  </span>
                </div>
                <h4 className={s.courses__cardTitle}>{course.title}</h4>
                <div className={s.courses__cardMeta}>
                  <span className={s.courses__metaItem}>
                    <Clock size={14} />
                    {course.duration}
                  </span>
                  <span className={s.courses__metaItem}>
                    <FileText size={14} />
                    {course.lectures} clases
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Course Modal ─── */}
      {modalCourse && (
        <CourseModal
          course={modalCourse}
          onClose={closeModal}
          isVisible={modalVisible}
        />
      )}
    </section>
  );
};

export default CoursesSection;
