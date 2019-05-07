<template lang="html">
  <div class="">
    <button type="button" name="button" @click="showFn">dilog</button>
    <button type="button" name="button" @click="popFn" class="color1">pop</button>
    <button type="button" name="button" @click="toastFn" class="color2">Toast</button>
    <div class="parent">
      <div class="child">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    value: null
  }),
  methods: {
    showFn() {
      this.$dialog.confirm({
        animate: 'bounce',
        title: '请先解锁',
        texts: `<p>本章节内容还未解锁，请先解锁~</p>`,
        btn: ['取消', '确定'],
        cancleFn: () => {
          this.$dialog.cancel()
        },
        confirmFn: () => {
          this.$dialog.cancel()
        }
      })
    },
    popFn() {
      this.$pop.show({
        animate: 'slide',
        copyFn: () => {
          this.$pop.hide()
        }
      })
    },
    toastFn() {
      // const fn = async () => {
      //   await this.$toast.show('数据错误')
      // }
      // this.$toast.show('数据错误')
      // setTimeout(() => {
      //   this.$toast.show({
      //     message: '数据请求失败',
      //     position: 'top',
      //     type: 'warning'
      //   })
      // }, 5000)
    },
    ajaxFn() {
      this.$ajax({
        url: 'http://test.jianbing.com/invest2/account/queryAccount/accountInfo',
        type: "POST",
        success: (r) => {
          this.value = r.resData
          console.log(this.value);
        }
      })
    }
  },
  mounted() {
    // this.ajaxFn()
    let _this = this
    // async function asyncFn() {
    //   await _this.ajaxFn()
    //   return _this.value
    // }
    // asyncFn().then((result) => {
    //   console.log(result);
    // })
    // const asyncFn = async () => {
    //   await _this.ajaxFn()
    //   return 'results'
    // }
    // asyncFn().then((value) => {
    //   console.log(value);
    // })
    const promiseFn = () => {
      return new Promise((resolve, reject) => {
        _this.$ajax({
          url: 'http://test.jianbing.com/invest2/account/queryAccount/accountInfo',
          type: "POST",
          success: (r) => {
            _this.value = r.resData
            resolve(_this.value)
          },
          error: (e) => {
            reject(e)
          }
        })
      })
    }
    const promiseFns = (value) => {
      let p = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(value)
        }, 2000)
      })
      return p
    }
    const asyncFn = async () => {
      let data = await promiseFn()
      let datas = await promiseFns(data)
      return datas
    }
    asyncFn().then((value) => {
      console.log(value);
    })
    // promiseFn().then((result) => {
    //   console.log(result);
    // }).catch((err) => {
    //   console.log(err);
    // })
  },
  created() {
    // const makePromise = (value) => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(value)
    //     }, Math.random() * 1000)
    //   })
    // }
    // const print = (value) => {
    //   return value
    // }
    // let promises = [1,2,3,4,5].map((item, index) => {
    //   return makePromise(item)
    // })
    // // promise的并行
    // Promise.all(promises)
    // .then(() => {
    //   console.log('done');
    // })
    // .catch(() => {
    //   console.log('err');
    // })
    // promise的串行
    // const runPromiseByQueue = (myPromises) => {
    //   myPromises.reduce((previousPromise, nextPromise) => previousPromise.then(() => nextPromise()), Promise.resolve())
    // }
    // const runPromiseByQueue = async (myPromises) => {
    //   for(let value of myPromises) {
    //     await value()
    //   }
    // }
    // const createPromise = (time, id) => () =>
    //   new Promise(solve =>
    //     setTimeout(() => {
    //       console.log("promise", id);
    //       solve();
    //     }, time)
    //   );
    //
    // runPromiseByQueue([
    //   createPromise(3000, 1),
    //   createPromise(2000, 2),
    //   createPromise(1000, 3)
    // ]);
    // let arr = [1,2,3,4,5].reduce((total, value) => {
    //   return total + value
    // }, 6)
    // console.log(arr);
  }
}
</script>

<style lang="less">
.color1 {
  background: red !important;
}
.color2 {
  background: orange !important;
}
button {
  width: 120px;
  height: 40px;
  border: 0;
  outline: 0;
  background: blue;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  margin: 24px auto;
  display: block;
}
.parent {
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  height: 42px;
  line-height: 42px;
  background: #ccc;
  // transform: translate3d(0,0,0);
  // will-change: transform;
  perspective: 500;
  .child {
    width: 100px;
    height: 20px;
    background: red;
    position: fixed;
    left: 20px;
    top: 20px;
  }
}
</style>
