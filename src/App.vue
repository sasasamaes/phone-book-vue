<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login"  v-if="!isActive">Login</router-link> |
      <a @click="logOut()"  v-if="isActive">Cerrar Sesion</a> |
      <router-link to="/notas" v-if="isActive">Notas</router-link>
    </div> -->
    <div>
      <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-brand href="#">PhoneBook 📒</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/login" v-if="!isActive">Login</b-nav-item>
            <b-nav-item to="/register" v-if="!isActive">Register</b-nav-item>

          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            
            <button class="btn btn-secondary" @click="logOut()" v-if="isActive">Log Out</button>
          
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods:{
    ...mapActions(['logOut', 'getToken'])
  },
  computed:{
    ...mapGetters(['isActive'])
  },
  created(){
    this.getToken();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
