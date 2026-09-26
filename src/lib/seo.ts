/** Confirmed production domain — keep this as the single source of truth. */
const SITE_URL = 'https://www.globaltechbyte.com'
export const SITE_NAME = 'Global Tech Byte'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero/hero-person.webp`

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === '/' ? '' : path}`
}
