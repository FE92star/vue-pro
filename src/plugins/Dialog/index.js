import Dialog from './src/dialog.vue'
let dialogP = {}
dialogP.install = function(Vue, options) {
  if(document.getElementsByClassName('dialog__modal').length) {
    return
  }
  let DialogTpl = Vue.extend(Dialog)
  let $dialog = new DialogTpl()
  window.$dialog = $dialog
  let tpl = $dialog.$mount().$el
  document.body.appendChild(tpl)
  Vue.prototype.$dialog = {
    confirm: (options) => {
      try {
        if(document.getElementsByClassName('dialog__modal').length) {
          return
        }
        Object.assign($dialog, options)
        if(!options.title) {
          $dialog.title = "提示"
        }
        if(!options.btn) {
          $dialog.btn = ['取消', '确定']
        }
        if(!options.animate) {
          $dialog.animate = 'fade'
        }
        $dialog.showDialog = true
      } catch (e) {
        console.log(e);
      } finally {

      }
    },
    cancel: () => {
      setTimeout(() => {
        $dialog.showDialog = false
      }, 50)
    }
  }
}
export default dialogP
