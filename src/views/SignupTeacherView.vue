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
          v-model="formData.firstname"
          id="inputname"
          name="inputname"
          placeholder=""
          />
        <input
          type="text"
          v-model="formData.lastname"
          id="inputname"
          name="inputname"
          placeholder=""
          />
        <label for="studentId">รหัสนิสิต</label>
        <input
          type="text"
          v-model="formData.studentId"
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
          v-model="formData.password"
          id="passwordInput"
          name="passwordInput"
          placeholder=""
        />
        <button class="eye-icon" v-on:click.prevent="togglePasswordVisibility">
          <img src="../assets/view.png" width="25" height="25" />
        </button>
        <label for="password">ยืนยันรหัสผ่าน</label>
        <input
          :type="passwordVisible2 ? 'text' : 'password'"
          v-model="formData.passwordconfirm"
          id="passwordInput"
          name="passwordInput"
          placeholder=""
        />
        <button class="eye-icon" v-on:click.prevent="togglePasswordVisibility2">
          <img src="../assets/view.png" width="25" height="25" />
        </button>
        <button class="logInButton">เข้าสู่ระบบ</button>
      </form>
      <!-- <div class="box1"></div>
      <div class="box2"></div> -->
    </div>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    formData: {
      username: '',
      password: '',
      passwordconfirm: '',
      firstname: '',
      lastname: '',
      studentId: '',
      email: '',
    },
    passwordVisible: false,
    passwordVisible2: false
  }),
  methods: {
    submitform() {
      console.log('Username:', this.formData.username)
      console.log('Password:', this.formData.password)
    },
    togglePasswordVisibility() {
      console.log('777JewSuay')
      this.passwordVisible = !this.passwordVisible
    },
    togglePasswordVisibility2() {
      console.log('777JewSuay')
      this.passwordVisible2 = !this.passwordVisible2
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
