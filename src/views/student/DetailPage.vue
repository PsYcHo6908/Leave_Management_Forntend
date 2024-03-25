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
            <div>หมู่เรียน: {{ leaveRequest.course_data.section }}</div>
          </v-col>
        </v-row>

        <!-- other row -->
        <v-row>
          <v-col cols="12" md="6">
            <!-- content -->
            <div>
              วันที่: {{ leaveRequest.leave_request_data.start_date }} -
              {{ leaveRequest.leave_request_data.end_date }}
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <!-- content -->
            <div>
              ประเภทการลา: {{ leaveRequest.leave_request_data.leave_type }}
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="card columns">
              <v-card-title>คำอธิบาย:</v-card-title>
              <v-card-text>
                <template
                  v-for="index in Math.ceil(
                    leaveRequest.leave_request_data.description.length / 100
                  )"
                >
                  <div>
                    {{
                      leaveRequest.leave_request_data.description.slice(
                        (index - 1) * 100,
                        index * 100
                      )
                    }}
                  </div>
                </template>
              </v-card-text>
            </v-card>
            <!-- content -->
            <!-- <div class="description-container">
              คำอธิบาย: {{ leaveRequest.leave_request_data.description }}
            </div> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <!-- content -->
            <div>
              หลักฐานการลา: 
              <span v-for="file in files">
                <!-- {{ file.pdf}} -->
                <!-- <br><br> -->
                <v-btn class="leave-addBtn" type="submit" @click="dowloadWithAxios(file.pdf, file.id)">Dowload</v-btn>
              </span>              
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <div v-if="leaveRequest.status === 'approve'">
              อนุมัติโดย: {{ leaveRequest.approve_id_by_data.prefix }} {{ leaveRequest.approve_id_by_data.fname }} {{ leaveRequest.approve_id_by_data.lname }}
            </div>
            <div v-if="leaveRequest.status === 'reject'">
              ไม่อนุมัติโดย: {{ leaveRequest.approve_id_by_data.prefix }} {{ leaveRequest.approve_id_by_data.fname }} {{ leaveRequest.approve_id_by_data.lname }}
            </div>
            <div v-if="leaveRequest.status === 'pending'">
              อนุมัติโดย: รอดำเนินการ
            </div>
          </v-col>
        </v-row>
        <v-row>
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
                      ? 'รออนุมัติ'
                      : 'Approve'
              }}
            </v-btn>
            <!-- Condition for Cancel button -->
            <v-btn
              small
              color="red"
              @click.stop="cancelRequest(leaveRequest)"
              style="margin-left: 5%"
              v-if="leaveRequest.status === 'pending'"
            >
              ยกเลิก
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
        id: '',
        student_data: { fname: '', lname: '' },
        course_data: { name: '', id: '' },
        leave_request_data: {
          id: '',
          start_date: '',
          end_date: '',
          leave_type: '',
          description: ''
        }
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
    async cancelRequest(request) {
      const { value: confirmed } = await this.$swal.fire({
        title: 'ยืนยันการลบ',
        text: 'คุณต้องการลบรายการนี้หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#02bc77',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ลบ!',
        cancelButtonText: 'ยกเลิก'
      })

      if (confirmed) {
        // ทำการลบรายการตามต้องการ
        const leave_request_id = request.leave_request_data.id
        const course_id = request.course_data.id
        const url = `/leaveDetail/delete_multiple/`
        const params = {
          course_id: course_id,
          leave_request_id: leave_request_id
        }

        try {
          const response = await axios.delete(url, { params: params })
          console.log('Requests cancelled successfully:', response.data)
          // แสดงข้อความเมื่อลบสำเร็จ
          // this.$swal.fire('ลบสำเร็จ', 'ลบรายการเรียบร้อยแล้ว', 'success')
          this.$swal.fire({
            title: 'ลบสำเร็จ',
            text: 'ลบรายการเรียบร้อยแล้ว',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-success' // เพิ่มคลาส CSS สำหรับปุ่มยืนยัน
            },
            confirmButtonColor: '#02bc77'
          })
          // สามารถทำการ redirect ไปยังหน้าที่ต้องการหลังจากลบสำเร็จได้ที่นี่
          // const router = useRouter();
          // router.push('/deleted-page'); // เปลี่ยน '/desired-page' เป็น path ของหน้าที่ต้องการ redirect ไป
          this.$router.push('/deleted-page')
        } catch (error) {
          console.error(
            'Error cancelling requests:',
            error.response || error.message
          )
          // แสดงข้อความเมื่อเกิดข้อผิดพลาดในการลบ
          this.$swal.fire(
            'เกิดข้อผิดพลาด',
            'เกิดข้อผิดพลาดในการลบรายการ',
            'error'
          )
        }
      }
    },
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
.description-container {
  max-width: 100%; /* หรือจำนวน pixel ที่ต้องการ */
  max-height: 100px; /* หรือจำนวน pixel ที่ต้องการ */
  overflow: auto;
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
</style>
