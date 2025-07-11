export const isNotFoundError = (error: Error | null): boolean => {
  if (!error) return false

  const errorMessage = error.message.toLowerCase()
  return (
    errorMessage.includes('404') ||
    errorMessage.includes('not found') ||
    errorMessage.includes('page not found') ||
    errorMessage.includes('route not found') ||
    errorMessage.includes('navigation') ||
    errorMessage.includes('منبع مورد نظر یافت نشد') ||
    errorMessage.includes('صفحه مورد نظر یافت نشد')
  )
}

export const isNetworkError = (error: Error | null): boolean => {
  if (!error) return false

  const errorMessage = error.message.toLowerCase()
  return (
    errorMessage.includes('fetch') ||
    errorMessage.includes('network') ||
    errorMessage.includes('failed to fetch') ||
    errorMessage.includes('timeout') ||
    errorMessage.includes('سرور پاسخ نمی‌دهد')
  )
}

export const isServerError = (error: Error | null): boolean => {
  if (!error) return false

  const errorMessage = error.message.toLowerCase()
  return errorMessage.includes('500') || errorMessage.includes('server error')
}

export const getErrorTitle = (error: Error | null): string => {
  if (isNotFoundError(error)) {
    return 'صفحه یافت نشد'
  }
  if (isNetworkError(error)) {
    return 'خطا در اتصال'
  }
  if (isServerError(error)) {
    return 'خطای سرور'
  }
  return 'خطایی رخ داده است'
}

export const getErrorMessage = (error: Error | null): string => {
  if (!error) return 'متأسفانه مشکلی در بارگذاری این بخش پیش آمده است.'

  if (isNotFoundError(error)) {
    return 'صفحه مورد نظر شما یافت نشد. ممکن است آدرس اشتباه باشد یا صفحه حذف شده باشد.'
  }

  if (isNetworkError(error)) {
    return 'خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.'
  }

  if (isServerError(error)) {
    return 'خطای سرور. لطفاً بعداً تلاش کنید.'
  }

  return error.message || 'متأسفانه مشکلی در بارگذاری این بخش پیش آمده است.'
}

export const getErrorDetails = (error: Error | null): string => {
  if (!error) return ''
  return JSON.stringify(
    {
      message: error.message,
      stack: error.stack,
      name: error.name,
      url: window.location.href,
      pathname: window.location.pathname,
    },
    null,
    2
  )
}
