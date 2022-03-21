<template>
  <div>
    <a-icon type="edit" @click="openEditDrawer" :style="{fontSize:'20px'}"/>
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
  </div>
</template>

<script>
export default {
  name:'EditDrawer',
  data(){
    return{
      nameEdit : this.host.name,
      editVisible : false,
      ipEdit : this.host.ip,
      portEdit : this.host.port,
    }
  },
  props:['host','hostsEdit'],
  methods:{
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
}
</script>

<style>
  .drawer{ 
    -webkit-app-region:no-drag;
  }
</style>