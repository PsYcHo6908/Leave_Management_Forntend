<template>
  <v-container class="background1">
    <v-row align="center">
      <v-col cols="12" md="6" offset-md="3">
        <div class="img1">
          <img src="../../assets/logo-1.png" width="200" height="250" />
        </div>
        <v-card  
          class="mx-auto" 
          rounded="xl" 
          color="rgba(255, 255, 255, 0.8)"
          style="padding: 20px;"
          >
          <v-card-title 
            style="color: #757575; padding: 0px; border: 30;"
            >
            Student Registation
          </v-card-title>
          <!-- Content -->
          <v-form @submit.prevent="submitform">
            <!-- Other input fields -->
            <v-row>
              <v-col cols="12" md="6">
                <input v-model="fname" placeholder="1" class="custom-input">
               
              </v-col>
              <v-col cols="12" md="6">
                <p>{{ formData.lname }}</p>
                <input v-model="formData.lname" placeholder="นามสกุล" class="custom-input"> 
                
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <input v-model="fname" placeholder="1" class="custom-input">
               
              </v-col>
              <v-col cols="12" md="6">
                <p>{{ formData.lname }}</p>
                <input v-model="formData.lname" placeholder="นามสกุล" class="custom-input"> 
                
              </v-col>
            </v-row>
            <v-btn class="logInButton" type="submit">Register</v-btn>
          </v-form>
          <!-- Error display section -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useToastStore } from '@/stores/toast'
import axios from 'axios'
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
      
      
    },
    errors: [],
    passwordVisible: false,
    confirmpasswordVisible: false
  }),
  methods: {
   
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible
    },
    toggleConfirmPasswordVisibility() {
      this.confirmpasswordVisible = !this.confirmpasswordVisible
    },
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
        this.formData.role = 'student'
        // console.log(this.formData.email + ' 110')
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
.custom-input {
  background-color: rgba(117, 117, 117, 0.3);
  border: none; /* ลบเส้นขอบทั้งหมด */
  height: 100%;
  width: 100%; 
  border-bottom: 1px solid #908E8E; /* กำหนดเฉพาะขอบล่าง */
  color: black;

}

.custom-input:hover {
  border-bottom: 1px solid #000; /* ขอบล่างเปลี่ยนเมื่อ hover */
}

.custom-input:focus {
  outline: none; /* ลบเส้นขอบเมื่อโฟกัส ที่บางเบราว์เซอร์อาจเพิ่มให้ */
  border-bottom: 2px solid #000; /* ขอบล่างเปลี่ยนเมื่อโฟกัส */
}
.custom-input::placeholder {
  color: #000; /* เปลี่ยนสีของ placeholder */
  opacity: 1; /* บางเบราว์เซอร์อาจตั้งค่าความเข้มของสีให้ต่ำ สามารถปรับได้ที่นี่ */
 
}
@media only screen and (min-width: 600px) {
  .custom-input {
  background-color: rgba(117, 117, 117, 0.3);
  border: none; /* ลบเส้นขอบทั้งหมด */
  height: 10vh;
  width: 100%; 
  border-bottom: 1px solid #908E8E; /* กำหนดเฉพาะขอบล่าง */
  color: black;
}

}
</style>
