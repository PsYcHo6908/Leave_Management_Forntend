<template>
  <div class="layout-container">
    <Navbar />

    <div class="right-section">
      <TopNavBar />
      <div class="content-Page">
        <!-- Slot is used for distributing content from a parent component -->
        <slot></slot>

        <div class="head-request">คำขอลาทั้งหมด</div>
      </div>
      <div class="content">
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="leaveRequests"
              :loading="loading"
              :items-per-page="10"
              class="elevation-1"
              @click:row="onRowClicked"
            >
              <!-- Slot for customizing how items are displayed in a column -->
              <template v-slot:item.actions="{ item }">
                <v-btn
                  small
                  :color="item.status === 'approve' || item.status === 'reject' ? 'grey' : 
                          item.status === 'pending' ? 'grey' : 'grey'"
                  @click="item.status === 'pending' ? onPending(item) : 
                          item.status !== 'approve' && item.status !== 'reject' && approveRequest(item)"
                  :disabled="item.status === 'approve' || item.status === 'reject' || item.status === 'pending'"
                >
                  {{ item.status === 'approve' ? 'Approved' : 
                    item.status === 'reject' ? 'Rejected' : 
                    item.status === 'pending' ? 'Pending' : 'Approve' }}
                </v-btn>
                <!-- เงื่อนไขสำหรับปุ่ม Reject -->
                <v-btn 
                  small 
                  color="red" 
                  @click.stop="cancelRequest(item)"
                  style="margin-left: 5%;"
                  v-if="item.status !== 'approve' && item.status !== 'reject'"
                >
                  Cancle
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Navbar from '../components/navbar.vue'
import TopNavBar from '../components/TopNavBar.vue'
import { useRouter } from 'vue-router';
import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'

export default {
  setup() {
  const router = useRouter();
  const toastStore = useToastStore()
  const userStore = useUserStore()
  function navigateToDetail(id) {
    router.push({ name: 'DetailPage', params: { id } });
  }
  return {
    navigateToDetail,
    // ... อื่นๆ ...
    toastStore,
    userStore
  };
},
  components: {
    Navbar,
    TopNavBar
  },
  mounted() {
    this.fetchLeaveRequests();
    this.getStudentLogin()
  },
  data() {
    return {
      leaveRequests: [],
      loading: false,
      headers: [
        { text: 'ID', align: 'start', value: 'id' },
        { text: 'Course', value: 'course_data.name' },
        { text: 'Course', value: 'course_data.section' },
        { text: 'Leave Type', value: 'leave_request_data.leave_type' },
        { text: 'Start Date', value: 'leave_request_data.start_date' },
        { text: 'End Date', value: 'leave_request_data.end_date' },
        // { text: 'Status', value: 'leave_request_data.status' },
        { text: 'Actions', value: 'actions' },
      ],
      // getStudentLogin
      testId: '',
      testStudentId: '',
      student: [],
      user: [],
    };
  },
  methods: {
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
    const unique = {};
    items.forEach((item) => {
      // Create a composite key using both subject name and leave_request_id
      const uniqueKey = `${item.course_data.name}-${item.leave_request_id}`;
      if (!unique[uniqueKey]) {
        unique[uniqueKey] = item;
      }
    });
    return Object.values(unique);
  },
    async fetchLeaveRequests() {
      this.loading = true;
      try {
        const response = await axios.get(`/leaveDetail/?student_id=${this.testId}`);
        this.leaveRequests = response.data;
        this.leaveRequests = this.getUniqueSubjects(response.data);
      } catch (error) {
        console.error('There was an error fetching the leave requests:', error);
      } finally {
        this.loading = false;
      }
    },
    approveRequest(id) {
          console.log('Approving request with id:', id);
          // Here you would add
    // the logic to handle the approval of the leave request, typically making an API call to update the status.
    },
    // Keep your existing onRowClicked as is.
    onRowClicked(item) {
      console.log('Row clicked:', item);
      // Navigation logic for going to the detail page.
      // this.$router.push({ name: 'DetailPage', params: { id: item.id } });
    },
    cancelRequest(item) {
      console.log('Cancel request:', item);
      // Perform the cancel logic here, such as sending a request to your API.
    },
  },

}
</script>
<style>

@media screen and (max-width: 1900px) {
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
}
</style>
