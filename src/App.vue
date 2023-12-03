<template>
  <v-app>
    <div class="layout-container">
      <Navbar />

      <div class="right-section">
        <TopNavBar />
        <div class="content">
          <slot></slot>
          <!-- Add any other common elements or footers here -->
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <router-view />
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import Navbar from './components/navbar.vue'
import TopNavBar from './components/TopNavBar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    TopNavBar
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
  font-family: 'Athiti', 'Avenir', 'Helvetica', 'Arial', 'sans-serif';
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
