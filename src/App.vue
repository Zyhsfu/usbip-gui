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
      />
      <UsbList/>
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
      hosts:[
        {id:'001',name:'UOS虚拟机',ip:'192.168.17.128',port:3240},
        {id:'002',name:'test',ip:'127.0.0.2',port:'3240'},
      ],
      usbs:[
        {busid:'1-11',name:'UOS虚拟机',ip:'192.168.17.128',port:3240,dsp:"kindstom"},
      ]
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
    }


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
