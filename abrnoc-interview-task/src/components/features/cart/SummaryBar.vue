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
            @checkout="$emit('checkout')"
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
import './SummaryBar.css'

export default defineComponent({
  name: 'SummaryBar',
  components: {
    ActionButtons,
  },
  props: {
    totalCost: {
      type: Number,
      required: true,
    },
    canCheckout: {
      type: Boolean,
      required: true,
    },
    isProcessing: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['checkout'],
  setup() {
    return {
      formatPrice,
    }
  },
})
</script>
