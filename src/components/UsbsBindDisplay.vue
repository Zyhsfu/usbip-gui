<template>
  <div id="UsbsBind">
    <a-list>
      <AnUsb
        v-show="Usb.bind"
        v-for="Usb in Usbs"
        :key=Usb.id
        :Usb="Usb"
        :UsbBack="UsbBack"
      />
    </a-list>
  </div>
</template>

<script>
import AnUsb from './AnUsb.vue'
export default {
  name:'UsbsBindDisplay',
  components:{
    AnUsb,
  },
  props:['Usbs','UsbBack'],
}
</script>

<style>
  #UsbsBind{
    width: 250px;
    height: 400px;
    /* background-color: #93d43e; */
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    float:right
 }
</style>