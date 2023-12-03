<template>
  <v-card style="min-height: 100vh" :style="{ width: leftSectionWidth , height: '100%'}" @mouseover="expandNavbar" @mouseleave="collapseNavbar">
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

        <v-list density="compact" nav >
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles" class="white-text"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared" class="white-text"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred" class="white-text"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- <v-main ></v-main> -->
      <v-main class="content"></v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      leftSectionWidth: 'auto'
    };
  },
  methods: {
    expandNavbar() {
      this.leftSectionWidth = '200px';
    },
    collapseNavbar() {
      this.leftSectionWidth = 'auto';
    },
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
