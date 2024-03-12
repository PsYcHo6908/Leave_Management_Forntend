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
        <!-- row1 -->
        <v-row>
          <v-col cols="12" md="6">
            <!-- content -->
            <div class="leaveblock1">
              <div class="content-head">ชื่อ: {{ leaveRequest.student_name }}</div>
            </div>
            <div class="leaveblock2">
              <div>รหัสนิสิต: {{ leaveRequest.student_id }}</div>
            </div>
          </v-col>
        </v-row>
       
        <v-row>
          <v-col cols="12" md="6">
            <!-- content -->
            <div>รายวิชา: {{ leaveRequest.course_name }}</div>
          </v-col>
          <v-col cols="12" md="6">
            <!-- content -->
            <div>วันที่: {{ leaveRequest.date }}</div>
          </v-col>
        </v-row>

        <!-- other row -->
        <v-row>
          <v-col cols="12" md="6">
            <!-- content -->
            <div>ประเภทการลา: {{ leaveRequest.leave_type }}</div>
          </v-col>
          <v-col cols="12" md="6">
            <!-- content -->
            <div>คำอธิบาย: {{ leaveRequest.description }}</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <!-- content -->
          </v-col>
          <v-col cols="12" md="6">
            <!-- content -->
            <v-btn color="success">อนุมัติ</v-btn>
            <v-btn color="error">ไม่อนุมัติ</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TopNavBar from '../../components/TopNavBar.vue'
import Navbar from '../../components/navbar.vue'

export default {
  components: {
    Navbar,
    TopNavBar
  },
  data() {
    return {
      leaveRequest: {
        student_name: '',
        student_id: '',
        course_name: '',
        date: '',
        leave_type: '',
        description: ''
        // Add more properties as needed
      }
    }
  },
  created() {
    this.fetchLeaveRequest()
  },
  methods: {
    fetchLeaveRequest() {
      // Replace with the actual API endpoint
      axios
        .get('/api/leave-request-details')
        .then((response) => {
          this.leaveRequest = response.data
        })
        .catch((error) => {
          console.error(
            'There was an error fetching the leave request details:',
            error
          )
        })
    }
    // Add methods for approve and reject actions
  }
}
</script>

<!-- Add style section if needed -->
<style scoped>
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
</style>
