<template>
  <img src="../../assets/SignUp-1.jpg" width="500" height="500" />
  <div>
    <v-img class="mx-auto my-6" max-width="228" :src="imagePath"></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="account"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a
        >
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        v-model="password"
      ></v-text-field>

      <v-card class="mb-12" color="surface-variant" variant="tonal"> </v-card>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        @click="submitForm"
      >
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
  <!-- <h1>{{ account }}</h1> -->
</template>
<script>
export default {
  data: () => ({
    visible: false,
    imagePath: '../assets/SignUp-1.jpg',
    account: ''
  }),
  methods: {
    submitForm() {
      // Your method logic goes here
      console.log('1234566666666')
      console.log(this.account)
      this.account = 'Parn'
      console.log(this.account)
      console.log(this.password)
    },
    submitPass() {
      console.log('111111111111111111111111111')
    }
  }
}
</script>
<style></style>
