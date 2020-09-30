import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/animate.css'
import store from './store'

// JavaScript runtime error 
window.onerror = function(msg, src, linenum, colnum, error) {
  console.log('[JavaScript Error Handler]: ' + msg + '- ' + error);
  router.push({ name: 'error'});
}

createApp(App)
.use(router)
.use(store)
.mount('#app')
