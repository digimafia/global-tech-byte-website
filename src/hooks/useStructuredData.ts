import { useEffect } from 'react'

/**
 * Injects a page-specific JSON-LD <script> tag into <head>, replacing it on
 * navigation so schema never accumulates across route changes. Pass a
 * module-scope (stable) object/array so the effect doesn't re-run on every
 * render of pages with frequent local state changes (e.g. forms).
 */
export function useStructuredData(data: object | object[] | null) {
  useEffect(() => {
    if (!data) return

    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.textContent = JSON.stringify(data)
    document.head.appendChild(el)

    return () => {
      el.remove()
    }
  }, [data])
}
