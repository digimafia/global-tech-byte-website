import { useEffect } from 'react'
import { SITE_NAME, DEFAULT_OG_IMAGE, absoluteUrl } from '../lib/seo'

interface PageMeta {
  title: string
  description: string
  /** Route path used to build the canonical URL, e.g. '/about'. */
  path: string
  /** Absolute or root-relative OG/Twitter image. Defaults to the site default. */
  image?: string
  /** Set true for placeholder/utility pages that shouldn't be indexed. */
  noindex?: boolean
  /** Use `title` verbatim as the full <title> instead of appending "| Global Tech Byte" (e.g. for the homepage, where the brand should lead). */
  brandFirst?: boolean
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function usePageMeta({ title, description, path, image, noindex, brandFirst }: PageMeta) {
  useEffect(() => {
    const fullTitle = brandFirst ? title : `${title} | ${SITE_NAME}`
    const url = absoluteUrl(path)
    const ogImage = image ? (image.startsWith('http') ? image : absoluteUrl(image)) : DEFAULT_OG_IMAGE

    document.title = fullTitle
    setMeta('description', description)
    setMeta('robots', noindex ? 'noindex, follow' : 'index, follow')
    setLink('canonical', url)

    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', url, 'property')
    setMeta('og:image', ogImage, 'property')
    setMeta('og:type', 'website', 'property')

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', ogImage)
  }, [title, description, path, image, noindex, brandFirst])
}
