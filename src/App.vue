<template>
  <div id="app">
    <div id="button-top">
      <UsbsList 
        :UsbAdd="UsbAdd"
        :Init="Init"
      />
      <ExecUsbipd
        :port="port"
      />
      <a-input-number
        :min="0"
        :max="65535"
        v-model="port"
        :style="{
          float:'right'
        }"
      />
    </div>
    <div id="display">
      <UsbsDisplay
        :Usbs="Usbs"
        :UsbBind="UsbBind"
      />
      <UsbsBindDisplay
        :Usbs="Usbs"
        :UsbBack="UsbBack"
      />
    </div>
  </div>
</template>

<script>
import UsbsList from './components/UsbsList.vue'
import UsbsDisplay from './components/UsbsDisplay.vue'
import UsbsBindDisplay from './components/UsbsBindDisplay.vue'
import ExecUsbipd from './components/ExecUsbipd.vue'
export default {
  name: 'App',
  data(){
    return{
      port:3240,
      Usbs:[],
    }
  },
  mounted(){
    window.ipcRenderer.on('error',(event,args)=>{
      console.log(args)
    })
  },
  components: {
    UsbsList,
    UsbsDisplay,
    UsbsBindDisplay,
    ExecUsbipd,
  },
  methods:{
    Init(){
      this.Usbs = []
    },
    UsbAdd(data){
      this.Usbs.push(data)
    },
    UsbBind(id){
      window.ipcRenderer.send('UsbBind',id)
      this.Usbs.forEach((Usb)=>{
        if(Usb.id === id) Usb.bind = true
      })
    },
    UsbBack(id){
      window.ipcRenderer.send('UsbBack',id)
      this.Usbs.forEach((Usb)=>{
        if(Usb.id === id) Usb.bind = false
      })
    },
  },
}
</script>

<style>
  #button-top{
    width: 590px;
    height: 35px;
    /* border: 1px solid #e8e8e8;
    border-radius: 4px; */
  }
  #display{
    width: 590px;
    height: 400px;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
  }
</style>
