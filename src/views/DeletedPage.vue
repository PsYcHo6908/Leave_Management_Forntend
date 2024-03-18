<template>
  <div class="deleted-page">
    <h1>ข้อมูลถูกลบเรียบร้อยแล้ว</h1>
    <router-link to="/request">กลับสู่หน้าหลัก</router-link>
  </div>
</template>

<script>
export default {
  // Add any necessary logic or data properties here
}
</script>

<style scoped>
.deleted-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
</style>
