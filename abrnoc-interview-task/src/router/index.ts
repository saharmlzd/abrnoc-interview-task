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
  {
    path: '/:pathMatch(.*)*',
    component: {
      template: '<div></div>',
      mounted() {
        const error = new Error('صفحه مورد نظر یافت نشد')
        window.dispatchEvent(
          new CustomEvent('app-error', {
            detail: { error: { message: 'صفحه مورد نظر یافت نشد' } },
          })
        )
        throw error
      },
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.onError((error) => {
  if (error.message.includes('navigation') || error.message.includes('صفحه مورد نظر یافت نشد')) {
    window.dispatchEvent(
      new CustomEvent('app-error', {
        detail: { error: { message: 'صفحه مورد نظر یافت نشد' } },
      })
    )
  }
})

export default router
