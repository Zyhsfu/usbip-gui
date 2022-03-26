<template>
  <div>
    <a-button
      type="primary"
      @click="execUsbsList"
    >查看本机USB设备</a-button>
  </div>
</template>

<script>
export default {
  name:'UsbsList',
  methods:{
    execUsbsList(){
      window.ipcRenderer.send('UsbsList')
    },
  }
}
</script>

<style>

</style>