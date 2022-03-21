<template>
  <div>
    <a-icon type="delete" @click="hostDelete" :style="{fontSize:'20px'}"/>
  </div>
</template>

<script>
export default {
  name:'DeleteHost',
  props:['hostsDelete','host'],
  methods:{
    hostDelete(){
      this.hostsDelete(this.host.id)
    },
  },
}
</script>

<style>

</style>