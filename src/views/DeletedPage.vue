<template>
  <div class="layout-container">
    <Navbar />

    <div class="right-section">
      <TopNavBar />
      <div class="content-Page">
        <slot></slot>
        <div class="deleted-page">
          <h1>ข้อมูลถูกลบเรียบร้อยแล้ว</h1>
          <router-link to="/request" class="back-button">กลับสู่หน้าหลัก</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/navbar.vue'
import TopNavBar from '../components/TopNavBar.vue'
export default {
  // Add any necessary logic or data properties here
  components: {
    Navbar,
    TopNavBar
  }
}
</script>

<style scoped>
.deleted-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

.deleted-page h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.deleted-page router-link {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}
.back-button {
 appearance: none;
 background-color: transparent;
 border: 0.125em solid #10B981;
 border-radius: 0.9375em;
 box-sizing: border-box;
 color: #3B3B3B;
 cursor: pointer;
 display: inline-block;
 font-size: 16px;
 font-weight: 500;
 line-height: normal;
 margin: 0;
 min-height: 3.75em;
 min-width: 0;
 outline: none;
 padding: 1em 2.3em;
 text-align: center;
 text-decoration: none;
 transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
 user-select: none;
 -webkit-user-select: none;
 touch-action: manipulation;
 will-change: transform;
}

.back-button:disabled {
 pointer-events: none;
}

.back-button:hover {
 color: #fff;
 background-color: #10B981;
 box-shadow: rgba(0, 79, 14, 0.405) 0 8px 15px;
 transform: translateY(-2px);
}

.back-button:active {
 box-shadow: none;
 transform: translateY(0);
}
</style>
