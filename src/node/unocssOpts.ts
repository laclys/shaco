import { VitePluginConfig } from 'unocss/vite'
import { presetAttributify, presetWind, presetIcons } from 'unocss'

const options: VitePluginConfig = {
  presets: [
    presetAttributify(), // 属性化支持
    presetWind({}), // 兼容 Windi CSS, Tailwind CSS
    presetIcons()
  ],
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
  ]
}

export default options
