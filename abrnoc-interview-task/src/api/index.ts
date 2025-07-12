const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const apiRequest = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, options)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.')
    }

    throw error
  }
}

export default apiRequest

export { useBaseQuery } from './useBaseQuery'
export { useProductsQuery } from './products'
