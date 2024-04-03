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
        <!-- Search fields in a single row -->
        <v-row>
          <v-col cols="12" md="3"></v-col>
          <v-col cols="12" md="3"></v-col>
          <v-col cols="12" md="3">
            <!-- Fourth search field -->
            <div class="field-container">
              <div class="label-input-pair">
                <select v-model="selectedSubject">
                  <option value="" disabled selected>-- วิชา --</option>
                  <option value="" >ทั้งหมด</option>
                  <option v-for="item in subjects" :value="item.course_data.name" :key="item.id">{{ item.course_data.name }}</option>
                </select>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="2">
            <!-- Fifth search field for section -->
            <div class="field-container">
              <div class="label-input-pair">
                <input type="text" placeholder="หมู่เรียน" v-model="sectionSearch" />
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="1">
            <v-btn
              
              color="white"
              variant="tonal"
              :style="{ backgroundColor: '#10b981' }"
              @click="findBysection(this.sectionSearch)"
            >
              ค้นหา
            </v-btn>
          </v-col>
        </v-row>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel v-for="(summary, index) in leaveRequests" :key="index" :title="`${summary.course_name} - (sec: ${summary.section})`">
            <!-- <template v-slot:header>
              <div> {{ item.course_name }} </div>
            </template> -->
            <v-expansion-panel-content>
              <v-expansion-panel-text>
                <table>
                  <thead>
                    <tr>
                      <!-- <th>วิชา</th> -->
                      <!-- <th>หมู่เรียน</th> -->
                      <th>ประเภทการลา</th>
                      <th>ทั้งหมด</th>
                      <th>อนุมัติ</th>
                      <th>ไม่อนุมัติ</th>
                      <th>รอดำเนินการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- ลาป่วย -->
                    <tr>
                      <!-- <td>{{ summary.course_name }}</td> -->
                      <!-- <td>{{ summary.section }}</td> -->
                      <td>ลาป่วย</td>
                      <td>{{ summary.totalSick }}</td>
                      <td>{{ summary.approveSick }}</td>
                      <td>{{ summary.rejectSick }}</td>
                      <td>{{ summary.pendingSick }}</td>
                    </tr>
                    <!-- ลากิจ -->
                    <tr>
                      <!-- <td>{{ summary.course_name }}</td> -->
                      <!-- <td>{{ summary.section }}</td> -->
                      <td>ลากิจ</td>
                      <td>{{ summary.totalBusiness }}</td>
                      <td>{{ summary.approveBusiness }}</td>
                      <td>{{ summary.rejectBusiness }}</td>
                      <td>{{ summary.pendingBusiness }}</td>
                    </tr>
                    <!-- อื่นๆ -->
                    <tr>
                      <!-- <td>{{ summary.course_name }}</td> -->
                      <!-- <td>{{ summary.section }}</td> -->
                      <td>อื่นๆ</td>
                      <td>{{ summary.totalOther }}</td>
                      <td>{{ summary.approveOther }}</td>
                      <td>{{ summary.rejectOther }}</td>
                      <td>{{ summary.pendingOther }}</td>
                    </tr>
                  </tbody>
                </table>
            </v-expansion-panel-text>
            </v-expansion-panel-content>
          </v-expansion-panel>
      </v-expansion-panels>


      </div>
    </div>
  </div>
</template>

<!-- ... rest of the component ... -->

