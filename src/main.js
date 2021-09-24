import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import 'vue-universal-modal/dist/index.css'

import VueUniversalModal from 'vue-universal-modal'

const app=createApp(App)

app.use(VueUniversalModal, {
    teleportTarget: '#modals'
})

app.use(router)
app.mount('#app')
