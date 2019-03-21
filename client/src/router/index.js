import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Welcome from '@/components/Welcome'
import MyPlaces from '@/components/MyPlaces'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/myplaces',
      name: 'myplaces',
      component: MyPlaces
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
