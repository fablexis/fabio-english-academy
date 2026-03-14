import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  Clock3,
  GraduationCap,
  Landmark,
  Palette,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
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

const iconByCategory: Record<string, React.ReactNode> = {
  Healthcare: <Activity size={24} />,
  Cases: <Sparkles size={24} />,
  Development: <TrendingUp size={24} />,
  Insurance: <ShieldCheck size={24} />,
  Tourism: <Landmark size={24} />,
  Design: <Palette size={24} />,
  'E-learning': <GraduationCap size={24} />,
  Business: <BriefcaseBusiness size={24} />,
};

const categories = ['All', ...new Set(blogPosts.map((p) => p.category))];

const BlogSection: React.FC = () => {
  const { ref, ready } = useInView({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');

  const visiblePosts = useMemo(
    () =>
      activeCategory === 'All'
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
          <p className={anim(ready, 'anim-slide-up', 'delay-0', s.blog__kicker)}>
            Blog
          </p>
          <h2
            id="blog-section-title"
            className={anim(ready, 'anim-slide-up', 'delay-100', s.blog__title)}
          >
            Fresh stories, tips &amp;{' '}
            <span className={s.blog__titleAccent}>real learning wins</span>
          </h2>
          <p className={anim(ready, 'anim-slide-up', 'delay-200', s.blog__subtitle)}>
            Practical articles designed to improve your English in real-life
            situations — short enough to read in one coffee break.
          </p>
        </div>

        <div
          className={anim(ready, 'anim-fade-scale', 'delay-300', s.blog__filters)}
          role="toolbar"
          aria-label="Filter blog posts by category"
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
              <article
                className={`${s.blog__card} ${s[`blog__card--${post.variant}`]}`}
              >
                {post.hasBanner && (
                  <div className={s.blog__banner} aria-hidden="true">
                    <span className={s.blog__bannerIcon}>
                      {iconByCategory[post.category]}
                    </span>
                  </div>
                )}

                <div className={s.blog__body}>
                  <header className={s.blog__cardTop}>
                    {!post.hasBanner && (
                      <span className={s.blog__icon} aria-hidden="true">
                        {iconByCategory[post.category]}
                      </span>
                    )}
                    <span className={s.blog__badge}>{post.category}</span>
                  </header>

                  <h3 className={s.blog__cardTitle}>{post.title}</h3>
                  <p className={s.blog__cardExcerpt}>{post.excerpt}</p>

                  <div className={s.blog__meta}>
                    <span className={s.blog__metaItem}>
                      <Clock3 size={13} />
                      {post.readTime}
                    </span>
                    <span className={s.blog__metaDot} aria-hidden="true" />
                    <span className={s.blog__metaItem}>{post.level}</span>
                  </div>

                  <Link
                    className={s.blog__link}
                    to={`/blog/${post.slug}`}
                    aria-label={`Read article: ${post.title}`}
                  >
                    Read article
                    <span className={s.blog__linkIcon}>
                      <ArrowUpRight size={14} />
                    </span>
                  </Link>
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
