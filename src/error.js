
import Vue from 'vue';

//vue에서 제공하는 errorHandler를 사용할 것이다.
Vue.config.errorHandler = e => {
  if (e == 1) {
    console.log('error if');
  } else {
    console.error(e.message);
    //toast사용한다. vue.prototype = this 같은것
    Vue.prototype.$toast.error(e.message);
    console.log('error.js');  
  }
};
