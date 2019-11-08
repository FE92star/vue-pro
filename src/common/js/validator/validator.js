import strategies from './strategys'
import Vue from 'vue'

export default class Validator {
  constructor() {
    this.cache = [] // 规则缓存
  }
  /* 添加对应的校验方法 
  @param data——参与校验的对象数据
  @param rules——校验规则数组，可以传入多组校验规则
  */
  addRule(data, rules) {
    let _this = this
    for(let i=0; i<rules.length; i++) {
      (function(rule) {
        try {
          let arr = rule.strategy.split(':')
          _this.cache.push(
            function() {
              let singleStrategy = arr.shift() // 策略名称
              arr.unshift(data) // 校验数据
              arr.push(rule.errorMsg) // 错误提示
              return strategies[singleStrategy].apply(data, arr) // 参数传递并执行函数
            }
          )
        }catch(e) {
          console.log(e)
        }finally {
          
        }
      })(rules[i])
    }
  }
  /* 开始校验 */
  startValidate() {
    let cacheList = this.cache
    for(let i=0; i<cacheList.length; i++) {
      let errMsg = cacheList[i]()
      if(errMsg) {
        if(Vue.prototype.$message) {
          Vue.prototype.$message.error(errMsg)
        }else {
          window.alert(errorMsg)
        }
        return false
      }
    }
    return true
  }
}