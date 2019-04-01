import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
// import AFrame from 'aframe'
import firebase from 'firebase'
import VueSweetalert2 from 'vue-sweetalert2'
import Ripple from 'vue-ripple-directive'

Ripple.color = 'rgba(255, 255, 255, 0)'
Ripple.zIndex = 100

Vue.directive('ripple', Ripple)

Vue.config.productionTip = false

let app = ''

Vue.use(VueSweetalert2)

const config = {
  apiKey: 'AIzaSyAxbx3FrMz8rtQpcbsawdvtSnyURtzw9uI',
  authDomain: 'porthole-2c2a5.firebaseapp.com',
  databaseURL: 'https://porthole-2c2a5.firebaseio.com',
  projectId: 'porthole-2c2a5',
  storageBucket: 'porthole-2c2a5.appspot.com',
  messagingSenderId: '571109053267'
}
firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
