import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	css: [
		'@fortawesome/fontawesome-svg-core/styles.css',
		'@vueform/slider/themes/default.css',
		'~~/assets/style/main.scss',
	]
})
