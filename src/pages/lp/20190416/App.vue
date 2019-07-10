<template lang="html">
  <div class="">
    <div class="container">
      <div
        class="item"
        :class="`color${index+1}`"
        v-for="(item, index) in 9"
        :key="index"
        :style="randomColor(index)"
        >
        {{item}}
      </div>
    </div>
    <div class="loading">
      正在加载中<span>...</span>
    </div>
    <div class="box">

    </div>
  </div>
</template>

<script>
export default {
  name: 'grid',
  computed: {

  },
  methods: {
    randomColor(index) {
      let randomColor1 = parseInt(Math.random() * 256)
      let randomColor2 = parseInt(Math.random() * 256)
      let randomColor3 = parseInt(Math.random() * 256)
      let randomOpacity = Math.random().toFixed(2)
      return `background-color: rgba(${randomColor1}, ${randomColor2}, ${randomColor3}, ${randomOpacity})`
    }
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.container {
  display: grid;
  grid-template-columns: 100px auto 100px;
  grid-template-rows: 100px 100px 100px;
  grid-auto-flow: row dense;
  // justify-content: space-between;
  // align-content: space-between;
  .color1, .color2 {
    // grid-column-start: 1;
    // grid-column-end: 3;
  }
  .item {
    // justify-items: center;
  }
}
.loading {
  span {
      display: inline-block;
      height: 1em;
      line-height: 1;
      text-align: left;
      vertical-align: -.25em;
      overflow: hidden;
  }
  span::before {
      display: block;
      content: '...\A..\A.';
      white-space: pre-wrap;
      animation: dot 3s infinite step-start both;
  }
  @keyframes dot {
      33% { transform: translateY(-2em); }
      66% { transform: translateY(-1em); }
  }
}
.box {
  padding: 50%;
  background: blue;
}
</style>
