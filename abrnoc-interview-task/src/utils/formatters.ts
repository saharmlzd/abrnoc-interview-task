/**
 * Formats a number as Persian currency
 * @param price - The price to format
 * @returns Formatted price string
 */
export const formatPrice = (price: number): string => {
  return price.toLocaleString('fa-IR')
}

/**
 * Formats a number with Persian locale
 * @param value - The number to format
 * @returns Formatted number string
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString('fa-IR')
} 