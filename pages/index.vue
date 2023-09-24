<template>
  <article class="columns">
    <section class="column">
      <TheContent />
    </section>
    <section class="column is-narrow">
      <VacancyForm />
    </section>
  </article>
</template>

<script setup>
import VacancyForm from "~~/components/VacancyForm.vue";
</script>

<style>
html,
body {
  height: 100%;
}

article {
  height: 100%;

  section {
    background: red;
    height: 100%;
    display: flex;
    overflow-y: auto;
    flex-direction: column;

    &.is-narrow {
      width: 220px;
    }

    &:last-of-type {
      background: white;
      flex: 2 1 auto;
    }
  }
}
</style>
