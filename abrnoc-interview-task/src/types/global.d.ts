/// <reference lib="dom" />
/// <reference lib="es2015" />
/// <reference lib="es2016" />
/// <reference lib="es2017" />
/// <reference types="jest" />

// Global type declarations for the application

declare global {
  interface WindowEventMap {
    'app-error': CustomEvent<{
      error: {
        type: string
        message: string
        originalError?: Error
        context?: string
      }
    }>
  }
}

export {}
