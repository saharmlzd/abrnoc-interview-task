<template>
  <div class="empty-cart">
    <div class="empty-cart-icon">
      <img :src="CartIcon" alt="سبد خرید خالی" class="empty-cart-svg" />
    </div>
    <h2>سبد خرید شما خالی است</h2>
    <p>محصولات مورد نظر خود را به سبد خرید اضافه کنید</p>
    <router-link to="/" class="shop-now-btn">
      <span>شروع خرید</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CartIcon } from '../../../assets'
import './EmptyCart.css'

export default defineComponent({
  name: 'EmptyCart',
  setup() {
    return {
      CartIcon,
    }
  },
})
</script>
