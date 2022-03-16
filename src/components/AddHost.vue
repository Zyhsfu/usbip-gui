<template>
  <div>
    <div id="Header">
      <a-button
        id="addHost"
        type="primary" 
        @click="openAddHostDrawer"
      >
      添加主机</a-button>
    </div>
    <a-drawer
      class="addHostDrawer"
      title="添加主机"
      placement="right"
      :visible="visible"
      @close="closeAddHostDrawer"
    >
      <a-form-model>
        <a-form-model-item label="备注">
          <a-input size="small" v-model="name"/>
        </a-form-model-item>
        <a-form-model-item label="IP">
          <a-col :span="15">
            <a-input v-model="ip" size="small"/>
          </a-col>
          <span style="float:left">:</span>
          <a-col :span="5">
            <a-input-number 
              size="small"
              v-model="port" 
              :min="0" 
              :max="65535"
            >
            </a-input-number>
          </a-col>
        </a-form-model-item>
        <a-form-model-item>
          <a-form-model-item label=""/>
          <a-button type="primary" @click="addHost">确定</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-drawer>
  </div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
  name:'AddHost',
  data(){
    return{
      name,
      ip : "",
      port : 3240,
      visible:false,
    };
  },
  props:['addNewHost'],
  methods:{
    addHost(){
      const host = {id:nanoid(),name:this.name,ip:this.ip,port:this.port}
      this.addNewHost(host)
      this.name=""
      this.ip=""
      this.port=3240
      this.closeAddHostDrawer()
    },
    openAddHostDrawer(){
      this.visible = true;
    },
    closeAddHostDrawer(){
      this.visible = false;
    }
  }
}
</script>

<style>
  .addHostDrawer{ 
    -webkit-app-region:no-drag;
  }
  #Header{
    height: 40px;
    width: 150px;
    line-height: 60px;
  }
  #addHost{
    left:10px;
    vertical-align: middle;
    -webkit-app-region:no-drag;
  }
</style>