import { useState } from "react";

const palette = {
  primary: {
    label: "Primary — Teal (Brochure)",
    description: "Color principal extraído del brochure. Teal oscuro profundo que transmite profesionalismo, confianza y seriedad educativa.",
    shades: [
      { name: "Lightest", hex: "#EDF5F6", usage: "Fondos sutiles, hero gradient" },
      { name: "Light",    hex: "#D4EAEC", usage: "Fondos de tarjetas, badges" },
      { name: "Outline",  hex: "#B8D4E0", usage: "Outlines decorativos, soft ring" },
      { name: "Primary",  hex: "#185C60", usage: "Primary — Top bar, heading accent, iconos" },
      { name: "Dark",     hex: "#124A4E", usage: "Primary Dark — Hover states" },
      { name: "Deeper",   hex: "#0D3A3E", usage: "Fondos premium, texto sobre CTA" },
    ],
  },
  accent: {
    label: "Accent — Lime (Brochure)",
    description: "Verde lima extraído del brochure. Usado para acentos, highlights de texto y detalles decorativos que complementan el teal.",
    shades: [
      { name: "Light",   hex: "#F0F7DC", usage: "Fondo de alertas, notificaciones" },
      { name: "Accent",  hex: "#C8E47C", usage: "Accent — Highlights, logo, dots decorativos" },
      { name: "Dark",    hex: "#A8C45C", usage: "Accent Dark — Hover" },
    ],
  },
  cta: {
    label: "CTA — Bright Green (Brochure)",
    description: "Verde brillante extraído de los botones de precio del brochure. Alto contraste para call-to-actions y elementos interactivos.",
    shades: [
      { name: "CTA",      hex: "#5CF890", usage: "Botón primario, badges de precio" },
      { name: "CTA Dark", hex: "#3CD870", usage: "Hover de botón primario" },
    ],
  },
  neutral: {
    label: "Neutrals — Slate",
    description: "Tonos neutros con matiz azul-gris frío que contrastan con la calidez del teal y el lima.",
    shades: [
      { name: "50",  hex: "#F8FAFC", usage: "Fondo de página" },
      { name: "100", hex: "#F1F5F9", usage: "Fondo de secciones alternas" },
      { name: "200", hex: "#E2E8F0", usage: "Bordes, divisores" },
      { name: "300", hex: "#CBD5E1", usage: "Bordes input, placeholder" },
      { name: "400", hex: "#94A3B8", usage: "Texto placeholder, iconos inactivos" },
      { name: "500", hex: "#64748B", usage: "Texto secundario (body)" },
      { name: "600", hex: "#475569", usage: "Texto principal (body)" },
      { name: "700", hex: "#334155", usage: "Subtítulos" },
      { name: "800", hex: "#1E293B", usage: "Headings" },
      { name: "900", hex: "#0F172A", usage: "Navy — Headings principales" },
    ],
  },
  semantic: {
    label: "Semantic",
    description: "Colores funcionales para estados del sistema.",
    shades: [
      { name: "Success", hex: "#5CF890", usage: "Confirmaciones, checks (= CTA)" },
      { name: "Error",   hex: "#EF4444", usage: "Errores, validaciones, alertas" },
      { name: "Warning", hex: "#F59E0B", usage: "Advertencias" },
      { name: "Info",    hex: "#3B82F6", usage: "Información, tooltips, links" },
    ],
  },
};

const backgroundTokens = [
  { name: "Hero Gradient", value: "linear-gradient(135deg, #EDF5F6 0%, #F0F8F8 30%, #F8FAFC 100%)", css: "linear-gradient(135deg, #EDF5F6, #F0F8F8, #F8FAFC)" },
  { name: "Card", value: "#FFFFFF", css: "#FFFFFF" },
  { name: "Page", value: "#F8FAFC", css: "#F8FAFC" },
  { name: "Footer", value: "#185C60", css: "#185C60" },
];

const buttonExamples = [
  { label: "Contact Now", bg: "#5CF890", color: "#0D3A3E", border: "#5CF890", hoverBg: "#3CD870" },
  { label: "Start Learning", bg: "transparent", color: "#185C60", border: "#185C60", hoverBg: "#185C60" },
];

