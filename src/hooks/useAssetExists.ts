import { useEffect, useState } from 'react'

/**
 * Checks whether a same-origin static asset actually exists, so optional
 * user-supplied files (CV PDF, profile photo) don't render as dead links
 * before they've been added to `public/`. Optimistic by default (assumes
 * present) to avoid a layout flash once the file is in place.
 */
export function useAssetExists(path: string) {
  const [exists, setExists] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch(path, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled) setExists(res.ok)
      })
      .catch(() => {
        if (!cancelled) setExists(false)
      })
    return () => {
      cancelled = true
    }
  }, [path])

  return exists
}
