import { defineConfig } from '../dist'

export default defineConfig({
  title: "xxx",
  themeConfig: {
    nav: [
      { text: "Index", link: "/" },
      { text: "Introduction", link: "/guide/" },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            {
              text: 'Touma Kamijou',
              link: '/guide/a'
            },
            {
              text: 'Uiharu Kazari',
              link: '/guide/b'
            },
            {
              text: 'Misaka Imouto',
              link: '/guide/c'
            },
          ]
        }
      ]
    }
  },
});