<script>
import Navbar from '../../components/navbar.vue'
import TopNavBar from '../../components/TopNavBar.vue'
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


      // getTeacherLogin
      testId: '',
      testeacherId: '',
      teacher: [],
      user: [],
      sectionSearch: '',
      selectedSubject: '',

      // leave Detail
      leaveRequests: [],

      // fetchInstructorCourse
      subjects: [],



    }
  },
  components: {
    Navbar,
    TopNavBar
    // Demo,
  },
  beforeCreate() {},
  async mounted() {
    await this.fetchLeaveRequests()
    await this.fetchInstructorCourse()
  },
  created() {

  },
  watch: {
     sectionSearch: {
      async handler() {
        if (this.sectionSearch=== "") {
          await this.fetchLeaveRequests()
        }
        // Reset selectedTeachers to an empty array whenever selectedSubjects changes
      },
      immediate: true
    }
  },
  methods: {
    async getTeacherLogin() {
      this.userStore.initStore()
      this.user = this.userStore.user
      this.testId = this.userStore.user.id //user_id
      // console.log('TestID: 275' + this.testId)
      //user_id = 5
      //user = 6 Pongsiri
      //who is login student from user_id = 6
      // console.log("277: "+ this.user[0])
      if (this.testId) {
        const url = `/teacher/?user_id=${this.testId}`
        await axios
          .get(url)
          .then((response) => {
            this.teacher = response.data[0]
            // console.log('fname285:  ' + this.student.fname)
            // console.log('IdStudent285:  ' + this.student.id)
            this.testeacherId = this.teacher.id // student_id = 1 Panisra
            // this.nameStudentLogin = this.student.fname + " " + this.student.lname
            // this.userIdStudentLogin = this.userStore.user.user_id
          })
          .catch((error) => {
            console.log('error', error)
          })
      } else {
        this.student = []
      }
    },
    async fetchInstructorCourse() {
      this.loading = true // เริ่มต้นการโหลด
      await this.getTeacherLogin() // เรียกใช้ getStudentLogin()
      console.log('testeacher ID: ' + this.testeacherId) // ตรวจสอบค่า testStudentId
      try {
        if (this.testeacherId) {
          // ตรวจสอบว่ามีค่า testStudentId หรือไม่
          const response = await axios.get(
            `/instructorCourse/?teacher_id=${this.testeacherId}`
          )
          let filteredSubjects = response.data.filter((item, index, self) =>
            index === self.findIndex((t) => (
              t.course_data.name === item.course_data.name
            ))
          );
          this.subjects = filteredSubjects;
          console.log(this.subjects)
        } else {
          console.log("Doesn't have Teacher ID:  " + this.testeacherId)
        }
      } catch (error) {
        console.error('There was an error fetching the leave requests:', error)
      } finally {
        this.loading = false // เสร็จสิ้นการโหลด
      }
    },
    async fetchLeaveRequests() {
    this.loading = true; // Start loading
    await this.getTeacherLogin(); // Assume this sets `this.testeacherId`
    console.log('Teacher ID: ' + this.testeacherId);
    try {
      // /leave_request_details/?section=200&teacher_id=1
      if (this.testeacherId) {
        const response = await axios.get(`/leave_request_details/?teacher_id=${this.testeacherId}&section=${this.sectionSearch}&course_name=${this.selectedSubject}`);
        const rawData = response.data;
        const summarizedData = this.summarizeLeaveRequests(rawData);
        this.leaveRequests = summarizedData;
        console.log(this.leaveRequests);
      } else {
        console.log("No Teacher ID: " + this.testeacherId);
      }
    } catch (error) {
      console.error('Error fetching the leave requests:', error);
    } finally {
      this.loading = false; // Loading complete
    }
  },
  summarizeLeaveRequests(data) {
  const summary = {};

  data.forEach(request => {
    const { course_data, leave_request_data } = request;
    const key = `${course_data.id}-${course_data.name}-${course_data.section}`; // Unique key for each course, name, and section

    if (!summary[key]) {
      summary[key] = {
        course_id: course_data.id,
        course_name: course_data.name,
        section: course_data.section,
        totalSick: 0,
        totalBusiness: 0,
        totalOther: 0,
        approveSick: 0,
        rejectSick: 0,
        pendingSick: 0,
        approveBusiness: 0,
        rejectBusiness: 0,
        pendingBusiness: 0,
        approveOther: 0,
        rejectOther: 0,
        pendingOther: 0
      };
    }


    // Increment counters based on leaveType and status
    const leaveType = leave_request_data.leave_type;
    const status = request.status;
    if (leaveType === 'ลาป่วย') {
      summary[key].totalSick++;
      if (status === 'approve') summary[key].approveSick++;
      else if (status === 'reject') summary[key].rejectSick++;
      else if (status === 'pending') summary[key].pendingSick++;
    } else if (leaveType === 'ลากิจ') {
      summary[key].totalBusiness++;
      if (status === 'approve') summary[key].approveBusiness++;
      else if (status === 'reject') summary[key].rejectBusiness++;
      else if (status === 'pending') summary[key].pendingBusiness++;
    } else if (leaveType === 'อื่น ๆ') {
      summary[key].totalOther++;
      if (status === 'approve') summary[key].approveOther++;
      else if (status === 'reject') summary[key].rejectOther++;
      else if (status === 'pending') summary[key].pendingOther++;
    }
  });

  return Object.values(summary); // Convert the summary object to an array
},
  // summarizeLeaveRequests(data) {
  //   const summary = {};

  //   data.forEach(request => {
  //     const { course_data } = request; // Assuming course_data contains a name and id
  //     const key = course_data.id + '-' + course_data.name; // Unique key for each course and leave type

  //     if (!summary[key]) {
  //       summary[key] = {
  //         course_id: course_data.id,
  //         course_name: course_data.name, // Store the course name
  //         leaveType: request.type, // Assuming you have a 'type' property
  //         total: 0,
  //         approveSick: 0,
  //         rejectSick: 0,
  //         pendingSick: 0,
  //         approveBusiness: 0,
  //         rejectBusiness: 0,
  //         pendingBusiness: 0,
  //         approveOther: 0,
  //         rejectOther: 0,
  //         pendingOther: 0,
  //         section: course_data.section
  //       };
  //     }

  //     summary[key].total++; // Increment the total number of leave requests
  //     if (request.status === 'approve') {
  //       summary[key].approve++; // Increment approved count
  //     } else if (request.status === 'reject') {
  //       summary[key].reject++; // Increment rejected count
  //     } else if (request.status === 'pending') {
  //       summary[key].pending++; // Increment pending count
  //     }
  //   });

  //   return Object.values(summary); // Convert the summary object to an array
  // },
  async findBysection (sectionSearch) {
    await this.fetchLeaveRequests()

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
table {
    width: 100%; /* Ensure table takes full width */
    table-layout: fixed; /* This can help with column width consistency */
  }

  th, td {
    text-align: left; /* Adjust text alignment as needed */
    padding: 8px; /* Add padding to prevent text from touching cell borders */
    border-bottom: 1px solid #eee; /* Optional: adds a line between rows */
  }

  th {
    background-color: #f5f5f5; /* Optional: differentiates the header */
    font-weight: bold;
  }
  /* search bar */
  .v-col-md-1.v-col-12 {
    display: flex;
    /* padding: 0%; */
    align-items: center;
    margin: 0%;
  }
  .v-col-md-3.v-col-12 {
    padding-right: 0;
  }
  .v-col-md-2.v-col-12 {
    padding-left: 0;
}
</style>
