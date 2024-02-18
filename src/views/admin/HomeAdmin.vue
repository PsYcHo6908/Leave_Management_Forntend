<template lang="">
  <div class="layout-container">
    <Navbar />

    <div class="right-section">
      <TopNavBar />
      <div class="content-Page">
        <slot></slot>

        <div class="head">ยินดีต้อนรับเข้าสู่ระบบการลา</div>
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>
<script>
import Navbar from '../../components/navbar.vue'
import TopNavBar from '../../components/TopNavBar.vue'
export default {
  components: {
    Navbar,
    TopNavBar
    // Demo,
  },
  
}
</script>
<style>
.content {
  border-top: solid 6px #02BC77;
  border-radius: 5px;
}
.head {
  font-size: 28px;
  font-weight: 600;
  margin: 0% 2.5%;
  padding: 1% 0% 2% 0%;
}
</style>
