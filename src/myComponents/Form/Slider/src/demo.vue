<template lang="html">
  <div class="" style="margin: 0 20px;">
    <bao-slider step="10" @change="sliderFn">
      <img src="//r.51gjj.com/image/static/icon-nstSlider-mark.png" alt="">
    </bao-slider>
  </div>
</template>

<script>
import BaoSlider from './slider.vue'

export default {
  name: 'demo',
  components: {
    BaoSlider
  },
  methods: {
    sliderFn(val) {
      console.log(val);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
