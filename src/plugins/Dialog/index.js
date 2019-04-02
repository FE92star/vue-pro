import Dialog from './dialog.vue'
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
        $dialog.animate = options.animate || 'bounce'
        $dialog.title = options.title || '解锁成功'
        $dialog.texts = options.texts
        $dialog.btn = options.btn || '前往查看'
        $dialog.checkFn = options.checkFn
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
