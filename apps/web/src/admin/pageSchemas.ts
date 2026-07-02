// Form schemas for the page-content editors. Each public page's JSON document
// (see PageContentMap in @eyb/shared) is described as groups of typed fields;
// ContentFields.tsx renders them generically, so adding an editable field is
// one line here + one line in the shared type/defaults.
import type { PageKey } from '@eyb/shared';

// Paths are dot-separated into the page document ('hero.titlePre'). Inside a
// repeater, paths are relative to each item.
export type FieldSpec =
  | {
      kind: 'text' | 'textarea' | 'image' | 'toggle';
      path: string;
      label: string;
      help?: string;
      rows?: number;
    }
  | {
      kind: 'stringList';
      path: string;
      label: string;
      help?: string;
      textarea?: boolean;
    }
  | {
      kind: 'repeater';
      path: string;
      label: string;
      /** Singular noun for the add button — "+ Añadir {itemLabel}". */
      itemLabel: string;
      /** Item field used as the collapsed card title. */
      titleField?: string;
      help?: string;
      fields: FieldSpec[];
    };

export interface GroupSpec {
  title: string;
  description?: string;
  fields: FieldSpec[];
}

export interface PageSchema {
  key: PageKey;
  title: string;
  /** Public route, shown as a chip and used for the "Ver página" link. */
  route: string;
  blurb: string;
  groups: GroupSpec[];
}

// ─── Reusable fragments ──────────────────────────────────────────────────────

const bilingualFields: FieldSpec[] = [
  { kind: 'text', path: 'en', label: 'Inglés' },
  { kind: 'text', path: 'es', label: 'Español' },
];

const testimonialFields: FieldSpec[] = [
  { kind: 'textarea', path: 'quote', label: 'Testimonio', rows: 4 },
  { kind: 'text', path: 'name', label: 'Nombre' },
  { kind: 'text', path: 'role', label: 'Ubicación / rol' },
];

// ─── Home ────────────────────────────────────────────────────────────────────

const homeSchema: PageSchema = {
  key: 'home',
  title: 'Inicio',
  route: '/',
  blurb: 'Hero con el personaje, ¿Por qué elegirnos?, testimonios y llamado final.',
  groups: [
    {
      title: 'Hero',
      description: 'Primera pantalla: título, chip, botones y globos animados.',
      fields: [
        { kind: 'text', path: 'hero.chip', label: 'Chip superior' },
        { kind: 'text', path: 'hero.titlePre', label: 'Título (parte normal)' },
        { kind: 'text', path: 'hero.titleAccent', label: 'Título (parte destacada)' },
        { kind: 'textarea', path: 'hero.paragraph', label: 'Párrafo', rows: 4 },
        { kind: 'text', path: 'hero.ctaPrimary', label: 'Botón principal (WhatsApp)' },
        { kind: 'text', path: 'hero.ctaSecondary', label: 'Botón secundario (→ /courses)' },
        { kind: 'text', path: 'hero.badge1Title', label: 'Insignia 1 · título' },
        { kind: 'text', path: 'hero.badge1Sub', label: 'Insignia 1 · subtítulo' },
        { kind: 'text', path: 'hero.badge2Number', label: 'Insignia 2 · cifra' },
        { kind: 'text', path: 'hero.badge2Text', label: 'Insignia 2 · texto' },
        {
          kind: 'repeater',
          path: 'hero.phrases',
          label: 'Frases del globo de diálogo',
          itemLabel: 'frase',
          titleField: 'en',
          fields: bilingualFields,
        },
        {
          kind: 'repeater',
          path: 'hero.words',
          label: 'Palabras de la flashcard EN ⇄ ES',
          itemLabel: 'palabra',
          titleField: 'en',
          fields: bilingualFields,
        },
      ],
    },
    {
      title: '¿Por qué elegirnos?',
      fields: [
        { kind: 'text', path: 'why.headingPre', label: 'Título (antes del acento)' },
        { kind: 'text', path: 'why.headingAccent', label: 'Título (parte destacada)' },
        { kind: 'text', path: 'why.headingPost', label: 'Título (después del acento)' },
        { kind: 'textarea', path: 'why.subtitle', label: 'Subtítulo', rows: 3 },
        {
          kind: 'repeater',
          path: 'why.cards',
          label: 'Tarjetas',
          itemLabel: 'tarjeta',
          titleField: 'title',
          help: 'Los iconos se asignan por posición (pantalla, birrete, comunidad).',
          fields: [
            { kind: 'text', path: 'title', label: 'Título' },
            { kind: 'textarea', path: 'description', label: 'Descripción corta', rows: 2 },
            { kind: 'stringList', path: 'details', label: 'Detalles al expandir', textarea: true },
          ],
        },
      ],
    },
    {
      title: 'Testimonios',
      fields: [
        { kind: 'text', path: 'testimonials.badge', label: 'Etiqueta superior' },
        { kind: 'text', path: 'testimonials.heading', label: 'Título · línea 1' },
        { kind: 'text', path: 'testimonials.headingAccent', label: 'Título · línea 2 (destacada)' },
        { kind: 'textarea', path: 'testimonials.subtitle', label: 'Subtítulo', rows: 2 },
        {
          kind: 'repeater',
          path: 'testimonials.featured',
          label: 'Tarjetas fijas (2 primeras posiciones)',
          itemLabel: 'testimonio',
          titleField: 'name',
          fields: testimonialFields,
        },
        {
          kind: 'repeater',
          path: 'testimonials.rotatingA',
          label: 'Tarjeta rotatoria · izquierda',
          itemLabel: 'testimonio',
          titleField: 'name',
          help: 'Si añades varios, la tarjeta los rota automáticamente.',
          fields: testimonialFields,
        },
        {
          kind: 'repeater',
          path: 'testimonials.rotatingB',
          label: 'Tarjeta rotatoria · derecha (oscura)',
          itemLabel: 'testimonio',
          titleField: 'name',
          fields: testimonialFields,
        },
      ],
    },
    {
      title: 'Llamado final (WhatsApp)',
      fields: [
        {
          kind: 'textarea',
          path: 'cta.heading',
          label: 'Título',
          rows: 3,
          help: 'Cada línea del texto se muestra como una línea del título.',
        },
        { kind: 'textarea', path: 'cta.subtitle', label: 'Subtítulo', rows: 3 },
        { kind: 'text', path: 'cta.buttonLabel', label: 'Texto del botón' },
      ],
    },
  ],
};

