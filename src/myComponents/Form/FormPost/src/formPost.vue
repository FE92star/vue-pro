<template lang="html">
  <div class="formPost__wrap" v-if="showPost">
    <form :action="url" :method="type" :enctype="enctype" name="dataPost" ref="form">
      <input type="submit" class="submit_button">
      <input
        v-for="(item, index) in params"
        :key="index"
        type="hidden"
        :name="item.name"
        :value="item.value"
      >
    </form>
  </div>
</template>

<script>
export default {
  name: 'bao-formpost',
  data() {
    return {
      showPost: false,
      url: '', // 跳转的URL
      type: "POST",
      params: [], // 需要传递的参数,固定格式[{'name': 'name', 'value': 'Bob'}]
      enctype: 'application/x-www-form-urlencoded', // 默认编码方式'multipart/form-data'——在使用包含文件上传控件的表单时，必须使用该值。
    }
  },
  computed: {
    formData() {
      let arr = []
      if(Array.isArray(this.params)) {
        return this.params
      }
      if(Object.prototype.toString.call(this.params) == '[object Object]') {
        for(let v in this.params) {
          let obj = {}
          obj[v] = this.params[v]
          arr.push(obj)
        }
      }
      return arr
    }
  },
  methods: {
    submitFn() {
      setTimeout(() => {
        let form = this.$refs.form
        if(form) {
          form.submit()
        }
      }, 100)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.submitFn()
    })
  }
}
</script>

<style lang="less" scoped>
.formPost__wrap {
  position: absolute;
  width: 0;
  height: 0;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: -10;
  .submit_button {
    position: absolute;
    width: 0;
    height: 0;
  }
}
</style>
