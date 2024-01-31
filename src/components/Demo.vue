<template>
  <div style="width: 20rem">
    Template dp-input
    <Datepicker v-model="date">
      <template #dp-input="{ value }">
        <input class="picker" type="text" :value="value" readonly />
      </template>
    </Datepicker>
  </div>
  <div style="width: 20rem; margin-top: 1rem">
    Template clear-icon
    <Datepicker v-model="date">
      <template #clear-icon="{ clear }">
        <img class="picker-clear" src="/close.svg" @click="clear" />
      </template>
    </Datepicker>
  </div>
  <div style="width: 20rem; margin-top: 1rem">
    Both
    <Datepicker v-model="date">
      <template #clear-icon="{ clear }">
        <img class="picker-clear" src="/close.svg" @click="clear" />
      </template>
      <template #dp-input="{ value }">
        <input class="picker" type="text" :value="value" readonly />
      </template>
    </Datepicker>
  </div>
</template>
<style>
.picker {
  outline: none !important;
  border-width: 1px;
  border-color: #00000061;
  width: 100%;
  height: 1rem;
  padding: 0.5rem;
  padding-left: 2.5rem;
  border-radius: 0.375rem;
  background: url("/calendar.svg") no-repeat scroll 4px 2px;
}
.picker::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  color: transparent;
  background: transparent;
}
.picker-calendar {
  height: 20px;
  width: auto;
  margin-left: 5px;
}
.picker-clear {
  height: 20px;
  width: auto;
  margin-right: 5px;
}
</style>
<script>
import { ref } from "vue";
// import Datepicker from "vue3-date-time-picker";
// import "vue3-date-time-picker/dist/main.css";

export default {
  name: "Demo",
  components: {
    Datepicker,
  },
  setup() {
    const date = ref();

    return {
      date,
    };
  },
};
</script>
