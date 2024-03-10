<template>
  <div class="layout-container">
    <Navbar />

    <div class="right-section">
      <TopNavBar />
      <div class="content-Page">
        <slot></slot>

        <div class="head-request">คำขอลาทั้งหมด</div>
      </div>
      <div class="content">
        <v-row v-if="serverItems && serverItems.length > 0">
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="serverItems"
              :items-per-page="itemsPerPage"
              class="elevation-1"
            >
              <!-- Add a new column for the buttons -->
              <template v-slot:item.requestTable="{ item }">
                <v-table
                  :headers="headers"
                  :items="requestItems"
                  :items-per-page="itemsPerPage"
                  class="elevation-1"
                >
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>{{ item.calories }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/navbar.vue'
import TopNavBar from '../components/TopNavBar.vue'

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const items = desserts.slice()

        if (sortBy.length) {
          const sortKey = sortBy[0].key
          const sortOrder = sortBy[0].order
          items.sort((a, b) => {
            const aValue = a[sortKey]
            const bValue = b[sortKey]
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
          })
        }

        const paginated = items.slice(start, end)

        resolve({ items: paginated, total: items.length })
      }, 500)
    })
  }
}

export default {
  data: () => ({
    itemsPerPage: 5,
    loaded: false,
    loading: false,
    leaveType: ['ลาป่วย', 'ลากิจ'],
    serverItems: [],
    loading: true,
    totalItems: 0,
    requestItems: [],
    headers: [
      { text: 'Subject', value: 'subjectsTable' },
      { text: 'section', value: 'sectionTable' },
      { text: 'date', value: 'date' },
      { text: 'time', value: 'time' },
      { text: 'semester', value: 'semester' },
      { text: 'leaveType', value: 'leaveType' },
    ],
  }),
  methods: {
    loadItems({ page, itemsPerPage, sortBy }) {
      this.loading = true
      FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
        this.serverItems = items
        this.totalItems = total
        this.loading = false
      })
    },
    handleButtonClick() {
      // Your button click logic goes here
      console.log('Button clicked!')
    },
    // New methods for handling approve and reject actions
    approveRecord(record) {
      // Your approve logic goes here
      console.log('Approving record:', record)
    },
    rejectRecord(record) {
      // Your reject logic goes here
      console.log('Rejecting record:', record)
    },
    onClick() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    },
    addItem() {
      const isSubjectExists = this.serverItems.some(item =>
        item.subjectsTable && item.subjectsTable.id === this.selectedSubjects.id
      );
      const newItem = {
        subjectsTable: this.selectedSubjects,
        sectionTable: this.selectedTeachers
      };
    }
  },
  components: {
    Navbar,
    TopNavBar
  }
}
</script>
<style>
@media screen and (max-width: 1900px) {
  .content-Page {
    display: flex;
  }
  .head-request {
    font-size: 30px;
    font-family: 'Prompt';
    font-weight: 600;
    margin-left: 2%;
    padding: 2% 0%;
    width: 100%;
  }
  .head {
  font-size: 28px;
  font-weight: 600;
  margin: 0% 2.5%;
  padding: 1% 0% 2% 0%;
}
}
</style>
