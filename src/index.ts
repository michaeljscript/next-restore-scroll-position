import Router, { NextRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { deleteScrollPos, restoreScrollPos, saveScrollPos } from './storage'

export function useScrollRestoration(router: NextRouter, { enabled = true }: { enabled?: boolean } = {}) {
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
    Router.events.on('routeChangeStart', onRouteChangeStart)
    Router.events.on('routeChangeComplete', onRouteChangeComplete)
    Router.beforePopState(() => {
      shouldRestoreRef.current = true
      return true
    })

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
      Router.events.off('routeChangeStart', onRouteChangeStart)
      Router.events.off('routeChangeComplete', onRouteChangeComplete)
      Router.beforePopState(() => true)
    }
  }, [router, enabled])
}
