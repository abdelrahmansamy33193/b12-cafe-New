import * as React from 'react'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  // الافتراضي دايمًا Light (لا نعتمد على system)
  return 'light'
}

export default function useTheme() {
  const [theme, setTheme] = React.useState<Theme>(getInitialTheme)

  // طبّق السمة على <html data-theme="">
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggle = React.useCallback(
    () => setTheme(t => (t === 'dark' ? 'light' : 'dark')),
    []
  )

  return { theme, setTheme, toggle }
}
