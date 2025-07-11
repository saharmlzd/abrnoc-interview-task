<template>
  <header v-if="headerConfig.show" class="header">
    <div class="header__container">
      <div class="header__left">
        <!-- Back button -->
        <button 
          v-if="headerConfig.showBackButton" 
          @click="goBack" 
          class="header__back-btn"
          type="button"
        >
          <svg class="header__back-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 13h12.17l-5.59 5.59L12 20l8-8-8-8-1.41 1.41L16.17 11H4v2z"/>
          </svg>
          <span>بازگشت</span>
        </button>
        
        <!-- Title and logo -->
        <router-link 
          v-if="headerConfig.showTitle && headerConfig.titleClickable && !headerConfig.showBackButton" 
          to="/" 
          class="header__logo"
        >
          <img src="/src/assets/abrnoc.svg" alt="ابرناک" class="header__logo-img" />
          <span class="header__title">{{ headerConfig.title }}</span>
        </router-link>
        
        <div 
          v-else-if="headerConfig.showTitle && !headerConfig.showBackButton" 
          class="header__title-container"
        >
          <span class="header__title">{{ headerConfig.title }}</span>
          <img src="/src/assets/abrnoc.svg" alt="ابرناک" class="header__logo-img" />
        </div>
      </div>
      
      <div class="header__right">
        <router-link v-if="headerConfig.showCart" to="/cart" class="header__cart">
          <div class="header__cart-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path 
                d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
              />
            </svg>
            <span 
              class="header__cart-badge" 
              v-if="cartItemCount > 0"
            >
              {{ toPersianDigits(cartItemCount) }}
            </span>
          </div>
          <span class="header__cart-text">سبد خرید</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../../hooks/useCart'
import { useHeaderConfig } from '../../hooks/useHeaderConfig'
import './Header.css'
import { toPersianDigits } from '../../utils/formatters'

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const router = useRouter()
    const { cartItemCount } = useCart()
    const { headerConfig } = useHeaderConfig()
    
    const goBack = () => {
      router.go(-1)
    }
    
    return { 
      cartItemCount,
      headerConfig,
      goBack,
      toPersianDigits,
    }
  },
})
</script>
