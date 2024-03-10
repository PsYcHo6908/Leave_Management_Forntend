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
          <div class="content-sub">{{ nameStudentLogin }}</div>
        </div>
        <div class="leaveblock2">
          <div class="content-head">รหัสนิสิต</div>
          <div class="content-sub">{{ userIdStudentLogin }}</div>
        </div>
        <!-- Leave Table -->
        <v-row v-if="serverItems && serverItems.length > 0">
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="serverItems"
              :items-per-page="itemsPerPage"
              class="elevation-1"
            >
              <template v-slot:item.coursesItem="{ item }">
                <!-- Debugging line: -->
                <!-- <div>Debug Subjects: {{ item.coursesItem }}</div> -->

                <v-chip-group v-if="item.coursesItem" >
                  <!-- Since item.coursesItem is an object, we don't use v-for -->
                  <v-chip small>
                    {{ item.coursesItem.name }}
                  </v-chip>
                </v-chip-group>
                <div v-else>No subjects to display</div>
              </template>
              <template v-slot:item.teachersItem="{ item }">
                <v-chip-group>
                  <v-chip
                    v-for="teacher in item.teachersItem"
                    :key="teacher.id"
                    small
                    :style="{ backgroundColor: item.coursesItem ? '#10B981' : '' , color: '#ffff'}"
                  
                  >
                    {{ teacher.prefix }} {{ teacher.fname }} {{ teacher.lname }}
                  </v-chip>
                </v-chip-group>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn
                  icon
                  small
                  class="my-delete-btn"
                  @click="deleteItem(item)"
                  :style="{ fontSize: '10px', padding: '1px 2px' }"
                >
                  <v-icon small color="red">mdi-close</v-icon>
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
        <!-- <v-row>
          <v-spacer></v-spacer>
        </v-row> -->
        <v-row justify="end">
          <v-col cols="12" md="8" lg="9" class="pa-md-2">
            <!-- ... -->
          </v-col>
          <v-col cols="12" md="4" lg="3" class="text-right pa-md-2" style="margin-top: -20px;">
            <button class="leave-addBtn mt--2" @click="addItem">เพิ่ม</button>
          </v-col>
        </v-row>

        <v-row style="margin-top: 45px;">
          <!-- ประเภทการลา -->
          <v-col cols="12" md="6">
            <div class="leaveblock0">
              <div class="leaveblock1">
                <div class="Leave-content-head mt-3">ประเภทการลา</div>
                <v-select
                  v-model="selectedLeaveType"
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
          <!-- วันที่ // description row -->
          <v-col cols="12" md="6">
            <div class="leaveblock0">
              <div class="content-head mr-3 mb-3.5">คำอธิบาย</div>
              <div class="leaveblock1">
                <v-textarea
                  class="custom-textarea"
                  rows="4"
                  placeholder="กรุณาป้อนคำอธิบายที่นี่"
                  style="width: 100%"
                  v-model="formDataLeaveRequest.description"
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
          <!-- error row -->
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
            <button class="leave-addBtn" @click="submitForm">ส่ง</button>
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
      // Option
      leaveTypes: ['ลากิจ', 'ลาป่วย', 'อื่น ๆ'],

      // getStudentLogin
      testId: '',
      testStudentId: '',
      student: [],
      user: [],
      nameStudentLogin: "",
      userIdStudentLogin: "",
      // getSubject
      subjects: [],
      // getTechers
      teachers: [],

      // Input
      selectedTeachers: {},
      selectedSubjects: {},
      selectedDates: [],
      selectedLeaveType: '',
      files: [],

      // playload
      errors: [],
      formDataLeaveRequest: {
        approve_id_by: "",
        start_date: "",
        end_date: "",
        leave_type: "",
        description: "",
        status: "pending",

      },
      leaveRequestId: "",
      formDataLeaveDetails: {
        leave_request_id: "",
        student_id: "",
        course_id: "",
        teacher_id: "",

      },

      // app table
      serverItems: [], // This will hold the table entries
      headers: [
        { text: 'Subject', value: 'coursesItem' },
        { text: 'Teacher', value: 'teachersItem' },
        { text: 'Actions', value: 'actions', sortable: false }
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
      const index = this.serverItems.indexOf(item)
      if (index > -1) {
        this.serverItems.splice(index, 1)
      }
    },
    addItem() {
      // Check if a subject is selected
      if (!this.selectedSubjects || !this.selectedSubjects.id) {
        console.log('No subject selected, item not added.');
        // Optionally, show a user-facing error message here.
        return;
      }

      // Check if any teachers are selected
      if (!this.selectedTeachers || this.selectedTeachers.length === 0) {
        console.log('No teacher selected, item not added.');
        // Optionally, show a user-facing error message here.
        return;
      }

      // Check if the selected subject is already in the serverItems array.
      const isSubjectExists = this.serverItems.some(item =>
        item.coursesItem && item.coursesItem.id === this.selectedSubjects.id
      );

      // If the subject is already present, do not add it again.
      if (isSubjectExists) {
        console.log('This subject is already in the table.');
        // Optionally show a user-facing message or toast notification here.
        return;
      }

      // If the subject is not already present and at least one teacher is selected, add it to the serverItems.
      const newItem = {
        coursesItem: this.selectedSubjects,
        teachersItem: this.selectedTeachers
      };
      this.serverItems.push(newItem);
      console.log('New item added:', newItem);

      // Clear the inputs if necessary.
      this.selectedSubjects = {};
      this.selectedTeachers = [];
    },


    teachersItemProps(item) {
      const name = item.fname + ' ' + item.lname
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
      // console.log('TestID: 275' + this.testId) 
      //user_id = 5
      //user = 6 Pongsiri
      //who is login student from user_id = 6
      // console.log("277: "+ this.user[0])
      if (this.testId) {
        const url = `/student/?user_id=${this.testId}`
        await axios
          .get(url)
          .then((response) => {
            this.student = response.data[0]
            // console.log('fname285:  ' + this.student.fname)
            // console.log('IdStudent285:  ' + this.student.id)
            this.testStudentId = this.student.id // student_id = 1 Panisra
            this.nameStudentLogin = this.student.fname + " " + this.student.lname
            this.userIdStudentLogin = this.userStore.user.user_id
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
          this.subjects = response.data.map((item) => item.course_data)
          console.log('GetSubject' + this.subjects)
        })
        .catch((error) => {
          // Handle errors here
          console.error('Error fetching subjects data:', error)
        })
    },

    async getTeachers() {
      // console.log('selectSubject: ' + this.selectedSubjects)
      // console.log('selectSubject: ' + this.selectedSubjects.id)

      // console.log("selectSubject: "+ this.selectedSubjects[0].id)

      // console.log('selectSubject: ' + this.selectedSubjects.id)
      if (this.selectedSubjects && this.selectedSubjects.id) {
        const url = `/instructorCourse/?course_id=${this.selectedSubjects.id}`
        await axios
          .get(url)
          .then((response) => {
            // this.teachers = response.data
            // console.log("teacher:" + this.teachers[0])

            // หาก response.data เป็นอาร์เรย์ของข้อมูลคอร์ส, และแต่ละคอร์สมี `teacher_data`
            this.teachers = response.data.map((item) => item.teacher_data)
            // console.log('TeachersGetTeacher:', this.teachers)
          })
          .catch((error) => {
            console.log('error', error)
          })
      } else {
        this.teachers = []
      }
    },

    async submitForm() {
      this.errors = []
      // console.log('Form submitted')
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
      // console.log('First Date (formatted):', firstDate)
      // console.log('Last Date (formatted):', lastDate)

      // Prepare PlayLoad: ( approve_id_by
      //  file_id, start_date, end_date, leave_type, description, status)


      console.log("Preparing PlayLoad")
      if (firstDate !== "NaN-NaN-NaN") {
        this.formDataLeaveRequest.start_date = firstDate
        this.formDataLeaveRequest.end_date = lastDate
        this.formDataLeaveRequest.leave_type = this.selectedLeaveType 
        console.log(this.formDataLeaveRequest)

        await axios
          .post('/leaveRequest/', this.formDataLeaveRequest)
          .then((response) => {
            console.log("response: ")
            console.log(response.data)
            // const leaveRequestId = response.data.leaveRequest_id
            this.leaveRequestId = response.data.leaveRequest_id
            if (this.leaveRequestId){
              console.log("leaveRequestId: " + this.leaveRequestId)
              this.formDataLeaveDetails.leave_request_id = this.leaveRequestId
              this.formDataLeaveDetails.student_id = this.testStudentId
              //dofunction
              this.addLeaveRequestDetail()
              // Clear Data here
              

            }

          })
          .catch((error) => {
            // if doesnt save LeaveRequest
            console.log('error', error)
          })
        
        
        //create LeaveRequest
 
        // console.log('this.selectedTeachers: ')
        // console.log(this.selectedTeachers)

        // console.log('Table items')
        // this.serverItems.forEach((item, index) => {
        //   // console.log(item);
        //   if (item && item.coursesItem && item.teachersItem) {  // ตรวจสอบทั้งสองค่า
        //     let courseId = item.coursesItem.course_id; //01418332
        //     let couseOfId = item.coursesItem.id; //1 2 3
        //     let teachersId = item.teachersItem.map(teacher => teacher.id);  // สมมติว่า teachersItem เป็นอาร์เรย์
        //     // console.log(courseId);
        //     // console.log(teachersId);  // แสดงอาร์เรย์ของ ids ex [2, 4]
        //     teachersId.forEach((id) => {
        //       console.log("Item Row")
        //       console.log("course id: " + courseId);
        //       console.log("Id of Course: " + couseOfId); 
        //       console.log("Id of Teacher: " + id);  //index0=2, index1=4

        //     });
        //   } else {
        //     console.log('this.item or this.item.coursesItem or this.item.teachersItem is undefined');
        //   }
        // });

      } else{
        this.errors.push('Please select dates')

      }
    },
    async addLeaveRequestDetail() {
      console.log('Table items');
      for (const item of this.serverItems) {
        if (item && item.coursesItem && item.teachersItem) {
          let courseId = item.coursesItem.course_id;
          let couseOfId = item.coursesItem.id;
          let teachersId = item.teachersItem.map(teacher => teacher.id);

          for (const id of teachersId) {
            console.log("Item Row");
            console.log("course id: " + courseId);
            console.log("Id of Course: " + couseOfId);
            console.log("Id of Teacher: " + id);
            this.formDataLeaveDetails.teacher_id = id
            this.formDataLeaveDetails.course_id = couseOfId

            // const response = await axios.get(url);
            await axios
              .post('/leaveDetail/', this.formDataLeaveDetails)
              .then((response) => {
                console.log("Leave details")
                console.log(response.data)

              })
              .catch((error) => {
                console.log('error', error)
              })
          }
        } else {
          console.log('this.item or this.item.coursesItem or this.item.teachersItem is undefined');
        }
      }
    }


  }
}
</script>

