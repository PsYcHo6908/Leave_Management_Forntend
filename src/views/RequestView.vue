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
          <v-col cols="12" md="2"> </v-col>
          <v-col cols="12" md="3"></v-col>
          <v-col cols="12" md="3" class="field-container">
            <div class="label-input-pair">
              <input type="text" placeholder="วิชา" v-model="search"/>
            </div>
          </v-col>
          
          <v-col cols="12" md="2" class="field-container">
            <div class="label-input-pair">
              
              <select v-model="selectedOption">
                <option value="" disabled selected>
                  -- ประเภทการลา --
                </option>
                <option value="">ทั้งหมด</option>
                <option value="ลากิจ">ลากิจ</option>
                <option value="ลาป่วย">ลาป่วย</option>
                <option value="อื่น ๆ">อื่นๆ</option>

              </select>
            </div>
          </v-col>
          <v-col cols="12" md="2" class="field-container">
            <div class="label-input-pair">

                <select v-model="statusSearch">
                  <option value="" disabled selected>
                    -- สถานะ --
                  </option>
                  <option value="">ทั้งหมด</option>
                  <option value="pending">รอดำเนินการ</option>
                  <option value="approve">อนุมัติแล้ว</option>
                  <option value="reject">ไม่อนุมัติ</option>

                </select>
            </div>
          </v-col>
        </v-row>

        <!-- table -->
        <v-row>
          <table class="leave-requests-table">
            <thead>
              <tr>
                <!-- <th>ID</th> -->
                <th>Course Name</th>
                <th>Course Section</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Description</th>
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
                <!-- <td>{{ request.id }}</td> -->
                <td>{{ request.course_data.name }}</td>
                <td>{{ request.course_data.section }}</td>
                <td>{{ request.leave_request_data.leave_type }}</td>
                <td>{{ request.leave_request_data.start_date }}</td>
                <td>{{ request.leave_request_data.end_date }}</td>
                <td>{{ getRequestDescription(request.leave_request_data.description) }}</td>
                <td class="actions-cell">
                  <v-btn
                    small
                    :color="
                      request.status === 'approve'
                        ? 'green'
                        : request.status === 'reject'
                          ? 'grey'
                          : 'primary'
                    "
                    @click.stop="
                      request.status === 'pending'
                        ? onPending(request)
                        : request.status === 'approve'
                          ? onApproved(request)
                          : approveRequest(request)
                    "
                    :disabled="
                      request.status === 'approve' ||
                      request.status === 'reject' ||
                      request.status === 'pending'
                    "
                  >
                    {{
                      request.status === 'approve'
                        ? 'อนุมัติแล้ว'
                        : request.status === 'reject'
                          ? 'ไม่อนุมัติ'
                          : request.status === 'pending'
                            ? 'รอดำเนินการ'
                            : 'Approve'
                    }}
                  </v-btn>
                  <div>
                    <v-btn
                      small
                      color="red"
                      @click.stop="cancelRequest(request)"
                      v-if="request.status === 'pending'"
                      style="margin-top: 4%"
                    >
                      ยกเลิก
                    </v-btn>
                  </div>
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
import TopNavBar from '../components/TopNavBar.vue'
import Navbar from '../components/navbar.vue'
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
      router.push({ name: 'DetailPage', params: { id } })
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
      // Start by filtering the array
      let filtered = this.leaveRequests.filter(request => {
        const matchesCourse = this.search
        ? request.course_data.name.toLowerCase().includes(this.search.toLowerCase())
        : true;
        const matchesLeaveType = this.selectedOption ? request.leave_request_data.leave_type === this.selectedOption : true;
        const matchesStatus = this.statusSearch ? request.status.toLowerCase().includes(this.statusSearch.toLowerCase()) : true;
        return matchesCourse && matchesLeaveType && matchesStatus;
      });
      
      // Define the order of the statuses
      const statusOrder = {
        'pending': 1,
        'approve': 2,
        'reject': 3
      };

      // Sort the filtered array
      filtered = filtered.sort((a, b) => {
        const orderA = statusOrder[a.status] || 999;
        const orderB = statusOrder[b.status] || 999;

        if (orderA === orderB) {
          return a.id - b.id; // Secondary sort condition if statuses are equal
        }

        return orderA - orderB;
      });

      // Return the sorted and filtered array
      return filtered;
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
      testStudentId: '',
      student: [],
      user: [],
      // for Search
      search: '',
      selectedOption: '', // For leave type
      statusSearch: '', // New property for status
    }
  },
  methods: {
    getRequestDescription(description) {
      if (description) {
        if (description.length > 20) {
          return description.slice(0, 20) + '...'; // แสดงเฉพาะ 20 ตัวอักษรแรกและเติม ...
        } else {
          return description; // ถ้าความยาวน้อยกว่าหรือเท่ากับ 20 ตัวอักษร
        }
      }
      return '';
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
      await this.getStudentLogin() // เรียกใช้ getStudentLogin()
      console.log('test Student ID: ' + this.testStudentId) // ตรวจสอบค่า testStudentId
      try {
        if (this.testStudentId) {
          // ตรวจสอบว่ามีค่า testStudentId หรือไม่
          const response = await axios.get(
            `/leaveDetail/?student_id=${this.testStudentId}`
          )
          this.leaveRequests = response.data
          this.leaveRequests = this.getUniqueSubjects(response.data)
        } else {
          console.log("Doesn't have Student ID:  " + this.testStudentId)
        }
      } catch (error) {
        console.error('There was an error fetching the leave requests:', error)
      } finally {
        this.loading = false // เสร็จสิ้นการโหลด
      }
    },
    onPending(request) {
      // Logic for handling a pending request
    },
    onApproved(request) {
      // Logic for handling an already approved request
    },
    approveRequest(request) {
      // Logic for approving a request
    },
    async cancelRequest(request) {
      // Extract the needed identifiers from the request object
      const leave_request_id = request.leave_request_data.id; // Make sure you use the correct property
      const course_id = request.course_data.id; // Make sure you use the correct property
      
      // Construct the URL with the custom action and query parameters
      const url = `/leaveDetail/delete_multiple/`;
      const params = {
        course_id: course_id,
        leave_request_id: leave_request_id
      };

      try {
        // Send a DELETE request using axios with query parameters
        const response = await axios.delete(url, { params: params });
        console.log('Requests cancelled successfully:', response.data);
        
        // If you want to update the UI or state to reflect the deletion, do it here
        // e.g., remove the requests from the leaveRequests array
        this.leaveRequests = this.leaveRequests.filter((r) => {
          return r.leave_request_data.id !== leave_request_id || r.course_data.id !== course_id;
        });

      } catch (error) {
        // Handle any errors that occur during the HTTP request
        console.error('Error cancelling requests:', error.response || error.message);
      }
    }
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
  font-size: 18px !important;
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
.leave-requests-table th {
    background-color: #02BC77 !important;
    color: white !important;
    font-weight: 100 !important;
}
.leave-requests-table td {
    border: 1px solid #02BC77 !important;
    padding: 8px;
    text-align: left;
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
/* td.actions-cell {
    display: flex;
    gap: 15%;
    padding-bottom: 20px !important;
} */
@media screen and (min-width: 1440px) {
  .label-input-pair select {
  margin-top: 11%;
  }
}
</style>
