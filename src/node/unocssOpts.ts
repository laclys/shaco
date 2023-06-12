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
    ]
  ]
}

export default options
