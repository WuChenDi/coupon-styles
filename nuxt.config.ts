// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content:
            'initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
      title: 'coupon-styles',
    },
    keepalive: true,
    pageTransition: { name: 'page-slide', mode: 'out-in' },
  },
  devtools: { enabled: false },
  css: ['@/styles/app.css'],
  modules: ['@unocss/nuxt'],
  // typescript: {
  //   tsConfig: {
  //     compilerOptions: {
  //       noImplicitOverride: true,
  //       noUncheckedIndexedAccess: true,
  //       noUnusedLocals: true,
  //       noUnusedParameters: true,
  //     },
  //   },
  //   typeCheck: true,
  // },
})
