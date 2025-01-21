
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase.js'
import { createMemoryHistory, createRouter } from 'vue-router'
import recordatorios from './components/recordatorios.vue'
import Landing from './components/landing.vue'
import LogeoCompleto from './components/logeoCompleto.vue'


const routes = [
  { path: '/', component: Landing, meta:{requiresAuth:false}},
  { path: '/recordatorio', component: recordatorios,meta:{requiresAuth:true} },
  { path: '/logeoCompleto', component: LogeoCompleto, meta:{requiresAuth:false}},
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})


const app = createApp(App)
app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })
  app.use(router)
  app.mount('#app')
