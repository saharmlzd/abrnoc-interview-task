export interface Product {
  id: string
  name: string
  price: number
  quantity: number
}

export interface CartProduct extends Product {
  cartQuantity: number
}

export interface ShoppingCartState {
  products: Product[]
  cart: CartProduct[]
  loading: boolean
  error: string | null
}
