import Slider from "@vueform/slider";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("slider", Slider, {});
});
