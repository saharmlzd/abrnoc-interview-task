import apiRequest from './index'

export const getProducts = async () => {
  return await apiRequest('/products')
}
