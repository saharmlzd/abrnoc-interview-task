import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ActionTypes } from '../store'

export const useProducts = () => {
  const store = useStore()

  const products = computed(() => store.state.products)
  const loading = computed(() => store.state.loading)
  const error = computed(() => store.state.error)

  const fetchProducts = () => {
    store.dispatch(ActionTypes.FETCH_PRODUCTS)
  }

  onMounted(() => {
    fetchProducts()
  })

  return {
    products,
    loading,
    error,
    fetchProducts,
  }
}
