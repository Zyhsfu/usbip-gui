<template>
  <div id="usb" v-show="!this.usbSelected[this.usb.id]">
    <a-icon type="usb" :style="{fontSize:'25px'}"/>
    <p>名称:{{usb.dsp}}</p>
    <a-button 
      type="normal" 
      id="plus"
      block 
      icon="plus-circle"
      @click="execUsbAdd"
    />
  </div>
</template>

<script>
export default {
  name:'Usb',
  props:['usb','UsbAdd','usbClose','usbSelectTrue','usbSelected'],
  methods:{
    execUsbAdd(){
      this.usbSelectTrue(this.usb.id)
      const Usb = {"p":null,"id": this.usb.id, "name": this.usb.name, "port": this.usb.port, "ip": this.usb.ip, "dsp": this.usb.dsp}
      this.UsbAdd(Usb)
      this.usbClose(this.usb.id)
    },
  },
}
</script>

<style>
  #usb{
    position:relative;
    margin:5px auto;
    width: 190px;
    height: 115px;
    /* background-color: #e6ba43; */
    border: 1px solid #e8e8e8;
    border-radius: 4px;
  }
  #plus{
    bottom: 0px;
    position: absolute;
    -webkit-app-region:no-drag;
  }
</style>