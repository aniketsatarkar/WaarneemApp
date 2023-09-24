<template>
  <div
    v-if="vacancy !== null"
    class="card is-pulled-right p-5 h-100-vh side-panel"
  >
    <div class="level">
      <h4 class="level title is-4 is-pulled-left is-bold is-underline">
        {{ vacancy.id === null ? "Create" : "Edit" }}
      </h4>
    </div>

    <!-- title -->
    <div class="field">
      <label class="is-size-7">Title</label>
      <div class="control">
        <input
          v-model="vacancy.title"
          :class="[
            'input',
            {
              'is-danger': !validator.title && validator.title !== null,
            },
          ]"
          type="text"
          placeholder="Title"
          maxlength="100"
          @blur="validate"
          @input="validate"
        />
      </div>
      <!-- <p class="help is-success">Title is required</p> -->
    </div>

    <!-- description -->
    <div class="field">
      <label class="is-size-7">Description</label>
      <div class="control">
        <textarea
          v-model="vacancy.description"
          :class="[
            'textarea',
            {
              'is-danger':
                !validator.description && validator.description !== null,
            },
          ]"
          placeholder="Description"
          rows="3"
          maxlength="500"
          @blur="validate"
          @input="validate"
        ></textarea>
      </div>
      <!-- <p class="help is-success">Description is required</p> -->
    </div>

    <!-- dates -->
    <div class="field">
      <label class="is-size-7">Dates</label>
      <div class="control">
        <input
          v-model="date"
          type="date"
          class="input"
          :disabled="vacancy?.shifts?.length === 10"
        />
      </div>
      <p v-show="vacancy?.shifts?.length === 10" class="help is-success">
        Max 10 dates can be selected
      </p>
    </div>

    <div v-if="vacancy?.shifts?.length" class="shift-list">
      <ShiftForm
        v-for="(_, index) of vacancy.shifts"
        :key="index"
        v-model="vacancy.shifts[index]"
        @delete-shift="handleShiftDelete(index)"
      />
    </div>

    <!-- action buttons  -->
    <div class="columns w-100" style="position: absolute; bottom: 10px">
      <div class="column">
        <button class="button w-100" @click="confirmDelete = true">
          DELETE
        </button>
      </div>
      <div class="column">
        <button
          class="button is-dark w-100"
          :disabled="!isVacancyValid"
          @click="handleSave"
        >
          SAVE
        </button>
      </div>
    </div>
  </div>

  <ConfirmationModal
    v-model="confirmDelete"
    title="Delete"
    message="Are you sure to delete this record ?"
    action-type="danger"
    action-name="Delete"
    @action="handleConfirmation"
  />
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import ConfirmationModal from "~~/components/ConfirmationModal.vue";

export default defineComponent({
  components: {
    ConfirmationModal,
  },
  props: {
    // ...
  },
  setup: () => {
    const store = useStore();
    const date = ref(null);
    const vacancy = ref(null);
    const validator = ref({
      title: null,
      description: null,
      shifts: null,
    });

    const confirmDelete = ref(false);

    watch(
      () => date.value,
      (value) => {
        if (value !== null) {
          vacancy.value.shifts.push({
            date: value,
            start: null,
            end: null,
            price: 0,
            type: null,
            isValid: null,
          });
          date.value = null;
        }
      },
      { deep: true }
    );

    watch(
      () => vacancy.value?.shifts,
      () => {
        if (!vacancy.value || vacancy.value?.title === null) {
          return;
        }

        validate();

        validator.value.shifts =
          vacancy.value.shifts.length > 0 &&
          vacancy.value.shifts.every((shift) => shift.isValid);
      },
      { deep: true }
    );

    watch(
      () => store.state.currentVecancy,
      (value) => {
        vacancy.value = value;
      },
      { deep: true }
    );

    const isVacancyValid = computed(() => {
      return Object.values(validator.value).every((value) => value);
    });

    const vacancies = computed(() => {
      return store.state.vacancies;
    });

    const validate = () => {
      validator.value.title = vacancy.value.title?.length > 0;
      validator.value.description = vacancy.value.description?.length > 0;
      return Object.values(validator.value).every((value) => value);
    };

    const handleShiftDelete = (index) => {
      vacancy.value.shifts.splice(index, 1);
    };

    // setting currentVacancy value to null will hide the side panel
    const clearCurrentVacancy = () => {
      store.dispatch("setCurrentVecancy", null);
    };

    const handleSave = () => {
      if (vacancy.value.id !== null) {
        store.dispatch("updateVacancy", vacancy.value);
      } else {
        vacancy.value.id = vacancies.value.length;
        store.dispatch("addVacancy", vacancy.value);
      }
      clearCurrentVacancy();
    };

    const handleConfirmation = (result) => {
      if (result) {
        handleDelete();
      }
    };

    const handleDelete = () => {
      if (vacancy.value.id !== null) {
        store.dispatch("deleteVacancy", vacancy.value.id);
      }
      clearCurrentVacancy();
    };

    return {
      date,
      handleShiftDelete,
      isVacancyValid,
      handleSave,
      handleDelete,
      vacancy,
      validate,
      validator,
      store,
      confirmDelete,
      handleConfirmation,
    };
  },
});
</script>
