import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface HeaderConfig {
  show: boolean
  showBackButton: boolean
  showTitle: boolean
  showCart: boolean
  title: string
  titleClickable: boolean
}

export function useHeaderConfig() {
  const route = useRoute()

  const headerConfig = computed<HeaderConfig>(() => {
    const path = route.path

    const configs: Record<string, HeaderConfig> = {
      '/': {
        show: true,
        showBackButton: false,
        showTitle: true,
        showCart: true,
        title: 'ابرناک',
        titleClickable: true,
      },
      '/payment': {
        show: false,
        showBackButton: false,
        showTitle: false,
        showCart: false,
        title: '',
        titleClickable: false,
      },
      '/cart': {
        show: true,
        showBackButton: true,
        showTitle: true,
        showCart: false,
        title: 'سبد خرید',
        titleClickable: false,
      },
    }

    const defaultConfig: HeaderConfig = {
      show: true,
      showBackButton: true,
      showTitle: true,
      showCart: true,
      title: 'ابرناک',
      titleClickable: false,
    }

    return configs[path] || defaultConfig
  })

  return {
    headerConfig,
  }
}
