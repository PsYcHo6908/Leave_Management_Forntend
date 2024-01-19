<template>
  <div class="layout-container">
    <Navbar />
    <div class="right-section">
      <TopNavBar />
      <div class="content-Page">
        <slot></slot>
        <v-row>
          <v-col cols="12" >แจ้งลา</v-col>
        </v-row>
      </div>
      <div class="content">
        <slot></slot>

        <!-- Student Info Row -->
        <v-row>
          <v-col cols="12" md="6">
            <div class="leaveblock1">
              <div class="content-head">ชื่อ</div>
              <div class="content-name">พงศ์ศิริ เจริญกฤตยาวุฒิ</div>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="leaveblock1">
              <div class="content-head">รหัสนิสิต</div>
              <v-text-field v-model="studentId" label="Student ID" placeholder="Enter student ID..." class="mt-3" style="width: 100%;"></v-text-field>
            </div>
          </v-col>
        </v-row>

        <!-- Leave Information Row -->
        <v-row>
          <v-col cols="12" md="6">
            <div class="leaveblock0">
              <div class="leaveblock1">
                <div class="content-head mt-3">New Dropdown</div>
                <v-select v-model="newDropdownValue" :items="newDropdownOptions" style="width: 100%;"></v-select>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="leaveblock0">
              <div class="leaveblock1">
                <div class="content-head mt-3">รายชื่อวิชา</div>
                <v-select v-model="selectedSubject" :items="subjects" style="width: 100%;"></v-select>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- Additional Input Row 1 col -->
        <v-row>
          <v-col cols="12" md="6">
            <div class="leaveblock1">
              <div class="content-head mt-3">Additional Input</div>
              <v-text-field v-model="additionalInput" label="Additional Input" placeholder="Type something..." class="mt-3" style="width: 100%;"></v-text-field>
            </div>
          </v-col>

          <!-- Date and Time Pickers in the same row -->
          <v-col cols="12" md="6">
            <div class="leaveblock1">
              <div class="content-head mt-3">Additional Input</div>
              <v-text-field v-model="additionalInput" label="Additional Input" placeholder="Type something..." class="mt-3" style="width: 100%;"></v-text-field>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-date-picker ></v-date-picker>
          </v-col>
          <v-col cols="12" md="6">
            <div class="leaveblock1">
              <div class="content-head mt-3">Additional Input</div>
              <v-text-field v-model="additionalInput" label="Additional Input" placeholder="Type something..." class="mt-3" style="width: 100%;"></v-text-field>
            </div>
          </v-col>
        </v-row>
        <!-- Date and Time Pickers Row -->
        <!-- <v-row>
          <v-col cols="12">
            <div class="leaveblock0">
              <div class="leaveblock1">
                <div class="content-head mt-3">วันที่</div>
                <v-date-picker v-model="selectedDate" show-current="true" style="width: 100%;"></v-date-picker>
              </div>
            </div>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col cols="12" md="6">
            <v-btn class="submit" @click="submitForm">ส่ง</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<!-- ... rest of the component ... -->


<script>
import Navbar from '../components/navbar.vue'
import TopNavBar from '../components/TopNavBar.vue'

export default {
  data() {
    return {
      subjects: ['Subject 1', 'Subject 2', 'Subject 3'],
      sections: ['Section A', 'Section B', 'Section C'],
      leaveTypes: ['Type 1', 'Type 2', 'Type 3'],
      newDropdownOptions: ['Option 1', 'Option 2', 'Option 3'],
      studentId: '',
      selectedSubject: '',
      selectedSection: '',
      selectedDate: '',
      selectedTime: '',
      selectedLeaveType: '',
      attachment: null,
      description: '',
      additionalInput: '',
      newDropdownValue: '',
    };
  },
  components: {
    Navbar,
    TopNavBar,
  },
  methods: {
    submitForm() {
      console.log('Form submitted');
      console.log('Student ID:', this.studentId);
      console.log('New Dropdown Value:', this.newDropdownValue);
      console.log('Additional Input:', this.additionalInput);
    },
  },
};
</script>

<style scoped>
/* Add scoped styles here */
</style>
