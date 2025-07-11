import apiRequest from './index'
import { useBaseQuery } from './useBaseQuery'
import type { Product } from '../types/cart-store'

export const getProducts = async (): Promise<Product[]> => {
  return await apiRequest('/products')
}

export const removeProduct = async (productId: string): Promise<boolean> => {
  return await apiRequest(`/products/${productId}`, {
    method: 'DELETE',
  })
}

export const updateProductQuantity = async (
  productId: string,
  quantity: number
): Promise<Product> => {
  return await apiRequest(`/products/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  })
}

export const useProductsQuery = () => {
  const baseQuery = useBaseQuery()

  const fetchProducts = async (options?: {
    onSuccess?: (data: Product[]) => void
    onError?: (error: string) => void
  }) => {
    return await baseQuery.executeQuery(getProducts, options)
  }

  const updateProductQuantityInList = async (
    productId: string,
    quantity: number,
    options?: {
      onSuccess?: (data: Product) => void
      onError?: (error: string) => void
    }
  ) => {
    return await baseQuery.executeQuery(() => updateProductQuantity(productId, quantity), options)
  }

  return {
    ...baseQuery,
    fetchProducts,
    updateProductQuantityInList,
  }
}
