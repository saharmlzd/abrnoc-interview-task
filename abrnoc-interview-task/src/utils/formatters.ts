/**
 * Converts all Western digits in a string to Persian digits
 */
export const toPersianDigits = (input: string | number): string => {
  return String(input).replace(/\d/g, d =>
    String.fromCharCode(d.charCodeAt(0) + 1728)
  )
}

/**
 * Formats a number as Persian currency
 * @param price - The price to format
 * @returns Formatted price string
 */
export const formatPrice = (price: number): string => {
  return toPersianDigits(price.toLocaleString('fa-IR'))
}

/**
 * Formats a number with Persian locale
 * @param value - The number to format
 * @returns Formatted number string
 */
export const formatNumber = (value: number): string => {
  return toPersianDigits(value.toLocaleString('fa-IR'))
}
