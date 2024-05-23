import './assets/css/main.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { QuillEditor } from '@vueup/vue-quill'

// import axios from 'axios'
// axios.defaults.baseURL = 'http://192.168.203.106:8080/api'
// axios.defaults.headers.post['Content-Type'] = 'application/json'

library.add(fas)
library.add(far)
library.add(fab)

createApp(App)
  .use(createPinia())
  .use(router)
  .component('QuillEditor', QuillEditor)
  .mount('#app')
