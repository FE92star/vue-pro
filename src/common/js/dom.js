/**
*判断dom元素是否有对应类名，增加类名，移除类名
* @param {DomElement} el
* @param {String} cls
* @return {Boolean}
**/
export const hasClass = (el, cls) => {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

/* istanbul ignore next */
export const addClass = (el, cls) => {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

/* istanbul ignore next */
export const removeClass = (el, cls) => {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

// 动态添加样式
export const addCssStyle = (cssStyle) => {
  let head = document.head || document.getElementsByTagName('head')[0]
  let styleDom = document.createElement('style')
  styleDom.type = 'text/css'
  if(styleDom.styleSheet) {
    styleDom.styleSheet.cssText = cssStyle
  }else {
    styleDom.appendChild(document.createTextNode(cssStyle))
  }
  head.appendChild(styleDom)
}
