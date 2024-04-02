<template>
  <v-container class="background1">
    <div class="img1">
      <img src="../assets/logo-1.png" width="200" height="250" />
    </div>
    <div class="rec">
      <form class="block1_login" v-on:submit.prevent="submitform">
        <br />
        <label for="fname">บัญชีผู้ใช้เครือข่ายนนทรี</label>
        <input
          type="text"
          v-model="formData.username"
          id="fname"
          name="firstname"
          placeholder=""
        />

        <label for="password">รหัสผ่าน</label>
        <div class="flex items-center">
          <input
            :type="passwordVisible ? 'text' : 'password'"
            v-model="formData.password"
            id="passwordInput"
            name="lastname"
            placeholder=""
          />
          <button
            class="eye-icon"
            v-on:click.prevent="togglePasswordVisibility"
          >
            <img src="../assets/view.png" width="25" height="25" />
          </button>
        </div>

        <button class="logInButton">เข้าสู่ระบบ</button>
      </form>
      <!-- <div class="box1"></div>
      <div class="box2"></div> -->
    </div>
    <br />
    <template v-if="errors.length > 0">
      <div class="bg-red-300 text-white rounded-lg p-4 grid place-items-center">
        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
      </div>
    </template>
  </v-container>
</template>
<script>
import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
export default {
  setup() {
    const userStore = useUserStore()
    const toastStore = useToastStore()
    return {
      userStore,
      toastStore
    }
  },
  data: () => ({
    formData: {
      username: '',
      password: ''
    },
    passwordVisible: false,
    errors: []
  }),
  methods: {
    async submitform() {
      this.errors = []

      if (this.formData.username === '') {
        this.errors.push('โปรดกรอกชื่อผู้ใช้ของคุณ')
      }

      if (this.formData.password === '') {
        this.errors.push('โปรดกรอกรหัสผ่านของคุณ')
      }

      if (this.errors.length === 0) {
        await axios
          .post('/api/login/', this.formData)
          .then((response) => {
            this.userStore.setToken(response.data)
            console.log(response.data)
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + response.data.access
          })
          .catch((error) => {
            console.log('error', error)
            this.errors.push(
              'The formData or password is incorrect! Or the user is not activated!'
            )
          })
      }

      if (this.errors.length === 0) {
        await axios
          .get('/api/me/')
          .then((response) => {
            this.userStore.setUserInfo(response.data)
            console.log('testttttt')
            // console.log(localStorage.getItem('user.fname'))
            this.$router.push('/home')
          })
          .catch((error) => {
            console.log('error', error)
          })
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible
    }
  }
}
</script>
<style>
.rec {
  width: 30%;
  height: 44% !important;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 0%;
  border-radius: 40px;
  z-index: 1;
}
.img1 {
  margin: 3% 44.6%;
  margin-bottom: 2%;
}
form.block1_login {
  margin: auto 5% !important;
}
input[type='text'],
input[type='password'] {
  width: 95% !important;
  padding: 1px !important;
  margin: 16px 2% !important;
  display: inline-block;
  border: 1px solid #bdbcc4;
  border-radius: 50px;
  box-sizing: border-box;
  background-color: #bdbcc4;
}
label {
  /* padding: 0 0 30% 0; top right bottom left */
  font-size: 16px !important;
  font-family: 'Prompt', sans-serif;
}
.logInButton {
  color: white;
  font-size: 18px !important;
  border: 1px solid #03a96b;
  background-color: #03a96b;
  width: 80%;
  padding: 2% 0%;
  border-radius: 25px;
  margin: 10%;
  margin-top: 9% !important;
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
@media screen and (min-width: 1900px) {
  .rec {
    width: 30%;
    height: 45%;
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
  form.block1_login {
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
    font-size: 22px !important;
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
    position: absolute !important;
    margin: -3.9% 24% 0 !important;
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
}
@media screen and (max-width: 1900px) {
  .rec {
    width: 30%;
    height: 45%;
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
  form.block1_login {
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
    font-size: 22px !important;
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
    position: absolute !important;
    margin: -3.9% 24% 0 !important;
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
}
@media screen and (max-width: 1440px) {
  .rec {
    width: 30%;
    height: 45%;
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
  form.block1_login {
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
    font-size: 18px !important;
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
    position: absolute !important;
    margin: -5% 23% 0 !important;
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
}
@media screen and (max-width: 1191px) {
  .rec {
    width: 30%;
    height: 44% !important;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 0%;
    border-radius: 40px;
    z-index: 1;
  }
  .img1 {
    margin: 3% 44.6%;
    margin-bottom: 2%;
  }
  form.block1_login {
    margin: auto 5% !important;
  }
  input[type='text'],
  input[type='password'] {
    width: 95% !important;
    padding: 1px !important;
    margin: 16px 2% !important;
    display: inline-block;
    border: 1px solid #bdbcc4;
    border-radius: 50px;
    box-sizing: border-box;
    background-color: #bdbcc4;
  }
  label {
    /* padding: 0 0 30% 0; top right bottom left */
    font-size: 16px !important;
    font-family: 'Prompt', sans-serif;
  }
  .logInButton {
    color: white;
    font-size: 18px !important;
    border: 1px solid #03a96b;
    background-color: #03a96b;
    width: 80%;
    padding: 2% 0%;
    border-radius: 25px;
    margin: 10%;
    margin-top: 9% !important;
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
}
</style>
