<template>
  <nav class="px-10 py-10 border-gray-200 bg-emerald-500 text-white top-0 z-10">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between">
        <div class="menu-left">
          <a href="#" class="text-xl">ระบบลา มหาวิทยาลัยเกษตรศาสตร์</a>
        </div>

        <div class="menu-center flex space-x-12"></div>

        <div class="menu-right flex items-center space-x-4">
          <button class="bell">
            <img src="../assets/bell.png" width="20" height="20">
          </button>

          <div class="TopNavBarid">{{ userId }}</div>

          <div class="TopNavBarid">{{ prefix }}</div>

          <div class="TopNavBarname">{{ userName }}</div>

          <button class="logout" @click="logout">
            <img src="../assets/power.png" width="20" height="20">
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { useUserStore } from '@/stores/user'
import axios from 'axios'
export default {
  setup() {
    const userStore = useUserStore()
    return {
        userStore,
        userId: userStore.user.user_id,
        userRole: userStore.user.role,
        id: userStore.user.id,
        // prefix: userStore.user.prefix,
    }
  },
  name: 'TopNavBar',
  async beforeCreate() {
      this.userStore.initStore()
      // await this.getPrefix()
  },
  async mounted() {
    await this.getPrefix()
  },
  computed: {
    userName() {
      return this.userStore.user.name;
    },
  },
  data: () => ({
      // getStudentLogin
      user: [],
      userIdLogin: '',
      userRole: '',

      userLogin: [],


  }),
  methods: {
    async getPrefix(){
      this.userStore.initStore()
      this.user = this.userStore.user
      this.userIdLogin = this.userStore.user.id
      this.userRole =this.userStore.user.role

      if (this.userIdLogin) {
        if(this.userRole==="student"){
          const url = `/student/?user_id=${this.userIdLogin}`
          await axios
            .get(url)
            .then((response) => {
              this.userLogin = response.data[0]
              this.prefix = this.userLogin.prefix
              // this.nameStudentLogin =
              //   this.student.fname + ' ' + this.student.lname
              // this.userIdStudentLogin = this.userStore.user.user_id
            })
            .catch((error) => {
              console.log('error', error)
            })

        }
        if(this.userRole==="teacher"){
          const url = `/teacher/?user_id=${this.userIdLogin}`
          await axios
            .get(url)
            .then((response) => {
              this.userLogin = response.data[0]
              this.prefix = this.userLogin.prefix
            })
            .catch((error) => {
              console.log('error', error)
            })

        }
        if(this.userRole==="admin"){
          this.prefix = "admin"
        }

      } else {
        this.prefix = ""
        this.userLogin = []
      }
    },
    logout(){
      this.userStore.removeToken()
      this.$router.push('/login')
  },
  }

}
</script>

<style>
.text-xl {
  font-family: 'Prompt', sans-serif;
}

@media screen and (min-width: 1900px) {
  .menu-right {
    display: flex;
  }

  button.bell {
    width: 15%;
    margin-left: 25%;
  }

  .TopNavBarid {
    width: 100%;
    font-size: 20px;
    margin-right: -60%;
    font-family: 'Prompt', sans-serif;
  }

  .TopNavBarname {
    width: 95%;
    margin-right: -30%;
    font-size: 20px;
    font-family: 'Prompt', sans-serif;
  }

  button.logout {
    width: 100%;
    margin-right: -170%;
  }
}
</style>
