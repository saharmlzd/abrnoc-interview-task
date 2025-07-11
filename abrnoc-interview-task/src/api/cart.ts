import apiRequest from './index'
import { useBaseQuery } from './useBaseQuery'
import type { CartProduct } from '../types/cart-store'

export const syncCart = async (cartItems: CartProduct[]): Promise<boolean> => {
  return await apiRequest('/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItems),
  })
}

export const getCart = async (): Promise<CartProduct[]> => {
  return await apiRequest('/cart')
}

export const clearCart = async (): Promise<boolean> => {
  return await apiRequest('/cart', {
    method: 'DELETE',
  })
}

export const useCartQuery = () => {
  const baseQuery = useBaseQuery()

  const fetchCart = async (options?: { 
    onSuccess?: (data: CartProduct[]) => void; 
    onError?: (error: string) => void 
  }) => {
    return await baseQuery.executeQuery(getCart, options)
  }

  const syncCartToBackend = async (cartItems: CartProduct[], options?: { 
    onSuccess?: (data: boolean) => void; 
    onError?: (error: string) => void 
  }) => {
    return await baseQuery.executeQuery(() => syncCart(cartItems), options)
  }

  const clearCartOnBackend = async (options?: { 
    onSuccess?: (data: boolean) => void; 
    onError?: (error: string) => void 
  }) => {
    return await baseQuery.executeQuery(clearCart, options)
  }

  return {
    ...baseQuery,
    fetchCart,
    syncCartToBackend,
    clearCartOnBackend,
  }
}
