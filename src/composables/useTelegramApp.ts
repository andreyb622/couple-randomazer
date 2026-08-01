import WebApp from '@twa-dev/sdk'
import { onMounted } from 'vue'

function applyThemeParams(): void {
  const root = document.documentElement
  const params = WebApp.themeParams

  if (params.bg_color) root.style.setProperty('--tg-bg', params.bg_color)
  if (params.text_color) root.style.setProperty('--tg-text', params.text_color)
  if (params.hint_color) root.style.setProperty('--tg-hint', params.hint_color)
  if (params.link_color) root.style.setProperty('--tg-link', params.link_color)
  if (params.button_color) root.style.setProperty('--tg-button', params.button_color)
  if (params.button_text_color) root.style.setProperty('--tg-button-text', params.button_text_color)
  if (params.secondary_bg_color) root.style.setProperty('--tg-secondary-bg', params.secondary_bg_color)
}

export function useTelegramApp() {
  onMounted(() => {
    WebApp.ready()
    WebApp.expand()
    applyThemeParams()
  })

  function hapticImpact(style: 'light' | 'medium' | 'heavy' = 'medium'): void {
    WebApp.HapticFeedback.impactOccurred(style)
  }

  return { hapticImpact }
}
