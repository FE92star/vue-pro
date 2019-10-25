import { checkNode } from './utils/checkNode'
/* 
* @method ActiveNumber { class }
* @param{ String } el 对应的节点名称
* @param{ Object } options 对应的动画选项
* @param{ Number } startNum 动画开始数字
* @param{ Boolean } isNumber 是否是数字动画
* @param{ Number } animateCount 动画进行次数
* @param { Function } onAnimateEnd 动画结束回调
*/
export default class ActiveNumber {
  constructor(el, options) {
    // 初始化配置并且开始动画
    this.initData(el, options) && this.start()
  }
  /* 动画初始化 */
  initData(el, options) {
    this.el = checkNode(el) // 当前元素
    if(!this.el) return
    options = this.mergeOptions(options)
    this.options = options // 当前传入参数选项
    // 处理参数选项
    if(options.isNumber) { // 数字动画
      this.number = Number(this.el.innerText) // 获取动画数字
      if(!this.number && this.number !== 0) {
        return this.initData(el, this.options)
      }
      this.startNum = options.startNum
      this.animateCount = options.animateCount
    }
    this.isNumber = options.isNumber
    this.time = options.time
    this.onAnimateEnd = options.onAnimateEnd
    return true // 用于&&同步执行多个函数
  }
  /* 参数初始化合并，返回合并后的参数选项 */
  mergeOptions(options) {
    // 传入参数为数字是动画进行的次数
    if(typeof options === 'number') options = { animateCount: options }
    options = options || {}
    let baseOptions = {
      time: 500, // 动画时间
      startNum: 0, // 数字动画起始数字
      animateCount: 20, // 动画进行的次数
      isNumber: true, // 是否是数字动画
      onAnimateEnd() {} // 动画结束的回调
    }
    for(let option in baseOptions) { // 合并传入参数及基础参数
      !options[option] && (options[option] = baseOptions[option])
    }
    return options
  }
  /* 动画开始 */
  start() {
    this.isNumber ? this.numberAnimateFn() : this.textAnimateFn()
  }
  numberAnimateFn() {
    let animateCount = this.animateCount
    let targetNumber = this.number
    if(targetNumber === 0) return // 目标数字为0则不进行动画
    // 判断目标数字的保留位数
    let targetDecimalLen = this.getDecimalLenth(targetNumber)
    let startDecimalLen = this.getDecimalLenth(this.startNum)
    let finalDecimalLen = Math.max(targetDecimalLen, startDecimalLen)
    let totalD = this.number - this.startNum
    // 每次数字动画的间隔
    let everyD = (totalD / animateCount).toFixed(finalDecimalLen) - 0
    if(everyD === 0) { // 数字太小无法动画
      console.error('数字太小无法进行动画')
    }
    // 开始动画——用requestAnimationFrame代替定时器获取更好的动画性能，动画帧率始终保持60帧的频率，动画时间由浏览器性能决定
    // let everyTime = this.time / animateCount
    let currentNum = this.startNum
    const runAnimateFn = () => {
      currentNum = (currentNum + everyD).toFixed(finalDecimalLen) - 0
      this.el.innerText = currentNum
      // 临界条件——动画进行到最后一次的时候,当前值-目标值<每次间隔数字，变成目标数字，结束动画并关闭定时器，执行结束回调
      if(Math.abs(currentNum - targetNumber) < Math.abs(everyD)) {
        this.el.innerText = targetNumber
        this.onEndFn()
        return // 退出执行
      }else {
        window.requestAnimationFrame(runAnimateFn)
      }
    }
    window.requestAnimationFrame(runAnimateFn)
    // this.timer = setInterval(() => {
    //   currentNum = (currentNum + everyD).toFixed(finalDecimalLen) - 0
    //   // 临界条件——动画进行到最后一次的时候,当前值-目标值<每次间隔数字，变成目标数字，结束动画并关闭定时器，执行结束回调
    //   if(Math.abs(currentNum - targetNumber) < Math.abs(everyD)) {
    //     this.el.innerText = targetNumber
    //     this.onEndFn()
    //     return clearInterval(this.timer) // 退出执行
    //   }
    //   this.el.innerText = currentNum
    // }, everyTime)
  }
  textAnimateFn() {
    console.log('wow no text animation')
  }
  /* 获取数字小数点位数 */
  getDecimalLenth(number) {
    let numStr = `${number}`
    return numStr.split('.')[1] && numStr.split('.')[1].length || 0
  }
  /* 结束回调 */
  onEndFn() {
    let onAnimateEnd = this.onAnimateEnd
    typeof(onAnimateEnd) === 'function' && setTimeout(() => { onAnimateEnd() }, 100)
  }
}