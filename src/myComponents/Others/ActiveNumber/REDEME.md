## 这是一个数字动画插件，同时也封装了对应的Vue组件方便调用
* 包含两种调用方式，原生调用和组件调用，支持小值到大值或者大值到小值得动画，支持小数：
1. JS原生调用
```html
  <div class="number">10000.99</div>
```
```js
  // a. 参数为数字，动画的进行次数
  let myNumber = new ActiveNumber('number', 20)
  // b. 参数为对象
  let myNumber = new ActiveNumber('number', {
    startNum: 0, // 动画开始数字
    isNumber: true, // 是否是数字动画(后面补全文字动画))
    animateCount: 20, // 数字动画进行的次数，决定数字变化的快慢，由于插件内部使用requestAnimationFrame做了动画优化，因此动画次数在比较大次数的情况下会根据浏览器的刷新频率执行对应次数的动画
    onAnimateEnd: () => { // 动画结束的回调
      console.log('number animate end')
    }
  })
```
2. Vue组件调用方式
```html
<active-number :endVal="10000" :startNum="100" :animateCount="30" @end="animateFn"></active-number>
```
```js
animateFn() {
  console.log('ending')
}
```