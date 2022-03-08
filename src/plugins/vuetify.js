import Vue from 'vue';

//추가로 import 해준다.
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib';
import VuetifyToast from 'vuetify-toast-snackbar-ng';
 

//여기에 VSnackbar, VBtn, VIcon 명시해야 사용가능함.
Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
});

//안의 값을 임의로 바꿀 수 있다.
Vue.use(VuetifyToast, {
  x: 'right', // default
  y: 'bottom', // default
  color: 'info', // default
  icon: 'mdi-information',
  iconColor: '', // default
  classes: [
    'body-2'
  ], 
  timeout: 3000, // default
  dismissable: true, // default
  multiLine: false, // default
  vertical: false, // default
  queueable: false, // default
  showClose: false, // default
  closeText: '', // default
  closeIcon: 'close', // default
  closeColor: '', // default
  slot: [], // default
  shorts: {
    custom: {
      color: 'purple'
    }
  },
  //$toast 는 이제 전역변수로 어디서든 사용가능하게 되었다.
  property: '$toast' // default
});

export default new Vuetify({
});