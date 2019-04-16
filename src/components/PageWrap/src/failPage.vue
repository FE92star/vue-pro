<template>
  <div>
    <img class="c-failPage__img" src="//r.51gjj.com/resource/wealthy/201810_licai_load_fail.png" alt="">
    <p class="c-failPage__p">{{tip}}</p>
    <div class="c-failPage__btn" @click="refreshPage">
      {{refreshText}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'fail-page',
  props: {
    tip: {
      type: [String, Number],
      default: '加载失败，请重新刷新'
    },
    refreshText: {
      type: String,
      default: '点击刷新'
    }
  },
  methods: {
    refreshPage() {
      window.location.reload()
    }
  }
}
</script>
<style lang="less" scoped>
.c-failPage__img {
  width: 125px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  margin-top: 155px;
}
.c-failPage__p {
  font-size: 13px;
  text-align: center;
  color: #555;
}
.c-failPage__btn {
  width: 64px;
  padding: 5px 0;
  margin: 0 auto;
  font-size: 12px;
  text-align: center;
  color: #4678e7;
  margin-top: 10px;
  border: 1px solid #4678e7;
}
</style>
