<template>
  <div class="layout-container">
    <Navbar />
    <div class="right-section">
      <TopNavBar />
      <div class="content-Page">
        <slot></slot>

        <!-- Logo -->
        <div class="img1">
          <img src="../../assets/logo-1.png" />
        </div>
      </div>
      <!-- Card -->
      <v-container fluid>
        <v-row align="center">
          <v-col cols="12" md="6" offset-md="3">
            <v-card
              class="mx-auto pa-12 pb-8"
              rounded="xl"
              color="rgba(255, 255, 255, 0.5)"
              style="padding: 20px"
            >
              <v-card-title style="color: #757575; padding: 0px; border: 30">
                Registation
              </v-card-title>

              <!-- Form -->
              <v-form @submit.prevent="submitform">
                <!-- Username prefix -->
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="content-head mt-3">ชื่อวิชา!</div>
                    <v-text-field
                      type="text"
                      v-model="formData.name"
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="content-head mt-3">รหัสวิชา!</div>
                    <v-text-field
                      type="text"
                      v-model="formData.course_id"
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="content-head mt-3">คณะ!</div>
                    <v-select
                      v-model="selectedFaculty"
                      :items="faculties"
                      :item-props="facultyItemProps"
                      style="width: 100%"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="content-head mt-3">ภาควิชา!</div>
                    <v-select
                      v-model="selectedDepartment"
                      :items="departments"
                      :item-props="departmentItemProps"
                      style="width: 100%"
                    ></v-select>
                  </v-col>
                </v-row>
                <!-- name lastname -->
                <v-row>
                  <v-col cols="12">
                    <div class="content-head mt-3">ชื่ออาจารย์ประจำวิชา</div>
                    <v-combobox
                      v-model="selectedTeachers"
                      :items="teachers"
                      :item-props="teachersItemProps"
                      multiple
                      chips
                      outlined
                      @keydown.prevent
                      @click.right.prevent
                      @click.middle.prevent
                      class="no-placeholder"
                    ></v-combobox>
                  </v-col>
                </v-row>

                <!-- รหัสนิสิต อีเมล -->
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="content-head mt-3">หมู่เรียน!</div>
                    <v-text-field
                      v-model="formData.section"
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="content-head mt-3">ภาคเรียน</div>
                    <v-select
                      v-model="formData.department_id"
                      :items="departments"
                      style="width: 100%"
                    ></v-select>
                  </v-col>
                </v-row>

                <!-- faculty department -->
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="content-head mt-3">สถานะ</div>
                    <v-select
                      v-model="formData.status"
                      :items="status"
                      style="width: 100%"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="content-head mt-3">วันที่เรียน</div>
                    <v-combobox
                      v-model="selectedDays"
                      :items="days"
                      multiple
                      chips
                      outlined
                      @keydown.prevent
                      @click.right.prevent
                      @click.middle.prevent
                      class="no-placeholder"
                    ></v-combobox>
                  </v-col>
                </v-row>

                <!-- notification error section -->
                <template v-if="errors.length > 0">
                  <div class="bg-red-300 text-white rounded-lg p-6">
                    <p v-for="i in errors" v-bind:key="i">{{ i }}</p>
                  </div>
                </template>

                <v-btn class="logInButton" type="submit">Register</v-btn>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { useToastStore } from '@/stores/toast'
