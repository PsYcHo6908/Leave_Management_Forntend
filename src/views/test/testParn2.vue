<template>

  <div>
    <form @submit.prevent="saveFile()">
      <div class="form-group">
        <label for="exampleFormControlFile1" class="float-left mt-2">Browse A file</label>
        <input type="file" class="form-control" @change="uploadedFile" ref="file">
      </div>
      <!-- <button type="submit" onclick={saveFile} class="btn btn-primary">Save</button> -->
      <v-btn class="submit" type="submit" >Save</v-btn>
      <br />
      <br />
      <br />
      <br />
      <h3>Status</h3>
    </form>
  </div>
  <div>
    <h2 class="alert alert-success">List of Uploaded Files</h2>
    <table class="table table-bordered mt-4">
      <thead>
        <tr>
          <th scope="col">File Title</th>
          <th scope="col">Downlode</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in files">
          <td>{{file.pdf}}</td>
          <td>
            <a href="" target="_blank"></a>
            <v-btn class="submit" type="submit" @click="dowloadWithAxios(file.pdf, file.id)">Dowload</v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
data() {
return {
  files: [],
  upload_status: '',
  filename: '',

}
},
mounted(){
console.log('DOM mounted')

},
created(){
console.log('DOM Created')
this.getFile()
},
methods: {
async saveFile() {
  let formData = new FormData();
  formData.append("pdf", this.filename)
  let axiosConfig = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  await axios.post('/files/', formData, axiosConfig).then(
    response => {
      console.log(response)
      this.upload_status = 'File Upload Success'


    }
  ).catch(error => {
    console.log(error)
  })
},

async getFile() {


  await axios.get('/files/').then(
    response => {
      console.log(response.data)
      this.files = response.data

    }
  ).catch(error => {
    this.upload_status= 'File NOt Upload Success'
  })
},
uploadedFile(){
  // Clear previous filename
  this.filename = '';
  // Set new filename
  this.filename = this.$refs.file.files[0]
  console.log(this.filename)

},
dowloadWithAxios(url, title){
  axios({
    method: 'get',
    url,
    responseType: 'arraybuffer',

  }).then(response =>{
    this.forceDownload(response, title)
  }).catch((error) => console.log(error))
},
forceDownload(response, title){
  const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}))
  const link = document.createElement('a')
  link.href = url
  // link.setAttribute('download', title+'.pdf') // Corrected the typo here
  link.setAttribute('download', `${title}.pdf`);
  document.body.appendChild(link)
  link.click()
}
// forceDownload(response, title){
//   const url = window.URL.createObjectURL(new Blob([response.data]))
//   const link = document.createElement('a')
//   link.href = url
//   link.setAttribute('dowload', title+'.pdf')
//   document.body.appendChild(link)
//   link.click()

// }
}
}
</script>
