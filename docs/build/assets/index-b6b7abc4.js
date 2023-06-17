import { jsx as t, Fragment as o } from 'react/jsx-runtime'
const s = {
    pageType: 'home',
    hero: {
      name: 'Mikoto Misaka',
      text: 'The Electromaster',
      tagline:
        'A powerful teenage girl with the ability to control electricity and unleash devastating',
      image: { src: '/shaco/build/bilibili.jpg', alt: 'Lac！' },
      actions: [
        {
          theme: 'brand',
          text: 'Start',
          link: '/zh/shaco/build/guide/getting-started'
        },
        {
          theme: 'alt',
          text: 'GitHub Link',
          link: 'https://github.com/laclys/'
        }
      ]
    },
    features: [
      {
        title: 'Electromaster: Control over electricity',
        details:
          'Possesses the ability to generate and manipulate electricity, allowing for powerful electric attacks.',
        icon: '⚡️'
      },
      {
        title: 'Clone Series: Part of the Misaka Network',
        details:
          'Belongs to the Misaka clone series, a group of genetically engineered clones with unique abilities.',
        icon: '🧬'
      },
      {
        title: 'Railgun: Projectile-based attack',
        details:
          'Utilizes a railgun, a weapon that fires high-speed projectiles using electromagnetic forces, as a primary means of long-range attack.',
        icon: '🚄'
      },
      {
        title: 'Iron Will: Determined and resolute',
        details:
          'Demonstrates unwavering determination and strong willpower in the face of challenges and adversity.',
        icon: '💪'
      },
      {
        title: 'Student of Tokiwadai Middle School',
        details:
          'Attends Tokiwadai Middle School, an elite school known for its focus on espers and high academic standards.',
        icon: '🏫'
      },
      {
        title: 'Sisterly Bonds: Cares for other clones',
        details:
          'Develops strong bonds with other clones from the Misaka Network and shows a deep sense of protectiveness towards them.',
        icon: '👭'
      }
    ]
  },
  r = []
function a(e) {
  return t(o, {})
}
function l(e = {}) {
  const { wrapper: i } = e.components || {}
  return i ? t(i, Object.assign({}, e, { children: t(a, e) })) : a()
}
export { l as default, s as frontmatter, r as toc }
