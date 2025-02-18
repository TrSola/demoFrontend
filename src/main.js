import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router'


axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

const app = createApp(App)

app.use(VueAxios, axios)
app.use(router)

app.mount('#app')

