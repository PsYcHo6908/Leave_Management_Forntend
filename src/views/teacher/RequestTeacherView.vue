<template>
  <div class="layout-container">
    <Navbar />

    <div class="right-section">
      <TopNavBar />
      <div class="content-Page">
        <slot></slot>

        <div class="head">คำขอลาทั้งหมด</div>
      </div>
      <div class="content">
        <!-- Search fields in a single row -->
        <v-row>
          <v-col cols="12" md="3">
            <!-- First search field -->
            <div class="field-container">
              <div class="label-input-pair">
                <input type="text" placeholder="รหัสนิสิต" v-model="idStudentSearch" />
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <!-- Second search field -->
            <div class="field-container">
              <div class="label-input-pair">
                <input type="text" placeholder="ชื่อนิสิต" v-model="nameSearch" />
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="2">
            <!-- Third search field -->
            <div class="field-container">
              <div class="label-input-pair">
                <input type="text" placeholder="วิชา" v-model="search" />
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
          <v-col cols="12" md="2">
            <!-- Fourth search field -->
            <div class="field-container">
              <div class="label-input-pair">
                <select v-model="selectedOption">
                  <option value="" disabled selected>-- ประเภทการลา --</option>
                  <option value="">None</option>
                  <option value="ลากิจ">ลากิจ</option>
                  <option value="ลาป่วย">ลาป่วย</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </select>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- table -->
        <v-row>
          <table class="leave-requests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>รหัสประจำตัว</th>
                <th>รายชื่อนิสิต</th>
                <th>Course Name</th>
                <th>Course Section</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="request in filteredRequests"
                :key="request.id"
                @click="navigateToDetail(request.id)"
                class="request-row"
              >
                <td>{{ request.id }}</td>
                <td>{{ request.student_data.user_data.user_id }}</td>
                <td>{{ request.student_data.fname }} {{ request.student_data.lname }}</td>
                <td>{{ request.course_data.name }}</td>
                <td>{{ request.course_data.section }}</td>
                <td>{{ request.leave_request_data.leave_type }}</td>
                <td>{{ request.leave_request_data.start_date }}</td>
                <td>{{ request.leave_request_data.end_date }}</td>
                <td class="actions-cell">
                  <template v-if="request.status === 'pending'">
                    <v-btn small color="#02BC77" @click.stop="onApprove(request)" >
                      อนุมัติ
                    </v-btn>
                    <v-btn small color="red" @click.stop="onReject(request)" style="margin-left: 5%" >
                      ไม่อนุมัติ
                    </v-btn>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { useRouter } from 'vue-router'
import TopNavBar from '../../components/TopNavBar.vue'
import Navbar from '../../components/navbar.vue'
// import { defineComponent } from 'vue';

