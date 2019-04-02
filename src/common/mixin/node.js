/*
* 用于获取vue节点信息的方法集
*/
export default {
  methods: {
    // 获取父组件属性
    getAttr() {
      let attr = this.$parent.$attrs
      return attr
    },
    // 获取父组件子元素节点长度
    getNode() {
      let node = this.$parent.$children.length
      return node
    },
    // 获取子组件位置
    getIndex() {
      let node = this.$parent.$children.length
      let frist = 0
      let current = this._uid
      if(node>0) {
        if(!!this.$attrs.index) {
          current = this.$attrs.index
        }else {
          let uid = this.$parent.$children[0]._uid
          frist = uid
        }
      }
      let index = current-frist
      return index
    },
  }
}
