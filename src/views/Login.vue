<template>
  <div class="container mt-4">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="email" placeholder="Email" class="form-control my-2" v-model="user.email">
      <input type="text" placeholder="Contraseña" class="form-control my-2" v-model="user.pass">
      <b-button class="btn-block" type="submit">Acceder</b-button>
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
      user: {email: 'sasasamaes13@gmail.com', pass: 'Franata13'},
      message: ''
    }
  },
  methods:{
    ...mapActions(['saveUser']),
    login(){
      // console.log(this.usuario);
      
      this.axios.post('/login', this.user)
        .then(res => {
          console.log(res.data);
          const token = res.data.token;
          this.saveUser(token);
          this.$router.push({name: 'contact'});
        })
        .catch(e => {
          console.log(e.response);
          this.message =  "error"
        })
    }
  }
}
</script>