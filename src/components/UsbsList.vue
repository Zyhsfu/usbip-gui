<template>
  <div id="UsbsList">
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
      this.Init()
      window.ipcRenderer.send('UsbsList')
      window.ipcRenderer.once('UsbsResult',(event,args)=>{
        let reg = /- busid.+/g
        let reg1 = / {3}.+/g
        let res = args.match(reg)
        let res1 = args.match(reg1)
        for(let i = 0;i < res.length;i ++){
          let regBusid = /\d+-\d+\.*\d*/
          let regName = /[A-Za-z ]+/
          let Busid = res[i].match(regBusid)[0]
          let name = res1[i].match(regName)[0]
          const Usb = {id:Busid,name:name,bind:false}
          this.UsbAdd(Usb)
        }
      })
    },
  },
  props:['UsbAdd','Init'],
}
</script>

<style>
  #UsbsList{
    margin-top:5px;
    float:left
  }
</style>