<template>
  <div>
    <a-icon type="search" @click="openSearchDrawer" :style="{fontSize:'20px'}"/>
    <a-drawer
      class="drawer"
      title="可连接的USB设备"
      placement="right"
      :visible="searchVisible"
      @close="closeSearchDrawer"
    >
      <a-spin :spinning="spinning" tip="Loading..."/>
      <a-divider>{{host.ip}}</a-divider>
      <div id="usbsList">
        <a-list>
          <Usb
            v-for="usb in usbs"
            :key="usb.id"
            :usb="usb"
            :UsbAdd="UsbAdd"
            :usbClose="usbClose"
            :usbSelectTrue="usbSelectTrue"
            :usbSelected="usbSelected"
          />
        </a-list>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import Usb from './Usb.vue'
export default {
  name:'SearchDrawer',
  data(){
    return{
      Host:this.host,
      stdout:"",
      usbs:[],
      searchVisible : false,
      spinning:true
    }
  },
  props:['host','UsbAdd','usbSelectTrue','usbSelected'],
  components:{
    Usb,
  },
  methods:{
    openSearchDrawer(){
      this.usbs = []
      this.spinning = true
      this.searchVisible = true;
      window.ipcRenderer.once('stdout',(event,args)=>{
        // console.log(args)
        let reg =  /\d{1,}-\d{1,}\.{0,}\d{0,}:[^:]+/g
        let regBusId = /\d{1,}-\d{1,}\.*\d*/
        let regDsp = /[A-Za-z ]+/
        let usbsTemp = args.match(reg)
        // console.log(usbsTemp)
        if(usbsTemp){
          usbsTemp.forEach((usbTemp) => {
            let BusId = usbTemp.match(regBusId).toString()
            let Dsp = usbTemp.match(regDsp).toString().trim()
              BusId = this.Host.ip + ':' + this.Host.port + '=' + BusId
              const usb = {id:BusId,name:this.Host.name,port:this.Host.port,ip:this.Host.ip,dsp:Dsp}
              // console.log(usb)
              this.usbs.push(usb)
          })
        }
        this.spinning = false
      })
      window.ipcRenderer.send('search-usbs',this.Host)
    },
    closeSearchDrawer(){
      if(!this.spinning)
        this.searchVisible = false;
    },
    usbClose(id){
      this.usbs = this.usbs.filter((usb)=>{
        return usb.id !== id
      })
    },
  },
}
</script>

<style>
  .drawer{ 
    -webkit-app-region:no-drag;
  }
  #usbsList{
    /* width: 200px; */
    /* height: 490px; */
    width: 200px;
    height: auto;
    /* background-color: #e6ba43; */
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    /* overflow: auto; */
    -webkit-app-region:no-drag;
  }
</style>