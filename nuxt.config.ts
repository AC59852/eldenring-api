// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/main.css'
  ],
  modules: [
    '@nuxtjs/apollo'
  ],

  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://eldenring.fanapis.com/api/graphql'
      }
    },
  },
})
