## 策略模式的表单校验
* 策略模式是通过封装公共类，将校验规则和校验中心分开处理，通常应用于前端表单基础校验，应用方法如下：
```js
import Validator from './js/validator'
const validatorForm = {
  cellPhone: '',
  passWord: ''
}
validateFn() {
  let validator = new Validator()
  validator.addRule(validatorForm.cellPhone, [
    {
      strategy: 'isNotEmpty',
      errorMsg: '手机号不能为空'
    },
    {
      strategy: 'isMobile',
      errorMsg: '请填写正确的手机号'
    }
  ])
  validator.addRule(validatorForm.passWord), [
    {
      strategy: 'isNotEmpty',
      errorMsg: '登录密码不能为空'
    },
    {
      strategy: 'minLength:8',
      errorMsg: '请输入至少8位数的登录密码'
    }
  ]
  let result = validator.startValidate()
  return result
}
if(result) {
  console.log('校验通过')
}
```
