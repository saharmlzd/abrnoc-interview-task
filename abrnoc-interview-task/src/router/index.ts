import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const ProductList = () => import('../components/features/products/ProductList.vue')
const Cart = () => import('../components/features/cart/Cart.vue')
const Payment = () => import('../components/features/payment/Payment.vue')
const ErrorTest = () => import('../components/common/ErrorTest.vue')
const NotFound = () => import('../components/common/NotFound.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: ProductList,
    name: 'ProductList',
    meta: { title: 'محصولات' },
  },
  {
    path: '/cart',
    component: Cart,
    name: 'Cart',
    meta: { title: 'سبد خرید' },
  },
  {
    path: '/payment',
    component: Payment,
    name: 'Payment',
    meta: { title: 'پرداخت' },
  },
  {
    path: '/test-error',
    component: ErrorTest,
    name: 'ErrorTest',
    meta: { title: 'تست خطا' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | فروشگاه آنلاین` : 'فروشگاه آنلاین'
  next()
})

router.onError((error) => {
  if (error.message.includes('navigation') || error.message.includes('صفحه مورد نظر یافت نشد')) {
    window.dispatchEvent(
      new CustomEvent('app-error', {
        detail: { error: { message: 'صفحه مورد نظر یافت نشد' } },
      })
    )
  }

  throw error
})

export default router
