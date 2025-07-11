import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getProducts } from '../api/products'
import type { CartProduct, Product, ShoppingCartState } from '../types/cart-store'
import type { ActionContext } from 'vuex/types/index.js'
import { calculateTotalCost, calculateCartItemCount } from '../utils/cart'

export const ActionTypes = {
  FETCH_PRODUCTS: 'fetchProducts',
  ADD_TO_CART: 'addToCart',
  INCREASE_QUANTITY: 'increaseQuantity',
  DECREASE_QUANTITY: 'decreaseQuantity',
  REMOVE_FROM_CART: 'removeFromCart',
}

export default createStore<ShoppingCartState>({
  state: { products: [], cart: [], loading: false, error: null },

  mutations: {
    setProducts(state: ShoppingCartState, products: Product[]) {
      state.products = [...products]
    },

    addToCart(state: ShoppingCartState, product: Product & { cartQuantity: number }) {
      const existingProduct = state.cart.find((item) => item.id === product.id)
      if (existingProduct && existingProduct.cartQuantity < product.quantity) {
        existingProduct.cartQuantity++
      } else if (!existingProduct) {
        state.cart.push({ ...product, cartQuantity: 1 })
      }
    },

    removeFromCart(state: ShoppingCartState, productId: string) {
      state.cart = state.cart.filter((item) => item.id !== productId)
    },

    updateQuantity(
      state: ShoppingCartState,
      { productId, quantity }: { productId: string; quantity: number }
    ) {
      const product = state.cart.find((item) => item.id === productId)
      if (product) product.cartQuantity = quantity
    },

    setCart(state: ShoppingCartState, cart: CartProduct[]) {
      state.cart = [...cart]
    },

    clearCart(state: ShoppingCartState) {
      state.cart = []
    },

    setLoading(state: ShoppingCartState, loading: boolean) {
      state.loading = loading
    },

    setError(state: ShoppingCartState, error: string | null) {
      state.error = error
    },

    initializeCart(state: ShoppingCartState) {
      if (!state.cart) state.cart = []
    },
  },

  actions: {
    async [ActionTypes.FETCH_PRODUCTS]({
      commit,
    }: ActionContext<ShoppingCartState, ShoppingCartState>) {
      try {
        commit('setLoading', true)
        commit('setError', null)
        const products = await getProducts()
        commit('setProducts', products)
      } catch {
        commit('setError', 'خطا در بارگذاری محصولات')
      } finally {
        commit('setLoading', false)
      }
    },



    async [ActionTypes.ADD_TO_CART](
      { commit, state }: ActionContext<ShoppingCartState, ShoppingCartState>,
      { productId }: { productId: string; quantity: number }
    ) {
      const product = state.products.find((item: Product) => item.id === productId)
      if (product) commit('addToCart', { ...product, cartQuantity: 1 })
    },

    async [ActionTypes.INCREASE_QUANTITY](
      { commit, state }: ActionContext<ShoppingCartState, ShoppingCartState>,
      productId: string
    ) {
      const product = state.cart.find((item: CartProduct) => item.id === productId)
      if (product && product.cartQuantity < product.quantity) {
        commit('updateQuantity', { productId, quantity: product.cartQuantity + 1 })
      }
    },

    async [ActionTypes.DECREASE_QUANTITY](
      { commit, state }: ActionContext<ShoppingCartState, ShoppingCartState>,
      productId: string
    ) {
      const product = state.cart.find((item: CartProduct) => item.id === productId)
      if (product && product.cartQuantity > 1) {
        commit('updateQuantity', { productId, quantity: product.cartQuantity - 1 })
      } else if (product && product.cartQuantity === 1) {
        commit('removeFromCart', productId)
      }
    },

    async [ActionTypes.REMOVE_FROM_CART](
      { commit }: ActionContext<ShoppingCartState, ShoppingCartState>,
      productId: string
    ) {
      commit('removeFromCart', productId)
    },
  },

  getters: {
    totalCost: (state: ShoppingCartState) => calculateTotalCost(state.cart),
    cartItemCount: (state: ShoppingCartState) => calculateCartItemCount(state.cart),
  },

  plugins: [
    createPersistedState({
      key: 'shopping-cart',
      paths: ['cart'],
      storage: window.localStorage,
    }),
  ],
})
