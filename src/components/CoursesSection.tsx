import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowUpRight, X, Check, Image,
} from 'lucide-react';
import s from '../styles/CoursesSection.module.scss';
import { useInView } from '../hooks/useInView';
import individualClassImg from '../assets/individual-class.jpg';
import duoClassImg from '../assets/duo-class.jpg';
import saturdayClassImg from '../assets/saturday-class.jpg';

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

interface Course {
  id: number;
  category: string;
  title: string;
  description: string;
  priceLabel: string;
  priceUnit: string;
  price: number;
  popular?: boolean;
  image: string;
  features: string[];
}

const featuredCourse: Course = {
  id: 1,
  category: 'Individual',
  title: 'Clases Individuales',
  description: '1 sola persona por clase personalizada.',
  priceLabel: '$290',
  priceUnit: '8 clases',
  price: 290,
  popular: true,
  image: individualClassImg,
  features: [
    'Una primera clase diagnóstica gratis de 20 minutos.',
    '8 clases mensuales de 1 hora.',
    'Clases en línea vía Zoom, interactivas y personalizadas, adaptadas a tus necesidades.',
    'Acceso a guías y documentos de apoyo que puedes usar incluso fuera de clase.',
    'Comunidad de WhatsApp con tips, material extra y ejercicios para seguir practicando.',
  ],
};

const courses: Course[] = [
  {
    id: 2,
    category: 'Dúo',
    title: 'Clases en Dúo',
    description: '2 personas por clase personalizada.',
    priceLabel: '$580',
    priceUnit: '8 clases',
    price: 580,
    image: duoClassImg,
    features: [
      'Una primera clase diagnóstica gratis de 20 minutos.',
      '8 clases mensuales de 1 hora.',
      'Clases en línea vía Zoom, interactivas y personalizadas, adaptadas a tus necesidades.',
      'Acceso a guías y documentos de apoyo que puedes usar incluso fuera de clase.',
      'Comunidad de WhatsApp con tips, material extra y ejercicios para seguir practicando.',
    ],
  },
  {
    id: 3,
    category: 'Sabatinas',
    title: 'Clases Sabatinas',
    description: '1 sola persona por clase personalizada (consultar para dúos).',
    priceLabel: '$320',
    priceUnit: '8 clases',
    price: 320,
    image: saturdayClassImg,
    features: [
      'Una primera clase diagnóstica gratis de 20 minutos.',
      '8 clases mensuales de 1 hora.',
      'Clases en línea vía Zoom, interactivas y personalizadas, adaptadas a tus necesidades.',
      'Acceso a guías y documentos de apoyo que puedes usar incluso fuera de clase.',
      'Comunidad de WhatsApp con tips, material extra y ejercicios para seguir practicando.',
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
            {course.image ? (
              <img src={course.image} alt={course.title} className={s.courses__img} />
            ) : (
              <PlaceholderImg label={course.title} />
            )}
          </div>
          <div className={s.modal__headerOverlay} />
          <div className={s.modal__headerContent}>
            {course.popular && (
              <div className={s.modal__tags}>
                <span className={s.modal__popularBadge}>
                  <span className={s.courses__popularDot} />
                  Popular
                </span>
              </div>
            )}
            <h3 className={s.modal__title}>{course.title}</h3>
            <p className={s.modal__desc}>{course.description}</p>
            <div className={s.modal__headerMeta}>
              <span className={s.modal__priceChip}>
                {course.priceLabel}
              </span>
              <span className={s.modal__metaChip}>
                {course.priceUnit}
              </span>
            </div>
          </div>
        </div>

        {/* ── Scrollable body with features ── */}
        <div className={s.modal__body}>
          <h4 className={s.modal__sectionTitle}>¿Qué incluye?</h4>

          <ul className={s.modal__featuresList}>
            {course.features.map((feat, i) => (
              <li key={i} className={s.modal__featureItem}>
                <span className={s.modal__featureCheck}><Check size={18} /></span>
                {feat}
              </li>
            ))}
          </ul>

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
            {featuredCourse.image ? (
              <img src={featuredCourse.image} alt={featuredCourse.title} className={s.courses__img} />
            ) : (
              <PlaceholderImg label="Course Image" />
            )}
          </div>
          <div className={s.courses__featuredContent}>
            {featuredCourse.popular && (
              <div className={s.courses__featuredTop}>
                <span className={s.courses__popular}>
                  <span className={s.courses__popularDot} />
                  Popular
                </span>
              </div>
            )}

            <h3 className={s.courses__featuredTitle}>{featuredCourse.title}</h3>
            <p className={s.courses__featuredDesc}>{featuredCourse.description}</p>

            <div className={s.courses__featuredPriceRow}>
              <span className={s.courses__price}>
                {featuredCourse.priceLabel}
              </span>
              <span className={s.courses__priceUnit}>
                {featuredCourse.priceUnit}
              </span>
            </div>

            <ul className={s.courses__featuredFeatures}>
              {featuredCourse.features.map((feat, i) => (
                <li key={i} className={s.courses__featureItem}>
                  <span className={s.courses__featureCheck}><Check size={16} /></span>
                  {feat}
                </li>
              ))}
            </ul>

            <div className={s.courses__featuredDivider} />

            <div className={s.courses__featuredBottom}>
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
                {course.image ? (
                  <img src={course.image} alt={course.title} className={s.courses__img} />
                ) : (
                  <PlaceholderImg label={course.title} />
                )}
              </div>
              <div className={s.courses__cardBody}>
                {course.popular && (
                  <div className={s.courses__cardTop}>
                    <span className={s.courses__popular}>
                      <span className={s.courses__popularDot} />
                      Popular
                    </span>
                  </div>
                )}
                <h4 className={s.courses__cardTitle}>{course.title}</h4>
                <p className={s.courses__cardDesc}>{course.description}</p>
                <div className={s.courses__cardPriceRow}>
                  <span className={s.courses__price}>{course.priceLabel}</span>
                  <span className={s.courses__priceUnit}>{course.priceUnit}</span>
                </div>
                <ul className={s.courses__cardFeatures}>
                  {course.features.map((feat, i) => (
                    <li key={i} className={s.courses__featureItem}>
                      <span className={s.courses__featureCheck}><Check size={16} /></span>
                      {feat}
                    </li>
                  ))}
                </ul>
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
