import Vue from 'vue'
import VueRouter from 'vue-router'
import SignAndRecoverTool from '../views/SignAndRecoverTool.vue'
import Frontpage from "../views/Frontpage"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Frontpage',
    component: Frontpage
  },
  {
    path: '/SignAndRecoverTool',
    name: 'SignAndRecoverTool',
    component: SignAndRecoverTool
  },
]

const router = new VueRouter({
  routes
})

export default router
