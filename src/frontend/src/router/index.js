import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Frontpage from "../views/Frontpage"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/frontpage',
    name: 'Frontpage',
    component: Frontpage
  }
]

const router = new VueRouter({
  routes
})

export default router
