<!-- navbar.vue -->
<template>
  <v-card style="min-height: 100vh ;" :style="{ width: leftSectionWidth , height: '100%', zIndex: 1000}" @mouseover="expandNavbar" @mouseleave="collapseNavbar">
    <v-layout style="height: 100%;">
      <v-navigation-drawer
        expand-on-hover
        rail
        class="black-background"
        style="position: fixed"
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
            class="white-text"
          ></v-list-item>
        </v-list>

        <v-divider class="white-text" ></v-divider>

        <!-- v-if="mode !== 'create' && formData.contact_type === 'company'" -->



        <!-- nav bar student -->
        <v-list density="compact" nav v-if="userLoginRole === 'student' ">
          <RouterLink to="/home">
            <v-list-item prepend-icon="mdi-home" title="หน้าแรก" value="home" class="white-text"></v-list-item>
          </RouterLink>
          <RouterLink to="/leavepaper">
            <v-list-item prepend-icon="mdi-email-fast-outline" title="แจ้งลา" value="leavepaper" class="white-text"></v-list-item>
          </RouterLink>
          <RouterLink to="/request">
            <v-list-item prepend-icon="mdi-file-document-edit-outline" title="คำขอลาทั้งหมด" value="request" class="white-text"></v-list-item>
          </RouterLink>
        </v-list>



        <!-- nav bar teacher -->
        <v-list density="compact" nav v-if="userLoginRole === 'teacher' ">
          <RouterLink to="/home">
            <v-list-item prepend-icon="mdi-home" title="หน้าแรก" value="home" class="white-text"></v-list-item>
          </RouterLink>
          <RouterLink to="/request">
            <v-list-item prepend-icon="mdi-file-document-edit-outline" title="คำขอลาทั้งหมด" value="leavepaper" class="white-text"></v-list-item>
          </RouterLink>
          <RouterLink to="/home">
            <v-list-item 
            prepend-icon="mdi-magnify" 
            title="ค้นหาการลาตามเงื่อนไข" 
            value="search" 
            class="white-text"
            >
          </v-list-item>
          </RouterLink>
          <RouterLink to="/home">
            <v-list-item 
            prepend-icon="mdi-file-document-multiple-outline
            " title="รายงานสรุปการลา" 
            value="report" 
            class="white-text"
            >
            </v-list-item>
          </RouterLink>
        </v-list>


        <!-- navbar Admin -->
        <v-list density="compact" nav v-if="userLoginRole === 'admin' ">
          <RouterLink to="/signup">
            <v-list-item prepend-icon="mdi-folder" title="ลงทะเบียน" value="myfiles" class="white-text"></v-list-item>
          </RouterLink>
          <RouterLink to="/addFaculty">
            <v-list-item prepend-icon="mdi-star" title="เพิ่มคณะ" value="starred" class="white-text"></v-list-item>
          </RouterLink>
          <RouterLink to="/addSubject">
            <v-list-item prepend-icon="mdi-star" title="เพิ่มวิชา" value="starred" class="white-text"></v-list-item>
          </RouterLink>  
        </v-list>

      </v-navigation-drawer>

      <!-- <v-main ></v-main> -->
      <v-main class="content"></v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  setup() {
    const userStore = useUserStore()
    return {
      userStore,
    }
  },
  name: 'Navbar',
  data() {
    return {
      leftSectionWidth: 'auto',
      userLoginRole: '',
    };
  },
  mounted() {
    this.userLogin()
  },
  methods: {
    expandNavbar() {
      this.leftSectionWidth = '200px';
    },
    collapseNavbar() {
      this.leftSectionWidth = 'auto';
    },
    userLogin() {
      this.userStore.initStore()
      this.userLoginRole = this.userStore.user.role
    }
  },
};
</script>

<style scoped>
.black-background {
  background-color: #262626; /* ตั้งค่าสี background เป็นสีดำ */
}
.white-text {
  color: #f7f2f3; /* ตั้งค่าสีของ text เป็นสี accent */
}
.content {
  min-height: auto;
  height: 100%;
}


</style>
