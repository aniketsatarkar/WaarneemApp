<template>
  <div :class="['modal', { 'is-active': isVisible }]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button
          class="delete"
          aria-label="close"
          @click="close(false)"
        ></button>
      </header>
      <section class="modal-card-body">
        {{ message }}
      </section>
      <footer class="modal-card-foot">
        <button
          :class="`button is-small is-${actionType}`"
          @click="close(true)"
        >
          {{ actionName }}
        </button>
        <button class="button is-small" @click="close(false)">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
      required: true,
    },
    message: {
      type: String,
      default: "",
      required: true,
    },
    actionType: {
      type: String,
      default: "success",
      required: true,
    },
    actionName: {
      type: String,
      default: "",
      required: true,
    },
  },
  emits: ["update:modelValue", "action"],
  setup: (props, { emit }) => {
    const isVisible = ref(false);

    watch(
      () => props.modelValue,
      (value) => {
        isVisible.value = value;
      }
    );

    const close = (result) => {
      emit("update:modelValue", isVisible);
      emit("action", result);
      isVisible.value = false;
    };

    return {
      isVisible,
      close,
    };
  },
});
</script>
