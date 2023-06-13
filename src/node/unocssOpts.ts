import { VitePluginConfig } from 'unocss/vite'
import { presetAttributify, presetWind, presetIcons } from 'unocss'

const options: VitePluginConfig = {
  presets: [
    presetAttributify(), // 属性化支持
    presetWind({}), // 兼容 Windi CSS, Tailwind CSS
    presetIcons()
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center'
  },
  rules: [
    [
      /^divider-(\w+)$/,
      ([, w]) => ({
        [`border-${w}`]: '1px solid var(--shaco-c-divider-light)'
      })
    ],
    [
      'menu-item-before',
      {
        'margin-right': '12px',
        'margin-left': '12px',
        width: '1px',
        height: '24px',
        'background-color': 'var(--shaco-c-divider-light)',
        content: '" "'
      }
    ]
  ],
  theme: {
    colors: {
      brandLight: 'var(--shaco-c-brand-light)',
      brandDark: 'var(--shaco-c-brand-dark)',
      brand: 'var(--shaco-c-brand)',
      text: {
        1: 'var(--shaco-c-text-1)',
        2: 'var(--shaco-c-text-2)',
        3: 'var(--shaco-c-text-3)',
        4: 'var(--shaco-c-text-4)'
      },
      divider: {
        default: 'var(--shaco-c-divider)',
        light: 'var(--shaco-c-divider-light)',
        dark: 'var(--shaco-c-divider-dark)'
      },
      gray: {
        light: {
          1: 'var(--shaco-c-gray-light-1)',
          2: 'var(--shaco-c-gray-light-2)',
          3: 'var(--shaco-c-gray-light-3)',
          4: 'var(--shaco-c-gray-light-4)'
        }
      },
      bg: {
        default: 'var(--shaco-c-bg)',
        soft: 'var(--shaco-c-bg-soft)',
        mute: 'var(--shaco-c-bg-mute)'
      }
    }
  }
}

export default options
