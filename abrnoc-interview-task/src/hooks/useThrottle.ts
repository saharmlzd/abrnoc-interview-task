export const useThrottle = (delay = 300) => {
  /**
   * Creates a throttled version of a function
   * @param fn - The function to throttle
   * @returns The throttled function
   */
  const createThrottledFunction = <T extends (...args: unknown[]) => unknown>(
    fn: T
  ): ((...args: Parameters<T>) => void) => {
    let lastCall = 0

    return (...args: Parameters<T>) => {
      const now = Date.now()

      if (now - lastCall >= delay) {
        lastCall = now
        fn(...args)
      }
    }
  }

  return {
    createThrottledFunction,
  }
}
