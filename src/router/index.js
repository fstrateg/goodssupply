import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Goods from '../views/Goods'
import Good from '../views/Good'
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
    path: '/good/:id',
    name: 'Good',
    component: Good
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Goods
  },
  {
    path: '/moving',
    name: 'Moving',
    component: () => import('../views/Moving.vue')
  },
  {
    path: '/move/:id',
    name: 'MoveRecord',
    component: () => import('../views/MoveRecord.vue')
  },
  {
    path: '/goodsremainig',
    name: 'Remainigs',
    component: ()=> import('../views/GoodsOst.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
