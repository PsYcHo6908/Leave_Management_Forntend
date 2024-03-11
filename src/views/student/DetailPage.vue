<template>
  <div class="layout-container">
    <Navbar />

    <div class="right-section">
      <TopNavBar />
      <div class="content-Page">
        <slot></slot>
      <v-container>
        <v-row class="mb-4">
          <v-col cols="12">
            <h1>รายละเอียดคำขอลา</h1>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12" md="6">
              ข้อมูลผู้ขอลา
                <div>ชื่อ: {{ leaveRequest.student_name }}</div>
                <div>รหัสนักศึกษา: {{ leaveRequest.student_id }}</div>
                <div>รายวิชา: {{ leaveRequest.course_name }}</div>
                <div>วันที่: {{ leaveRequest.date }}</div>
                <div>ประเภทการลา: {{ leaveRequest.leave_type }}</div>
                <div>คำอธิบาย: {{ leaveRequest.description }}</div>

                <v-btn color="success">อนุมัติ</v-btn>
                <v-btn color="error">ไม่อนุมัติ</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../../components/navbar.vue'
import TopNavBar from '../../components/TopNavBar.vue'

export default {
  components: {
    Navbar,
    TopNavBar,
  },
  data() {
    return {
      leaveRequest: {
        student_name: '',
        student_id: '',
        course_name: '',
        date: '',
        leave_type: '',
        description: '',
        // Add more properties as needed
      },
    };
  },
  created() {
    this.fetchLeaveRequest();
  },
  methods: {
    fetchLeaveRequest() {
      // Replace with the actual API endpoint
      axios.get('/api/leave-request-details')
        .then((response) => {
          this.leaveRequest = response.data;
        })
        .catch((error) => {
          console.error('There was an error fetching the leave request details:', error);
        });
    },
    // Add methods for approve and reject actions
  },
};
</script>

<!-- Add style section if needed -->
<style scoped>
.detail-page-container {
  /* Your CSS here */
}
</style>
