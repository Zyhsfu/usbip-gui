<template>
  <div id="app">
    <a-icon 
      class="closeWindow"
      type="close-circle" 
      :style="{ fontSize: '16px', color:'#ff6060' }"
      @click="closeWindow"
    />
    <a-icon 
      class="minusWindow"
      type="minus-circle" 
      :style="{ fontSize: '16px', color:'#ff8c55' }"
      @click="minusWindow"
    />
    <SettingDrawer/>
    <!-- <Layout/> -->
  </div>
</template>

<script>
// import Layout from './components/Layout.vue'
import SettingDrawer from './components/SettingDrawer.vue'
export default {
  name: 'App',
  components:{
    SettingDrawer
  },
  methods:{
    //发送关闭窗口事件
    closeWindow(){
      window.ipcRenderer.send('close-window')
    },
    //发送最小化窗口事件
    minusWindow(){
      window.ipcRenderer.send('minus-window')
    }


  }
}
</script>

<style> 
  body {
    -webkit-app-region: drag;
  }

  .closeWindow{
    position: absolute;
    top:10px;
    right:10px;
    -webkit-app-region: no-drag;
  }
  .minusWindow{
    position: absolute;
    top:10px;
    right:30px;
    -webkit-app-region: no-drag;
  }
</style>
