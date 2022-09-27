<template>
  <div class="container mt-4">
    <h1>PhoneBook</h1>

    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="message.color"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ message.text }}
    </b-alert>

    <div class="row">
      <div class="col-12">
        <form @submit.prevent="editContact(contactEdit)" v-if="edit">
          <h3>Edit contact</h3>
          <input
            type="text"
            class="form-control my-2"
            placeholder="First Name"
            v-model="contactEdit.firstName"
          />
          <input
            type="text"
            class="form-control my-2"
            placeholder="Last Name"
            v-model="contactEdit.lastName"
          />
          <input
            type="text"
            class="form-control my-2"
            placeholder="Email"
            v-model="contactEdit.email"
          />
          <input
            type="text"
            class="form-control my-2"
            placeholder="Phone"
            v-model="contactEdit.phone"
          />
          <input
            type="text"
            class="form-control my-2"
            placeholder="Address"
            v-model="contactEdit.address"
          />

          <b-button class="btn-warning my-2 mx-2" type="submit">Edit</b-button>
          <b-button class="my-2" type="submit" @click="edit = false"
            >Cancel</b-button
          >
        </form>

        <form @submit.prevent="saveContact()" v-if="!edit">
          <h3>Add new contact</h3>
          <input
            type="text"
            class="form-control my-2"
            placeholder="First Name"
            v-model="contact.firstName"
          />
          <input
            type="text"
            class="form-control my-2"
            placeholder="Last Name"
            v-model="contact.lastName"
          />
          <input
            type="email"
            class="form-control my-2"
            placeholder="Email"
            v-model="contact.email"
          />
          <input
            type="text"
            class="form-control my-2"
            placeholder="Phone"
            v-model="contact.phone"
          />
          <input
            type="text"
            class="form-control my-2"
            placeholder="Address"
            v-model="contact.address"
          />
          <b-button class="btn-success my-2 btn-block" type="submit"
            >Save</b-button
          >
        </form>
      </div>
      <div class="col-12 w-100 overflow-auto">
        <table class="table mt-4">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Handlers</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in contacts" :key="index">
              <td>{{ item.firstName + ' ' + item.lastName }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.address }}</td>
              <td>
                <!-- <b-button @click="alerta()">Acción</b-button> -->
                <b-button
                  @click="deleteContact(item._id)"
                  class="btn-danger btn-sm mx-2"
                  >Delete
                </b-button>
                <b-button
                  @click="ActiveEdit(item._id)"
                  class="btn-warning btn-sm "
                  >Edit
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12  d-flex justify-content-center mt-3">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: pageActive === 1 }">
              <router-link
                class="page-link"
                :to="{ query: { page: pageActive - 1 } }"
                >Last Page</router-link
              >
            </li>
            <li
              class="page-item"
              :class="{ active: pageActive === index + 1 }"
              v-for="(item, index) in quantityPages"
              :key="index"
            >
              <router-link
                :to="{ query: { page: index + 1 } }"
                class="page-link"
                >{{ index + 1 }}</router-link
              >
            </li>
            <li
              class="page-item"
              :class="{ disabled: pageActive === quantityPages }"
            >
              <router-link
                class="page-link"
                :to="{ query: { page: pageActive + 1 } }"
                >Next Page</router-link
              >
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-12  d-flex justify-content-center mt-4">
         <p>
          Total Contacts: {{ totalContacts }} - Total Page: {{ quantityPages }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      contacts: [],
      dismissSecs: 5,
      dismissCountDown: 0,
      message: { color: '', text: '' },
      contact: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
      },
      edit: false,
      contactEdit: {},
      totalContacts: 0,
      limit: 5,
      pageActive: 1,
    }
  },
  watch: {
    '$route.query.page': {
      immediate: true,
      handler(page) {
        page = parseInt(page) || 1
        console.log('pagina', page)
        this.pagination(page)
        this.pageActive = page
      },
    },
  },
  computed: {
    ...mapState(['token']),
    quantityPages() {
      return Math.ceil(this.totalContacts / this.limit)
    },
  },
  // created() {
  //   this.listContact()
  // },

  methods: {
    alert() {
      this.message.color = 'danger'
      this.message.text = 'Probando alerta'
      this.showAlert()
    },
    listContact() {
      let config = {
        headers: {
          token: this.token,
        },
      }

      this.axios
        .get('/contact', config)
        .then((res) => {
          console.log(res.data)
          this.contacts = res.data.result
        })
        .catch((e) => {
          console.log(e.response)
        })
    },
    saveContact() {
      let config = {
        headers: {
          token: this.token,
        },
      }
      // console.log(this.nota);
      this.axios
        .post('/contact', this.contact, config)
        .then((res) => {
          this.contacts.push(res.data.result)
          this.contact.firstName = res.data.firstName
          this.contact.lastName = res.data.firstName
          this.contact.email = res.data.firstName
          this.contact.phone = res.data.firstName
          this.contact.address = res.data.firstName
          this.message.color = 'success'
          this.message.text = 'Contact Added!'
          this.showAlert()
        })
        .catch((e) => {
          console.log(e.response)
          this.message.color = 'danger'
          this.showAlert()
        })
    },
    deleteContact(id) {
      console.log(id)
      this.axios
        .delete(`/contact/${id}`)
        .then((res) => {
          const index = this.contacts.findIndex(
            (item) => item._id === res.data.result._id,
          )
          this.contacts.splice(index, 1)
          this.message.color = 'success'
          this.message.text = 'Contact Deleted'
          this.showAlert()
        })
        .catch((e) => {
          console.log(e.response)
        })
    },
    ActiveEdit(id) {
      this.edit = true
      console.log(id)
      this.axios
        .get(`/contact/${id}`)
        .then((res) => {
          this.contactEdit = res.data.result
        })
        .catch((e) => {
          console.log(e.response)
        })
    },
    editContact(item) {
      this.axios
        .put(`/contact/${item._id}`, item)
        .then((res) => {
          const index = this.contacts.findIndex(
            (n) => n._id === res.data.result._id,
          )
          this.contacts[index].firstName = res.data.result.firstName
          this.contacts[index].lastName = res.data.result.lastName
          this.contacts[index].email = res.data.result.email
          this.contacts[index].phone = res.data.result.phone
          this.contacts[index].address = res.data.result.address

          this.message.color = 'success'
          this.message.text = 'Edit Note'
          this.showAlert()
          this.edit = false
        })
        .catch((e) => {
          console.log(e.response)
        })
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    pagination(page) {
      let config = {
        headers: {
          token: this.token,
        },
      }
      let skip = (page - 1) * this.limit
      this.axios
        .get(`/contact?skip=${skip}&limit=${this.limit}`, config)
        .then((res) => {
          console.log('pagination', res.data)
          this.contacts = res.data.result || []
          this.totalContacts = res.data.total || 0
        })
        .catch((e) => {
          console.log(e.response)
        })
    },
  },
}
</script>
