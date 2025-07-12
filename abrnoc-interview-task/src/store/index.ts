import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { useProductsQuery } from '../api/products'
import type { CartProduct, Product, ShoppingCartState } from '../types/cart-store'
import type { ActionContext } from 'vuex/types/index.js'
import { calculateTotalCost, calculateCartItemCount } from '../utils/cart'

export const MutationTypes = {
  SET_PRODUCTS: 'setProducts',
  ADD_TO_CART: 'addToCart',
  REMOVE_FROM_CART: 'removeFromCart',
  UPDATE_QUANTITY: 'updateQuantity',
  SET_CART: 'setCart',
  CLEAR_CART: 'clearCart',
  SET_LOADING: 'setLoading',
  SET_ERROR: 'setError',
  INITIALIZE_CART: 'initializeCart',
} as const

export const ActionTypes = {
  FETCH_PRODUCTS: 'fetchProducts',
  ADD_TO_CART: 'addToCart',
  INCREASE_QUANTITY: 'increaseQuantity',
  DECREASE_QUANTITY: 'decreaseQuantity',
  REMOVE_FROM_CART: 'removeFromCart',
} as const

export const GetterTypes = {
  TOTAL_COST: 'totalCost',
  CART_ITEM_COUNT: 'cartItemCount',
} as const

type ActionCtx = ActionContext<ShoppingCartState, ShoppingCartState>

export default createStore<ShoppingCartState>({
  state: {
    products: [],
    cart: [],
    loading: false,
    error: null,
  },

  mutations: {
    [MutationTypes.SET_PRODUCTS](state: ShoppingCartState, products: Product[]) {
      state.products = [...products]
    },

    [MutationTypes.ADD_TO_CART](
      state: ShoppingCartState,
      product: Product & { cartQuantity: number }
    ) {
      const existingProduct = state.cart.find((item) => item.id === product.id)
      if (existingProduct && existingProduct.cartQuantity < product.quantity) {
        existingProduct.cartQuantity++
      } else if (!existingProduct) {
        state.cart.push({ ...product, cartQuantity: 1 })
      }
    },

    [MutationTypes.REMOVE_FROM_CART](state: ShoppingCartState, productId: string) {
      state.cart = state.cart.filter((item) => item.id !== productId)
    },

    [MutationTypes.UPDATE_QUANTITY](
      state: ShoppingCartState,
      { productId, quantity }: { productId: string; quantity: number }
    ) {
      const product = state.cart.find((item) => item.id === productId)
      if (product) product.cartQuantity = quantity
    },

    [MutationTypes.SET_CART](state: ShoppingCartState, cart: CartProduct[]) {
      state.cart = [...cart]
    },

    [MutationTypes.CLEAR_CART](state: ShoppingCartState) {
      state.cart = []
    },

    [MutationTypes.SET_LOADING](state: ShoppingCartState, loading: boolean) {
      state.loading = loading
    },

    [MutationTypes.SET_ERROR](state: ShoppingCartState, error: string | null) {
      state.error = error
    },

    [MutationTypes.INITIALIZE_CART](state: ShoppingCartState) {
      if (!state.cart) state.cart = []
    },
  },

  actions: {
    async [ActionTypes.FETCH_PRODUCTS]({ commit }: ActionCtx) {
      commit(MutationTypes.SET_LOADING, true)

      try {
        const productsQuery = useProductsQuery()
        const products = await productsQuery.fetchProducts({
          onSuccess: (data) => {
            commit(MutationTypes.SET_PRODUCTS, data)
          },
          onError: (error) => {
            commit(MutationTypes.SET_ERROR, error)
          },
        })

        if (products) {
          commit(MutationTypes.SET_PRODUCTS, products)
        }
      } catch (error) {
        commit(MutationTypes.SET_ERROR, error instanceof Error ? error.message : 'Unknown error')
      } finally {
        commit(MutationTypes.SET_LOADING, false)
      }
    },

    async [ActionTypes.ADD_TO_CART](
      { commit, state }: ActionCtx,
      { productId }: { productId: string; quantity: number }
    ) {
      const product = state.products.find((item: Product) => item.id === productId)
      if (product) commit(MutationTypes.ADD_TO_CART, { ...product, cartQuantity: 1 })
    },

    async [ActionTypes.INCREASE_QUANTITY]({ commit, state }: ActionCtx, productId: string) {
      const product = state.cart.find((item: CartProduct) => item.id === productId)
      if (product && product.cartQuantity < product.quantity) {
        commit(MutationTypes.UPDATE_QUANTITY, { productId, quantity: product.cartQuantity + 1 })
      }
    },

    async [ActionTypes.DECREASE_QUANTITY]({ commit, state }: ActionCtx, productId: string) {
      const product = state.cart.find((item: CartProduct) => item.id === productId)
      if (product && product.cartQuantity > 1) {
        commit(MutationTypes.UPDATE_QUANTITY, { productId, quantity: product.cartQuantity - 1 })
      } else if (product && product.cartQuantity === 1) {
        commit(MutationTypes.REMOVE_FROM_CART, productId)
      }
    },

    async [ActionTypes.REMOVE_FROM_CART]({ commit }: ActionCtx, productId: string) {
      commit(MutationTypes.REMOVE_FROM_CART, productId)
    },
  },

  getters: {
    [GetterTypes.TOTAL_COST]: (state: ShoppingCartState) => calculateTotalCost(state.cart),
    [GetterTypes.CART_ITEM_COUNT]: (state: ShoppingCartState) => calculateCartItemCount(state.cart),
  },

  plugins: [
    createPersistedState({
      key: 'shopping-cart',
      paths: ['cart'],
      storage: window.localStorage,
    }),
  ],
})
