"
<template>
  <v-container class="background1">
    <div class="img1">
      <img src="../assets/logo-1.png" width="200" height="250" />
    </div>
    <div class="rec2">
      <form class="block1" v-on:submit.prevent="submitform">
        <label for="firstname" class="name1">ชื่อ</label>
        <label for="lastname" class="name1">นามสกุล</label>
        <input
          type="text"
          v-model="formData.fname"
          id="inputname"
          name="inputname"
          placeholder=""
        />
        <input
          type="text"
          v-model="formData.lname"
          id="inputname"
          name="inputname"
          placeholder=""
        />
        <label for="studentId">รหัสนิสิต</label>
        <input
          type="text"
          v-model="formData.user_id"
          id="studentId"
          name="studentId"
          placeholder=""
        />
        <label for="email">อีเมล</label>
        <input
          type="text"
          v-model="formData.email"
          id="email"
          name="email"
          placeholder=""
        />
        <label for="user">username</label>
        <input
          type="text"
          v-model="formData.username"
          id="user"
          name="user"
          placeholder=""
        />

        <label for="password">รหัสผ่าน</label>
        <input
          :type="passwordVisible ? 'text' : 'password'"
          v-model="formData.password1"
          id="passwordInput"
          name="passwordInput"
          placeholder=""
        />
        <button class="eye-icon" v-on:click.prevent="togglePasswordVisibility">
          <img src="../assets/view.png" width="25" height="25" />
        </button>
        <label for="password">ยืนยันรหัสผ่าน</label>
        <input
          :type="confirmpasswordVisible ? 'text' : 'password'"
          v-model="formData.password2"
          id="passwordInput"
          name="passwordInput"
          placeholder=""
        />
        <!-- notification -->
        <button
          class="eye-icon"
          v-on:click.prevent="toggleConfirmPasswordVisibility"
        >
          <img src="../assets/view.png" width="25" height="25" />
        </button>
        <template v-if="errors.length > 0">
          <div class="bg-red-300 text-white rounded-lg p-6">
            <p v-for="i in errors" v-bind:key="i">{{ i }}</p>
          </div>
        </template>
        <button class="logInButton">เข้าสู่ระบบ</button>
      </form>
      <!-- <div class="box1"></div>
      <div class="box2"></div> -->
    </div>
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
      user_id: '',
      email: '',
      role: ''
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
        console.log(this.formData.email + ' 110')
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
@media screen and (min-width: 1900px) {
  .rec2 {
    width: 30%;
    height: 68%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 0%;
    border-radius: 40px;
    z-index: 1;
  }
  .img1 {
    margin: 3% 44.6% !important;
    margin-bottom: 2% !important;
  }
  form.block1 {
    margin: auto 5%;
  }
  input[type='text'],
  input[type='password'] {
    width: 100%;
    padding: 8px 20px;
    margin: 16px 0;
    display: inline-block;
    border: 1px solid #bdbcc4;
    border-radius: 50px;
    box-sizing: border-box;
    background-color: #bdbcc4;
  }
  label {
    /* padding: 0 0 30% 0; top right bottom left */
    font-size: 18px;
    font-family: 'Prompt', sans-serif;
  }
  .logInButton {
    color: white;
    font-size: 20px;
    border: 1px solid #03a96b;
    background-color: #03a96b;
    width: 80%;
    padding: 2% 0%;
    border-radius: 25px;
    margin: 10%;
  }
  button.eye-icon {
    position: absolute;
    margin: 1.3% -2% 0;
  }
  .background1 {
    background: url('../assets/SignUp-1.jpg');
    background-size: cover;
    height: 100vh;
    position: absolute;
  }
  .v-container {
    max-width: 1900px !important;
  }
  input#inputname {
    width: 48%;
    margin-right: 2%;
  }
  label.name1 {
    display: inline-flex;
    width: 50%;
  }
}
@media screen and (max-width: 1440px) {
  .rec2 {
    width: 40%;
    height: 75%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: -2%;
    border-radius: 40px;
    z-index: 1;
  }
  .img1 {
    margin: 3% 44.6% !important;
    margin-bottom: 2% !important;
  }
  form.block1 {
    margin: 5%;
  }
  input[type='text'],
  input[type='password'] {
    width: 100%;
    padding: 8px 20px;
    margin: 16px 0;
    display: inline-block;
    border: 1px solid #bdbcc4;
    border-radius: 50px;
    box-sizing: border-box;
    background-color: #bdbcc4;
  }
  label {
    /* padding: 0 0 30% 0; top right bottom left */
    font-size: 18px;
    font-family: 'Prompt', sans-serif;
  }
  .logInButton {
    color: white;
    font-size: 20px;
    border: 1px solid #03a96b;
    background-color: #03a96b;
    width: 80%;
    padding: 2% 0%;
    border-radius: 25px;
    margin: 10%;
    margin-top: 3%;
  }
  button.eye-icon {
    position: absolute;
    margin: 1.7% -3% 0;
}
  .background1 {
    background: url('../assets/SignUp-1.jpg');
    background-size: cover;
    height: 100vh;
    position: absolute;
  }
  .v-container {
    max-width: 1900px !important;
  }
  input#inputname {
    width: 48%;
    margin-right: 2%;
  }
  label.name1 {
    display: inline-flex;
    width: 50%;
  }
}
</style>
