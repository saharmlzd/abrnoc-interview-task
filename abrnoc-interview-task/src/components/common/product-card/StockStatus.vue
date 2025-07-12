<template>
  <div class="stock-status" :class="{ 'out-of-stock': !isInStock }">
    <div class="stock-status__indicator"></div>
    <span class="stock-status__text">
      {{ isInStock ? 'موجود' : 'ناموجود' }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'StockStatus',
  props: {
    quantity: {
      type: Number as () => number,
      required: true,
      validator: (value: number) => value >= 0,
    },
    threshold: {
      type: Number as () => number,
      default: 0,
    },
  },
  emits: ['stock-status-change'],
  setup(props, { emit }) {
    const isInStock = computed(() => {
      const status = props.quantity > props.threshold
      emit('stock-status-change', status)
      return status
    })

    return {
      isInStock,
    }
  },
})
</script>

<style>
@import './StockStatus.css';
</style>
