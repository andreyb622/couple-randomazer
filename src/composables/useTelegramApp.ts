import WebApp from '@twa-dev/sdk'
import { onMounted, onUnmounted, ref } from 'vue'

interface ThemeParams {
  bg_color?: string
  text_color?: string
  hint_color?: string
  link_color?: string
  button_color?: string
  button_text_color?: string
  secondary_bg_color?: string
}

const FALLBACK_LIGHT: ThemeParams = {
  bg_color: '#ffffff',
  text_color: '#1f2937',
  hint_color: '#9ca3af',
  link_color: '#2481cc',
  button_color: '#2481cc',
  button_text_color: '#ffffff',
  secondary_bg_color: '#f3f4f6',
}

const FALLBACK_DARK: ThemeParams = {
  bg_color: '#1f2937',
  text_color: '#f9fafb',
  hint_color: '#9ca3af',
  link_color: '#6ba3e8',
  button_color: '#2481cc',
  button_text_color: '#ffffff',
  secondary_bg_color: '#374151',
}

function isRunningInTelegram(): boolean {
  return WebApp.platform !== 'unknown' || WebApp.initData.length > 0
}

function getSystemThemeParams(): ThemeParams {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  return prefersDark ? FALLBACK_DARK : FALLBACK_LIGHT
}

function applyThemeParams(params: ThemeParams): void {
  const root = document.documentElement
  const entries: Array<[string, string | undefined]> = [
    ['--tg-bg', params.bg_color],
    ['--tg-text', params.text_color],
    ['--tg-hint', params.hint_color],
    ['--tg-link', params.link_color],
    ['--tg-button', params.button_color],
    ['--tg-button-text', params.button_text_color],
    ['--tg-secondary-bg', params.secondary_bg_color],
  ]

  for (const [name, value] of entries) {
    if (value) {
      root.style.setProperty(name, value)
    }
  }
}

export function useTelegramApp() {
  const isTelegram = ref(isRunningInTelegram())

  let mediaQuery: MediaQueryList | null = null

  function handleThemeChanged(): void {
    applyThemeParams(WebApp.themeParams)
  }

  function handleSystemThemeChanged(): void {
    if (!isTelegram.value) {
      applyThemeParams(getSystemThemeParams())
    }
  }

  onMounted(() => {
    if (isTelegram.value) {
      WebApp.ready()
      WebApp.expand()
      applyThemeParams(WebApp.themeParams)
      WebApp.onEvent('themeChanged', handleThemeChanged)
      return
    }

    applyThemeParams(getSystemThemeParams())
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', handleSystemThemeChanged)
  })

  onUnmounted(() => {
    if (isTelegram.value) {
      WebApp.offEvent('themeChanged', handleThemeChanged)
      return
    }

    mediaQuery?.removeEventListener('change', handleSystemThemeChanged)
  })

  function hapticImpact(style: 'light' | 'medium' | 'heavy' = 'medium'): void {
    if (!isTelegram.value) {
      return
    }

    WebApp.HapticFeedback.impactOccurred(style)
  }

  function hapticSelection(): void {
    if (!isTelegram.value) {
      return
    }

    WebApp.HapticFeedback.selectionChanged()
  }

  return { isTelegram, hapticImpact, hapticSelection }
}
