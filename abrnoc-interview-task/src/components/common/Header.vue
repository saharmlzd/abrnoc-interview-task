<template>
  <header v-if="headerConfig.show" class="header">
    <div class="header__container">
      <div class="header__left">
        <button
          v-if="headerConfig.showBackButton"
          @click="goBack"
          class="header__back-btn"
          type="button"
        >
          <svg class="header__back-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 13h12.17l-5.59 5.59L12 20l8-8-8-8-1.41 1.41L16.17 11H4v2z" />
          </svg>
          <span>بازگشت</span>
        </button>

        <router-link
          v-if="
            headerConfig.showTitle && headerConfig.titleClickable && !headerConfig.showBackButton
          "
          to="/"
          class="header__logo"
        >
          <img :src="AbrnocLogo" alt="ابرناک" class="header__logo-img" />
          <span class="header__title">{{ headerConfig.title }}</span>
        </router-link>

        <div
          v-else-if="headerConfig.showTitle && !headerConfig.showBackButton"
          class="header__title-container"
        >
          <span class="header__title">{{ headerConfig.title }}</span>
          <img :src="AbrnocLogo" alt="ابرناک" class="header__logo-img" />
        </div>
      </div>

      <div class="header__right">
        <div
          v-if="headerConfig.showTitle && headerConfig.showBackButton && $route.path === '/cart'"
          class="header__title-container"
        >
          <span class="header__title">{{ headerConfig.title }}</span>
          <div class="header__cart-badge-inline">
            <span class="header__cart-badge-number">{{ toPersianDigits(cartItemCount) }}</span>
            <span class="header__cart-badge-text">محصول</span>
          </div>
        </div>

        <router-link v-if="headerConfig.showCart" to="/cart" class="header__cart">
          <div class="header__cart-icon">
            <img :src="CartIcon" alt="سبد خرید" class="header__logo-img" />
            <span class="header__cart-badge" v-if="cartItemCount > 0">
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
import { toPersianDigits } from '../../utils/formatters'
import { AbrnocLogo, CartIcon } from '../../assets'

export default defineComponent({
  name: 'AppHeader',
  props: {
    showBackButton: {
      type: Boolean as () => boolean,
      default: undefined,
    },
    showCart: {
      type: Boolean as () => boolean,
      default: undefined,
    },
    customTitle: {
      type: String as () => string,
      default: undefined,
    },
  },
  emits: ['back-clicked', 'config-updated'],
  setup(props, { emit }) {
    const router = useRouter()
    const { cartItemCount } = useCart()

    const { headerConfig } = useHeaderConfig({
      showBackButton: props.showBackButton,
      showCart: props.showCart,
      customTitle: props.customTitle,
    })

    emit('config-updated', headerConfig)

    const goBack = (): void => {
      emit('back-clicked')
      router.go(-1)
    }

    return {
      cartItemCount,
      headerConfig,
      goBack,
      toPersianDigits,
      AbrnocLogo,
      CartIcon,
    }
  },
})
</script>

<style>
@import './Header.css';
</style>
