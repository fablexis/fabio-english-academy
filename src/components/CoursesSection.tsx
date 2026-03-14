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
  title: 'Conversational English Mastery',
  description:
    'This course provides an in-depth approach to building confidence in everyday conversations, presentations, and professional English communication.',
  duration: '4 weeks',
  lectures: 28,
  price: 89.0,
  popular: true,
  image: '',
  modules: [
    { week: 'Week 1', title: 'Foundations of Fluency', topics: ['Breaking the silence barrier', 'Everyday greetings & small talk', 'Building a conversation toolkit'] },
    { week: 'Week 2', title: 'Pronunciation & Intonation', topics: ['Vowel & consonant clarity drills', 'Stress patterns in sentences', 'Natural rhythm & linking sounds'] },
    { week: 'Week 3', title: 'Real-World Conversations', topics: ['Ordering, shopping & travel dialogues', 'Expressing opinions & emotions', 'Handling misunderstandings gracefully'] },
    { week: 'Week 4', title: 'Professional & Presentation Skills', topics: ['Structuring a short speech', 'Persuasive language techniques', 'Final live conversation assessment'] },
  ],
};

const courses: Course[] = [
  // Only the first two are shown in the grid (slice applied in the render)
  {
    id: 2,
    category: 'Grammar',
    title: 'Advanced Grammar & Writing',
    description:
      'Master the foundations of English grammar and develop polished writing skills through structured lessons, practical exercises, and expert feedback.',
    duration: '6 weeks',
    lectures: 32,
    price: 79.0,
    popular: true,
    image: '',
    modules: [
      { week: 'Week 1', title: 'Sentence Structure Foundations', topics: ['Parts of speech review', 'Clause types & sentence patterns', 'Subject-verb agreement mastery'] },
      { week: 'Week 2', title: 'Tenses & Verb Forms', topics: ['Perfect vs. continuous tenses', 'Conditional structures', 'Modal verbs for nuance'] },
      { week: 'Week 3', title: 'Punctuation & Style', topics: ['Advanced comma rules', 'Semicolons, colons & dashes', 'Parallel structure in writing'] },
      { week: 'Week 4', title: 'Complex Sentences', topics: ['Relative clauses', 'Reported speech', 'Inversion & emphasis techniques'] },
      { week: 'Week 5', title: 'Essay & Paragraph Writing', topics: ['Thesis development', 'Coherence & cohesion', 'Formal vs. informal register'] },
      { week: 'Week 6', title: 'Editing & Proofreading', topics: ['Common error patterns', 'Self-editing strategies', 'Final portfolio submission'] },
    ],
  },
  {
    id: 3,
    category: 'Business English',
    title: 'Business English Essentials',
    description:
      'Build professional communication skills for meetings, emails, presentations, and negotiations in global business environments.',
    duration: '5 weeks',
    lectures: 24,
    price: 99.0,
    image: '',
    modules: [
      { week: 'Week 1', title: 'Professional Email & Correspondence', topics: ['Formal email templates', 'Tone & register in business', 'Follow-up & escalation emails'] },
      { week: 'Week 2', title: 'Meetings & Conference Calls', topics: ['Leading & participating in meetings', 'Agreeing, disagreeing & negotiating', 'Minute-taking vocabulary'] },
      { week: 'Week 3', title: 'Presentations & Public Speaking', topics: ['Structuring a business presentation', 'Visual aid language', 'Handling Q&A sessions'] },
      { week: 'Week 4', title: 'Negotiation & Persuasion', topics: ['Diplomatic language patterns', 'Making proposals & counteroffers', 'Cross-cultural communication'] },
      { week: 'Week 5', title: 'Reports & Professional Documents', topics: ['Executive summary writing', 'Data description language', 'Final business simulation project'] },
    ],
  },
  {
    id: 4,
    category: 'Exam Prep',
    title: 'IELTS & TOEFL Preparation',
    description:
      'Comprehensive preparation for international English proficiency exams with practice tests, strategies, and personalized study plans.',
    duration: '8 weeks',
    lectures: 40,
    price: 129.0,
    popular: true,
    image: '',
    modules: [
      { week: 'Week 1–2', title: 'Listening Strategies', topics: ['Note-taking techniques', 'Predicting answers', 'Accent familiarization drills'] },
      { week: 'Week 3–4', title: 'Reading Comprehension', topics: ['Skimming & scanning methods', 'True/False/Not Given mastery', 'Academic reading speed drills'] },
      { week: 'Week 5–6', title: 'Writing Tasks', topics: ['Task 1: Data description (IELTS)', 'Task 2: Argumentative essays', 'Integrated writing (TOEFL)'] },
      { week: 'Week 7', title: 'Speaking Practice', topics: ['Part 1, 2 & 3 frameworks (IELTS)', 'Independent & integrated tasks (TOEFL)', 'Fluency & pronunciation coaching'] },
      { week: 'Week 8', title: 'Full Mock Exams & Review', topics: ['Timed full-length practice tests', 'Score analysis & weak-area targeting', 'Final strategies & exam-day tips'] },
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
                {course.lectures} lectures
              </span>
              <span className={s.modal__priceChip}>
                ${course.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* ── Scrollable body with timeline ── */}
        <div className={s.modal__body}>
          <h4 className={s.modal__sectionTitle}>Course Roadmap</h4>

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
              Enroll Now
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
          Start Your English Journey{' '}
          <span className={s.courses__headingAccent}>Today!</span>
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
                {featuredCourse.lectures} lectures
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
                View Details
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
                    {course.lectures} lectures
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
