import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { setupGlobalErrorHandling } from './utils/errorHandler'
import './style.css'

setupGlobalErrorHandling()

createApp(App).use(store).use(router).mount('#app')
