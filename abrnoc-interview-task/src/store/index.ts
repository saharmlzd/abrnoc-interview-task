import { createStore} from 'vuex';
import { getProducts } from '../api/products';
import { addToCart, getCart } from '../api/cart';
import type { CartProduct, Product, ShoppingCartState } from '../types/cart-store';
import type { ActionContext } from 'vuex/types/index.js';

export const ActionTypes = {
  FETCH_PRODUCTS: 'fetchProducts',
  FETCH_CART: 'fetchCart',
  ADD_TO_CART: 'addToCartAction',
  INCREASE_QUANTITY: 'increaseQuantity',
  DECREASE_QUANTITY: 'decreaseQuantity',
  REMOVE_FROM_CART: 'removeFromCart',
};

export default createStore<ShoppingCartState>({
  state: {
    products: [],
    cart: [],
  },

  mutations: {
    setProducts(state: ShoppingCartState, products: Product[]) {
      state.products = [...products];
    },

    addToCart(state: ShoppingCartState, product: CartProduct) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        // Check if adding one more would exceed available quantity
        if (existingProduct.cartQuantity < product.quantity) {
          existingProduct.cartQuantity++;
        }
      } else {
        state.cart.push({ ...product, cartQuantity: 1 });
      }
    },

    removeFromCart(state: ShoppingCartState, productId: string) {
      state.cart = state.cart.filter(item => item.id !== productId);
    },

    updateQuantity(state: ShoppingCartState, { productId, quantity }: { productId: string; quantity: number }) {
      const product = state.cart.find(item => item.id === productId);
      if (product) {
        product.cartQuantity = quantity;
      }
    },

    setCart(state: ShoppingCartState, cart: CartProduct[]) {
      state.cart = [...cart];
    },
  },

  actions: {
    async [ActionTypes.FETCH_PRODUCTS]({ commit }: ActionContext<ShoppingCartState, ShoppingCartState>) {
      try {
        const products = await getProducts();
        commit('setProducts', products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },

    async [ActionTypes.FETCH_CART]({ commit }: ActionContext<ShoppingCartState, ShoppingCartState>) {
      try {
        const cart = await getCart();
        commit('setCart', cart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    },

    async [ActionTypes.ADD_TO_CART]({ commit, state }: ActionContext<ShoppingCartState, ShoppingCartState>, { productId, quantity }: { productId: string; quantity: number }) {
      // Find the product in the products list to get full product info
      const product = state.products.find((item: Product) => item.id === productId);
      if (product) {
        commit('addToCart', { ...product, cartQuantity: quantity });
      }
    },

    async [ActionTypes.INCREASE_QUANTITY]({ commit, state }: ActionContext<ShoppingCartState, ShoppingCartState>, productId: string) {
      const product = state.cart.find((item: CartProduct) => item.id === productId);
      if (product && product.cartQuantity < product.quantity) {
        commit('updateQuantity', { productId, quantity: product.cartQuantity + 1 });
      }
    },

    async [ActionTypes.DECREASE_QUANTITY]({ commit, state }: ActionContext<ShoppingCartState, ShoppingCartState>, productId: string) {
      const product = state.cart.find((item: CartProduct) => item.id === productId);
      if (product && product.cartQuantity > 1) {
        commit('updateQuantity', { productId, quantity: product.cartQuantity - 1 });
      } else if (product && product.cartQuantity === 1) {
        commit('removeFromCart', productId);
      }
    },

    async [ActionTypes.REMOVE_FROM_CART]({ commit }: ActionContext<ShoppingCartState, ShoppingCartState>, productId: string) {
      commit('removeFromCart', productId);
    },
  },

  getters: {
    totalCost(state: ShoppingCartState) {
      return state.cart.reduce((total, item) => total + item.price * item.cartQuantity, 0);
    },

    cartItemCount(state: ShoppingCartState) {
      return state.cart.reduce((count, item) => count + item.cartQuantity, 0);
    },
  },
});
