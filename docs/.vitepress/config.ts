import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'pt-BR',
  title: 'StoreModule',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Config', link: '/config/' },
      {
        text: `vaaaa`,
        items: [
          {
            text: 'Release Notes ',
            link: 'aaaaaaaa',
          },
          {
            text: 'Contributing ',
            link: 'aaaaa',
          },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' }
        ]
      }
    ],

    footer: {
      message: 'Lançado sobre licença MIT.',
      copyright: '___MUDAR___'
    }
  }
})
