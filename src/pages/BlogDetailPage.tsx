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
import s from '../styles/BlogDetailPage.module.scss';

const iconByCategory: Record<string, React.ReactNode> = {
  'Gramática': <BookOpen size={28} />,
  'Vocabulario': <Languages size={28} />,
  'Conversación': <MessageCircle size={28} />,
  'Situaciones': <Compass size={28} />,
};

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  const articleRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  // Scroll to top whenever a different article opens
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setProgress(0);
  }, [slug]);

  // Track reading progress based on article element bounds
  useEffect(() => {
    const handleScroll = () => {
      const article = articleRef.current;
      if (!article) return;
      const { top, height } = article.getBoundingClientRect();
      const viewH = window.innerHeight;
      // Progress goes 0→100 as the article scrolls from entering the viewport
      // to its bottom reaching the bottom of the viewport
      const scrolled = viewH - top;
      const total = height;
      const pct = Math.min(100, Math.max(0, (scrolled / total) * 100));
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialise on mount
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

            {/* Intro */}
            <p className={s.detail__intro}>{post.body.intro}</p>

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
