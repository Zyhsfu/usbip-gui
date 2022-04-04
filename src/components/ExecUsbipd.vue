<template>
  <div id="Usbipd">
    <a-switch
      type="primary"
      @click="usbipd"
      v-model="checked"
    >启动服务端
    </a-switch>
  </div>
</template>

<script>
export default {
  name:'ExecUsbipd',
  data(){
    return{
      checked:false,
    }
  },
  methods:{
    usbipd(){
      if(this.checked){
        window.ipcRenderer.send('usbipd-on')
        // console.log("on")
      }
      else{
        window.ipcRenderer.send('usbipd-off')
        // console.log("off")
      }
    },
  }
}
</script>

<style>
  #Usbipd{
    margin-top:10px;
    float:right
  }
</style>