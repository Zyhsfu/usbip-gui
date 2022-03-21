<template>
  <div class="hostList">
    <a-List>
      <Host 
        v-for="host in hosts" 
        :key="host.id" 
        :host="host"
        :hostsDelete="hostsDelete"
        :hostsEdit="hostsEdit"
        :UsbAdd="UsbAdd"
        :usbSelectTrue="usbSelectTrue"
        :usbSelected="usbSelected"
      />
    </a-List>
  </div>
</template>

<script>
import Host from './Host.vue'
export default {
  name:'HostsList',
  components:{
    Host,
  },
  props:[
    'hosts',
    'hostsDelete',
    'hostsEdit',
    'UsbAdd',
    'usbSelectTrue',
    'usbSelected'
    ],
}
</script>

<style>
  .hostList{
    float: left;
    width: 319px;
    height: 430px;
    /* background-color: #e6ba43; */
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    -webkit-app-region:no-drag;
  }
</style>