import Vue from 'vue'
import Router from 'vue-router'

import store from './store'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import(/* webpackChunkName: "contact" */ './views/Contact.vue'),
      meta: {requireAuth: true}
    },
    
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {

  const routeProtected = to.matched.some(record => record.meta.requireAuth)

  if(routeProtected && store.state.token === ''){

    next({name: 'login'});

  }else{
    next();
  }


});


export default router;
