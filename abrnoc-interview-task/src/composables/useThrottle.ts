import { throttle } from '../utils/throttle'

export const useThrottle = (delay: number = 1000) => {
  const createThrottledFunction = <T extends (...args: unknown[]) => unknown>(func: T) => {
    return throttle(func, delay)
  }

  return {
    createThrottledFunction,
  }
}
