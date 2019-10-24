import Vue from 'vue'
import VueResoruce from 'vue-resource';
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueResoruce);

Vue.http.options.root = 'https://playground-90f21.firebaseio.com/'
Vue.http.interceptors.push((request,next) => {
  next(response => {
    //probando interceptors
    response.json = () => { return response.body  }
  });
});


new Vue({
  render: h => h(App),
}).$mount('#app')
