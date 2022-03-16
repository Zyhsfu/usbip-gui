<template>
  <div class="card">
    <a-card hoverable style="width: 300px">
      <template slot="actions" class="ant-card-actions">
        <a-icon type="search" @click="openSearchDrawer"/>
        <a-icon type="edit" @click="openEditDrawer"/>
        <a-icon type="delete" @click="hostDelete"/>
      </template>
      <a-icon type="cloud-server" :style="{fontSize:'30px'}"/>
      <a-card-meta 
        :title="host.name"
        :description="host.ip +':'+ host.port"
      ></a-card-meta>
    </a-card>
    <a-drawer
      class="drawer"
      title="编辑"
      placement="right"
      :visible="editVisible"
      @close="closeEditDrawer"
      >

      <a-form-model>
        <a-form-model-item label="备注">
          <a-input size="small" v-model="nameEdit"/>
        </a-form-model-item>
        <a-form-model-item label="IP">
          <a-col :span="15">
            <a-input v-model="ipEdit" size="small"/>
          </a-col>
          <span style="float:left">:</span>
          <a-col :span="5">
            <a-input-number 
              size="small"
              v-model="portEdit" 
              :min="0" 
              :max="65535"
            >
            </a-input-number>
          </a-col>
        </a-form-model-item>
        <a-form-model-item>
          <a-form-model-item label=""/>
          <a-button type="primary" @click="editComplete">确定</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-drawer>
    <a-drawer
      class="drawer"
      title="可连接的USB设备"
      placement="right"
      :visible="searchVisible"
      @close="closeSearchDrawer"
    >
      <a-spin :spinning="spinning" tip="Loading..."/>
    </a-drawer>

  </div>
</template>

<script>
export default {
  name:'Host',
  props:['host','hostsDelete','hostsEdit'],
  data(){
    return{
      spinning:true,
      stdout:"",
      usbs:[],
      nameEdit : this.host.name,
      editVisible : false,
      ipEdit : this.host.ip,
      portEdit : this.host.port,
      searchVisible : false
    }
  },
  components:{
    
  },
  methods:{
    openSearchDrawer(){
      this.searchVisible = true;
      window.ipcRenderer.send('search-usbs',this.host)
    },
    closeSearchDrawer(){
      this.searchVisible = false;
    },
    hostDelete(){
      this.hostsDelete(this.host.id)
    },
    openEditDrawer(){
      this.nameEdit=this.host.name
      this.ipEdit=this.host.ip
      this.portEdit=this.host.port
      this.editVisible = true;
    },
    closeEditDrawer(){
      this.editVisible = false;
    },
    editComplete(){
      const newHost = {id:this.host.id,name:this.nameEdit,ip:this.ipEdit,port:this.portEdit}
      this.hostsEdit(this.host.id,newHost)
      this.editVisible=false
    }
  },
  mounted(){
    window.ipcRenderer.on('stdout',(event,args)=>{
      this.stdout = args
      // console.log(this.stdout)
    })
  }
}
</script>

<style>
  .card{
    -webkit-app-region:no-drag;
  }
  .drawer{ 
    -webkit-app-region:no-drag;
  }
</style>