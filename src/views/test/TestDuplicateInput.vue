<template>
  <div>
    <!-- แสดง input ที่ผูกกับข้อมูลใน inputs array -->
    <v-row v-for="(input, index) in inputs" :key="index">
      <v-col cols="12">
        <v-text-field v-model="input.value" label="Input" outlined></v-text-field>
      </v-col>
    </v-row>
    
    <!-- ปุ่มเพิ่ม input -->
    <v-btn @click="addInput">เพิ่ม Input</v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputs: [] // รายการ input
    };
  },
  methods: {
    // เมื่อกดปุ่มเพิ่ม input
    addInput() {
      this.inputs.push({ value: '' }); // เพิ่ม input ใหม่ลงในรายการ
    }
  }
};
</script>
