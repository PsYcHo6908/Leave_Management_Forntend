<template>
  <div class="right-section">
    <TopNavBar />
    <div class="content-Page">
      <slot></slot>

      <!-- Logo -->
      <div class="img1">
        <img src="../../assets/logo-1.png" />
      </div>

      <!-- Card -->
      <v-container fluid>
        <v-row align="center">
          <v-col cols="12" md="6" offset-md="3">
            <v-card
              class="mx-auto pa-12 pb-8"
              rounded="xl"
              color="rgba(255, 255, 255, 0.5)"
              style="padding: 20px"
            >
              <v-card-title style="color: #757575; padding: 0px; border: 30">
                คณะ/ภาควิชา
              </v-card-title>

              <!-- Form -->
              <v-form @submit.prevent="submitform">
                <!-- Faculty -->
                <v-row>
                  <v-col cols="12">
                    <div class="content-head mt-3">Faculty</div>
                    <v-text-field
                      type="text"
                      v-model="formData.name"
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>

                
                <!-- notification error section -->
                <template v-if="errors.length > 0">
                  <div class="bg-red-300 text-white rounded-lg p-6">
                    <p v-for="i in errors" v-bind:key="i">{{ i }}</p>
                  </div>
                </template>

                <v-btn class="logInButton" type="submit">Register</v-btn>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { useToastStore } from '@/stores/toast'
import axios from 'axios'
import TopNavBar from '../../components/TopNavBar.vue'
export default {
  setup() {
    const toastStore = useToastStore()

    return {
      toastStore
    }
  },

  data: () => ({
    formData: {
      name: '',
    },
    errors: [],
    //created
  }),
  components: {
    TopNavBar
  },
  methods: {
    submitform() {
      console.log(this.formData)
      this.errors = []

      if (this.formData.name === '') {
        this.errors.push('Your faculty name is missing')
      }


      if (this.errors.length === 0) {
        axios
          .post('/education/faculty/', this.formData)
          .then((response) => {
            this.formData.name = ''
            // if (response.data.message === 'success') {
            //   this.toastStore.showToast(
            //     10000,
            //     'Successfully created Faculties',
            //     'bg-emerald-500'
            //   )
            // } else {
            //   console.error(response.data.message)
            //   const data = JSON.parse(response.data.message)
            //   for (const key in data) {
            //     this.errors.push(data[key][0].message)
            //   }

            //   this.toastStore.showToast(
            //     5000,
            //     'Something went wrong. Please try again',
            //     'bg-red-300'
            //   )
            // }
          })
          .catch((error) => {
            // this.toastStore.showToast(10000, 'Server Problem', 'bg-red-300')
            // console.log('error', error)
          })
      }
    }
  }
}
</script>

<style>
#input-0,
#input-5 {
  border: none !important;
  background-color: transparent !important;
}
.v-combobox__selection {
  border: none !important;
  background-color: transparent !important;
}
.img1 {
  display: flex;
  justify-content: center; /* จัดให้อยู่ตรงกลางแนวนอน */
  align-items: center; /* จัดให้อยู่ตรงกลางแนวตั้ง */
}
</style>
