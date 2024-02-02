<template>
  <div class="right-section">
    <TopNavBar />
    <div class="content-Page">
      <slot></slot>

      <!-- Logo -->
      <div class="img1">
        <img src="../assets/logo-1.png" />
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
                    <div class="content-head mt-3">ชื่อวิชา</div>
                    <v-text-field
                      type="text"
                      v-model="formData.username"
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="content-head mt-3">รหัสวิชา</div>
                    <v-text-field
                      type="text"
                      v-model="formData.prefix"
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- name lastname -->
                <v-row>
                  <v-col cols="12">
                    <div class="content-head mt-3">ชื่ออาจารย์ประจำวิชา</div>

                    <v-select
                      v-model="formData.teachers"
                      :items="teachers"
                      style="width: 100%"
                    ></v-select>
                  </v-col>
                </v-row>

                <!-- รหัสนิสิต อีเมล -->
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="content-head mt-3">หมู่เรียน</div>
                    <v-text-field
                      v-model="formData.user_id"
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="content-head mt-3">ภาคเรียน</div>
                    <v-select
                      v-model="formData.department"
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
                      v-model="formData.selectedDays"
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
import TopNavBar from '../components/TopNavBar.vue'
export default {
  setup() {
    const toastStore = useToastStore()

    return {
      toastStore
    }
  },

  data: () => ({
    formData: {
      username: '',
      user_id: '',
      password1: '',
      password2: '',
      fname: '',
      lname: '',
      email: '',
      role: '',
      prefix: '',
      faculty: '',
      department: '',
      selectedDays: [],
    },
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
    departments: ['department 1', 'department 2', 'department 3'],
    faculties: ['faculties 1', 'faculties 2', 'faculties 3'],
    roles: ['student', 'teacher'],
    teachers: ['teacher1', 'teacher2', 'teacher3'],
    days: ['วันจันทร์','วันอังคาร','วันพุธ','วันพฤหัสบดี','วันศุกร์','วันเสาร์','วันอาทิตย์'],
    status: ['เปิด','ปิด'],
  }),
  components: {
    TopNavBar
  },
  methods: {
    submitform() {
      console.log(this.formData)
      this.errors = []

      if (this.formData.email === '') {
        this.errors.push('Your e-mail is missing')
      }

      if (this.formData.fname === '') {
        this.errors.push('Your fname is missing')
      }
      if (this.formData.lname === '') {
        this.errors.push('Your lname is missing')
      }

      if (this.formData.password1 === '') {
        this.errors.push('Your password is missing')
      }

      if (this.formData.password1 !== this.formData.password2) {
        this.errors.push('The password does not match')
      }

      if (this.errors.length === 0) {
        axios
          .post('/api/signup/', this.formData)
          .then((response) => {
            if (response.data.message === 'success') {
              this.toastStore.showToast(
                10000,
                'The user is registered. Please login.',
                'bg-emerald-500'
              )

              this.formData.email = ''
              this.formData.fname = ''
              this.formData.lname = ''
              this.formData.password1 = ''
              this.formData.password2 = ''
              this.formData.role = ''
              this.formData.username = ''
              this.formData.user_id = ''
              this.formData.prefix = ''
              this.formData.faculty = ''
              this.formData.department = ''
            } else {
              console.error(response.data.message)
              const data = JSON.parse(response.data.message)
              for (const key in data) {
                this.errors.push(data[key][0].message)
              }

              this.toastStore.showToast(
                5000,
                'Something went wrong. Please try again',
                'bg-red-300'
              )
            }
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
#input-10,
#input-12,
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
.v-combobox__selection {
  border: none !important;
  background-color: transparent !important;
}
.img1 {
  display: flex;
  justify-content: center; /* จัดให้อยู่ตรงกลางแนวนอน */
  align-items: center; /* จัดให้อยู่ตรงกลางแนวตั้ง */
}
</style>
