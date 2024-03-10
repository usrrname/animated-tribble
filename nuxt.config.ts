// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    baseURL: process.env.PRODUCTION ? "https://usrrname.github.io/animated-tribble" : "http://localhost:3000",
    prerender: {
      crawlLinks: true,
      failOnError: false, 
    },
  },
  devtools: { enabled: true }
})
