function listenPages(options = {time: 2000 }) {
  class ListenPages {
    constructor(options) {
      this.options = options
      this.time = options.time // 回调执行时间
      this.timeTag1 = null // 第一次执行回调时间
      this.timeTag2 = null // 第二次执行回调时间
      this.id = Symbol('ListenPages') // 全局唯一事件id
      this.namespace = '__ListenPage-EventList__' // 挂在在window下面的命名空间,防止被污染
    }
    autoAddPrefixes(property) { // 添加属性前缀，兼容浏览器
      let browsers = ['webkit', 'moz', 'ms', 'o']
      if(property in document) return property
      let p = browsers.find(p => {
        if(`-${p}-${property}` in document) {
          return `-${p}-${property}`
        }
      })
      return p || null
    }
    getfunc(property, option) { // 确认是否配置属性函数
      if(property in option) { // 若存在则执行该函数
        option[property]()
      }else {
        if(this.options.showTip) {
          console.warn(`该事件上未配置${property}属性`);
        }
      }
    }
    registerEvent(tag, fn, capture = false) { // 事件注册，类似于原生方法addEventListener，tag_注册事件名称，fn_事件触发回调函数，capcure_是否捕获
      let namespace = this.namespace
      window[namespace] = window[namespace] || []
      let t = window[namespace]
      let href = window.location.href
      let hasItem = t.find(item => item.href === href)
      if(hasItem) { // 命名空间已存在该href
        if(!hasItem[tag]) {
          hasItem[tag] = fn
        }
      }else {
        window[namespace].push({
          href: href,
          [tag]: fn
        })
      }
      if(capture) {
        if(hasItem) {
          hasItem[tag]()
        }else {
          fn()
        }
      }
    }
    debounce(fn) { // 防抖函数
      if(!this.timeTag1) {
        if(typeof fn === 'function') {
          fn()
        }
        this.timeTag1 = new Date().getTime()
      }else {
        this.timeTag2 = new Date().getTime()
        let diff = this.timeTag2 - this.timeTag1
        if(diff > this.time) { // 确保下次回调至少在设置时间差以外执行,否则不执行任何操作
          if(typeof fn === 'function') {
            fn()
          }
          this.timeTag1 = new Date().getTime()
        }
      }
    }
    focus() {
      window.onfocus = () => {
        this.registerEvent('show', window[this.id].show, true)
      }
      return this
    }
    blur() {
      window.onblur = () => {
        this.registerEvent('hide', window[this.id].hide, true)
      }
    }
    change(_option) { // 监听变化
      let p = this.autoAddPrefixes('visibilityState')
      const debounceFn = () => {
        if(_option) {
          let callback = () => {
            return this.getfunc('onload', _option)
          }
          this.debounce(callback)
        }
      }
      // 挂在在全局下的唯一对象
      window[this.id] = {
        show: () => {
          return debounceFn()
        },
        hide: () => {
          return this.getfunc('onclose', _option)
        }
      }
      let visitFn = () => {
        if(document[p] === 'visible') { // 页面可见状态
          if(this.options.href) {
            if(window.location.href === this.options.href) {
              this.registerEvent('show', window[this.id].show, true)
            }
          }else {
            this.registerEvent('show', window[this.id].show, true)
          }
        }else if(document[p] === 'hidden') { // 窗口不可见
          this.registerEvent('hide', window[this.id].hide, true)
        }
      }
      // 全局监听变化
      if(p) {
        document.addEventListener('visibilitychange', visitFn, false)
      }
      return this
    }
  }
  return new ListenPages(options)
}

export default listenPages
