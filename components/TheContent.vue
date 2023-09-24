<template>
  <div class="ml-6 mr-6 mt-5 mb-2">
    <section class="is-clearfix mb-5">
      <div class="columns mb-5 mt-5">
        <div class="column">
          <h4 class="title is-4 is-pulled-left is-bold is-underline">Filter</h4>
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-fifth" style="width: unset !important">
          Filter on price
        </div>
        <div class="column pt-5">
          <slider v-model="filter" :max="500" @change="handleFilterChange" />
        </div>
      </div>
    </section>

    <section class="columns mt-5 mb-0">
      <div class="column mb-0">
        <h4 class="title is-4 is-pulled-left is-bold is-underline">Shifts</h4>
        <button
          class="button is-dark is-pulled-right px-6"
          :disabled="disableAddShift"
          @click="handleAddShift"
        >
          ADD SHIFT
        </button>
      </div>
    </section>
  </div>

  <template v-if="vacancies.length">
    <div
      v-for="(vacancy, index) of vacancies"
      :key="index"
      class="card px-6 py-5 mx-6 mb-5"
    >
      <!-- title -->
      <div class="level mb-0">
        <h5 class="title is-5 is-pulled-left">
          {{ _.capitalize(vacancy.title) }}
        </h5>
        <div class="is-pulled-right cursor-pointer">
          <fa icon="pen" @click="handleVacancyEdit(index)" />
        </div>
      </div>
      <!-- description -->
      <div class="level">
        <div class="">{{ _.capitalize(vacancy.description) }}</div>
      </div>
      <!-- dates -->
      <div class="level">
        <h5 class="title is-5 is-pulled-left">Dates</h5>
      </div>
      <!-- date list -->
      <div v-for="(shift, shiftIndex) of vacancy.shifts" :key="shiftIndex">
        <div
          v-show="canShowFiltered(shift)"
          class="has-background-grey-dark has-text-white mt-5 mb-3 is-rounded"
        >
          <div class="columns px-5">
            <div class="column">{{ formatDate(shift.date) }}</div>
            <div class="column">{{ shift.start }}</div>
            <div class="column">{{ shift.end }}</div>
            <div class="column is-one-third">{{ shift.type }}</div>
            <div class="column" align="right">€{{ shift.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="card px-6 py-5 mx-6 mb-5">
      <div class="columns is-centered">
        <div class="column is-half">
          <p class="bd-notification is-primary has-text-centered">
            No Shifts Found!
          </p>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import _ from "lodash";
import moment from "moment";

export default defineComponent({
  setup: () => {
    const store = useStore();

    const handleAddShift = () => {
      store.dispatch("setCurrentVecancy", {
        id: null,
        title: null,
        description: null,
        shifts: [],
      });
    };

    const filter = ref([0, 100]);

    const vacancies = computed(() => {
      return store.state.vacancies;
    });

    const disableAddShift = computed(() => {
      return store.state.currentVecancy !== null;
    });

    const handleVacancyEdit = (index) => {
      store.dispatch("setCurrentVecancy", vacancies.value[index]);
    };

    const handleFilterChange = () => {
      store.dispatch("updateFilter", {
        min: filter.value[0],
        max: filter.value[1],
      });
    };

    const canShowFiltered = (shift) => {
      const min = filter.value[0];
      const max = filter.value[1];

      return min <= shift.price && max >= shift.price;
    };

    const formatDate = (date) => {
      return moment(date).format("DD MMM YYYY");
    };

    return {
      handleAddShift,
      vacancies,
      handleVacancyEdit,
      disableAddShift,
      filter,
      handleFilterChange,
      canShowFiltered,
      formatDate,
      _,
    };
  },
});
</script>
