/**
 * Throttles a function to limit how often it can be called
 * @param func - The function to throttle
 * @param delay - The delay in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0
  let timeoutId: number | null = null

  return (...args: Parameters<T>) => {
    const now = Date.now()

    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(
        () => {
          lastCall = Date.now()
          func(...args)
        },
        delay - (now - lastCall)
      )
    }
  }
}
