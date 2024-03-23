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
                ชื่อ: {{ leaveRequest.student_data.fname }}
                {{ leaveRequest.student_data.lname }}
              </div>
            </div>
            <div class="leaveblock2">
              <div v-if="leaveRequest.student_data">
                รหัสนิสิต: {{ leaveRequest.student_data.id }}
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <!-- content -->
            <div v-if="leaveRequest.course_data">
              รายวิชา: {{ leaveRequest.course_data.name }}
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <!-- content -->
            <div>
              หมู่เรียน: {{ leaveRequest.course_data.section }}
            </div>
          </v-col>
        </v-row>

        <!-- other row -->
        <v-row>
          <v-col cols="12" md="6">
            <!-- content -->
            <div>
              ประเภทการลา: {{ leaveRequest.leave_request_data.leave_type }}
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <!-- content -->
            <div>
              หลักฐานการลา: 
              <span v-for="file in files">
                <!-- {{ file.pdf}} -->
                <br><br>
                <v-btn class="leave-addBtn" type="submit" @click="dowloadWithAxios(file.pdf, file.id)">Dowload</v-btn>
              </span>
              <!-- <table class="table table-bordered mt-4">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="file in files">
                    <v-row>
                      <td>{{file.pdf}}</td>
                    </v-row>
                    <v-row>
                      <td>
                      <a href="" target="_blank"></a>
                      <v-btn class="leave-addBtn" type="submit" @click="dowloadWithAxios(file.pdf, file.id)">Dowload</v-btn>
                      </td>
                    </v-row>
                  </tr>
                </tbody>
              </table>  -->
              
            </div>
          </v-col>
        </v-row>
        <v-row>

        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <!-- content -->
            <div>
              วันที่: {{ leaveRequest.leave_request_data.start_date }} -
              {{ leaveRequest.leave_request_data.end_date }}
            </div>
          </v-col>
          <v-col cols="12" md="6">
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="card columns">
                <v-card-title>คำอธิบาย:</v-card-title>
                <v-card-text>
                  <template v-for="index in Math.ceil(leaveRequest.leave_request_data.description.length / 100)">
                    <div>{{ leaveRequest.leave_request_data.description.slice((index - 1) * 100, index * 100) }}</div>
                  </template>
                </v-card-text>
              </v-card>
          </v-col>
          <v-col cols="12" md="6"></v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <!-- content -->
            <template v-if="leaveRequest.status === 'pending'">
                    <v-btn small color="#02BC77" @click.stop="onApprove(leaveRequest)" >
                      อนุมัติ
                    </v-btn>
                    <v-btn small color="red" @click.stop="onReject(leaveRequest)" style="margin-left: 5%" >
                      ไม่อนุมัติ
                    </v-btn>
                  </template>
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
        id: '',
        student_data: { fname: '', lname: '' },
        course_data: { name: '', id: '', section: '' },
        leave_request_data: {
          id: '',
          start_date: '',
          end_date: '',
          leave_type: '',
          description: '',
        },
        leave_request_id: '',
        // ...other expected properties
      },
      requestId: null, // To store the ID from the URL
      files: [],
      upload_status: '',
    }
  },
  async created() {
    this.requestId = this.$route.params.id // Assign the ID from the URL to the variable
    await this.fetchLeaveRequest()
    await this.getFile()
  },
  methods: {
    async getFile() {
      await axios.get(`/files/?leave_request_id=${this.leaveRequest.leave_request_data.id}`).then(
        response => {
          console.log(response.data)
          this.files = response.data

        }
      ).catch(error => {
        this.upload_status= 'File NOt Upload Success'
      })
    },
    dowloadWithAxios(url, title){
      axios({
        method: 'get',
        url,
        responseType: 'arraybuffer',

      }).then(response =>{
        this.forceDownload(response, title)
      }).catch((error) => console.log(error))
    },
    forceDownload(response, title){
      const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}))
      const link = document.createElement('a')
      link.href = url
      // link.setAttribute('download', title+'.pdf') // Corrected the typo here
      link.setAttribute('download', `${title}.pdf`);
      document.body.appendChild(link)
      link.click()
    },
    async fetchLeaveRequest() {
      // Use the `requestId` to fetch the correct leave request details
      const url = `/leaveDetail/${this.requestId}`

      await axios
        .get(url)
        .then((response) => {
          this.leaveRequest = response.data
          console.log('Leave request')
          console.log(this.leaveRequest)
        })
        .catch((error) => {
          console.error(
            'There was an error fetching the leave request details:',
            error
          )
        })
    },
    async onReject(request) {
      const { value: confirmedReject } = await this.$swal.fire({
        title: 'ยืนยันการปฏิเสธคำขอลา',
        text: 'คุณต้องการปฏิเสธคำขอลารายการนี้หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#02bc77',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      })
      if (confirmedReject) {
        const updatedData = {
          status: 'reject'
        };
        try {
          const response = await axios.put(`/leaveDetail/update_multiple/?course_id=${request.course_id}&leave_request_id=${request.leave_request_id}`, updatedData);

          // Handle the response as needed
          console.log('Data approved successfully:', response.data);
          // Reload or update the data in your front-end application
          await this.approveBy(request);
          await this.fetchLeaveRequest();
        } catch (error) {
          // Handle errors, such as displaying an error message to the user
          console.error('Error approving data:', error);
        }
      }
    },
    async onApprove(request) {
      const { value: confirmedApprove } = await this.$swal.fire({
        title: 'ยืนยันการอนุมัติ',
        text: 'คุณต้องการอนุมัติรายการนี้หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#02bc77',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      })
      if (confirmedApprove) {
        const updatedData = {
          status: 'approve'
        };
        try {
          const response = await axios.put(`/leaveDetail/update_multiple/?course_id=${request.course_id}&leave_request_id=${request.leave_request_id}`, updatedData);

          // Handle the response as needed
          console.log('Data approved successfully:', response.data);
          // Reload or update the data in your front-end application
          await this.approveBy(request);
          await this.fetchLeaveRequest();
        } catch (error) {
          // Handle errors, such as displaying an error message to the user
          console.error('Error approving data:', error);
        }
      }
    },
    async approveBy(request){
      const newApproveIdBy = request.teacher_id;
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
    }

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
.leaveblock2 {
  display: flex;
  padding: 0% 0% 2.5% 0%;
}
/* leave-addBtn */
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
.columns {
  width: 100%;
  position: relative;
  border-radius: 10px;
  border: 2px solid #10b981;
  transition: all 0.4s;
}

.columns:hover {
  box-shadow: 4px 4px 0 1px #10b981;
}
.columns {
  display: inline-block;
  margin-bottom: 20px;
}
.columns:hover {
  box-shadow: 2px 2px 0 1px #10b981;
}

.columns:hover {
  color: black;
  border-color: #10b981;
}
</style>
