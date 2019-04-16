import Picker from './Picker.vue' // 引入vue模板
var picker = {} // 定义插件对象
picker.install = function (Vue, options) { // vue的install方法，用于定义vue插件
  if (document.getElementsByClassName('picker_pane').length) {
    return
  }
  let PickerTpl = Vue.extend(Picker)
  let $vpicker = new PickerTpl() // 实例化vue实例
  window.vpicker = $vpicker
  let tpl = $vpicker.$mount().$el
  document.body.appendChild(tpl)
  Vue.prototype.$picker = { // 在Vue的原型上添加实例方法，以全局调用
    show: (options) => {
      $vpicker.pickerData = [options.dataPick]
      $vpicker.show()
      Object.assign($vpicker, options)
    },
    hide: function () {
      $vpicker.hide()
    }
  }
}
export default picker
