<template>
  <div class="layout-container">
    <Navbar />

    <div class="right-section">
      <TopNavBar />
      <div class="content px-8 py-6">
        <slot></slot>

        <div class="head">แจ้งลา</div>
      </div>
      <div class="content">
        <slot></slot>
        <div class="leaveblock1">
          <div class="content-head">ชื่อ</div>
          <div class="content-name">พงศ์ศิริ เจริญกฤตยาวุฒิ</div>
        </div>
        <div class="leaveblock1">
          <div class="content-head">รหัสนิสิต</div>
          <div class="content-id">6310451286</div>
        </div>
        <div class="leaveblock0">
          <div class="leaveblock1">
            <div class="content-head">รายชื่อวิชา</div>
            <v-select :items="subjects" label=""></v-select>
          </div>
          <div class="leaveblock2">
            <div class="content-head">หมู่เรียน</div>
            <v-select :items="section" label=""></v-select>
          </div>
        </div>
        <div class="leaveblock0">
          <div class="leaveblock1">
            <div class="content-head">วันที่</div>
            <v-select :items="subjects" label=""></v-select>
          </div>
          <div class="leaveblock2">
            <div class="content-head">เวลา</div>
            <v-select :items="section" label=""></v-select>
          </div>
        </div>
        <div class="leaveblock0">
          <div class="leaveblock1">
            <div class="content-head">ประเภทการลา</div>
            <v-select :items="leave" label=""></v-select>
          </div>
          <div class="leaveblock2">
            <div class="content-head">หลักฐานการลา</div>
            <button class="attach">Browse...</button>
          </div>
        </div>
        <div class="leaveblock1">
          <div class="content-head">คำอธิบาย</div>
          <v-text-field
            label="Underlined"
            placeholder="Placeholder"
          ></v-text-field>
        </div>
      </div>
      <button class="submit">ส่ง</button>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/navbar.vue'
import TopNavBar from '../components/TopNavBar.vue'
export default {
  data: () => ({
    subjects: ['วิชา1', 'วิชา2', 'วิชา3', 'วิชา4'],
    section: ['1', '2', '3', '4'],
    leave: ['ลากิจ', 'ลาป่วย', 'อื่น ๆ']
  }),
  components: {
    Navbar,
    TopNavBar
  }
}
</script>
<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Athiti', 'Avenir', 'Helvetica', 'Arial', 'sans-serif';
  height: 100vh;
}

.layout-container {
  display: flex;
}

.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.content {
  padding: 20px; /* Adjust as needed */
  flex: 1;
}
.head {
  font-size: 26px;
  font-family: 'Prompt';
  font-weight: 600;
  margin-left: 5%;
}
.leaveblock0 {
  display: flex;
}
.leaveblock1 {
  display: flex;
  gap: 5%;
  margin-bottom: 1.5%;
  width: 50%;
}
.leaveblock2 {
  display: flex;
  gap: 5%;
  margin-bottom: 1.5%;
  width: 50%;
  margin-left: -25%;
}
.v-input__control {
  width: 35% !important;
}
.attach {
    border: solid 1px #02bc77;
    padding: 1% 2%;
}
</style>
