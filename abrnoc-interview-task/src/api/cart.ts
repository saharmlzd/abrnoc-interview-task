import apiRequest from './index';

export const addToCart = async (productId: number, quantity: number) => {
  return await apiRequest('/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity })
  });
};

export const getCart = async () => {
  return await apiRequest('/cart');
};
