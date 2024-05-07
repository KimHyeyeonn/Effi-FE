import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.esm.min.js'

const app = createApp(App)
app.provide('today', new Date().toISOString().split('T')[0])

app.use(createPinia())
app.use(router)

app.mount('#app')



