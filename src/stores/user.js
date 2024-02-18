import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',

    state: () => ({
        user: {
            isAuthenticated: false,
            id: null,
            user_id: null,
            username: null,
            email: null,
            access: null,
            refresh: null,
            role: null,
            name: null,
        }
    }),

    actions: {
        initStore() {
            //use when want to take data from the local storage
            console.log('initStore', localStorage.getItem('user.access'))

            if (localStorage.getItem('user.access')) {
                console.log('User has access!')

                // ถ้าอยากรู้ว่า localStorage get มาจากค่าใดให้ดูตอน set
                this.user.access = localStorage.getItem('user.access')
                this.user.refresh = localStorage.getItem('user.refresh')
                this.user.id = localStorage.getItem('user.id')
                this.user.user_id = localStorage.getItem('user.user_id')
                this.user.username = localStorage.getItem('user.username')
                this.user.email = localStorage.getItem('user.email')
                this.user.role = localStorage.getItem('user.role')
                this.user.name = localStorage.getItem('user.name')
                this.user.isAuthenticated = true

                this.refreshToken()

                console.log('Initialized user:', this.user)
            }
        },
        setToken(data) {
            console.log('setToken', data)

            this.user.access = data.access
            this.user.refresh = data.refresh
            this.user.isAuthenticated = true

            localStorage.setItem('user.access', data.access)
            localStorage.setItem('user.refresh', data.refresh)

            console.log('user.access: ', localStorage.getItem('user.access'))
        },

        removeToken() {
            console.log('removeToken')

            this.user.refresh = null
            this.user.access = null
            this.user.isAuthenticated = false
            this.user.id = null
            this.user.user_id = null
            this.user.username = null
            this.user.email = null
            this.user.role = null
            this.user.name = null

            localStorage.setItem('user.access', '')
            localStorage.setItem('user.refresh', '')
            localStorage.setItem('user.id', '')
            localStorage.setItem('user.user_id', '')
            localStorage.setItem('user.username', '')
            localStorage.setItem('user.email', '')
            localStorage.setItem('user.role', '')
            localStorage.setItem('user.name', '')

        },

        async setUserInfo(user) {
            console.log('setUserInfo', user)

            this.user.id = user.id
            this.user.user_id = user.user_id
            this.user.username = user.username
            this.user.email = user.email
            this.user.role = user.role


            localStorage.setItem('user.id', this.user.id)
            localStorage.setItem('user.user_id', this.user.user_id)
            localStorage.setItem('user.username', this.user.username)
            localStorage.setItem('user.email', this.user.email)
            localStorage.setItem('user.role', this.user.role)

            if (this.user.role === 'teacher') {
              const url = `/teacher/?user_id=${this.user.id}`;
              await axios
              .get(url)
              .then((response) => {
                let loginTeacher = response.data[0]

                this.user.name = loginTeacher.fname + ' ' + loginTeacher.lname
                localStorage.setItem('user.name', this.user.name)

              })
              .catch((error) => {
                console.log('error', error)
              })
            }
            else{
              if (this.user.role === 'student') {
                const url = `/student/?user_id=${this.user.id}`;
                await axios
                .get(url)
                .then((response) => {
                  let loginStudent = response.data[0]
  
                  this.user.name = loginStudent.fname + ' ' + loginStudent.lname
                  localStorage.setItem('user.name', this.user.name)
  
                })
                .catch((error) => {
                  console.log('error', error)
                })
  
              }
              else{
                localStorage.setItem('user.name', Admin)
              }
            }
            console.log('User', this.user)
        },

        refreshToken() {
          console.log('Refresh')
            axios.post('/api/refresh/', {

                refresh: this.user.refresh
            })
                .then((response) => {
                    this.user.access = response.data.access

                    localStorage.setItem('user.access', response.data.access)

                    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access
                })
                .catch((error)=>{
                    console.log(error)

                    this.removeToken()
                })
        },
    }
})
