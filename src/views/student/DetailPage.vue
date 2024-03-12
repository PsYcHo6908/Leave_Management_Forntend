<template>
  <div class="layout-container">
    <Navbar />

    <div class="right-section">
      <TopNavBar />
      <div class="content-Page">
        <slot></slot>

        <div class="head">รายละเอียดการลา</div>
      </div>
      <div class="content">
        <!-- row1 -->
        <v-row>
          <v-col cols="12" md="6">
            <!-- content -->
            <div class="leaveblock1">
              <div v-if="leaveRequest.student_data">
                ชื่อ: {{ leaveRequest.student_data.fname  }} {{ leaveRequest.student_data.lname  }}
              </div>
            </div>
            <div class="leaveblock2">
              <div v-if="leaveRequest.student_data">รหัสนิสิต: {{ leaveRequest.student_data.id }}</div>
            </div>
          </v-col>
        </v-row>
       
        <v-row>
          <v-col cols="12" md="6">
            <!-- content -->
            <div v-if="leaveRequest.course_data">รายวิชา: {{ leaveRequest.course_data.name }}</div>
          </v-col>
          <v-col cols="12" md="6">
            <!-- content -->
            <div>วันที่: {{ leaveRequest.leave_request_data.start_date }} - {{ leaveRequest.leave_request_data.end_date }}</div>
          </v-col>
        </v-row>

        <!-- other row -->
        <v-row>
          <v-col cols="12" md="6">
            <!-- content -->
            <div>ประเภทการลา: {{ leaveRequest.leave_request_data.leave_type }}</div>
          </v-col>
          <v-col cols="12" md="6">
            <!-- content -->
            <div>คำอธิบาย: {{ leaveRequest.leave_request_data.description }}</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <!-- content -->
          </v-col>
          <v-col cols="12" md="6">
            <!-- content -->
            <v-btn
                    small
                    :color="
                      leaveRequest.status === 'approve'
                        ? 'green'
                        : leaveRequest.status === 'reject'
                          ? 'grey'
                          : 'primary'
                    "
                    @click.stop="
                      leaveRequest.status === 'pending'
                        ? onPending(leaveRequest)
                        : leaveRequest.status === 'approve'
                          ? onApproved(leaveRequest)
                          : approveRequest(leaveRequest)
                    "
                    :disabled="
                      leaveRequest.status === 'approve' ||
                      leaveRequest.status === 'reject' ||
                      leaveRequest.status === 'pending'
                    "
                  >
                    {{
                      leaveRequest.status === 'approve'
                        ? 'Approved'
                        : leaveRequest.status === 'reject'
                          ? 'Rejected'
                          : leaveRequest.status === 'pending'
                            ? 'Pending'
                            : 'Approve'
                    }}
                  </v-btn>
                  <!-- Condition for Cancel button -->
                  <v-btn
                    small
                    color="red"
                    @click.stop="cancelRequest(request)"
                    style="margin-left: 5%"
                    v-if="leaveRequest.status === 'pending'"
                  >
                    Cancel
                  </v-btn>
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
      student_data: { fname: '', lname: '' },
      course_data: { name: '' },
      leave_request_data: {start_date: '', end_date: '', leave_type: '', description: '',}
      // ...other expected properties
    },
      requestId: null // To store the ID from the URL
    }
  },
  created() {
    this.requestId = this.$route.params.id; // Assign the ID from the URL to the variable
    this.fetchLeaveRequest();
  },
  methods: {
    async fetchLeaveRequest() {
      // Use the `requestId` to fetch the correct leave request details
      const url = `/leaveDetail/${this.requestId}`;

      await axios
        .get(url)
        .then((response) => {
          this.leaveRequest = response.data;
          console.log("Leave request");
          console.log(this.leaveRequest);
        })
        .catch((error) => {
          console.error(
            'There was an error fetching the leave request details:',
            error
          );
        });
    },
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
