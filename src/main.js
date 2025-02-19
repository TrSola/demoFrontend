import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router'

import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
// 引入 VeeValidate 的 i18n 功能
import { localize, setLocale } from '@vee-validate/i18n';
// 引入 VeeValidate 的繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
// 引入 VeeValidate 的驗證規則
import { all } from '@vee-validate/rules';


// 使用 Object.keys 將 AllRules 轉為陣列，使用 forEach 迴圈將驗證規則加入 VeeValidate
Object.entries(all).forEach(([name, rule]) => {
    defineRule(name, rule);
  });
  
  // 將當前 VeeValidate 的語系設定為繁體中文
  configure({
    generateMessage: localize({ zh_TW: zhTW }),
    validateOnInput: true
  });
  setLocale('zh_TW');
  


axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

const app = createApp(App)

app.use(VueAxios, axios)
app.use(router)

// 掛載 VeeValidate 元件
app.component('VField', Field);
app.component('VForm', Form);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app')

