<template>
  <div class="level pb-0 mb-0">
    <div class="is-bold is-pulled-left bold-text">
      {{ formatDate(shift.date) }}
    </div>
    <div class="is-pulled-right">
      <fa
        icon="close"
        class="cursor-pointer"
        @click="$emit('delete-shift', index)"
      />
    </div>
  </div>
  <div class="has-background-grey-dark has-text-white p-2">
    <div class="columns mb-0">
      <div class="column">
        <h6 class="is-size-7 mb-1">Start Time</h6>
        <input
          v-model="shift.start"
          :class="[
            'input is-small',
            {
              'is-danger': !validator.start && shift.isValid !== null,
            },
          ]"
          type="time"
          @blur="validate"
          @change="validate"
        />
      </div>
      <div class="column">
        <h6 class="is-size-7 mb-1">End Time</h6>
        <input
          v-model="shift.end"
          :class="[
            'input is-small',
            {
              'is-danger': !validator.end && shift.isValid !== null,
            },
          ]"
          type="time"
          @blur="validate"
          @change="validate"
        />
      </div>
      <div class="column">
        <h6 class="is-size-7 mb-1">Price</h6>
        <div class="control has-icons-right">
          <input
            v-model="shift.price"
            :class="[
              'input is-small',
              {
                'is-danger': !validator.price && shift.isValid !== null,
              },
            ]"
            type="number"
            min="0"
            step="0.1"
            @blur="validate"
            @change="validate"
          />
          <span class="icon is-small is-right">
            <fa icon="fa-euro-sign" />
          </span>
        </div>
      </div>
    </div>
    <h6 class="is-size-7 mb-1">Type</h6>
    <div
      :class="[
        'select is-small is-fullwidth',
        {
          'is-danger': !validator.type && shift.isValid !== null,
        },
      ]"
    >
      <select v-model="shift.type" @blur="validate" @change="validate">
        <option>Consultation</option>
        <option>Telephone</option>
        <option>Ambulance</option>
      </select>
    </div>
  </div>
</template>

<script>
import { defineComponent, watch, ref, onMounted } from "vue";
import moment from "moment";

const SHIFT_OBJECT = {
  date: null,
  start: null,
  end: null,
  price: 0,
  type: null,
  isValid: null,
};

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return Object.assign({}, SHIFT_OBJECT);
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:modelValue", "delete-shift"],
  setup: (props, { emit }) => {
    const shift = ref(Object.assign({}, SHIFT_OBJECT));
    const validator = ref({
      date: null,
      start: null,
      end: null,
      price: null,
      type: null,
    });

    onMounted(() => {
      shift.value = props.modelValue;
    });

    watch(
      () => shift.value,
      () => {
        emit("update:modelValue", shift.value);
      },
      { deep: true }
    );

    const validate = () => {
      validator.value = {
        date: shift.value.date !== null,
        start: shift.value.start !== null,
        end: shift.value.end !== null && shift.value.end > shift.value.start,
        price: shift.value.price >= 0,
        type: shift.value.type !== null,
      };

      // find if shift data is valid
      shift.value.isValid = Object.values(validator.value).every((value) => {
        return value;
      });
    };

    const handleDelete = () => {
      emit("delete-shift", props.index);
    };

    const formatDate = (date) => {
      return moment(date).format("DD-MM-YYYY");
    };

    return {
      shift,
      validator,
      handleDelete,
      validate,
      formatDate,
    };
  },
});
</script>
