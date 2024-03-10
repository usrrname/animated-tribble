// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   app: {
    baseURL: '/animated-tribble/',
    buildAssetsDir: 'assets',
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false, 
    },
  },
  devtools: { enabled: true }
})
