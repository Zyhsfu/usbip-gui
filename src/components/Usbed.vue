<template>
  <div id="Usbed">
    <a-icon type="usb" :style="{fontSize:'25px'}"/>
    <span>{{Usb.dsp}}</span>
    <br/>
    <span>{{Usb.ip}}</span>
    <a-icon type="close-circle"
      theme="filled"
      id="iconDelete"
      @click="execUsbDelete"
    />
    <a-icon
      type="pause-circle"
      theme="filled" 
      id="iconStop"
      @click="execUsbPause"
    />
    <a-icon type="play-circle" 
      theme="filled"
      id="iconPlay"
      @click="execUsbPlay"
    />
  </div>
</template>

<script>
export default {
  name:'Usbed',
  props:[
    'Usb',
    'UsbDelete',
    'UsbPlay',
    'UsbPause',
    'usbSelectFalse',
    'usbSelected',
  ],
  methods:{
    execUsbDelete(){
      this.usbSelectFalse(this.Usb.id)
      this.execUsbPause()
      this.UsbDelete(this.Usb.id);
    },
    execUsbPause(){
      this.UsbPause(this.Usb.id);
    },
    execUsbPlay(){
      this.UsbPlay(this.Usb.id);
    },
  },
}
</script>

<style>
  #iconStop{
    font-size: 20px;
    right: 25px;
    position:absolute;
    -webkit-app-region:no-drag;
  }
  #iconDelete{
    font-size: 20px;
    right: 0px;
    position:absolute;
    -webkit-app-region:no-drag;
  }
  #iconPlay{
    font-size: 20px;
    right: 50px;
    position:absolute;
    -webkit-app-region:no-drag;
  }
  #Usbed{
    position: relative;
    width: 380px;
    height: 50px;
    margin:5px auto;
    border: 1px solid #e8e8e8;
    /* background-color: #e6ba43; */
    border-radius: 4px;
    overflow: auto;
    -webkit-app-region:no-drag;
  }
</style>