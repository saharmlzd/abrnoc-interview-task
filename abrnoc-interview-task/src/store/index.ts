import { createStore } from 'vuex';
import { getProducts } from '../api/products';
import { addToCart, getCart } from '../api/cart';
import type { CartProduct, Product, ShoppingCartState } from '../types/cart-store';
import type { ActionContext } from 'vuex';  // وارد کردن ActionContext از vuex

export const ActionTypes = {
  FETCH_PRODUCTS: 'fetchProducts',
  FETCH_CART: 'fetchCart',
  ADD_TO_CART: 'addToCartAction',
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
        existingProduct.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart(state: ShoppingCartState, productId: number) {
      state.cart = state.cart.filter(item => item.id !== productId);
    },

    updateQuantity(state: ShoppingCartState, { productId, quantity }: { productId: number; quantity: number }) {
      const product = state.cart.find(item => item.id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },

    setCart(state: ShoppingCartState, cart: CartProduct[]) {
      state.cart = [...cart];
    },
  },

  actions: {
    // تایپ context به ActionContext
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

    async [ActionTypes.ADD_TO_CART]({ commit }: ActionContext<ShoppingCartState, ShoppingCartState>, { productId, quantity }: { productId: number; quantity: number }) {
      try {
        const result = await addToCart(productId, quantity);
        commit('addToCart', result);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    },
  },

  getters: {
    totalCost(state: ShoppingCartState) {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    cartItemCount(state: ShoppingCartState) {
      return state.cart.reduce((count, item) => count + item.quantity, 0);
    },
  },
});
