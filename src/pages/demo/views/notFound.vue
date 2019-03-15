<template >
  <div class="module">
    <div class="query">
      <img src="//r.51gjj.com/resource/common/icon/404.png" alt="">
      <h4>404</h4>
      <button @click='goBack'>返回</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notFound',
  methods: {
    goBack() {
      if(window.history.appgo) {
        window.history.appgo(-10)
      }else {
        window.history.go(-10)
      }
    }
  }
}
</script>

<style scoped lang='less'>
.module {
  max-width: 600px;
}
h4{
  font-size: 22px;
  padding-top: 40px;
  line-height: 30px;
  text-align: center;
  color: #aaa
}
button {
  border: none;
  outline: none;
  display: block;
  margin: 0 auto;
  height: 40px;
  width: 150px;
  font-size: 16px;
  color: #3a89ff;
  background: #fff;

}
.query {
  margin-top: 100px;
  img {
    width: 80%;
    display: block;
    margin: 0 auto
  }
}
</style>