// ─── About ───────────────────────────────────────────────────────────────────

const aboutSchema: PageSchema = {
  key: 'about',
  title: 'Nosotros',
  route: '/about',
  blurb: 'Historia, misión, pilares metodológicos y el equipo con sus biografías.',
  groups: [
    {
      title: 'Hero',
      fields: [
        { kind: 'text', path: 'hero.title', label: 'Título (parte normal)' },
        { kind: 'text', path: 'hero.titleItalic', label: 'Título (parte en cursiva)' },
        { kind: 'textarea', path: 'hero.subtitle', label: 'Subtítulo', rows: 3 },
        { kind: 'text', path: 'hero.ctaLabel', label: 'Texto del botón' },
        { kind: 'image', path: 'hero.image', label: 'Imagen (ruta pública)' },
        { kind: 'textarea', path: 'hero.cardQuote', label: 'Cita de la tarjeta flotante', rows: 2 },
        { kind: 'text', path: 'hero.cardCite', label: 'Autor de la cita' },
      ],
    },
    {
      title: 'Misión',
      fields: [
        { kind: 'text', path: 'mission.eyebrow', label: 'Etiqueta superior' },
        { kind: 'text', path: 'mission.title', label: 'Título' },
        { kind: 'stringList', path: 'mission.paragraphs', label: 'Párrafos', textarea: true },
        { kind: 'image', path: 'mission.image', label: 'Imagen (ruta pública)' },
      ],
    },
    {
      title: 'Pilares',
      fields: [
        { kind: 'text', path: 'pillars.eyebrow', label: 'Etiqueta superior' },
        { kind: 'text', path: 'pillars.title', label: 'Título · línea 1' },
        { kind: 'text', path: 'pillars.titleItalic', label: 'Título · línea 2 (cursiva)' },
        { kind: 'textarea', path: 'pillars.headerDesc', label: 'Descripción lateral', rows: 2 },
        {
          kind: 'repeater',
          path: 'pillars.cards',
          label: 'Tarjetas de pilares',
          itemLabel: 'pilar',
          titleField: 'titleItalic',
          help: 'El estilo (claro / acento / suave) y el icono rotan por posición.',
          fields: [
            { kind: 'text', path: 'titleTop', label: 'Título (parte normal)' },
            { kind: 'text', path: 'titleItalic', label: 'Título (parte en cursiva)' },
            { kind: 'textarea', path: 'desc', label: 'Descripción', rows: 3 },
          ],
        },
      ],
    },
    {
      title: 'Cita destacada',
      fields: [
        { kind: 'text', path: 'quote.pre', label: 'Inicio de la cita' },
        { kind: 'text', path: 'quote.highlight', label: 'Parte resaltada' },
        { kind: 'text', path: 'quote.post', label: 'Final de la cita' },
        { kind: 'text', path: 'quote.cite', label: 'Autor' },
      ],
    },
    {
      title: 'Equipo',
      fields: [
        { kind: 'text', path: 'team.headingPre', label: 'Título (parte normal)' },
        { kind: 'text', path: 'team.headingAccent', label: 'Título (parte destacada)' },
        {
          kind: 'repeater',
          path: 'team.members',
          label: 'Integrantes',
          itemLabel: 'integrante',
          titleField: 'name',
          fields: [
            { kind: 'text', path: 'name', label: 'Nombre' },
            { kind: 'text', path: 'role', label: 'Rol' },
            { kind: 'image', path: 'imageUrl', label: 'Foto (ruta pública)' },
            { kind: 'textarea', path: 'bio', label: 'Bio corta (tarjeta)', rows: 3 },
            {
              kind: 'textarea',
              path: 'fullBio',
              label: 'Bio completa (modal)',
              rows: 6,
              help: 'Separa párrafos con una línea en blanco.',
            },
            {
              kind: 'repeater',
              path: 'highlights',
              label: 'Datos destacados',
              itemLabel: 'dato',
              titleField: 'label',
              fields: [
                { kind: 'text', path: 'label', label: 'Etiqueta' },
                { kind: 'text', path: 'value', label: 'Valor' },
              ],
            },
            { kind: 'stringList', path: 'functions', label: 'Rol dentro de la academia', textarea: true },
          ],
        },
      ],
    },
  ],
};

