import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Clock3,
  Compass,
  Languages,
  Lightbulb,
  MessageCircle,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts } from '../data/blogPosts';
import type { Callout } from '../data/blogPosts';
import s from '../styles/BlogDetailPage.module.scss';

const iconByCategory: Record<string, React.ReactNode> = {
  'Gramática': <BookOpen size={28} />,
  'Vocabulario': <Languages size={28} />,
  'Conversación': <MessageCircle size={28} />,
  'Situaciones': <Compass size={28} />,
};

function renderCallout(callout: Callout, key: number): React.ReactNode {
  switch (callout.type) {
    case 'formula':
      return (
        <div key={key} className={`${s.detail__callout} ${s['detail__callout--formula']}`}>
          <div className={s.detail__calloutLabel} style={{ color: '#1d4ed8' }}>
            📐 FÓRMULA — {callout.title}
          </div>
          <div className={s.detail__formulaBox}>{callout.formula}</div>
          {callout.examples && callout.examples.length > 0 && (
            <div className={s.detail__examples} style={{ marginTop: 12 }}>
              {callout.examples.map((ex, i) => {
                const type = ex.startsWith('✓') ? 'correct' : ex.startsWith('✗') ? 'wrong' : 'neutral';
                return (
                  <div key={i} className={`${s.detail__exampleItem} ${s[`detail__exampleItem--${type}`]}`}>
                    {ex}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );

    case 'countryNote':
      return (
        <div key={key} className={`${s.detail__callout} ${s['detail__callout--countryNote']}`}>
          <div className={s.detail__calloutLabel} style={{ color: '#92400e' }}>
            🌍 COUNTRY NOTE — {callout.topic}
          </div>
          <div className={s.detail__calloutFlags}>
            <div>🇬🇧 <strong>British English:</strong> {callout.british}</div>
            <div>🇺🇸 <strong>American English:</strong> {callout.american}</div>
          </div>
          {callout.note && (
            <p className={s.detail__calloutNote}>{callout.note}</p>
          )}
        </div>
      );

    case 'nerdyMode':
      return (
        <div key={key} className={`${s.detail__callout} ${s['detail__callout--nerdyMode']}`}>
          <div className={s.detail__calloutLabel} style={{ color: '#5b21b6' }}>
            🤓 NERDY MODE — ¿Qué es &ldquo;{callout.term}&rdquo;?
          </div>
          <p className={s.detail__calloutText}>{callout.definition}</p>
          {callout.example && (
            <p className={s.detail__calloutText} style={{ marginTop: 6, fontStyle: 'italic' }}>
              {callout.example}
            </p>
          )}
        </div>
      );

    case 'watchOut':
      return (
        <div key={key} className={`${s.detail__callout} ${s['detail__callout--watchOut']}`}>
          <div className={s.detail__calloutLabel} style={{ color: '#991b1b' }}>
            ⚠️ WATCH OUT
          </div>
          <div className={`${s.detail__exampleItem} ${s['detail__exampleItem--wrong']}`}>
            ✗ {callout.wrong}
          </div>
          <div className={`${s.detail__exampleItem} ${s['detail__exampleItem--correct']}`}>
            ✓ {callout.correct}
          </div>
          <p className={s.detail__calloutText} style={{ marginTop: 8 }}>{callout.explanation}</p>
        </div>
      );

    case 'keyQuestion':
      return (
        <div key={key} className={`${s.detail__callout} ${s['detail__callout--keyQuestion']}`}>
          <div className={s.detail__calloutLabel} style={{ color: '#9a3412' }}>
            ❓ ASK YOURSELF / PREGÚNTATE
          </div>
          <ul className={s.detail__kqList}>
            {callout.questions.map((q, i) => (
              <li key={i} className={s.detail__kqItem}>
                <span className={s.detail__kqNum}>{i + 1}.</span>
                <div className={s.detail__kqQuestion}>{q.question}</div>
                <div className={s.detail__kqAnswer}>{q.answer}</div>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'quickMap':
      return (
        <div key={key} className={s.detail__quickMap}>
          <table className={s.detail__quickMapTable}>
            <thead>
              <tr>
                {callout.columns.map((col, i) => (
                  <th key={i} className={s.detail__quickMapTh}>{col.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {callout.columns.map((col, i) => (
                  <td key={i} className={s.detail__quickMapTd}>
                    <ul>
                      {col.items.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  const articleRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setProgress(0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const article = articleRef.current;
      if (!article) return;
      const { top, height } = article.getBoundingClientRect();
      const viewH = window.innerHeight;
      const scrolled = viewH - top;
      const total = height;
      const pct = Math.min(100, Math.max(0, (scrolled / total) * 100));
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2)
    .concat(
      blogPosts
        .filter((p) => p.id !== post.id && p.category !== post.category)
        .slice(0, 2 - blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2).length)
    );

  return (
    <>
      <Navbar />

      <main className={`${s.detail} ${s[`detail--${post.variant}`]}`}>
        {/* ── Reading progress bar ── */}
        <div className={s.progressBar} aria-hidden="true">
          <div className={s.progressFill} style={{ width: `${progress}%` }} />
        </div>

        {/* ── Hero ── */}
        <div className={s.detail__hero}>
          <div className={s.detail__heroInner}>
            <Link to="/blog" className={s.detail__back}>
              <ArrowLeft size={16} />
              Volver al Blog
            </Link>

            <h1 className={s.detail__heroTitle}>{post.title}</h1>
            <p className={s.detail__heroExcerpt}>{post.excerpt}</p>

            <div className={s.detail__heroFooter}>
              <span className={s.detail__readTime}>
                <Clock3 size={14} />
                {post.readTime}
              </span>
              <span className={s.detail__divider} aria-hidden="true" />
              <span className={s.detail__readTime}>Your English Buddy</span>
            </div>
          </div>
        </div>

        {/* ── Article body ── */}
        <div className={s.detail__layout}>
          <article ref={articleRef} className={s.detail__article}>
            {/* Featured image */}
            {post.image && (
              <div className={s.detail__featuredImg}>
                <img src={post.image} alt={post.title} loading="eager" />
              </div>
            )}

            {/* Block 1: Hook intro */}
            <div className={s.detail__hook}>
              <p>{post.body.hook}</p>
            </div>

            {/* Sections */}
            {post.body.sections.map((section, i) => (
              <section key={i} className={s.detail__section}>
                <h2 className={s.detail__sectionHeading}>{section.heading}</h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j} className={s.detail__paragraph}>{p}</p>
                ))}
                {section.examples && section.examples.length > 0 && (
                  <div className={s.detail__examples} aria-label="Examples">
                    {section.examples.map((ex, k) => {
                      const type = ex.startsWith('✓')
                        ? 'correct'
                        : ex.startsWith('✗')
                        ? 'wrong'
                        : ex.startsWith('→')
                        ? 'transform'
                        : 'neutral';
                      return (
                        <div
                          key={k}
                          className={`${s.detail__exampleItem} ${s[`detail__exampleItem--${type}`]}`}
                        >
                          {ex}
                        </div>
                      );
                    })}
                  </div>
                )}
                {section.callouts?.map((c, k) => renderCallout(c, k))}
              </section>
            ))}

            {/* Pro tip */}
            <aside className={s.detail__tip} role="note" aria-label="Pro tip">
              <span className={s.detail__tipLabel}>
                <Lightbulb size={14} aria-hidden="true" />
                Consejo pro
              </span>
              <p className={s.detail__tipText}>{post.body.tip}</p>
            </aside>

            {/* Closing */}
            <p className={s.detail__closing}>{post.body.closing}</p>

            {/* Block 3: Common Mistakes */}
            <div className={s.detail__mistakes}>
              <h2 className={s.detail__mistakesTitle}>
                ❌ Common Mistakes — Errores que casi todos cometen
              </h2>
              {post.body.commonMistakes.map((m, i) => (
                <div key={i} className={s.detail__mistakeItem}>
                  <div className={s.detail__mistakeWrong}>✗ &nbsp;{m.wrong}</div>
                  <div className={s.detail__mistakeCorrect}>✓ &nbsp;{m.correct}</div>
                  <p className={s.detail__mistakeWhy}>💬 {m.why}</p>
                </div>
              ))}
            </div>

            {/* Block 4: Mini exercise */}
            <div className={s.detail__exercise}>
              <h2 className={s.detail__exerciseTitle}>
                ✏️ Quick Practice — Pon a prueba lo que aprendiste
              </h2>
              <p className={s.detail__exerciseInstructions}>
                {post.body.exercise.instructions}
              </p>
              <ul className={s.detail__exerciseList}>
                {post.body.exercise.questions.map((q, i) => (
                  <li key={i} className={s.detail__exerciseItem}>{q}</li>
                ))}
              </ul>
              <details className={s.detail__exerciseAnswers}>
                <summary>🔑 Ver respuestas / Show answers</summary>
                <ul className={s.detail__exerciseAnswerList}>
                  {post.body.exercise.answers.map((a, i) => (
                    <li key={i}>
                      <strong>{a.answer}</strong>
                      {a.explanation ? ` — ${a.explanation}` : ''}
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            {/* Block 5: Motivational closing quote */}
            <div className={s.detail__closingQuote}>
              <p className={s.detail__closingQuoteText}>{post.body.closingQuote.quote}</p>
              <p className={s.detail__closingQuoteTranslation}>
                — {post.body.closingQuote.translation}
              </p>
            </div>

            {/* Back link */}
            <Link to="/blog" className={s.detail__backBottom}>
              <ArrowLeft size={15} />
              Volver a todos los artículos
            </Link>
          </article>

          {/* ── Sidebar ── */}
          <aside className={s.detail__sidebar} aria-label="Artículos relacionados">
            <h3 className={s.detail__sidebarTitle}>Más para leer</h3>
            <ul className={s.detail__relatedList}>
              {relatedPosts.map((related) => (
                <li key={related.id}>
                  <Link
                    to={`/blog/${related.slug}`}
                    className={s.detail__relatedCard}
                  >
                    <span className={s.detail__relatedIcon} aria-hidden="true">
                      {iconByCategory[related.category]}
                    </span>
                    <div>
                      <span className={s.detail__relatedCategory}>
                        {related.category}
                      </span>
                      <p className={s.detail__relatedTitle}>{related.title}</p>
                      <span className={s.detail__relatedMeta}>
                        <Clock3 size={12} />
                        {related.readTime}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Level guide card */}
            <div className={s.detail__levelCard}>
              <p className={s.detail__levelCardLabel}>Nivel</p>
              <p className={s.detail__levelCardValue}>{post.level}</p>
              <p className={s.detail__levelCardHint}>
                Este artículo es ideal para el nivel {post.level.toLowerCase()}.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BlogDetailPage;
