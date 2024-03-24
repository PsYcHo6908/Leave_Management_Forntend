<template>
  <div class="layout-container">
    <Navbar />

    <div class="right-section">
      <TopNavBar />
      <div class="content-Page">
        <slot></slot>
        <div class="head">รายงานสรุปผลการลา</div>
      </div>
      <div class="content">
        <div class="layout-summeryReport">
          <div class="head-summeryReport1">รายชื่อวิชา</div>
          <div class="head-summeryReport1">หมู่เรียน</div>
          <div class="head-summeryReport1">ประเภทการลา</div>
          <div class="head-summeryReport1">ทั้งหมด</div>
          <div class="head-summeryReport1">อนุมัติ</div>
          <div class="head-summeryReport1">ไม่อนุมัติ</div>
        </div>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel
            v-for="i in 3"
            :key="i"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            title="วิชา"
          ></v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<!-- ... rest of the component ... -->

<script>
import Navbar from '../../components/navbar.vue'
import TopNavBar from '../../components/TopNavBar.vue'
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
      nameStudentLogin: '',
      userIdStudentLogin: '',
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
        approve_id_by: '',
        start_date: '',
        end_date: '',
        leave_type: '',
        description: '',
        status: 'pending'
      },
      leaveRequestId: '',
      formDataLeaveDetails: {
        leave_request_id: '',
        student_id: '',
        course_id: '',
        teacher_id: ''
      },

      // app table
      serverItems: [], // This will hold the table entries
      headers: [
        { text: 'Subject', value: 'coursesItem' },
        { text: 'Teacher', value: 'teachersItem' },
        { text: 'Actions', value: 'actions', sortable: false }
        // ... other headers
      ],

      // file
      files: [],
      upload_status: '',
      filename: ''
    }
  },
  components: {
    Navbar,
    TopNavBar
    // Demo,
  },
  beforeCreate() {},
  async mounted() {
    await this.getStudentLogin()
    await this.getSubjects()
  },
  created() {
    // console.log('DOM Created')
    // this.getFile()
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
        console.log('No subject selected, item not added.')
        // Optionally, show a user-facing error message here.
        return
      }

      // Check if any teachers are selected
      if (!this.selectedTeachers || this.selectedTeachers.length === 0) {
        console.log('No teacher selected, item not added.')
        // Optionally, show a user-facing error message here.
        return
      }

      // Check if the selected subject is already in the serverItems array.
      const isSubjectExists = this.serverItems.some(
        (item) =>
          item.coursesItem && item.coursesItem.id === this.selectedSubjects.id
      )

      // If the subject is already present, do not add it again.
      if (isSubjectExists) {
        console.log('This subject is already in the table.')
        // Optionally show a user-facing message or toast notification here.
        return
      }

      // If the subject is not already present and at least one teacher is selected, add it to the serverItems.
      const newItem = {
        coursesItem: this.selectedSubjects,
        teachersItem: this.selectedTeachers
      }
      this.serverItems.push(newItem)
      console.log('New item added:', newItem)

      // Clear the inputs if necessary.
      this.selectedSubjects = {}
      this.selectedTeachers = []
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
            this.nameStudentLogin =
              this.student.fname + ' ' + this.student.lname
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
      if (!this.testStudentId) {
        console.error('Missing student ID')
        // return
      }

      const url = `/studentRegister/?student_id=${this.student.id}`

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

      console.log('Preparing PlayLoad')
      if (firstDate !== 'NaN-NaN-NaN') {
        this.formDataLeaveRequest.start_date = firstDate
        this.formDataLeaveRequest.end_date = lastDate
        this.formDataLeaveRequest.leave_type = this.selectedLeaveType
        console.log(this.formDataLeaveRequest)
        const { value: confirmed } = await this.$swal.fire({
          title: 'บันทึกสำเร็จ',
          text: 'ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว',
          icon: 'success',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#02bc77'
        })

        await axios
          .post('/leaveRequest/', this.formDataLeaveRequest)
          .then((response) => {
            console.log('response: ')
            console.log(response.data)
            // const leaveRequestId = response.data.leaveRequest_id
            this.leaveRequestId = response.data.leaveRequest_id
            if (this.leaveRequestId) {
              console.log('leaveRequestId: ' + this.leaveRequestId)
              this.formDataLeaveDetails.leave_request_id = this.leaveRequestId
              this.formDataLeaveDetails.student_id = this.testStudentId
              //save Detail
              this.addLeaveRequestDetail()
              //save File
              this.saveFile()
              // Clear Data here
              this.selectedLeaveType = ''
              this.files = ''
              this.formDataLeaveRequest.description = ''
              this.selectedDates = []
              this.serverItems = []
              console.log('Requests cancelled successfully:', response.data)
              // แสดงข้อความเมื่อลบสำเร็จ
              // alert('บันทึกสำเร็จ');
              // แสดงข้อความเมื่อลบสำเร็จ
            }
          })
          .catch((error) => {
            // if doesnt save LeaveRequest
            console.log('error', error)
            this.$swal.fire(
              'เกิดข้อผิดพลาด',
              'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
              'error'
            )
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
      } else {
        this.errors.push('Please select dates')
      }
    },
    async addLeaveRequestDetail() {
      console.log('Table items')
      for (const item of this.serverItems) {
        if (item && item.coursesItem && item.teachersItem) {
          let courseId = item.coursesItem.course_id
          let couseOfId = item.coursesItem.id
          let teachersId = item.teachersItem.map((teacher) => teacher.id)

          for (const id of teachersId) {
            console.log('Item Row')
            console.log('course id: ' + courseId)
            console.log('Id of Course: ' + couseOfId)
            console.log('Id of Teacher: ' + id)
            this.formDataLeaveDetails.teacher_id = id
            this.formDataLeaveDetails.course_id = couseOfId

            // const response = await axios.get(url);
            await axios
              .post('/leaveDetail/', this.formDataLeaveDetails)
              .then((response) => {
                console.log('Leave details')
                console.log(response.data)
              })
              .catch((error) => {
                console.log('error', error)
              })
          }
        } else {
          console.log(
            'this.item or this.item.coursesItem or this.item.teachersItem is undefined'
          )
        }
      }
    },
    // File method
    async saveFile() {
      let formData = new FormData()
      formData.append('pdf', this.filename)
      formData.append('leave_request_id', this.leaveRequestId)

      let axiosConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      await axios
        .post('/files/', formData, axiosConfig)
        .then((response) => {
          console.log(response)
          this.upload_status = 'File Upload Success'
        })
        .catch((error) => {
          console.log(error)
        })
    },
    uploadedFile() {
      // Clear previous filename
      this.filename = ''
      // Set new filename
      this.filename = this.$refs.file.files[0]
      console.log(this.filename)
    }
  }
}
</script>

<style>
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
.layout-summeryReport {
    width: 100%;
    display: flex;
    gap: 10%;
    margin-bottom: 0.5%;
    border-bottom: solid 1px gray;
}
.head-summeryReport1 {
    margin-bottom: 3%;
    font-weight: 600;
    font-size: 18px;
}
</style>
