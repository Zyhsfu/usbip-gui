<template>
  <div id="app">
    <AddHost :addNewHost="addNewHost"/>
    <a-divider ></a-divider>
    <div class="mid">
      <HostsList 
        :hosts="hosts" 
        :addNewHost="addNewHost"
        :hostsDelete="hostsDelete"
        :hostsEdit="hostsEdit"
        :UsbAdd="UsbAdd"
        :usbSelectTrue="usbSelectTrue"
        :usbSelected="usbSelected"
      />
      <UsbList 
        :Usbs="Usbs"
        :UsbDelete="UsbDelete"
        :UsbPause="UsbPause"
        :UsbPlay="UsbPlay"
        :usbSelectFalse="usbSelectFalse"
        :usbSelected="usbSelected"
      />
    </div>
    <a-icon 
      class="closeWindow"
      type="close-circle" 
      :style="{ fontSize: '16px', color:'#ff6060' }"
      @click="closeWindow"
    />
    <a-icon 
      class="minusWindow"
      type="minus-circle" 
      :style="{ fontSize: '16px', color:'#ff8c55' }"
      @click="minusWindow"
    />
    <SettingDrawer/>
  </div>
</template>

<script>
import UsbList from './components/UsbList.vue'
import AddHost from './components/AddHost.vue'
import SettingDrawer from './components/SettingDrawer.vue'
import HostsList from './components/HostsList.vue'
export default {
  name: 'App',
  components:{
    SettingDrawer,
    AddHost,
    HostsList,
    UsbList,
  },
  data(){
    return{
      usbSelected:[],
      vis:[],
      num:0,
      hosts:[],
      ps:[],
      Usbs:[],
    }
  },
  methods:{
    //增加新主机
    addNewHost(host){
      this.hosts.push(host)
    },
    //编辑主机
    hostsEdit(id,newHost){
      this.hosts.forEach((host)=>{
        if(host.id === id){
          host.name = newHost.name
          host.ip = newHost.ip
          host.port = newHost.port
        }
      })
    },
    //删除主机
    hostsDelete(id){
      this.hosts = this.hosts.filter((host)=>{
        return host.id !== id
      })
    },
    //发送关闭窗口事件
    closeWindow(){
      window.ipcRenderer.send('close-window')
    },
    //发送最小化窗口事件
    minusWindow(){
      window.ipcRenderer.send('minus-window')
    },
    UsbDelete(id){
      this.Usbs = this.Usbs.filter((Usb)=>{
        return Usb.id !== id
      })
    },
    UsbPause(id){
      let thisP
      this.Usbs.forEach((Usb)=>{
        if(Usb.id === id) thisP = Usb.p
      })
      // console.log(thisP)
      if(thisP !== null){
        window.ipcRenderer.send('UsbPause',thisP)
      }
      this.Usbs.forEach((Usb)=>{
        if(Usb.id === id){
          this.vis[Usb.p] = 0
          Usb.p = null
        }
      })
    },
    UsbPlay(id){
      // console.log(this.vis[1])
      window.ipcRenderer.send('UsbPlay',id)
      this.Usbs.forEach((Usb)=>{
        if(Usb.id === id){
          for(let i = 0;i <= 100;i ++){
            if(!this.vis[i]){
              Usb.p = i
              this.vis[i] = 1
              break
            }
          }
        }
      })
    },
    UsbAdd(Usb){
      this.Usbs.push(Usb)
    },
    usbSelectTrue(id){
        this.usbSelected[id] = 1
    },
    usbSelectFalse(id){
        this.usbSelected[id] = 0
    },
  }
}
</script>

<style>
  body {
    -webkit-app-region: drag;
  }
  .mid{
    width: 800px;
    height: 430px;
    -webkit-app-region: no-drag;
    /* background-color: #e05353; */
  }
  .closeWindow{
    position: absolute;
    top:10px;
    right:10px;
    -webkit-app-region: no-drag;
  }
  .minusWindow{
    position: absolute;
    top:10px;
    right:30px;
    -webkit-app-region: no-drag;
  }
</style>