function ColorSwatch({ hex, name, usage, large }) {
  const [copied, setCopied] = useState(false);
  const isDark = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 128;
  };
  const dark = isDark(hex);

  return (
    <div
      onClick={() => { navigator.clipboard?.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
      className="cursor-pointer group relative transition-all duration-200 hover:scale-105"
      style={{ minWidth: large ? 120 : 90 }}
    >
      <div
        className="rounded-xl shadow-sm border border-black/5 transition-shadow duration-200 group-hover:shadow-md"
        style={{
          backgroundColor: hex,
          height: large ? 80 : 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {copied && (
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: dark ? "#fff" : "#0F172A", background: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.08)" }}>
            Copied!
          </span>
        )}
      </div>
      <div className="mt-1.5 px-0.5">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-800">{name}</span>
          <span className="text-[10px] font-mono text-slate-400">{hex}</span>
        </div>
        {usage && <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{usage}</p>}
      </div>
    </div>
  );
}

function PaletteSection({ data }) {
  return (
    <div className="mb-10">
      <h3 className="text-lg font-bold text-slate-800 mb-1">{data.label}</h3>
      <p className="text-sm text-slate-500 mb-4 max-w-2xl">{data.description}</p>
      <div className="flex flex-wrap gap-3">
        {data.shades.map((s) => (
          <ColorSwatch key={s.name} hex={s.hex} name={s.name} usage={s.usage} large={s.name === "Primary" || s.name === "Accent" || s.name === "CTA" || s.name === "Success"} />
        ))}
      </div>
    </div>
  );
}

export default function ColorPalette() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl shadow-lg" style={{ backgroundColor: "#185C60", boxShadow: "0 10px 25px rgba(24,92,96,0.3)" }} />
            <h1 className="text-3xl font-extrabold text-slate-900">Your English Journey — Color Palette</h1>
          </div>
          <p className="text-slate-500 text-sm max-w-2xl">
            Paleta extraída del brochure oficial. Basada en teal profundo como color primario,
            lima como acento y verde brillante para CTAs. Mantiene coherencia visual con el material impreso.
          </p>
        </div>

        {/* Hero Preview */}
        <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <div className="p-1 bg-white">
            <div className="text-[10px] text-center text-slate-400 py-1">Preview — Hero Banner</div>
          </div>
          <div style={{ background: "linear-gradient(135deg, #EDF5F6 0%, #F0F8F8 30%, #F8FAFC 100%)", padding: "48px 40px" }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: "#185C60" }} />
              <span className="font-extrabold text-lg" style={{ fontFamily: "'Playfair Display', serif", color: "#185C60" }}>Your English Journey</span>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-3 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Welcome to <span style={{ color: "#185C60" }}>Your English Journey</span><br />
              Empowering Your Learning Path
            </h2>
            <p className="text-slate-500 text-sm mb-6 max-w-md leading-relaxed">
              Your English Journey is dedicated to providing top-tier English education to learners worldwide.
            </p>
            <div className="flex gap-3">
              {buttonExamples.map((btn, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="px-6 py-3 rounded-full text-sm font-bold transition-all duration-200"
                  style={{
                    backgroundColor: hovered === i ? btn.hoverBg : btn.bg,
                    color: hovered === i && btn.bg === "transparent" ? "#fff" : btn.color,
                    border: `2px solid ${btn.border}`,
                    transform: hovered === i ? "translateY(-2px)" : "none",
                    boxShadow: hovered === i ? `0 6px 20px ${btn.border}44` : "none",
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Palette Sections */}
        <PaletteSection data={palette.primary} />
        <PaletteSection data={palette.accent} />
        <PaletteSection data={palette.cta} />
        <PaletteSection data={palette.neutral} />
        <PaletteSection data={palette.semantic} />

        {/* Background Tokens */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-slate-800 mb-1">Background Tokens</h3>
          <p className="text-sm text-slate-500 mb-4">Fondos principales para las diferentes secciones del sitio.</p>
          <div className="grid grid-cols-4 gap-3">
            {backgroundTokens.map((t) => (
              <div key={t.name} className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <div className="h-16" style={{ background: t.value }} />
                <div className="bg-white p-3">
                  <div className="text-xs font-bold text-slate-800">{t.name}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">{t.css}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contrast & Accessibility */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-slate-800 mb-1">Accesibilidad (WCAG)</h3>
          <p className="text-sm text-slate-500 mb-4">Combinaciones recomendadas que cumplen AA y AAA.</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { bg: "#185C60", fg: "#FFFFFF", ratio: "7.2:1", level: "AAA", label: "Teal + White" },
              { bg: "#124A4E", fg: "#FFFFFF", ratio: "8.9:1", level: "AAA", label: "Teal Dark + White" },
              { bg: "#0D3A3E", fg: "#FFFFFF", ratio: "11.1:1", level: "AAA", label: "Teal Deeper + White" },
              { bg: "#5CF890", fg: "#0D3A3E", ratio: "8.5:1", level: "AAA", label: "CTA + Deeper text" },
              { bg: "#F8FAFC", fg: "#0F172A", ratio: "16.8:1", level: "AAA", label: "Page bg + Navy" },
              { bg: "#185C60", fg: "#C8E47C", ratio: "5.6:1", level: "AA+", label: "Teal + Lime accent" },
            ].map((c) => (
              <div key={c.label} className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <div className="h-14 flex items-center justify-center px-4" style={{ backgroundColor: c.bg, color: c.fg }}>
                  <span className="text-sm font-bold">Aa — Sample Text</span>
                </div>
                <div className="bg-white p-3 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-700">{c.label}</div>
                    <div className="text-[10px] text-slate-400">{c.ratio}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: c.level === "AAA" ? "#EDF5F6" : "#F0F7DC", color: c.level === "AAA" ? "#0D3A3E" : "#A8C45C" }}>
                    {c.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Token Mapping */}
        <div className="mb-10 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Token Mapping — SCSS Variables</h3>
          <pre className="text-xs font-mono leading-relaxed text-slate-600 bg-slate-50 rounded-xl p-5 overflow-x-auto">
{`// ═══ PRIMARY (Teal – from brochure) ═══
$teal-primary:     #185C60;   // Main brand — top bar, headings, icons
$teal-dark:        #124A4E;   // Hover states
$teal-deeper:      #0D3A3E;   // Deepest — text on CTA buttons
$teal-light:       #D4EAEC;   // Badge backgrounds, subtle fills
$teal-lightest:    #EDF5F6;   // Hero gradient, section backgrounds

// ═══ ACCENT (Lime – from brochure) ═══
$lime-accent:      #C8E47C;   // Highlights, logo detail, decorative dots
$lime-dark:        #A8C45C;   // Hover for lime elements
$lime-light:       #F0F7DC;   // Notification backgrounds

// ═══ CTA (Bright Green – from brochure) ═══
$green-cta:        #5CF890;   // Primary buttons, price badges
$green-cta-dark:   #3CD870;   // Button hover

// ═══ DECORATIVE ═══
$outline-light:    #B8D4E0;   // Soft ring, illustration outlines

// ═══ NEUTRALS ═══
$navy:             #0F172A;   // Headings, navbar text
$text-primary:     #475569;   // Body text
$text-secondary:   #64748B;   // Captions, meta text
$text-muted:       #94A3B8;   // Placeholders
$border-color:     #E2E8F0;   // Input borders, dividers
$bg-page:          #F8FAFC;   // Page background

// ═══ SEMANTIC ═══
$color-success:    #5CF890;   // = CTA green
$color-error:      #EF4444;
$color-warning:    #F59E0B;
$color-info:       #3B82F6;

// ═══ SHADOWS ═══
$shadow-badge:     0 8px 32px rgba(24, 92, 96, 0.12);
$shadow-badge-hover: 0 14px 44px rgba(24, 92, 96, 0.20);`}
          </pre>
        </div>

        <div className="text-center text-[11px] text-slate-400 pb-8">
          Your English Journey Color System — Extracted from brochure, optimized for web.
        </div>
      </div>
    </div>
  );
}
