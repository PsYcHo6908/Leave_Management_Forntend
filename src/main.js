import './assets/main.css'

import axios from 'axios'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

import '@mdi/font/css/materialdesignicons.min.css';

// VueSweetalert2
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

axios.defaults.baseURL = 'http://127.0.0.1:8000' // Set the base URL to your Django server

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives
})
app.use(VueSweetalert2);
app.use(createPinia())
app.use(router, axios) //install axios
app.use(vuetify)

app.mount('#app')