// ─── Courses ─────────────────────────────────────────────────────────────────

const coursesSchema: PageSchema = {
  key: 'courses',
  title: 'Cursos',
  route: '/courses',
  blurb: 'Catálogo de cursos con precios, niveles, beneficios y llamado final.',
  groups: [
    {
      title: 'Hero',
      fields: [
        { kind: 'text', path: 'hero.titlePre', label: 'Título (parte normal)' },
        { kind: 'text', path: 'hero.titleAccent', label: 'Título (parte destacada)' },
        { kind: 'textarea', path: 'hero.subtitle', label: 'Subtítulo', rows: 3 },
        {
          kind: 'repeater',
          path: 'hero.levels',
          label: 'Guía de niveles',
          itemLabel: 'nivel',
          titleField: 'name',
          fields: [
            { kind: 'text', path: 'label', label: 'Etiqueta (A1 – A2)' },
            { kind: 'text', path: 'name', label: 'Nombre' },
            { kind: 'textarea', path: 'desc', label: 'Descripción', rows: 2 },
          ],
        },
      ],
    },
    {
      title: 'Catálogo de cursos',
      description: 'El primer curso se muestra como tarjeta destacada; el resto en la grilla.',
      fields: [
        { kind: 'text', path: 'section.headingPre', label: 'Título de la sección (normal)' },
        { kind: 'text', path: 'section.headingAccent', label: 'Título de la sección (destacado)' },
        {
          kind: 'repeater',
          path: 'courses',
          label: 'Cursos',
          itemLabel: 'curso',
          titleField: 'title',
          fields: [
            { kind: 'text', path: 'title', label: 'Nombre del curso' },
            { kind: 'text', path: 'category', label: 'Categoría' },
            { kind: 'textarea', path: 'description', label: 'Descripción', rows: 2 },
            { kind: 'text', path: 'priceLabel', label: 'Precio (ej. $290)' },
            { kind: 'text', path: 'priceUnit', label: 'Unidad (ej. 8 clases)' },
            { kind: 'toggle', path: 'popular', label: 'Mostrar insignia "Popular"' },
            { kind: 'image', path: 'image', label: 'Imagen (ruta pública)' },
            { kind: 'stringList', path: 'features', label: '¿Qué incluye?', textarea: true },
          ],
        },
      ],
    },
    {
      title: 'Cada curso incluye',
      fields: [
        { kind: 'text', path: 'perks.kicker', label: 'Etiqueta superior' },
        { kind: 'text', path: 'perks.titlePre', label: 'Título (parte normal)' },
        { kind: 'text', path: 'perks.titleAccent', label: 'Título (parte destacada)' },
        {
          kind: 'repeater',
          path: 'perks.cards',
          label: 'Beneficios',
          itemLabel: 'beneficio',
          titleField: 'title',
          help: 'Los iconos se asignan por posición (persona, libro, chat, móvil).',
          fields: [
            { kind: 'text', path: 'title', label: 'Título' },
            { kind: 'textarea', path: 'desc', label: 'Descripción', rows: 2 },
            { kind: 'text', path: 'badge', label: 'Insignia (opcional, ej. Próximamente)' },
          ],
        },
      ],
    },
    {
      title: 'Llamado final',
      fields: [
        { kind: 'text', path: 'cta.badge', label: 'Insignia superior' },
        { kind: 'text', path: 'cta.title', label: 'Título · línea 1' },
        { kind: 'text', path: 'cta.titleAccent', label: 'Título · línea 2 (destacada)' },
        { kind: 'textarea', path: 'cta.subtitle', label: 'Subtítulo', rows: 2 },
        { kind: 'text', path: 'cta.buttonLabel', label: 'Texto del botón' },
        { kind: 'text', path: 'cta.trust', label: 'Texto de confianza bajo el botón' },
      ],
    },
  ],
};

