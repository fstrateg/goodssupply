import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-plus'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const app=createApp(App)
app.use(ElementUI)

app.use(router)
app.mount('#app')
