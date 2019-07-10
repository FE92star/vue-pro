<template lang="html">
  <div class="audio__wrap">
    <img :src="logo" alt="" class="logo">
    <div class="audio_info">
      <h4>{{title}}</h4>
      <p>{{time}}</p>
    </div>
    <div class="audio_control">
      <div class="">
        <img src="../assets/play.png" alt="" v-if="!playStatus" @click="playMusic">
        <img src="../assets/pause.png" alt="" v-else @click="pauseMusic">
      </div>
      <audio id="audio" :src="music" crossOrigin="anonymous"></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bao-audio',
  data: () => ({
    playStatus: false
  }),
  props: {
    music: {
      type: String,
      // required: true,
      default: '//r.51gjj.com/act/release/audio/zhangdan.mp3'
    },
    logo: {
      type: String,
      default: '//r.51gjj.com/webpublic/images/2019612/X4YvnLibzwx58.png'
    },
    title: {
      type: String,
      default: '苹果TV'
    },
    time: {
      type: String,
      default: '10分10秒'
    }
  },
  methods: {
    playMusic() {
      this.playStatus = true
      document.getElementById('audio').play()
      document.addEventListener('WeixinJSBridgeReady', function() {
        document.getElementById('audio').play()
      }, false)
    },
    pauseMusic() {
      this.playStatus = false
      document.getElementById('audio').pause()
      document.addEventListener('WeixinJSBridgeReady', function() {
        document.getElementById('audio').pause()
      }, false)
    },
    audioFn() {
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      let audioCtx = new AudioContext()
      let audioDom = document.getElementById('audio')
      let mediaSource = audioCtx.createMediaElementSource(audioDom)
      let gainNode = audioCtx.createGain()
      gainNode.gain.setValueAtTime(1, audioCtx.currentTime) // 初始化音量
      mediaSource.connect(gainNode)
      gainNode.connect(audioCtx.destination)
      audioDom.play()
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2000)
      // audioCtx.suspend()
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.audioFn()
    })
  }
}
</script>

<style lang="less" scoped>
.audio__wrap {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  background: #5C5C5C;
  overflow: hidden;
  position: relative;
  display: -webkit-flex;
          display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    width: 64px;
    display: block;
    animation: play 5.2s linear infinite;
  }
  .audio_info {
    overflow: hidden;
    padding-left: 19px;
    padding-right: 31px;
    h4 {
      font-size: 12px;
      color: #fff;
      line-height: 12px;
      font-weight: 550;
      padding-bottom: 4px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    p {
      font-size: 12px;
      color: #B7B7B7;
      line-height: 11px;
    }
  }
  .audio_control {
    img {
      width: 36px;
      display: block;
    }
  }
}
@keyframes play {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
