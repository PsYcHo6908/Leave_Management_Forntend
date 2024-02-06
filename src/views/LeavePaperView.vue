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
          <div class="content-sub">พงศ์ศิริ เจริญกฤตยาวุฒิ</div>
        </div>
        <div class="leaveblock2">
          <div class="content-head">รหัสนิสิต</div>
          <div class="content-sub">6310451286</div>
        </div>
        <v-row>
          <v-col cols="12" md="6">
            <!-- ส่วนของอาจารย์ -->
            <div class="leaveblock0">
              <div class="leaveblock1">
                <div class="Leave-content-head mt-3">อาจารย์</div>
                <v-select
                  v-model="newDropdownValue"
                  :items="Teachers"
                  style="width: 100%"
                ></v-select>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <!-- ส่วนของรายชื่อวิชา -->
            <div class="leaveblock0">
              <div class="leaveblock1">
                <div class="Leave-content-head mt-3">รายชื่อวิชา</div>
                <v-combobox
                  v-model="selectedSubjects"
                  :items="subjects"
                  multiple
                  chips
                  outlined
                  @keydown.prevent
                  @click.right.prevent
                  @click.middle.prevent
                  class="no-placeholder"
                ></v-combobox>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <!-- ประเภทการลา -->
          <v-col cols="12" md="6">
            <div class="leaveblock0">
              <div class="leaveblock1">
                <div class="Leave-content-head mt-3">ประเภทการลา</div>
                <v-select
                  v-model="leaveTypesValue"
                  :items="leaveTypes"
                  style="width: 100%"
                ></v-select>
              </div>
            </div>
          </v-col>
          <!-- หลักฐานการลา -->
          <v-col cols="12" md="6">
            <div class="leaveblock0">
              <div class="leaveblock2">
                <div class="Leave-content-head mt-3">หลักฐานการลา</div>
                <v-file-input
                  v-model="files"
                  placeholder="Upload your documents"
                  label="File input"
                  multiple
                >
                  <!-- <v-file-input
                  v-model="files"
                  placeholder="Upload your documents"
                  label="File input"
                  multiple
                  prepend-icon="mdi-paperclip"
                > -->
                  <template v-slot:selection="{ fileNames }">
                    <template v-for="fileName in fileNames" :key="fileName">
                      <v-chip size="small" label color="primary" class="me-2">
                        {{ fileName }}
                      </v-chip>
                    </template>
                  </template>
                </v-file-input>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <!-- วันที่ -->
          <v-col cols="12" md="6">
            <div class="leaveblock0">
              <div class="content-head mr-3 mb-3.5">คำอธิบาย</div>
              <div class="leaveblock1">
                <v-textarea
                  class="custom-textarea"
                  rows="4"
                  placeholder="กรุณาป้อนคำอธิบายที่นี่"
                  style="width: 100%"
                ></v-textarea>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-date-picker
              v-model="selectedDates"
              range
              multiple
              show-current
              locale="th"
              no-title
              style="margin: 0% 0% 0% 11%"
            ></v-date-picker>
          </v-col>

          <!-- <Demo /> -->
          <!-- <div class="leaveblock1">
              <form action="/action_page.php">
                <label for="appt">Select a time:</label>
                <input type="time" id="appt" name="appt" />
                <input type="submit" />
              </form>
            </div> -->

          <!-- </v-col> -->
        </v-row>

        <v-row>
          <!-- description row -->
          <v-col cols="12">
            <template v-if="errors.length > 0">
              <div class="bg-red-300 text-white rounded-lg p-6" cols="12">
                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
              </div>
            </template>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col cols="12">
            <template v-if="errors.length > 0">
              <div class="bg-red-300 text-white rounded-lg p-6 " cols="12">
                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
              </div>
            </template>
          </v-col>
        </v-row> -->
        <!-- Other input fields -->
        <v-row>
          <v-col cols="12" md="6">
            <button class="Leave-submit" @click="submitForm">ส่ง</button>
            <!-- <v-btn class="submit" @click="submitForm" style="">ส่ง</v-btn> -->
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<!-- ... rest of the component ... -->

<script>
import Navbar from '../components/navbar.vue'
import TopNavBar from '../components/TopNavBar.vue'
// import Demo from "../../components/Demo.vue";
import {
  formatDate,
  sortSelectedDates,
  validateConsecutiveDates,
  validateSelectedDates
} from '@/core/utils'
import { useToastStore } from '@/stores/toast'

