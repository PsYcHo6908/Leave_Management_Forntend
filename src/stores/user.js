import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',

    state: () => ({
        user: {
            isAuthenticated: false,
            id: null,
            fname: null,
            lname: null,
            user_id: null,
            username: null,
            email: null,
            access: null,
            refresh: null,
            avatar: null
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
                this.user.fname = localStorage.getItem('user.fname')
                this.user.lname = localStorage.getItem('user.lname')
                this.user.email = localStorage.getItem('user.email')
                this.user.avatar = localStorage.getItem('user.avatar')
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
            this.user.fname = null
            this.user.lname = null
            this.user.email = null
            this.user.avatar = null

            localStorage.setItem('user.access', '')
            localStorage.setItem('user.refresh', '')
            localStorage.setItem('user.id', '')
            localStorage.setItem('user.user_id', '')
            localStorage.setItem('user.username', '')
            localStorage.setItem('user.fname', '')
            localStorage.setItem('user.lname', '')
            localStorage.setItem('user.email', '')
            localStorage.setItem('user.avatar', '')
        },

        setUserInfo(user) {
            console.log('setUserInfo', user)

            this.user.id = user.id
            this.user.user_id = user.user_id
            this.user.username = user.username
            this.user.fname = user.fname
            this.user.lname = user.lname
            this.user.email = user.email
            this.user.avatar = user.avatar

            localStorage.setItem('user.id', this.user.id)
            localStorage.setItem('user.user_id', this.user.user_id)
            localStorage.setItem('user.username', this.user.username)
            localStorage.setItem('user.fname', this.user.fname)
            localStorage.setItem('user.lname', this.user.lname)
            localStorage.setItem('user.email', this.user.email)
            localStorage.setItem('user.avatar', this.user.avatar)

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
