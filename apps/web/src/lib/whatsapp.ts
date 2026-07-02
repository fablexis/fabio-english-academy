import type { SiteContent } from '@eyb/shared';

/** wa.me deep link from the CMS-managed number, with an optional custom message. */
export function waUrl(site: SiteContent, message?: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    message ?? site.whatsappMessage,
  )}`;
}
