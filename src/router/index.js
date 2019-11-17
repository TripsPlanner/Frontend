import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Step from '../views/Step.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'map',
    component: Step
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/step',
    name: 'step',
    component: () => import(/* webpackChunkName: "step" */ '../views/Step.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
