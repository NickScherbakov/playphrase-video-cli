import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
// Temporarily removed Spark global import to diagnose blank page on GitHub Pages
// import '@github/spark/spark'

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'

import './main.css'
import './styles/theme.css'
import './index.css'

function mountApp() {
  const rootEl = document.getElementById('root')
  if (!rootEl) {
    const msg = 'Root element not found — application cannot mount.'
    console.error(msg)
    const fallback = document.createElement('div')
    fallback.style.color = 'white'
    fallback.style.fontFamily = 'Inter, sans-serif'
    fallback.style.padding = '2rem'
    fallback.innerText = msg
    document.body.appendChild(fallback)
    return
  }
  try {
    createRoot(rootEl).render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    )
  } catch (e) {
    console.error('Fatal render error', e)
    const fallback = document.createElement('div')
    fallback.style.color = 'white'
    fallback.style.fontFamily = 'Inter, sans-serif'
    fallback.style.padding = '2rem'
    fallback.innerText = 'Render failed: ' + (e instanceof Error ? e.message : String(e))
    document.body.appendChild(fallback)
    // expose for debugging on GitHub Pages
    // @ts-ignore
    window.__PLAYPHRASE_FATAL__ = e
  }
}

mountApp()
