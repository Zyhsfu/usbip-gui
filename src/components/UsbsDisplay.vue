<template>
  <div id="Usbs">
    <a-list>
      <AnUsb 
        v-show="!Usb.bind"
        v-for="Usb in Usbs"
        :key=Usb.id
        :Usb="Usb"
        :UsbBind="UsbBind"
      />
    </a-list>
  </div>
</template>

<script>
import AnUsb from './AnUsb.vue'
export default {
  name:'UsbsDisplay',
  components:{
    AnUsb,
  },
  props:['Usbs','UsbBind'],
}
</script>

<style>
  #Usbs{
    width: 250px;
    height: 400px;
    /* background-color: #93d43e; */
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    float:left
 }
</style>