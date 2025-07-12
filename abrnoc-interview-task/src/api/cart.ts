import apiRequest from './index'
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

export const checkout = async (cartItems: CartProduct[]): Promise<{ success: boolean; orderId: string }> => {
  try {
    await apiRequest('/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });
    
    const orderId = `ord-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    return {
      success: true,
      orderId: orderId
    };
  } catch (error) {
    const errorDetails = error instanceof Error ? error.message : String(error);
    throw new Error(`Checkout failed: ${errorDetails}`);
  }
}
