<template lang="">
  <div class="layout-container">
    <Navbar />

    <div class="right-section">
      <TopNavBar />
      <div class="content-Page">
        <slot></slot>

        <div class="head">ยินดีต้อนรับเข้าสู่ระบบการลา</div>
      </div>
      <div class="content">
        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKasetsartUniversity&tabs&width=500&height=70&small_header=false&adapt_container_width=false&hide_cover=true&show_facepile=false&appId" width="500" height="150" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        <div class="youtube-layout">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/45IpJgnGHDI?si=K6ayJ3VBgsXrFUa5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/Sf6Q4dY309I?si=2g0ZmQqAwA3ja6Sp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/navbar.vue'
import TopNavBar from '../components/TopNavBar.vue'
export default {
  components: {
    Navbar,
    TopNavBar
    // Demo,
  }
}
</script>
<style>
.content {
  border-top: solid 6px #02bc77;
  border-radius: 5px;
}
.head {
  font-size: 28px;
  font-weight: 600;
  margin: 0% 2.5%;
  padding: 1% 0% 2% 0%;
}
.youtube-layout {
    display: flex;
}
</style>
