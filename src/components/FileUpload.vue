<template>
  <div>
    <a-button
      block
      type="primary"
      @click="openDrawer"
    >上传</a-button>
    <a-drawer
      title="上传管理"
      placement="right"
      :visible="Visible"
      @close="closeDrawer"
    >
    <a-upload
      :remove="handleRemove" 
      :before-upload="beforeUpload"
    >
    <a-button>
      <a-icon type="upload" /> 选择文件
    </a-button>
    </a-upload>
    <a-button 
      type="primary"
      style="margin-top:16px"
      :disabled="fileList.length === 0"
      @click="handleUpload"
      :loading="uploading"
    >
    {{uploading ? '上传中' : '开始上传'}}
    </a-button>
    </a-drawer>
  </div>
</template>

<script>
import reqwest from 'reqwest';
export default {
  name:'FileUpload',
  data(){
    return{
      Visible:false,
      fileList: [],
      uploading: false,
    }
  },
  methods:{
    openDrawer(){
      this.Visible = true
    },
    closeDrawer(){
      this.Visible = false
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload(file){
      const newFile = new File([file],"new.docx")
      // console.log(file)
      // console.log(newFile)
      this.fileList = [...this.fileList,newFile]
      // console.log(this.fileList)
      return false
    },
    handleUpload(){
      const { fileList } = this;
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('files[]', file);
      });
      this.uploading = true;
      // console.log(formData)
      reqwest({
        url: 'http://10.63.78.109:3000/fileUpload',
        method: 'post',
        processData: false,
        data: formData,
        success: () => {
          this.fileList = [];
          this.uploading = false;
          this.$message.success('upload successfully.');
        },
        error: () => {
          this.uploading = false;
          this.$message.error('upload failed.');
        },
      });
    },
  },
}
</script>

<style>

</style>