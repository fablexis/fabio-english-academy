/** Two-letter uppercase initials from a full name ("Lya Pernía" → "LP"). */
export function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/** First name only ("Lya Pernía" → "Lya"). */
export function firstName(name: string): string {
  return name.split(' ')[0] ?? name;
}
