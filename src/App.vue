<template>
  <v-app>
    <!-- <div class="layout-container">
      

      <div class="right-section">
        
        <div class="content">
          <slot></slot>
          
          
          <router-view />
        </div>
      </div>
    </div> -->
    <router-view />
    <Toast />
  </v-app>
</template>

<script>
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import TopNavBar from './components/TopNavBar.vue'
import Navbar from './components/navbar.vue'

export default {
  setup() {
    const userStore = useUserStore()
    return {
        userStore
    }
  },
  name: 'App',
  components: {
    Navbar,
    TopNavBar
  },
  beforeCreate() {
      this.userStore.initStore()

      const token = this.userStore.user.access

      if (token) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      } else {
          axios.defaults.headers.common["Authorization"] = "";
      }
  },
  data() {
    return {}
  }
}
</script>

<style>
/* Add global styles here */
body {
  margin: 0;
  padding: 0;
  font-family: 'Prompt', sans-serif;
  height: 100vh;
}

.layout-container {
  display: flex;
}

.left-section {
  flex: 0 0 auto;
  /* Optional: You can set a width for the Navbar here if needed */
  /* width: 200px; */
}

.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 20px; /* Adjust as needed */
  flex: 1;
}
</style>
