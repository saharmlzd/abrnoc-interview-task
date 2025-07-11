import { throttle } from '../utils/throttle'

/**
 * Hook that provides throttled functions
 * @param delay - The throttle delay in milliseconds
 * @returns Object with throttle function
 */
export const useThrottle = (delay: number = 1000) => {
  const createThrottledFunction = <T extends (...args: any[]) => any>(func: T) => {
    return throttle(func, delay)
  }

  return {
    createThrottledFunction,
  }
} 