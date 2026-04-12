import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import s from '../styles/BlogSection.module.scss';
import { useInView } from '../hooks/useInView';
import { blogPosts } from '../data/blogPosts';

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

const categories = ['Todos', ...new Set(blogPosts.map((p) => p.category))];

const BlogSection: React.FC = () => {
  const { ref, ready } = useInView({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('Todos');

  const visiblePosts = useMemo(
    () =>
      activeCategory === 'Todos'
        ? blogPosts
        : blogPosts.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <section
      className={s.blog}
      ref={ref as React.RefObject<HTMLElement>}
      aria-labelledby="blog-section-title"
    >
      <div className={s.blog__inner}>
        <div className={s.blog__header}>
          <h2
            id="blog-section-title"
            className={anim(ready, 'anim-slide-up', 'delay-100', s.blog__title)}
          >
            Historias, consejos y{' '}
            <span className={s.blog__titleAccent}>aprendizaje real</span>
          </h2>
          <p className={anim(ready, 'anim-slide-up', 'delay-200', s.blog__subtitle)}>
            Artículos prácticos para mejorar tu inglés en situaciones cotidianas
            — lo suficientemente cortos para leer en un descanso.
          </p>
        </div>

        <div
          className={anim(ready, 'anim-fade-scale', 'delay-300', s.blog__filters)}
          role="toolbar"
          aria-label="Filtrar artículos por categoría"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`${s.blog__filterBtn} ${activeCategory === cat ? s['blog__filterBtn--active'] : ''}`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <ul className={s.blog__grid} aria-live="polite">
          {visiblePosts.map((post, index) => (
            <li
              key={post.id}
              className={anim(
                ready,
                'anim-fade-scale',
                `delay-${400 + index * 80}`,
                s.blog__item
              )}
            >
              <article className={s.blog__card}>
                <div className={s.blog__imageWrap}>
                  <img
                    className={s.blog__image}
                    src={post.image}
                    alt=""
                    loading="lazy"
                  />
                </div>

                <div className={s.blog__body}>
                  <header className={s.blog__cardTop}>
                    <span className={s.blog__badge}>{post.category}</span>
                    <span className={s.blog__levelBadge}>{post.level}</span>
                  </header>

                  <h3 className={s.blog__cardTitle}>{post.title}</h3>
                  <p className={s.blog__cardExcerpt}>{post.excerpt}</p>

                  <div className={s.blog__cardFooter}>
                    <span className={s.blog__metaItem}>
                      <Clock3 size={13} />
                      {post.readTime}
                    </span>

                    <Link
                      className={s.blog__link}
                      to={`/blog/${post.slug}`}
                      aria-label={`Leer artículo: ${post.title}`}
                    >
                      Leer artículo
                      <span className={s.blog__linkIcon}>
                        <ArrowUpRight size={14} />
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BlogSection;
