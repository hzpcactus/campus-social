// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$axios = axios;

import $ from 'jquery'
import 'bootstrap'
import 'jquery/dist/jquery.min.js'
// import '@/assets/js/jquery-2.1.4.min.js'
// import 'bootstrap/dist/js/bootstrap.min.js'
import '@/assets/js/jquery.waypoints.min.js'
import '@/assets/js/jquery.countup.js'
import '@/assets/js/responsiveslides.min.js'
import '@/assets/js/owl.carousel.js'
// import '@/assets/js/modernizr-2.6.2.min.js'
import '@/assets/js/jquery.chocolat.js'




import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/owl.carousel.css'
import '@/assets/css/chocolat.css'

 //import 'http://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800'
// import 'http://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,400,400i,500,500i,600,600i,700,700i,800'
import '@/assets/css/team.css'
import '@/assets/css/style.css'
import '@/assets/css/font-awesome.css'
Vue.config.productionTip = false

import VueSocketIO from 'vue-socket.io'
  
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  // vuex: {
  //     store,
  //     actionPrefix: 'SOCKET_',
  //     mutationPrefix: 'SOCKET_'
  // },
  // options: { path: "/my-app/" } //Optional options
}))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // VueSocketIO,
  components: { App },
  template: '<App/>'
});

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
// Vue.use($)