<style>
/* ลบสีเทาข้างใน v-combobox */
.v-combobox input {
  background-color: transparent !important;
  border: none !important;
}
/* ลบสีเทาข้างใน v-combobox */
.v-combobox:not(.v-input--is-disabled) .v-input__control {
  background-color: transparent !important;
  border: none !important;
}
#input-11,
#input-14,
#input-63 {
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
#input-8,
#input-21 {
  margin: 0% 0% !important;
}
#input-63 {
  display: none;
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
}

.leave-addBtn::before,
.leave-addBtn::after {
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
  background-color: transparent;
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
  background-color: var(--color); /* กำหนดสีเมื่อ hover */
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
.v-data-table-footer {
  display: none !important;
}
th.v-data-table__td.v-data-table-column--align-start.v-data-table__th {
  display: none !important;
}
button.v-btn.v-btn--elevated.v-btn--icon.v-theme--light.v-btn--density-default.v-btn--size-default.v-btn--variant-elevated.my-delete-btn {
    display: flex;
    justify-content: center;
    align-items: center;
}
/* span.v-chip.v-chip--link.v-theme--light.v-chip--density-default.v-chip--size-default.v-chip--variant-tonal.custom-cursor-on-hover {
    background-color: #10B981;
    color: white;
} */
/* Below for ADD Button */
.v-input__details {
  padding-top: 0px;
}
#input-8-messages {
  display: none;
}
.v-col-md-8 v-col-lg-9 v-col-12 pa-md-2 {
  padding: 0%;
}

@media only screen and (max-width: 1440px) {
  .Leave-content-head.mt-3 {
    width: 17%;
    margin: 0%;
  }
  .v-input__prepend {
    margin-left: -25% !important;
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
