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
        <!-- Leave Table -->
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="serverItems"
              :items-per-page="itemsPerPage"
              class="elevation-1"
            >
              <template v-slot:item.teachers="{ item }">
                <v-chip-group>
                  <v-chip
                    v-for="teacher in item.teachers"
                    :key="teacher.id"
                    small
                  >
                    {{teacher}}
                  </v-chip>
                </v-chip-group>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn icon small class="my-delete-btn" @click="deleteItem(item)">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <!-- รายชื่อวิชา -->
            <div class="leaveblock0">
              <div class="leaveblock1">
                <div class="Leave-content-head mt-3">รายชื่อวิชา</div>
                <v-select
                  v-model="selectedSubjects"
                  :items="subjects"
                  :item-props="subjectsItemProps"
                  style="width: 100%"
                ></v-select>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <!-- อาจารย์ -->
            <div class="leaveblock0">
              <div class="leaveblock1">
                <div class="Leave-content-head mt-3">อาจารย์</div>
                <v-combobox
                  v-model="selectedTeachers"
                  :items="teachers"
                  :item-props="teachersItemProps"
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
          <v-col cols="12">
            <!-- รายชื่อวิชา -->
            <div class="leaveblock0">
              <div class="leaveblock1">
                <button class="leave-addBtn" @click="addItem">เพิ่ม</button>
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
import { useUserStore } from '@/stores/user'
import axios from 'axios'

