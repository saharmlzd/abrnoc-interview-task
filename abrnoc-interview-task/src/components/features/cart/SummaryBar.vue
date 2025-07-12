<template>
  <div class="order-summary-bar">
    <div class="order-summary-bar__content">
      <div class="order-summary-bar__row order-summary-bar__row--total">
        <span>مجموع کل:</span>
        <span class="order-summary-bar__total">{{ formatPrice(totalCost) }} تومان</span>
        <div class="order-summary-bar__actions">
          <ActionButtons
            :show-checkout="true"
            :show-continue-shopping="true"
            :can-checkout="canCheckout && !isProcessing"
            :is-processing="isProcessing"
            @checkout="handleCheckout"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ActionButtons from '../../common/product-card/ActionButtons.vue'
import { formatPrice } from '../../../utils/formatters'

export default defineComponent({
  name: 'SummaryBar',
  components: {
    ActionButtons,
  },
  props: {
    totalCost: {
      type: Number as () => number,
      required: true,
      validator: (value: number) => value >= 0,
    },
    canCheckout: {
      type: Boolean as () => boolean,
      required: true,
    },
    isProcessing: {
      type: Boolean as () => boolean,
      default: false,
    },
  },
  emits: ['checkout'],
  setup(props, { emit }) {
    const handleCheckout = () => {
      if (props.canCheckout && !props.isProcessing) {
        emit('checkout')
      }
    }

    return {
      formatPrice,
      handleCheckout,
    }
  },
})
</script>

<style>
@import './SummaryBar.css';
</style>