export default {
  setup() {
    const router = useRouter()
    const toastStore = useToastStore()
    const userStore = useUserStore()

    // เปลี่ยนหน้าเมื่อกดตาม row ยกวเ้น colum action
    function navigateToDetail(id) {
      // Check if the event target has a parent with the 'actions-cell' class
      // if (!event.target.closest('.actions-cell')) {
      //   router.push({ name: 'DetailPage', params: { id } });
      // }
      router.push({ name: 'DetailTeacherPage', params: { id } })
    }
    return {
      navigateToDetail,
      // ... อื่นๆ ...
      toastStore,
      userStore
    }
  },
  components: {
    Navbar,
    TopNavBar
  },
  mounted() {
    this.fetchLeaveRequests()
  },
  computed: {
    filteredRequests() {
      return this.leaveRequests.filter((request) => {
        const matchesCourse = request.course_data.name
          .toLowerCase()
          .includes(this.search.toLowerCase())
        const matchesLeaveType = this.selectedOption
          ? request.leave_request_data.leave_type === this.selectedOption
          : true
        const matchesIdStudentSearch = request.student_data.user_data.user_id.includes(this.idStudentSearch);
        // const matchesStatus = this.statusSearch
        //   ? request.status
        //       .toLowerCase()
        //       .includes(this.statusSearch.toLowerCase())
        //   : true
        // ... other match conditions ...
        const fullName = `${request.student_data.fname} ${request.student_data.lname}`.toLowerCase();
        const searchTerms = this.nameSearch.toLowerCase().split(' ').filter(Boolean);
        const matchesName = searchTerms.every(term => fullName.includes(term));
        return matchesCourse && matchesLeaveType && matchesIdStudentSearch && matchesName 
      })
    }
  },
  data() {
    return {
      leaveRequests: [],
      loading: false,
      headers: [
        { text: 'ID', align: 'start', value: 'id', sortable: true },
        { text: 'Course Name', value: 'course_data.name' },
        { text: 'Course Section', value: 'course_data.section' },
        { text: 'Leave Type', value: 'leave_request_data.leave_type' },
        { text: 'Start Date', value: 'leave_request_data.start_date' },
        { text: 'End Date', value: 'leave_request_data.end_date' },
        // { text: 'Status', value: 'leave_request_data.status' },
        { text: 'Actions', value: 'actions' }
      ],
      // getStudentLogin
      testId: '',
      testeacherId: '',
      teacher: [],
      user: [],
      // for Search
      search: '',
      selectedOption: '', // For leave type
      statusSearch: '', // New property for status
      nameSearch: '',
      idStudentSearch: '',

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
    getUniqueSubjects(items) {
      const unique = {}
      items.forEach((item) => {
        // Create a composite key using both subject name and leave_request_id
        const uniqueKey = `${item.course_data.name}-${item.leave_request_id}`
        if (!unique[uniqueKey]) {
          unique[uniqueKey] = item
        }
      })
      return Object.values(unique)
    },
    async fetchLeaveRequests() {
      this.loading = true // เริ่มต้นการโหลด
      await this.getTeacherLogin() // เรียกใช้ getStudentLogin()
      console.log('testeacher ID: ' + this.testeacherId) // ตรวจสอบค่า testStudentId
      try {
        if (this.testeacherId) {
          // ตรวจสอบว่ามีค่า testStudentId หรือไม่
          const response = await axios.get(
            `/leaveDetail/?teacher_id=${this.testeacherId}&status=pending`
          )
          this.leaveRequests = response.data
          this.leaveRequests = this.getUniqueSubjects(response.data)
        } else {
          console.log("Doesn't have Teacher ID:  " + this.testeacherId)
        }
      } catch (error) {
        console.error('There was an error fetching the leave requests:', error)
      } finally {
        this.loading = false // เสร็จสิ้นการโหลด
      }
    },
    // async updateData(id, dataToUpdate) {
    //   try {
    //     const response = await axios.put(`/leaveRequestDetail/${id}/`, dataToUpdate);
    //     console.log('Updated data:', response.data);
    //     return response.data; // Return the updated data if needed
    //   } catch (error) {
    //     console.error('Error updating data:', error);
    //     throw error; // Handle the error as needed
    //   }
    // },
    async onApprove(request) {
      const updatedData = {
        status: 'approve'
      };
      try {
        const response = await axios.put(`/leaveDetail/update_multiple/?course_id=${request.course_id}&leave_request_id=${request.leave_request_id}`, updatedData);

        // Handle the response as needed
        console.log('Data approved successfully:', response.data);
        await this.approveBy(request);
        // Reload or update the data in your front-end application
        await this.fetchLeaveRequests();
      } catch (error) {
        // Handle errors, such as displaying an error message to the user
        console.error('Error approving data:', error);
      }
    },
    async approveBy(request){
      const newApproveIdBy = this.testeacherId;
      const updatedData = {
        approve_id_by: newApproveIdBy
      };
      try {
        const response = await axios.put(`/leaveDetail/update_multiple/?course_id=${request.course_id}&leave_request_id=${request.leave_request_id}`, updatedData);

        // Handle the response as needed
        console.log('Data approved successfully:', response.data);
        // Reload or update the data in your front-end application
      } catch (error) {
        // Handle errors, such as displaying an error message to the user
        console.error('Error approving data:', error);
      }


      // // Assume you have the ID of the LeaveRequest and the new approve_id_by value
      // const leaveRequestId = request.leave_request_id; // Example ID
      // const newApproveIdBy = this.testeacherId; // Example new value

      // // Create the data object with the new approve_id_by value
      // const data = {
      //   approve_id_by: newApproveIdBy,
      // };

      // // Make the PUT request using axios
      // await axios.put(`/leaveRequest/${leaveRequestId}/update_approve_id_by/`, data)
      //   .then(response => {
      //     console.log(response.data); // Handle successful response
      //   })
      //   .catch(error => {
      //     console.error(error); // Handle error
      //   });
    },
    async onReject(request) {
      const updatedData = {
        status: 'reject'
      };
      try {
        const response = await axios.put(`/leaveDetail/update_multiple/?course_id=${request.course_id}&leave_request_id=${request.leave_request_id}`, updatedData);

        // Handle the response as needed
        console.log('Data approved successfully:', response.data);
        // Reload or update the data in your front-end application
        await this.approveBy(request);
        await this.fetchLeaveRequests();
      } catch (error) {
        // Handle errors, such as displaying an error message to the user
        console.error('Error approving data:', error);
      }
    },
  }
}
</script>
<style>
/* ... CSS of Table ... */

.leave-requests-table {
  width: 100%;
  border-collapse: collapse;
}

.leave-requests-table th,
.leave-requests-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.leave-requests-table th {
  background-color: #f4f4f4;
}

.cancel-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
}

.cancel-btn:hover {
  background-color: darkred;
}

/* title คำขอลาทั้งหมด */
.head {
  font-size: 28px;
  font-weight: 600;
  margin: 0% 2.5%;
  padding: 1% 0% 2% 0%;
}

/* ตอนกดแต่ละ row */
.request-row {
  cursor: pointer;
}
.request-row:hover {
  background-color: #f5f5f5; /* Or any other hover color */
}

/* search */
.label-input-pair select {
  width: calc(80% - -40px);
  box-sizing: border-box;
  border: 1px solid #000;
  padding: 8px;
  border-radius: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('dropdown-arrow.svg');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px 12px;
  padding-right: 30px;
  margin-top: 11%;
}
.label-input-pair input {
  width: calc(90% - -21px) !important;
  box-sizing: border-box !important;
  border: 1px solid #000 !important;
  padding: 8px !important;
  border-radius: 4px !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  background-image: url(dropdown-arrow.svg) !important;
  background-repeat: no-repeat !important;
  background-position: right 10px center !important;
  background-size: 12px 12px !important;
  padding-right: 30px !important;
  margin-left: 0% !important;
  background-color: #fff !important;
}
.label-input-pair select {
  margin-top: 16px !important;
  margin-bottom: 16px !important;
}

@media screen and (max-width: 1899px) {
  .content-Page {
    display: flex;
  }
  .head-request {
    font-size: 30px;
    font-family: 'Prompt';
    font-weight: 600;
    margin-left: 2%;
    padding: 2% 0%;
    width: 100%;
  }
  .head {
    font-size: 28px;
    font-weight: 600;
    margin: 0% 2.5%;
    padding: 1% 0% 2% 0%;
  }
  .label-input-pair select {
    margin-top: 8%;
  }
}
@media screen and (min-width: 1440px) {
  .label-input-pair select {
    margin-top: 11%;
  }
}
</style>
