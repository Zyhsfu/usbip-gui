<template>
  <div id="UsbList">
    <a-list>
      <Usbed
        v-for="Usb in Usbs"
        :key="Usb.id"
        :Usb="Usb"
        :UsbDelete="UsbDelete"
        :UsbPlay="UsbPlay"
        :UsbPause="UsbPause"
        :usbSelectFalse="usbSelectFalse"
        :usbSelected="usbSelected"
      />
    </a-list>
  </div>
</template>

<script>
import Usbed from './Usbed.vue'
export default {
  props:[
    'Usbs',
    'UsbDelete',
    'UsbPlay',
    'UsbPause',
    'usbSelectFalse',
    'usbSelected',
    ],
  components:{
    Usbed,
  },
}
</script>

<style>
    #UsbList{
        float: right;
        width: 400px;
        height: 430px;
        /* background-color: #d4c219; */
        border: 1px solid #e8e8e8;
        border-radius: 4px;
        overflow: auto;
    }
</style>