export default {
  setup() {
    const toastStore = useToastStore()
    const userStore = useUserStore()
    return {
      toastStore,
      userStore
    }
  },
  data() {
    return {
      subjects: [],
      Teachers: [],
      leaveTypes: ['ลากิจ', 'ลาป่วย', 'อื่น ๆ'],
      user: [],
      testId: '',
      testStudentId: '',
      student: [],
      selectedSubjects: {},
      selectedSection: '',
      selectedTeachers: {},
      selectedDates: [],
      selectedTime: '',
      selectedLeaveType: '',
      attachment: null,
      description: '',
      teachers: [],
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
      },
      serverItems: [], // This will hold the table entries
      headers: [
        { text: 'Subject', value: 'subject' },
        { text: 'Teacher', value: 'teachers' },
        { text: 'Actions', value: 'actions', sortable: false },
        // ... other headers
      ]
    }
  },
  components: {
    Navbar,
    TopNavBar
    // Demo,
  },
  beforeCreate() {},
  mounted() {
    this.getStudentLogin()
    this.getSubjects()
  },
  watch: {
    selectedSubjects: {
      handler() {
        this.selectedTeachers = []
        // This code will run every time selectedSubjects changes
        this.getTeachers()
        // Reset selectedTeachers to an empty array whenever selectedSubjects changes
      },
      immediate: true
    }
  },
  methods: {
    deleteItem(item) {
      const index = this.serverItems.indexOf(item);
      if (index > -1) {
        this.serverItems.splice(index, 1);
      }
    },
    addItem() {
      console.log("addItemSubject", this.selectedSubjects)
      console.log("addItem"+this.selectedTeachers)
      // Assuming serverItems is an array of objects and each object is a row in your table.
      // You might need to adjust the object structure based on your headers.
      const newItem = {
        subject: this.selectedSubjects.name,
        teachers: this.selectedTeachers.map(teacher => `${teacher.prefix} ${teacher.fname} ${teacher.lname}`)
        // teacher: this.selectedTeachers.join(', ')
        // if multiple teachers are allowed
      //   teachers: this.selectedTeachers.map(teacher => 
      //   `${teacher.prefix} ${teacher.fname} ${teacher.lname}`
      // ),
      }
      this.serverItems.push(newItem)

      // Clear the inputs if necessary
      this.selectedSubjects = null
      this.selectedTeachers = []
    },

    teachersItemProps(item) {
      const name = item.fname + " " +item.lname
      return {
        title: name,
        subtitle: item.id
      }
    },
    subjectsItemProps(item) {
      return {
        title: item.name,
        subtitle: item.course_id
      }
    },
    async getStudentLogin() {
      this.userStore.initStore()
      this.user = this.userStore.user
      this.testId = this.userStore.user.id //user_id
      console.log('TestID: 275' + this.testId) //user_id = 5
      //user = 6 Pongsiri
      //who is login student from user_id = 6
      // console.log("277: "+ this.user[0])
      if (this.testId) {
        const url = `/student/?user_id=${this.testId}`
        await axios
          .get(url)
          .then((response) => {
            this.student = response.data[0]
            console.log('fname285:  ' + this.student.fname)
            console.log('IdStudent285:  ' + this.student.id)
            this.testStudentId = this.student.id // student_id = 1 Panisra
          })
          .catch((error) => {
            console.log('error', error)
          })
      } else {
        this.student = []
      }
    },

    async getSubjects() {
      const url = `/studentRegister/?student_id=${this.testStudentId}` //student_id = 1 Panisra
      // Fetch faculty data from your server API
      await axios
        .get(url)
        .then((response) => {
          // this.subjects = response.data
          this.subjects = response.data.map((course) => course.course_data)
          console.log(this.subjects)
        })
        .catch((error) => {
          // Handle errors here
          console.error('Error fetching subjects data:', error)
        })
    },

    async getTeachers() {
      console.log('selectSubject: ' + this.selectedSubjects)
      console.log('selectSubject: ' + this.selectedSubjects.id)

      // console.log("selectSubject: "+ this.selectedSubjects[0].id)

      console.log('selectSubject: ' + this.selectedSubjects.id)
      if (this.selectedSubjects && this.selectedSubjects.id) {
        const url = `/instructorCourse/?course_id=${this.selectedSubjects.id}`
        await axios
          .get(url)
          .then((response) => {
            // this.teachers = response.data
            // console.log("teacher:" + this.teachers[0])

            // หาก response.data เป็นอาร์เรย์ของข้อมูลคอร์ส, และแต่ละคอร์สมี `teacher_data`
            this.teachers = response.data.map((course) => course.teacher_data)
            console.log('TeachersGetTeacher:', this.teachers)
          })
          .catch((error) => {
            console.log('error', error)
          })
      } else {
        this.teachers = []
      }
    },

    submitForm() {
      // console.log('this.selectedTeachers: ')
      // console.log(this.selectedTeachers)
      console.log("Table items")
      console.log(this.serverItems)

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
#input-11,
#input-14 {
  display: none;
}
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
  border-top: solid 6px #02bc77;
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
  border: 0.125em solid #02bc77;
  border-radius: 0.9375em;
  box-sizing: border-box;
  color: #3b3b3b;
  cursor: pointer;
  display: inline-block;
  font-family:
    Roobert,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Helvetica,
    Arial,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol';
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
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
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
  background-color: #02bc77;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.Leave-submit:active {
  box-shadow: none;
  transform: translateY(0);
}
.leave-addBtn {
  --color: #00a97f;
  padding: 0.8em 1.7em;
  background-color: transparent;
  border-radius: 0.3em;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: 0.5s;
  font-weight: 400;
  font-size: 13px;
  border: 1px solid;
  font-family: inherit;
  text-transform: uppercase;
  color: var(--color);
  z-index: 1;
  margin: -3.5% 0% 0% 94.5%;
}

.leave-addBtn::before,
.button::after {
  content: '';
  display: block;
  width: 50px;
  height: 50px;
  transform: translate(-50%, -50%);
  position: absolute;
  border-radius: 50%;
  z-index: -1;
  background-color: var(--color);
  transition: 1s ease;
}

.leave-addBtn::before {
  top: -1em;
  left: -1em;
}

.leave-addBtn::after {
  left: calc(100% + 1em);
  top: calc(100% + 1em);
}

.leave-addBtn:hover::before,
.leave-addBtn:hover::after {
  height: 410px;
  width: 410px;
}

.leave-addBtn:hover {
  color: rgb(10, 25, 30);
}

.leave-addBtn:active {
  filter: brightness(0.8);
}
.my-delete-btn .v-btn__content {
    font-size: 16px; /* Adjust the size as needed */
  }

@media only screen and (max-width: 1440px) {
  .Leave-content-head.mt-3 {
    width: 12.1%;
    margin: 0%;
  }
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
