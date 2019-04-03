import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import firebase from 'firebase'
import VueSweetalert2 from 'vue-sweetalert2'
import Ripple from 'vue-ripple-directive'
import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet';
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

Ripple.color = 'rgba(255, 255, 255, 0)'
Ripple.zIndex = 100

Vue.directive('ripple', Ripple)

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-tooltip', LTooltip), 

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.config.productionTip = false

Vue.config.ignoredElements = [
  'a-scene',
  'a-entity',
  'a-plane',
  'a-sky',
  'a-plane',
  'a-sphere',
  'a-box',
  'a-cylinder'
]

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
