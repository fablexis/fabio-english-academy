// Friendly Spanish timestamps for the activity log and the dashboard greeting.

const TIME = new Intl.DateTimeFormat('es', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true, // "5:51 p. m." instead of "17:51"
});
const DAY = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short' });
const DAY_YEAR = new Intl.DateTimeFormat('es', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

/** "hace 5 min" · "hoy, 14:32" · "ayer, 09:15" · "30 jun, 18:02" · "3 dic 2025, 10:00" */
export function formatRelative(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (diffMs < 60_000) return 'hace un momento';
  if (diffMs < 3_600_000) return `hace ${Math.floor(diffMs / 60_000)} min`;

  const dayDiff = Math.round((startOfDay(now) - startOfDay(date)) / 86_400_000);
  if (dayDiff === 0) return `hoy, ${TIME.format(date)}`;
  if (dayDiff === 1) return `ayer, ${TIME.format(date)}`;
  const sameYear = date.getFullYear() === now.getFullYear();
  return `${(sameYear ? DAY : DAY_YEAR).format(date)}, ${TIME.format(date)}`;
}

/** Time-of-day greeting: "Buenos días" / "Buenas tardes" / "Buenas noches". */
export function greeting(date = new Date()): string {
  const h = date.getHours();
  if (h < 12) return 'Buenos días';
  if (h < 20) return 'Buenas tardes';
  return 'Buenas noches';
}
