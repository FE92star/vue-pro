## input输入框组件 v-model

### 父子组件之间的v-model实现
  1. 子组件设置一个props，用于接收父组件的`v-model`数据
  2. 同时绑定`input`,向父组件`$emit`派发一个事件
