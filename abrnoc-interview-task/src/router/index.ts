import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../components/ProductList.vue'
import Cart from '../components/Cart.vue'

const routes = [
  { path: '/', component: ProductList }, 
  { path: '/cart', component: Cart }, 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
