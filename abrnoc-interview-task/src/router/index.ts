import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../components/features/products/ProductList.vue'
import Cart from '../components/features/cart/Cart.vue'


const routes = [
  { path: '/', component: ProductList },
  { path: '/cart', component: Cart },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
