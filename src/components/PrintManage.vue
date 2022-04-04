<template>
  <div id="print">
    <a-button
      icon="printer"
      @click="openDrawer"
      :style="{fontSize:'20px' ,marginLeft:'10px'}"
      :disabled="!isClick"
    />
    <a-drawer
      title="打印管理"
      placement="left"
      :visible="Visible"
      @close="closeDrawer"
      width="300px"
    >
      <a-form-model>
        <a-form-model-item label="选择文件" :rules="{required:true}">
          <a-upload
            :remove="handleRemove" 
            :before-upload="beforeUpload"
          >
            <a-button>
              <a-icon type="upload" /> 选择文件
            </a-button>
          </a-upload>
        </a-form-model-item>

        <a-form-model-item label="选择打印机" :rules="{required:true}">
          <a-select @focus="searchPrinter" v-model="printerName">
            <a-select-option 
              v-for="(printer,index) in printerjson" 
              :key="index"
              :value="printer.name"
            >{{printer.name}}</a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="纸张类型" :rules="{required:true}">
          <a-select v-model="paperType" style="width: 200px">
            <a-select-option value="A2">A2</a-select-option>
            <a-select-option value="A3">A3</a-select-option>
            <a-select-option value="A4">A4</a-select-option>
            <a-select-option value="A5">A5</a-select-option>
            <a-select-option value="A6">A6</a-select-option>
            <a-select-option value="letter">letter</a-select-option>
            <a-select-option value="legal">legal</a-select-option>
          </a-select>
        </a-form-model-item>
    
        <a-form-model-item label="纸张方向" :rules="{required:true}">
          <a-radio-group v-model="paperDirection">
            <a-radio-button value="portrait">portrait</a-radio-button>
            <a-radio-button value="landscape">landscape</a-radio-button>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item label="页码 (默认打印全部)">
          <a-input-number 
            style="{width:10px}"
            :min="1"
            v-model="firstPageNumber"
          />
          <span>-</span>
          <a-input-number
            :min="1" 
            v-model="secondPageNumber"
          />
        </a-form-model-item>

        <a-form-model-item label="份数" :rules="{required:true}">
          <a-input-number
            v-model="copies"
            :min="1"
          />
        </a-form-model-item>
        <a-button 
          type="primary"
          style="margin-top:16px"
          :disabled="fileList.length === 0 || !printerName"
          @click="handleUpload"
          :loading="uploading"
        >
        {{uploading ? '上传中' : '开始上传'}}
        </a-button>
      </a-form-model>
    </a-drawer>
  </div>
</template>

<script>
import axios from 'axios';
const {LocalFileData,constructFileFromLocalFileData} = require('get-file-object-from-local-path')
export default {
  name:'PrintManage',
  data(){
    return{
      printerName:"",
      paperType:'A4',
      paperDirection:'portrait',
      firstPageNumber:undefined,
      secondPageNumber:undefined,
      copies:1,
      Visible:false,
      fileList: [],
      uploading: false,
      printerjson:undefined,
      tempPath:undefined,
      formerPath:undefined,
    }
  },
  props:['hostPort','hostIP','isClick'],
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
      this.formerPath = file.path
      const path = file.path.split(".")
      const newPath = path[0] + '.pdf'
      this.tempPath = newPath
      window.ipcRenderer.send('to-pdf',file.path)

      window.ipcRenderer.once('pdf-reply',()=>{
        const fileData = new LocalFileData(newPath)
        const newFile = constructFileFromLocalFileData(fileData)
        this.fileList = [...this.fileList,newFile]
        return false
      })
    },
    handleUpload(){
      const { fileList } = this;

      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('files[]', file);
      });
      formData.append('paperType',this.paperType)
      formData.append('paperDirection',this.paperDirection)
      formData.append('copies',this.copies)
      formData.append('firstPageNumber',this.firstPageNumber)
      formData.append('secondPageNumber',this.secondPageNumber)
      formData.append('printerName',this.printerName)

      // console.log(JSON.stringify(formData))

      this.uploading = true;
      axios({
        url: 'http://' + this.hostIP + ':' + this.hostPort + '/fileUpload',
        method: 'post',
        processData: false,
        data: formData,
      })
        .then(()=>{
          this.fileList = [];
          this.uploading = false;
          this.$message.success('upload successfully.');
          this.init()
        })
        .catch(()=>{
          this.uploading = false;
          this.$message.error('upload failed.');
          this.init()
        })
    },
    init(){
      if(this.tempPath != this.formerPath)
        window.ipcRenderer.send('delete-pdf',this.tempPath)
      this.tempPath = undefined
      this.formerPath = undefined
      this.printerName = undefined
    },
    searchPrinter(){
      axios({
        url : 'http://' + this.hostIP + ':' + this.hostPort + '/getPrinter',
        method: 'get',
      })
        .then((response)=>(
          this.printerjson = response.data
          // console.log(response),
          // console.log(this.printerjson)
        ))
    },
  },
}
</script>

<style>
  #print{
    float:left
  }
</style>