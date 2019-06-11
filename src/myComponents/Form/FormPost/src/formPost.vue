<template lang="html">
  <div class="formPost__wrap" v-if="false">
    <form :action="url" :method="type" name="dataPost" ref="form">
      <input type="submit" class="submit_button" @click="submitFn">
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
      url: '', // 跳转的URL
      type: "POST",
      params: [] // 需要传递的参数,固定格式[{'name': 'Bob'}]
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
        form.submit()
      }, 100)
    }
  },
  mounted() {

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
