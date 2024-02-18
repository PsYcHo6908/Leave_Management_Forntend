<template>
  <div class="layout-container">
    <Navbar />

    <div class="right-section">
      <TopNavBar />
      <div class="content-Page">
        <slot></slot>

        <div class="head-request">แจ้งลา</div>
      </div>
      <div class="content">
        <v-data-table-server
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items-length="totalItems"
          :items="serverItems"
          :loading="loading"
          item-value="name"
          @update:options="loadItems"
        >
          <!-- Add a new column for the buttons -->
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
              <td>{{ item.fat }}</td>
              <td>{{ item.carbs }}</td>
              <td>{{ item.protein }}</td>
              <td>{{ item.iron }}</td>

              <!-- Approve button -->
              <td>
                <v-btn @click="approveRecord(item)" color="green" dark>
                  Approve
                </v-btn>
              </td>

              <!-- Reject button -->
              <td>
                <v-btn @click="rejectRecord(item)" color="red" dark>
                  Reject
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table-server>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/navbar.vue'
import TopNavBar from '../components/TopNavBar.vue'

const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22'
  }
]

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
    headers: [
      {
        title: 'รายชื่อวิชา',
        align: 'start',
        sortable: false,
        key: 'name'
      },
      { title: 'หมู่เรียน', key: 'calories', align: 'end' },
      { title: 'วันที่', key: 'fat', align: 'end' },
      { title: 'เวลา', key: 'carbs', align: 'end' },
      { title: 'เทอม', key: 'protein', align: 'end' },
      { title: 'ประเภทการลา', key: 'iron', align: 'end' },
      { title: '', key: 'iron', align: 'end' }
    ],
    loaded: false,
    loading: false,
    leaveType: ['ลาป่วย', 'ลากิจ'],
    serverItems: [],
    loading: true,
    totalItems: 0
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
    onClick () {
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.loaded = true
        }, 2000)
      },
  },
  components: {
    Navbar,
    TopNavBar
  }
}
</script>
<style>
@media screen and (min-width: 1900px) {
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
}
</style>
