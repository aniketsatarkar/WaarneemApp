import { createStore } from "vuex";

const store = createStore({
  state: () => {
    return {
      count: 0,
      vacancies: [],
      currentVecancy: null,
      filter: {
        min: null,
        max: null,
      },
    };
  },
  actions: {
    addVacancy({ commit }, vacancy) {
      commit("ADD_VACANCY", vacancy);
    },
    deleteVacancy({ commit }, id) {
      commit("DELETE_VACANCY", id);
    },
    updateVacancy({ commit }, vacancy) {
      commit("UPDATE_VACANCY", vacancy);
    },
    setCurrentVecancy({ commit }, vacancy) {
      commit("SET_CURRENT_VACANCY", vacancy);
    },
    updateFilter({ commit }, filter) {
      commit("UPDATE_FILTER", filter);
    },
  },
  mutations: {
    ADD_VACANCY(state, vacancy) {
      state.vacancies.push(vacancy);
    },
    DELETE_VACANCY(state, id) {
      const index = state.vacancies.findIndex((vacancy) => {
        return vacancy.id === id;
      });

      if (index !== -1) {
        state.vacancies.splice(id, 1);
      }
    },
    UPDATE_VACANCY(state, vacancy) {
      const index = state.vacancies.findIndex((item) => {
        return item.id === vacancy.id;
      });

      if (index !== -1) {
        state.vacancies[index] = vacancy;
      }
    },
    SET_CURRENT_VACANCY(state, vacancy) {
      state.currentVecancy = vacancy;
    },
    UPDATE_FILTER(state, filter) {
      state.filter = filter;
    },
  },
  getters: {
    getVacancies: (state) => {
      return state.vacancies;
    },
    getCurrentVacancy: (state) => {
      return state.currentVecancy;
    },
    getFilter: (state) => {
      return state.filter;
    },
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});