export default {
  setup() {
    const toastStore = useToastStore()
    return {
      toastStore
    }
  },
  data() {
    return {
      subjects: ['Subject 1', 'Subject 2', 'Subject 3'],
      Teachers: [],
      leaveTypes: ['ลากิจ', 'ลาป่วย', 'อื่น ๆ'],
      studentId: '',
      selectedSubjects: [],
      selectedSection: '',
      selectedDates: [],
      selectedTime: '',
      selectedLeaveType: '',
      attachment: null,
      description: '',
      additionalInput: '',
      newDropdownValue: '',
      leaveTypesValue: '',
      files: [],
      errors: [],
      formData: {
        username: '',
        user_id: '',
        password1: '',
        password2: '',
        fname: '',
        lname: '',
        email: '',
        role: '',
        prefix: ''
      }
    }
  },
  components: {
    Navbar,
    TopNavBar
    // Demo,
  },
  methods: {
    submitForm() {
      this.errors = []
      // console.log('Form submitted')
      // console.log('Student ID:', this.studentId)
      // console.log('New Dropdown Value:', this.newDropdownValue)
      // console.log('Additional Input:', this.additionalInput)
      // console.log('files:', this.files)
      console.log('days', this.selectedDates)

      // เรียงลำดับวันที่ใน selectedDates
      this.selectedDates = sortSelectedDates(this.selectedDates)

      //ถ้าเลือกวันไม่เรียงต่อกัน
      if (!validateConsecutiveDates(this.selectedDates)) {
        this.errors.push('Please select consecutive dates only.')
        console.log('Please select consecutive dates only.')
        return
      }
      // If selected dates are not after the current date
      if (!validateSelectedDates(this.selectedDates)) {
        this.errors.push('Please select dates from today onwards.')
        console.log('Please select dates from today onwards.')
        return
      }

      const firstDate = formatDate(new Date(this.selectedDates[0]))
      const lastDate = formatDate(
        new Date(this.selectedDates[this.selectedDates.length - 1])
      )
      console.log('First Date (formatted):', firstDate)
      console.log('Last Date (formatted):', lastDate)
    }
  }
}
</script>

<style>
.custom-input {
  background-color: rgba(117, 117, 117, 0.3);
  border: none; /* ลบเส้นขอบทั้งหมด */
  height: 100%;
  width: 100%;
  border-bottom: 1px solid #908e8e; /* กำหนดเฉพาะขอบล่าง */
  color: black;
}

.custom-input:hover {
  border-bottom: 1px solid #000; /* ขอบล่างเปลี่ยนเมื่อ hover */
}

.custom-input:focus {
  outline: none; /* ลบเส้นขอบเมื่อโฟกัส ที่บางเบราว์เซอร์อาจเพิ่มให้ */
  border-bottom: 2px solid #000; /* ขอบล่างเปลี่ยนเมื่อโฟกัส */
}
.custom-input::placeholder {
  color: #000; /* เปลี่ยนสีของ placeholder */
  opacity: 1; /* บางเบราว์เซอร์อาจตั้งค่าความเข้มของสีให้ต่ำ สามารถปรับได้ที่นี่ */
}
.content {
  border-top: solid 6px #02BC77;
  border-radius: 5px;
}
.head {
  font-size: 28px;
  font-weight: 600;
  margin: 0% 2.5%;
  padding: 1% 0% 2% 0%;
}
.leaveblock1 {
  display: flex;
  padding: 0% 0% 0.5% 0%;
}
.leaveblock2 {
  display: flex;
  padding: 0% 0% 2.5% 0%;
}
.content-sub {
  margin: 0% 0% 0% 1.5%;
}
.Leave-content-head.mt-3 {
  margin: 0% 2% 0% 0%;
  width: 12%;
}
#input-8 {
  margin: 0% 0% !important;
}
#input-63 {
  display: none;
}
.Leave-submit {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    border: 0.125em solid #02BC77;
    border-radius: 0.9375em;
    box-sizing: border-box;
    color: #3B3B3B;
    cursor: pointer;
    display: inline-block;
    font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 0;
    /* min-height: 3.75em; */
    min-width: 0;
    outline: none;
    padding: 1.3% 4%;
    text-align: center;
    text-decoration: none;
    transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
    -moz-user-select: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    will-change: transform;
}

.Leave-submit:disabled {
 pointer-events: none;
}

.Leave-submit:hover {
 color: #fff;
 background-color: #02BC77;
 box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
 transform: translateY(-2px);
}

.Leave-submit:active {
 box-shadow: none;
 transform: translateY(0);
}
@media only screen and (min-width: 600px) {
  .custom-input {
    background-color: rgba(117, 117, 117, 0.3);
    border: none; /* ลบเส้นขอบทั้งหมด */
    height: 10vh;
    width: 100%;
    border-bottom: 1px solid #908e8e; /* กำหนดเฉพาะขอบล่าง */
    color: black;
  }
}
</style>
