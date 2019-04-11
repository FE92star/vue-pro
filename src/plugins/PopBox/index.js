import PopBox from './src/popBox.vue' //引入vue模板
var popBox = {} //定义插件对象
popBox.install = function(Vue, options) { //Vue的公开方法install，用于定义插件，第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
  // 如果该插件对象存在，则不再执行
  if(document.getElementsByClassName('alert_modal').length) {
    return
  }
  /* 插件开发的基本步骤 */
  // 1.使用基础 Vue 构造器，创建一个“子类”
  let PopTpl = Vue.extend(PopBox)
  // 2.new一个实例对象
  let $pop = new PopTpl()
  // 3.将这个实例对象挂载在window下面方便全局调用
  window.vPop = $pop
  // 4.将对应的对象转化为真实的DOM，并挂载到body下面
  let tpl = $pop.$mount().$el
  document.body.appendChild(tpl)
  // 5.在Vue原型上添加一个可以全局调用的方法，包含插件对应的显示和隐藏逻辑
  Vue.prototype.$pop = {
    show: (options) => {
      try {
        if(document.getElementsByClassName('alert_modal').length) {
          return
        }
        $pop.animate = options.animate || 'slide'
        $pop.copyFn = options.copyFn
        $pop.showAlert = true;
      } catch (e) {
        console.log(e);
      } finally {

      }
    },
    hide: () => {
      setTimeout(() => {
        $pop.showAlert = false;
      }, 20)
    }
  }
}
export default popBox
