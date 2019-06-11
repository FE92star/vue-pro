import BaoButton from '@/myComponents/Basic/Button/index'
import BaoRadio from '@/myComponents/Form/Radio/index'
import BaoCheckbox from '@/myComponents/Form/Checkbox/index'
import BaoSwitch from '@/myComponents/Form/Switch/index'
import BaoInput from '@/myComponents/Form/Input/index'
import BaoUpload from '@/myComponents/Form/Upload/index'
import BaoFormpost from '@/myComponents/Form/FormPost/index'
import BaoSlider from '@/myComponents/Form/Slider/index'
import BaoProgress from '@/myComponents/DataShow/Progress/index'

const components = [
	BaoButton,
	BaoRadio,
	BaoCheckbox,
	BaoSwitch,
	BaoInput,
	BaoUpload,
	BaoFormpost,
	BaoSlider,
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
	BaoRadio,
	BaoCheckbox,
	BaoSwitch,
	BaoInput,
	BaoUpload,
	BaoFormpost,
	BaoSlider,
	BaoProgress
}
