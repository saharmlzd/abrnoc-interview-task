<template>
  <div class="stock-status" :class="{ 'out-of-stock': !isInStock }">
    <div class="stock-status__indicator"></div>
    <span class="stock-status__text">
      {{ isInStock ? 'موجود' : 'ناموجود' }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import './StockStatus.css'

export default defineComponent({
  name: 'StockStatus',
  props: {
    quantity: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isInStock(): boolean {
      return this.quantity > 0
    },
  },
})
</script>
