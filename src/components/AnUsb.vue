<template>
  <div id="AnUsb">
    <a-icon 
      type="usb"
      :style="{fontSize:'35px'}"
      :theme=themeUsb
    />
    <a-icon 
      v-if="!this.Usb.bind"
      type="share-alt"
      id="share"
      @click="execUsbBind"
    />
    <a-icon 
      v-else
      type="rollback"
      id="share"
      @click="execUsbBack"
    />
    <br>
    <h3>{{Usb.name}}</h3>
  </div>
</template>

<script>
export default {
  name:'AnUsb',
  props:['Usb','UsbBind','UsbBack'],
  data(){
    return{

    }
  },
  computed:{
    themeUsb(){
      if(this.Usb.bind) return "twoTone"
      else return null
    },
  },
  methods:{
    execUsbBind(){
      this.UsbBind(this.Usb.id)
    },
    execUsbBack(){
      this.UsbBack(this.Usb.id)
    },
  }
}
</script>

<style>
  #AnUsb{
    margin:10px auto;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    width: 230px;
    height: 100px;
    /* background-color: rgb(173, 83, 83); */
  }
  #share{
    float:right;
    font-size:40px;
    margin-top:25px;
  }
</style>