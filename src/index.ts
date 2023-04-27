import { useEffect, useRef } from 'react'
import { deleteScrollPos, restoreScrollPos, saveScrollPos } from './storage'

interface Router {
  asPath: string
  events: {
    on: (event: any, callback: (data?: any) => void) => void
    off: (event: any, callback: (data?: any) => void) => void
  }
  beforePopState: (callback: () => boolean) => void
}

export function useScrollRestoration(router: Router, { enabled = true }: { enabled?: boolean } = {}) {
  const shouldRestoreRef = useRef(false)

  useEffect(() => {
    if (!enabled) return
    if (!('scrollRestoration' in window.history)) return
    window.history.scrollRestoration = 'manual'
    // restoreScrollPos(router.asPath);

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      saveScrollPos(router.asPath)
      delete event['returnValue']
    }

    const onRouteChangeStart = () => {
      saveScrollPos(router.asPath)
    }

    const onRouteChangeComplete = (url: string) => {
      if (shouldRestoreRef.current) {
        shouldRestoreRef.current = false
        /**
         * Calling with relative url, not expected asPath, so this
         * will break if there is a basePath or locale path prefix.
         */
        restoreScrollPos(url)
        deleteScrollPos(url)
      }
    }

    window.addEventListener('beforeunload', onBeforeUnload)
    router.events.on('routeChangeStart', onRouteChangeStart)
    router.events.on('routeChangeComplete', onRouteChangeComplete)
    router.beforePopState(() => {
      shouldRestoreRef.current = true
      return true
    })

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
      router.events.off('routeChangeStart', onRouteChangeStart)
      router.events.off('routeChangeComplete', onRouteChangeComplete)
      router.beforePopState(() => true)
    }
  }, [router, enabled])
}
