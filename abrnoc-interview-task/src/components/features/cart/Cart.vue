<template>
  <div class="cart-page">
    <div class="cart-container">
      <EmptyCart v-if="cartItems.length === 0" />

      <div class="product-list__grid">
        <ProductCard
          v-for="item in cartItems"
          :key="item.id"
          :product="item"
          :show-remove="true"
          @increase-quantity="increaseQuantity"
          @decrease-quantity="decreaseQuantity"
          @remove="removeFromCart"
        />
      </div>

      <SummaryBar
        :total-cost="totalCost"
        :can-checkout="cartItems.length > 0"
        @checkout="checkout"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../products/ProductCard.vue'
import ActionButtons from '../../common/product-card/ActionButtons.vue'
import EmptyCart from './EmptyCart.vue'
import SummaryBar from './SummaryBar.vue'
import { useCart } from '../../../hooks/useCart'
import { useThrottle } from '../../../hooks/useThrottle'
import { formatPrice, toPersianDigits } from '../../../utils/formatters'
import './Cart.css'
import { ArrowRightIcon } from '../../../assets'

export default defineComponent({
  name: 'ShoppingCart',
  components: {
    ProductCard,
    ActionButtons,
    EmptyCart,
    SummaryBar,
  },
  setup() {
    const router = useRouter()

    const {
      cart: cartItems,
      totalCost,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
    } = useCart()
    const { createThrottledFunction } = useThrottle(2000)

    const handleCheckout = () => {
      router.push('/payment')
    }

    const checkout = createThrottledFunction(handleCheckout)

    return {
      cartItems,
      totalCost,
      formatPrice,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      checkout,
      toPersianDigits,
      ArrowRightIcon,
    }
  },
})
</script>
