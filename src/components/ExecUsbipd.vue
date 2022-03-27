<template>
  <div id="Usbipd">
    <a-button 
      block
      type="primary"
      @click="usbipd"
    >启动服务端
    </a-button>
  </div>
</template>

<script>
export default {
  name:'ExecUsbipd',
  props:['port'],
  methods:{
    usbipd(){
      window.ipcRenderer.send('usbipd',this.port)
    },
  }
}
</script>

<style>
  #Usbipd{
    height:35px;
    width: 250px;
    float:right
  }
</style>