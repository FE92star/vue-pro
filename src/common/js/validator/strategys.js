/*  校验规则
@function isNotEmpty——规则名称
@param value——被校验的对象数据
@param errorMsg——校验错误信息
*/
const strategies = {
  /* 空 */
  isNotEmpty: function(value, errorMsg) {
    if(value === '') {
      return errorMsg
    }
  },
  /* 手机号 */
  isMobile: function(value, errorMsg) {
    if(!(/^1[3|5|7|8][0-9]{9}$/).test(value)) {
      return errorMsg
    }
  },
  /* 固定长度的字符 */
  exactLength: function(value, length, errorMsg) {
    if(value.length !== Number(length)) {
      return errorMsg
    }
  },
  /* 限制最少长度的字符 */
  minLength: function(value, length, errorMsg) {
    if(value.length < Number(length)) {
      return errorMsg
    }
  },
  /* 身份证号 */
  isIDCardNum: function(value, errorMsg) {
    if(!(/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/).test(value)) {
      return errorMsg
    }
  },
  /* 中文字符 */
  isChinese: function(value, errorMsg) {
    if(!(/[\u4E00-\u9FA5]/).test(value)) {
      return errorMsg
    }
  },
  /* 密码强度校验——最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符 */
  passwordStrength: function(vale, errorMsg) {
    if(!(/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/).test(value)) {
      return errorMsg
    }
  },
  /* 邮箱校验 */
  isEmail: function(value, errorMsg) {
    if(!(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(value)) {
      return errorMsg
    }
  }
}

export default strategies