import axios from 'axios'
import TopNavBar from '../../components/TopNavBar.vue'
import Navbar from '../../components/navbar.vue'
export default {
  setup() {
    const toastStore = useToastStore()

    return {
      toastStore
    }
  },

  data: () => ({
    formData: {
      faculty_id: '',
      department_id: '',
      name: '',
      course_id: '',
      section: ''
    },
    formTeacherInstructorData: {
      teacher_id: '',
      course_id: ''
    },
    selectedDays: [],
    errors: [],
    show2: false,
    show1: false,
    password: 'Password',
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      email: (value) => {
        const pattern =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
    },
    selectedFaculty: [],
    selectedDepartment: [],
    selectedTeachers: [],
    //created
    departments: [],
    faculties: [],
    roles: ['student', 'teacher'],
    teachers: [],
    days: [
      'วันจันทร์',
      'วันอังคาร',
      'วันพุธ',
      'วันพฤหัสบดี',
      'วันศุกร์',
      'วันเสาร์',
      'วันอาทิตย์'
    ],
    status: ['เปิด', 'ปิด']
  }),
  components: {
    TopNavBar,
    Navbar
  },
  mounted() {
    this.getFaculties()
    this.getDepartments()
    this.getTeachers()
  },
  watch: {
    selectedFaculty: {
      handler: 'getDepartments', // เรียกใช้ method เมื่อ selectedFaculty เปลี่ยน
      immediate: true // เรียกใช้ method ทันทีเมื่อ component ถูกโหลด
    },
    selectedDepartment: {
      handler: 'getTeachers',
      immediate: true
    }
  },
  methods: {
    facultyItemProps(item) {
      return {
        title: item.name,
        subtitle: item.id
      }
    },
    departmentItemProps(item) {
      return {
        title: item.name,
        subtitle: item.id
      }
    },
    teachersItemProps(item) {
      return {
        title: item.fname,
        subtitle: item.id
      }
    },
    async getFaculties() {
      // Fetch faculty data from your server API
      await axios
        .get('/education/faculty')
        .then((response) => {
          this.faculties = response.data
          console.log(this.faculties)
        })
        .catch((error) => {
          // Handle errors here
          console.error('Error fetching faculty data:', error)
        })
    },
    async getDepartments() {
      if (this.selectedFaculty && this.selectedFaculty.id) {
        const url = `/education/department/?faculty_id=${this.selectedFaculty.id}`
        await axios
          .get(url)
          .then((response) => {
            this.departments = response.data // กำหนดค่า departments ที่ได้จาก API
          })
          .catch((error) => {
            console.log('error', error)
          })
      } else {
        this.departments = [] // ล้างค่า departments เมื่อไม่มีค่า selectedFaculty.id
      }
    },
    async getTeachers() {
      if (this.selectedDepartment && this.selectedDepartment.id) {
        const url = `/teacher/?faculty_id=${this.selectedDepartment.faculty_id}&department_id=${this.selectedDepartment.id}`
        await axios
          .get(url)
          .then((response) => {
            this.teachers = response.data
          })
          .catch((error) => {
            console.log('error', error)
          })
      } else {
        this.teachers = []
      }
    },
    async submitTeacherInstructorform(id_course) {
      this.formTeacherInstructorData.course_id = id_course
      this.formTeacherInstructorData.teacher_id = this.selectedTeachers.id
      await axios
        .post('/instructorCourse/', this.formData)
        .then((response) => {
          this.submitTeacherInstructorform(response)
          this.toastStore.showToast(
            10000,
            'The Subject is registered',
            'bg-emerald-500'
          )

          this.selectedTeachers = []
          this.formTeacherInstructorData.course_id = ''
          this.formTeacherInstructorData.teacher_id = ''
        })
        .catch((error) => {
          this.toastStore.showToast(10000, 'Server Problem', 'bg-red-300')
          console.log('error', error)
        })
    },
    async submitform() {
      // class Course(models.Model):
      // name = models.CharField(max_length=100)
      // course_id = models.CharField(max_length=20)
      // faculty_id = models.ForeignKey(
      //     Faculty, on_delete=models.CASCADE, null=True, blank=True)
      // department_id = models.ForeignKey(
      //     Department, on_delete=models.CASCADE,null=True, blank=True)
      // section = models.CharField(max_length=10)

      console.log(this.formData)
      this.formData.faculty_id = this.selectedFaculty.id
      this.formData.department_id = this.selectedDepartment.id
      this.errors = []

      if (this.errors.length === 0) {
        await axios
          .post('/education/course/', this.formData)
          .then((response) => {
            // ค่อยแก้ ให้ add TeacherInstructor จาก postman ไปก่อน
            // const id_course = response.id
            // this.submitTeacherInstructorform(id_course)
            this.toastStore.showToast(
              10000,
              'The Subject is registered',
              'bg-emerald-500'
            )
            this.formData.course_id = ''
            this.formData.name = ''
            this.selectedFaculty = []
            this.selectedDepartment = []
            this.formData.faculty_id = ''
            this.formData.department_id = ''
          })
          .catch((error) => {
            this.toastStore.showToast(10000, 'Server Problem', 'bg-red-300')
            console.log('error', error)
          })
      }
    }
  }
}
</script>

<style>
#input-0,
#input-2,
#input-4,
#input-6,
#input-7,
#input-8,
#input-9,
#input-10,
#input-12,
#input-13,
#input-14,
#input-15,
#input-16,
#input-18,
#input-20,
#input-21,
#input-23,
#input-22 {
  border: none !important;
  background-color: transparent !important;
}
#input-23 {
  margin: 0 !important;
}
.v-combobox__selection {
  border: none !important;
  background-color: transparent !important;
}
.img1 {
  display: flex;
  justify-content: center; /* จัดให้อยู่ตรงกลางแนวนอน */
  align-items: center; /* จัดให้อยู่ตรงกลางแนวตั้ง */
}
@media screen and (min-width: 1900px) {
}
</style>
