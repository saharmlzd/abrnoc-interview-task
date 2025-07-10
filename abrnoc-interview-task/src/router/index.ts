import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../components/ProductList.vue'

const routes = [
  { path: '/', component: ProductList },  // اینجا صفحه فهرست محصولات است
  // دیگر مسیرها مثل cart و checkout
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
