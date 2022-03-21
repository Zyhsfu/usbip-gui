<template>
  <div class="card">
    <a-card hoverable style="width: 300px">
      <template slot="actions" class="ant-card-actions">
        <SearchDrawer 
          :host="host" 
          :UsbAdd="UsbAdd" 
          :usbSelectTrue="usbSelectTrue" 
          :usbSelected="usbSelected"
        />
        <EditDrawer 
          :host="host" 
          :hostsEdit="hostsEdit"
        />
        <DeleteHost 
          :hostsDelete="hostsDelete" 
          :host="host"
        />
      </template>
      <a-icon type="cloud-server" :style="{fontSize:'30px'}"/>
      <a-card-meta 
        :title="host.name"
        :description="host.ip +':'+ host.port"
      ></a-card-meta>
    </a-card>
  </div>
</template>

<script>
import SearchDrawer from './SearchDrawer.vue'
import DeleteHost from './DeleteHost.vue'
import EditDrawer from './EditDrawer.vue'
export default {
  name:'Host',
  props:[
    'host',
    'hostsDelete',
    'hostsEdit',
    'UsbAdd',
    'usbSelectTrue',
    'usbSelected'
    ],
  data(){
    return{
    }
  },
  components:{
    DeleteHost,
    EditDrawer,
    SearchDrawer,
  },
  methods:{

  },
  mounted(){
  }
}
</script>

<style>
  .card{
    margin-top: 15px;
    -webkit-app-region:no-drag;
  }
</style>