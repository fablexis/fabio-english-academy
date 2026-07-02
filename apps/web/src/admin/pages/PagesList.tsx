import React from 'react';
import { Link } from 'react-router-dom';
import { useQueries, useQuery } from '@tanstack/react-query';
import {
  AlignLeft,
  BarChart3,
  ExternalLink,
  FileCheck2,
  FileClock,
  Gem,
  Gift,
  GraduationCap,
  Home,
  MessageCircle,
  MessageSquareQuote,
  MessagesSquare,
  MousePointerClick,
  Newspaper,
  PencilLine,
  Settings2,
  Share2,
  Sparkles,
  Tags,
  Users,
} from 'lucide-react';
import {
  mergePageContent,
  PAGE_DEFAULTS,
  type AboutContent,
  type BlogListItemDto,
  type CoursesContent,
  type HomeContent,
  type PageKey,
  type SiteContent,
} from '@eyb/shared';
import { api } from '../lib/client';
import { PAGE_SCHEMAS } from '../pageSchemas';
import s from '../styles/admin.module.scss';

const PAGE_ICONS: Record<PageKey, React.ReactNode> = {
  home: <Home size={22} />,
  about: <Users size={22} />,
  courses: <GraduationCap size={22} />,
  blog: <Newspaper size={22} />,
  site: <Settings2 size={22} />,
};

const TINTS = [s.tintPrimary, s.tintLime, s.tintNeutral];

interface StatRow {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

/** Real counters pulled from each page's (merged) content document. */
function statsFor(key: PageKey, doc: unknown, posts?: BlogListItemDto[]): StatRow[] {
  switch (key) {
    case 'home': {
      const c = doc as HomeContent;
      const testimonios =
        c.testimonials.featured.length +
        c.testimonials.rotatingA.length +
        c.testimonials.rotatingB.length;
      return [
        { icon: <MessageSquareQuote size={16} />, label: 'Testimonios', value: testimonios },
        { icon: <Sparkles size={16} />, label: 'Tarjetas ¿Por qué elegirnos?', value: c.why.cards.length },
        { icon: <MessagesSquare size={16} />, label: 'Frases del personaje', value: c.hero.phrases.length + c.hero.words.length },
      ];
    }
    case 'about': {
      const c = doc as AboutContent;
      return [
        { icon: <Users size={16} />, label: 'Integrantes del equipo', value: c.team.members.length },
        { icon: <Gem size={16} />, label: 'Pilares', value: c.pillars.cards.length },
        { icon: <AlignLeft size={16} />, label: 'Párrafos de misión', value: c.mission.paragraphs.length },
      ];
    }
    case 'courses': {
      const c = doc as CoursesContent;
      return [
        { icon: <GraduationCap size={16} />, label: 'Cursos', value: c.courses.length },
        { icon: <BarChart3 size={16} />, label: 'Niveles', value: c.hero.levels.length },
        { icon: <Gift size={16} />, label: 'Beneficios incluidos', value: c.perks.cards.length },
      ];
    }
    case 'blog': {
      const published = posts?.filter((p) => p.published).length ?? 0;
      const categories = new Set(posts?.map((p) => p.category)).size;
      return [
        { icon: <FileCheck2 size={16} />, label: 'Artículos publicados', value: published },
        { icon: <FileClock size={16} />, label: 'Borradores', value: (posts?.length ?? 0) - published },
        { icon: <Tags size={16} />, label: 'Categorías', value: categories },
      ];
    }
    case 'site': {
      const c = doc as SiteContent;
      return [
        { icon: <MessageCircle size={16} />, label: 'WhatsApp', value: `+${c.whatsappNumber}` },
        { icon: <Share2 size={16} />, label: 'Redes sociales', value: c.footer.socials.length },
        { icon: <MousePointerClick size={16} />, label: 'Botón de contacto', value: c.navCtaLabel },
      ];
    }
  }
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

const PagesList: React.FC = () => {
  const meta = useQuery({ queryKey: ['admin', 'pages'], queryFn: api.listPages });
  const posts = useQuery({ queryKey: ['admin', 'blog'], queryFn: api.listPosts });
  // One document per page; same query keys the editor uses, so the cache is shared.
  const docs = useQueries({
    queries: PAGE_SCHEMAS.map((sch) => ({
      queryKey: ['admin', 'page', sch.key],
      queryFn: () => api.getPage(sch.key),
    })),
  });

  if (meta.error) {
    return <div className={s.error}>Error al cargar: {String(meta.error)}</div>;
  }

  const updatedByKey = new Map(meta.data?.map((o) => [o.key, o.updatedAt]));

  return (
    <div className={s.page}>
      <header className={s.pageHead}>
        <div>
          <h1>Páginas del sitio</h1>
          <p className={s.pageSub}>
            Edita el contenido de cada página pública. Los cambios se publican al guardar.
          </p>
        </div>
      </header>

      <div className={s.pageCards}>
        {PAGE_SCHEMAS.map((schema, i) => {
          const updatedAt = updatedByKey.get(schema.key);
          const docQ = docs[i];
          const loading =
            docQ.isLoading || (schema.key === 'blog' && posts.isLoading);
          const merged = docQ.data
            ? mergePageContent(
                PAGE_DEFAULTS[schema.key] as unknown as Record<string, unknown>,
                docQ.data.data ?? {},
              )
            : undefined;

          return (
            <div key={schema.key} className={s.pageCard}>
              <div className={s.pageCardTop}>
                <span className={s.pageCardIcon}>{PAGE_ICONS[schema.key]}</span>
                <div className={s.pageCardTitles}>
                  <h2>{schema.title}</h2>
                  <code className={s.routeChip}>{schema.route}</code>
                </div>
                <span
                  className={`${updatedAt ? s.badgeOn : s.badgeOff} ${s.cardBadge}`}
                  title={
                    updatedAt
                      ? `Última edición: ${formatDate(updatedAt)}`
                      : 'Muestra el contenido original del sitio'
                  }
                >
                  {updatedAt ? 'Editado' : 'Original'}
                </span>
              </div>

              <ul className={s.pageStats}>
                {loading || !merged
                  ? [0, 1, 2].map((n) => (
                      <li key={n}><span className={s.skelRow} /></li>
                    ))
                  : statsFor(schema.key, merged, posts.data).map((row, j) => (
                      <li key={row.label}>
                        <span className={`${s.statIcon} ${TINTS[j % TINTS.length]}`}>
                          {row.icon}
                        </span>
                        <span className={s.statLabel}>{row.label}</span>
                        <strong className={s.statValue}>{row.value}</strong>
                      </li>
                    ))}
              </ul>

              <div className={s.pageCardActions}>
                <Link to={`/pages/${schema.key}`} className={s.btnPrimary}>
                  <PencilLine size={15} /> Editar
                </Link>
                <a
                  href={schema.route}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.btnGhost}
                >
                  Ver <ExternalLink size={13} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PagesList;
