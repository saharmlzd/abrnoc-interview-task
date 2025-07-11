import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../components/features/products/ProductList.vue'
import Cart from '../components/features/cart/Cart.vue'
import Payment from '../components/features/payment/Payment.vue'
import ErrorTest from '../components/common/ErrorTest.vue'

const routes = [
  { path: '/', component: ProductList },
  { path: '/cart', component: Cart },
  { path: '/payment', component: Payment },
  { path: '/test-error', component: ErrorTest },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
