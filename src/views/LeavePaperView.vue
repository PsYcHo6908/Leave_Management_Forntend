<template>
  <div class="layout-container">
    <Navbar />

    <div class="right-section">
      <TopNavBar />
      <div class="content-Page">
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
            <v-select :items="subjects"></v-select>
          </div>
          <div class="leaveblock2">
            <div class="content-head">หมู่เรียน</div>
            <v-select :items="section"></v-select>
          </div>
        </div>
        <div class="leaveblock0">
          <div class="leaveblock1">
            <div class="content-head">วันที่</div>
            <v-select :items="subjects"></v-select>
          </div>
          <div class="leaveblock2">
            <div class="content-head">เวลา</div>
            <sele :items="section"></sele>
          </div>
        </div>
        <div class="leaveblock0">
          <div class="leaveblock1">
            <div class="content-head">ประเภทการลา</div>
            <v-select :items="leave"></v-select>
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
@media screen and (min-width: 1900px) {
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
    padding: 20px;
    flex: 1;
    border-top: solid 15px #03A96B;
    border-radius: 15px;
  }
  .head {
    font-size: 30px;
    font-family: 'Prompt';
    font-weight: 600;
    margin-left: 2%;
    padding: 2% 0%;
  }
  .leaveblock0 {
    display: flex;
  }
  .leaveblock1 {
    display: flex;
    gap: 5%;
    margin-bottom: 1.5%;
    width: 50%;
    font-size: 24px;
    font-family: 'Prompt';
  }
  .leaveblock2 {
    display: flex;
    gap: 5%;
    margin-bottom: 1.5%;
    width: 50%;
    margin-left: -25%;
    font-size: 24px;
    font-family: 'Prompt';
  }
  .content-head {
    font-weight: 600;
  }
  .v-input__control {
    width: 35% !important;
  }
  .attach {
    border: solid 1px #02bc77;
    padding: 1% 2%;
  }
  .py-10 {
    width: 113%;
}
}
</style>
