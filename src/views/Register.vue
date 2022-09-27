<template>
  <div class="container mt-4">
    <h1>Register User</h1>
    <form @submit.prevent="register">
      <input type="text" placeholder="First Name" class="form-control my-2" v-model="user.firstName">
      <input type="text" placeholder="Last Name" class="form-control my-2" v-model="user.lastName">
      <input type="text" placeholder="Phone" class="form-control my-2" v-model="user.phone">
      <input type="email" placeholder="Email" class="form-control my-2" v-model="user.email">
      <input type="text" placeholder="Contraseña" class="form-control my-2" v-model="user.pass">
      <b-button class="btn-block" type="submit">Register</b-button>
    </form>
    <div v-if="message != ''">
      <p>{{message}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {email: '', pass: ''},
      message: ''
    }
  },
  methods:{
    ...mapActions(['saveUser']),
    register(){
      // console.log(this.usuario);
      this.axios.post('/user', this.user)
        .then(res => {
          console.log(res.data);
          this.saveUser();
        })
        .catch(e => {
          console.log(e.response);
          this.message = e.response.data.message
        })
    }
  }
}
</script>