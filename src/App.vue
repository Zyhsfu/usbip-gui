<template>
  <div id="app">
    <div id="header">
      <div id="button-left">
        <UsbsList 
          :UsbAdd="UsbAdd"
          :Init="Init"
        />
        <ExecUsbipd/>
      </div>
      <div id="button-right">
        <div id="host">
          <a-input placeholder="IP" v-model="hostIP" style="width: 125px"/>
          <a-input-number v-model="hostPort" :min="0" :max="65535" style="width: 75px"/>
        </div>
        <PrintManage
          :hostPort="hostPort"
          :hostIP="hostIP"
          :isClick="isClick"
        />        
      </div>
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
import PrintManage from './components/PrintManage.vue'
export default {
  name: 'App',
  data(){
    return{
      hostPort:undefined,
      hostIP:undefined,
      Usbs:[],
    }
  },
  computed:{
    isClick(){
      if(this.hostPort && this.hostIP) return true
      else return false
    }
  },
  components: {
    UsbsList,
    UsbsDisplay,
    UsbsBindDisplay,
    ExecUsbipd,
    PrintManage,
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
  #header{
    width:595px;
    height: 40px;
  }
  #button-left{
    /* margin-top:5px; */
    margin-left:5px;
    width: 250px;
    height: 40px;
    /* border: 1px solid #e8e8e8; */
    /* border-radius: 4px; */
    float: left;
  }
  #button-right{
    margin-top:5px;
    /* margin-right:5px; */
    width: 250px;
    height: 40px;
    /* border: 1px solid #e8e8e8; */
    /* border-radius: 4px; */
    float: right;
  }
  #display{
    margin-left:5px;
    margin-top:5px;
    width: 590px;
    height: 400px;
    /* border: 1px solid #e8e8e8;
    border-radius: 4px; */
  }
  #host{
    float:left
  }
</style>
