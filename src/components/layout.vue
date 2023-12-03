<!-- Layout.vue -->
<template>
  <div class="layout-container">
    <div class="left-section">
      <Navbar />
    </div>
    <div class="right-section">
      <NavigationBar />
      <slot></slot>
      <!-- Add any other common elements or footers here -->
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'; // Adjust the path based on your project structure
import NavigationBar from '@/components/navigationBar.vue';
export default {
  components: {
    NavigationBar,
    Navbar
  },
};
</script>

<style scoped>
.layout-container {
  display: flex;
}

.left-section {
  /* flex: 0 0 auto; */
}

.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
}
body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
