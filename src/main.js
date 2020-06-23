import Vue from 'vue'
import App from './App.vue'

import './quasar'

import router from './router'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueSession from 'vue-session';
Vue.use(VueSession);

import * as firebase from "firebase";
const configOptions = {
  apiKey: "AIzaSyB86XmgQSHxkHjhXCSBi0fH9G_cTognMow",
  authDomain: "apoya-local.firebaseapp.com",
  databaseURL: "https://apoya-local.firebaseio.com",
  projectId: "apoya-local",
  storageBucket: "apoya-local.appspot.com",
  messagingSenderId: "817082948533",
  appId: "1:817082948533:web:274581bd7ff4d0395c17fc"
};
firebase.initializeApp(configOptions);


import axios from 'axios'
import VueAxios from 'vue-axios'  
Vue.use(VueAxios, axios)

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAWC-HW19Mmar8HDqJZsGRSzepOHgXAvkU',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
});

import VueAnalytics from 'vue-analytics';

Vue.use(VueAnalytics, {
  id: 'UA-115652820-4',
  router
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
