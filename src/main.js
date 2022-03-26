import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const { ipcRenderer} = require('electron')
// const { ipcRenderer} = require('electron')
window.ipcRenderer = ipcRenderer

Vue.use(Antd);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
