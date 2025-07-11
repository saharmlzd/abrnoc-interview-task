import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { setupGlobalErrorHandling } from './utils/errorHandler'

// Setup global error handling
setupGlobalErrorHandling()

createApp(App).use(store).use(router).mount('#app')