// ─── Blog landing ────────────────────────────────────────────────────────────

const blogSchema: PageSchema = {
  key: 'blog',
  title: 'Blog (portada)',
  route: '/blog',
  blurb: 'Encabezado de la portada del blog. Los artículos se gestionan en «Blog».',
  groups: [
    {
      title: 'Encabezado',
      fields: [
        { kind: 'text', path: 'header.titlePre', label: 'Título (parte normal)' },
        { kind: 'text', path: 'header.titleAccent', label: 'Título (parte destacada)' },
        { kind: 'textarea', path: 'header.subtitle', label: 'Subtítulo', rows: 3 },
      ],
    },
  ],
};

// ─── Site chrome ─────────────────────────────────────────────────────────────

const siteSchema: PageSchema = {
  key: 'site',
  title: 'Sitio (general)',
  route: '/',
  blurb: 'WhatsApp, botón de contacto, footer y redes — visible en todas las páginas.',
  groups: [
    {
      title: 'WhatsApp',
      fields: [
        {
          kind: 'text',
          path: 'whatsappNumber',
          label: 'Número (solo dígitos, con código de país)',
          help: 'Ej.: 5491123310113',
        },
        {
          kind: 'textarea',
          path: 'whatsappMessage',
          label: 'Mensaje predeterminado',
          rows: 3,
        },
        { kind: 'text', path: 'floatLabel', label: 'Texto del botón flotante' },
      ],
    },
    {
      title: 'Navegación',
      fields: [{ kind: 'text', path: 'navCtaLabel', label: 'Botón de contacto (navbar)' }],
    },
    {
      title: 'Footer',
      fields: [
        { kind: 'textarea', path: 'footer.tagline', label: 'Descripción de la marca', rows: 2 },
        { kind: 'text', path: 'footer.navTitle', label: 'Título de la columna de enlaces' },
        { kind: 'text', path: 'footer.contactTitle', label: 'Título de contacto' },
        { kind: 'textarea', path: 'footer.contactText', label: 'Texto de contacto', rows: 2 },
        { kind: 'text', path: 'footer.ctaLabel', label: 'Texto del botón de WhatsApp' },
        { kind: 'text', path: 'footer.copyrightName', label: 'Nombre en el copyright' },
        {
          kind: 'repeater',
          path: 'footer.socials',
          label: 'Redes sociales',
          itemLabel: 'red',
          titleField: 'label',
          help: 'El icono se detecta por el nombre (TikTok, YouTube, Coffee…).',
          fields: [
            { kind: 'text', path: 'label', label: 'Nombre' },
            { kind: 'text', path: 'href', label: 'URL' },
          ],
        },
      ],
    },
  ],
};

// ─── Registry ────────────────────────────────────────────────────────────────

export const PAGE_SCHEMAS: PageSchema[] = [
  homeSchema,
  aboutSchema,
  coursesSchema,
  blogSchema,
  siteSchema,
];

export function schemaFor(key: string): PageSchema | undefined {
  return PAGE_SCHEMAS.find((s) => s.key === key);
}
