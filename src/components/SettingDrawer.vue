<template>
  <div>
    <a-icon
      id="setting" 
      type="setting" 
      theme="filled"
      :style="{fontSize:'30px'}"
      @click="openSettingDrawer"  

    />
    <a-drawer
      class="settingDrawer"
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
  name:'SettingDrawer',
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
  },
}
</script>

<style>
  .settingDrawer{
    -webkit-app-region: no-drag;
  }
  #setting{
    position: absolute;
    left: 10px;
    bottom: 10px;
    -webkit-app-region: no-drag;
  }
</style>