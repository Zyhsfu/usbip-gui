<template>
  <div id="setting">
    <a-icon 
      type="setting" 
      theme="filled"
      :style="{fontSize:'20px'}"
      @click="openSettingDrawer"  

    />
    <a-drawer
      title="设置"
      placement="right"
      :visible="visible"
      @close="closeSettingDrawer"
    >

    </a-drawer>
  </div>
</template>

<script>
export default {
  data(){
    return{
      visible:false,
    };
  },
  methods:{
    openSettingDrawer(){
      this.visible = true;
    },
    closeSettingDrawer(){
      this.visible = false;
    }
  }
}
</script>

<style>
  #setting{
    position: absolute;
    left: 10px;
    bottom: 10px;
    -webkit-app-region: no-drag;
  }
</style>