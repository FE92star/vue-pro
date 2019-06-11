import FormPost from './src/formPost.vue'

let formpostP = {}
formpostP.install = function(Vue, options) {
  if(document.getElementsByClassName('formPost__wrap').length) {
    return
  }
  let FormpostTpl = Vue.extend(FormPost)
  let $formpost = new FormpostTpl()
  window.$formpost = $formpost
  let tpl = $formpost.$mount().$el
  document.body.appendChild(tpl)
  Vue.prototype.$formpost = {
    show: (options) => {
      try {
        if(document.getElementsByClassName('formPost__wrap').length) {
          return
        }
        $formpost.url = options.url || ''
        $formpost.type = options.type || 'post'
        $formpost.params = options.params || []
        $formpost.showPost = true
      } catch (e) {
        console.log(e);
      } finally {

      }
    },
    cancel: () => {
      $formpost.showPost = false
    }
  }
}

export default formpostP
