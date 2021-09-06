import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Goods from '../views/Goods'
import Supply from '../views/Supply'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/supply',
    name: 'Supply',
    component: Supply
  },
  {
    path: '/supply/:id',
    name: 'Supply',
    component: Supply
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Goods
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
