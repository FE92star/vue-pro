<template lang="html">
  <div class="upload__wrap">
    <div class="upload_ended" v-if="uploadState" @mouseenter='showModel=true' @mouseleave='showModel=false'>
      <img :src="uploadSrc" alt="" class="upload">
      <div class="delete_model" v-if="showModel" @click="deleteUpload">
        <img src="../assets/delete.png" alt="">
      </div>
    </div>
    <div class="upload_wait" v-else>
      <img src="../assets/plus.png" alt="">
      <input
        type="file"
        ref="file"
        name="file"
        value=""
        id="file"
        :multiple="multiple"
        :accept="systemTypeLimit"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'bao-upload',
  data: () => ({
    uploadState: false, // 文件是否已上传的状态
    uploadSrc: '', // 上传的图片base64位地址
    showModel: false,
    filesList: [], // 多文件上传的文件列表
  }),
  props: {
    multiple: { // 是否支持多文件上传
      type: Boolean,
      default: false
    },
    systemTypeLimit: { // 系统默认筛选对应类型文件供选择
      // 上传文件的类型限制'image/*-表示接受任何图片类型,
      // '.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'——接受任何 MS Doc 文件类型.
      type: String,
      default: '.jpg, .jpeg, .png'
    },
    sizeLimit: {
      type: Number,
      default: 2
    },
    userLimit: { // 用户限制上传图片格式
      type: Array,
      default: () => {
        return ['png', 'jpg', 'jpeg', 'gif']
      }
    },
    drag: { // 是否支持拖拽功能，file类型默认支持拖拽
      type: Boolean,
      default: true
    },
    action: { // 从本地上传到服务器的php地址——一般默认是用PHP文件做服务器上传处理
      type: String,
      default: 'https://kaifa.jianbing.com/business/home/demo/post.php'
    }
  },
  methods: {
    fileRead() {
      let _this = this
      let status = false
      let inputDom = document.getElementById('file')
      inputDom.addEventListener('change', function() {
        if(inputDom.files.length == 1) { // 允许单个文件上传
          let singleFile = inputDom.files[0]
          if(singleFile.size > 1024 * 1024 * _this.sizeLimit) { // 限制上传文件大小
            console.log(`单个文件大小不能超出${_this.sizeLimit}M，请重新选择`);
            return false
          }
          let reader = new FileReader()
          reader.readAsDataURL(singleFile) // 异步读取
          reader.onloadstart = function(e) { // 开始上传
            status =  _this.userLimit.some((item) => {
              let exp = new RegExp(item, 'g')
              return singleFile.type.match(exp)
            })
          }
          reader.onprogress = function(e) { // 上传过程中
            // console.log(e.loaded);
          }
          reader.onload = function() { // 上传成功
            // console.log(this.result)
          }
          reader.onerror = function() {
            console.log('文件上传错误，请重新上传');
          }
          reader.onloadend = function() {
            if(status) {
              _this.uploadSrc = this.result
              _this.uploadState = true
              _this.$emit('change', this.result)
            }else {
              console.log('非指定类型文件');
            }
          }
        }else { // 多文件上传
          _this.filesList = inputDom.files
          _this.$emit('multChange', _this.filesList)
        }
      })
    },
    deleteUpload() {
      this.uploadSrc = ''
      this.uploadState = false
      setTimeout(() => { // DOM元素删除之后，绑定的事件监听器被移除，需要重新绑定，由于是异步执行，所以需要延时触发监听，保证可以在删除之后多次选择目标文件
        this.fileRead()
      }, 50)
    },
    uploadToServer(files) { // 文件上传到服务器
      let data = new FormData()
      let len = files.length, i = 0
      while (i < len) {
        data.append("file" + i, files[i])
        i++
      }
      let xhr = new XMLHttpRequest()
      xhr.open("post", this.action, true)
      xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
          console.log(xhr.responseText);
        }
      }
      xhr.send(data)
    }
  },
  mounted() {
    let _this = this
    this.$nextTick(() => {
      this.fileRead()
      if(!_this.drag) { // 撤销默认拖拽事件
        this.$refs.file.addEventListener('drop', function(event) {
          event.preventDefault() // 取消默认可拖拽事件
          if(event.type == 'drop') {
            _this.uploadSrc = event.dataTransfer.files // 被拖放的文件目标
            _this.uploadToServer(_this.uploadSrc)
            _this.$emit('unDrag', _this.uploadSrc)
          }
        })
      }
    })
  }
}
</script>

<style lang="less" scoped>
.upload__wrap {
  width: 200px;
  height: 200px;
  background: #fff;
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  border: 1px dashed #d9d9d9;
}
.upload_wait {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  background: #f1f0f1;
  display: -webkit-flex;
          display: flex;
  justify-content: center;
  align-items: center;
  & > input {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  img {
    width: 64px;
    display: block;
  }
}
.upload_ended {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: -webkit-flex;
          display: flex;
  justify-content: center;
  align-items: center;
  img[class~='upload'] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  .delete_model {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(0, 0, 0, 0.2);
    display: -webkit-flex;
            display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
