function listenPage (option = { time: 2000 }) {
  class ListenPage {
    constructor (option) {
      this.option = option
      this.time = option.time || 200
      this.timeTag1 = null // 记录第一次操作时间
      this.timeTag2 = null // 记录第二次操作时间
      this.id = Symbol('listenPage') // 防止事件覆盖
      this.namespace = '__ListenPage-EventList__' // 挂载在window的对象命名空间
    }
    // 添加属性前缀 兼容浏览器
    autoAddPrefixes (property) {
      let pre = ['webkit', 'moz', 'ms', 'o']
      if (property in document) {
        return property
      }
      let p = pre.find(item => {
        if (`-${item}-${property}` in document) {
          return `-${item}-${property}`
        }
      })
      return p || null
    }
    // 若配置内不存在某属性 则返回该属性名
    getfunc (property, option) {
      if (property in option) {
        option[property]()
      } else {
        if (this.option.showTip) {
          console.warn(`该change事件上没有部署${property}属性或方法`)
        }
      }
    }
    // 注册事件
    registerEvent (tag, fn, doit = false) {
      let namespace = this.namespace
      window[namespace] = window[namespace] || []
      let t = window[namespace]
      let href = window.location.href
      let hasItem = t.find(item => href === item.href)
      if (hasItem) {
        if (!hasItem[tag]) {
          hasItem[tag] = fn
        }
      } else {
        window[namespace].push({
          href: href,
          [tag]: fn
        })
      }
      if (doit) {
        if (hasItem) {
          hasItem[tag]()
        } else {
          fn()
        }
      }
    }
    debounce (fn) {
      if (!this.timeTag1) {
        if (typeof fn === 'function') {
          fn()
        }
        this.timeTag1 = new Date().getTime()
      } else {
        this.timeTag2 = new Date().getTime()
        let dif = this.timeTag2 - this.timeTag1
        if (dif > this.time) {
          if (typeof fn === 'function') {
            fn()
          }
          this.timeTag1 = new Date().getTime()
          this.timeTag2 = this.timeTag1
        }
      }
    }
    focus () {
      window.onfocus = () => {
        this.registerEvent('show', window[this.id].show, true)
      }
      return this
    }
    blur () {
      window.onblur = () => {
        this.registerEvent('hide', window[this.id].hide, true)
      }
      return this
    }
    // 监听变化
    change (_option) {
      let p = this.autoAddPrefixes('visibilityState')
      // 防抖在规定时间内不重复执行
      let debounceFn = () => {
        if (_option) {
          let callback = () => {
            return this.getfunc('onload', _option)
          }
          this.debounce(callback)
        }
      }
      window[this.id] = {
        show: () => {
          return debounceFn()
        },
        hide: () => {
          return this.getfunc('onclose', _option)
        }
      }
      let visFn = () => {
        if (document[p] === 'visible') {
          if (this.option.href) {
            if (window.location.href === this.option.href) {
              this.registerEvent('show', window[this.id].show, true)
            }
          } else {
            this.registerEvent('show', window[this.id].show, true)
          }
        } else if (document[p] === 'hidden') {
          this.registerEvent('hide', window[this.id].hide, true)
        }
      }
      // 监听顶层窗口变化
      if (p) {
        document.addEventListener('visibilitychange', visFn, false)
      }
      if (this.option.addFocus) {
        window.onfocus = () => {
          if (this.option.href) {
            if (window.location.href === this.option.href) {
              this.registerEvent('show', window[this.id].show, true)
            }
          } else {
            this.registerEvent('show', window[this.id].show, true)
          }
        }
      }
      if (this.option.addBlur) {
        window.onblur = () => {
          this.registerEvent('hide', window[this.id].hide, true)
        }
      }
      return this
    }
  }
  return new ListenPage(option)
}

export default listenPage
