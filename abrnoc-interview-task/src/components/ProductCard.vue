<template>
  <div class="product-card">
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="product-price">
        <span class="price-label">قیمت:</span>
        <span class="price-value">{{ formattedPrice }}</span>
      </div>
    </div>
    <button @click="addToCart" class="add-to-cart-btn">افزودن به سبد خرید</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed } from 'vue'
import type { Product } from '../types/cart-store'

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formattedPrice = computed(() => {
      return props.product.price.toLocaleString('fa-IR');  
    });

    const addToCart = () => {
      emit('add-to-cart', props.product);
    };

    return { formattedPrice, addToCart };
  }
})
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  box-sizing: border-box;
}

.product-info {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-price {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.price-label {
  font-size: 14px;
  color: #333;
}

.price-value {
  font-size: 16px;
  font-weight: bold;
  color: #e74c3c;
}

.add-to-cart-btn {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

.add-to-cart-btn:hover {
  background-color: #218838;
}
</style>
