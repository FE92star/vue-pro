import BaoButton from '@/myComponents/Basic/Button/index'
import BaoRadio from '@/myComponents/Form/Radio/index'
import BaoProgress from '@/myComponents/DataShow/Progress/index'

const components = [
	BaoButton,
	BaoRadio,
	BaoProgress
]

// 全局注册组件
const install = function (Vue) {
	if(install.installed) return
	components.map(component => Vue.component(component.name, component))
}

if(typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

export default {
	install,
	BaoButton,
	BaoRadio
}
