import { formatPrice, formatNumber } from '../formatters'

describe('formatters', () => {
  test('formatPrice formats numbers as Persian currency', () => {
    expect(formatPrice(1234567)).toBe('۱٬۲۳۴٬۵۶۷')
    expect(formatPrice(0)).toBe('۰')
    expect(formatPrice(100000000)).toBe('۱۰۰٬۰۰۰٬۰۰۰')
  })

  test('formatNumber formats numbers with Persian locale', () => {
    expect(formatNumber(987654)).toBe('۹۸۷٬۶۵۴')
    expect(formatNumber(0)).toBe('۰')
    expect(formatNumber(42)).toBe('۴۲')
  })
})
