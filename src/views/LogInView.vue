"
<template>
  <div class="background">
    <img src="../assets/SignUp-1.jpg" width="100%" height="100%" />
  </div>
  <div class="img1">
    <img src="../assets/logo-1.png" width="200" height="250" />
  </div>
  <div class="rec">
    <form class="block1">
      <label for="fname">บัญชีผู้ใช้เครือข่ายนนทรี</label>
      <input type="text" id="fname" name="firstname" placeholder="" />

      <label for="lname">รหัสผ่าน</label>
      <input type="password" id="lname" name="lastname" placeholder="" />
      <button class="eye-icon">
        <img src="../assets/view.png" width="25" height="25" />
      </button>
      <button class="logInButton">เข้าสู่ระบบ</button>
    </form>
    <!-- <div class="box1"></div>
      <div class="box2"></div> -->
  </div>
</template>
<script>
export default {
  data: () => ({
    // visible: false,
    // imagePath: '../assets/SignUp-1.jpg',
    // account: ''
  }),
  methods: {
    printHello() {
      console.log('11111--------submitForm')
    }
  }
}
</script>
<style>
@media screen and (min-width: 1900px) {
  .background img {
    opacity: 100%;
  }
  .background {
    width: 100%;
    height: 666px;
    position: absolute;
    z-index: 0;
  }
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
  .box1 {
    width: 50%;
    height: 20%;
    background-color: rebeccapurple;
    margin: auto;
  }
  .box2 {
    width: 50%;
    height: 20%;
    background-color: blue;
    margin: auto;
  }
  .img1 {
    margin: 3% auto;
    margin-bottom: 2%;
    z-index: 1;
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
}
</style>
