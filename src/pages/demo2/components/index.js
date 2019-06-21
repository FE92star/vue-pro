import BaoButton from '@/myComponents/Basic/Button/index'
import BaoRadio from '@/myComponents/Form/Radio/index'
import BaoCheckbox from '@/myComponents/Form/Checkbox/index'
import BaoSwitch from '@/myComponents/Form/Switch/index'
import BaoInput from '@/myComponents/Form/Input/index'
import BaoUpload from '@/myComponents/Form/Upload/index'
import BaoSlider from '@/myComponents/Form/Slider/index'
import BaoProgress from '@/myComponents/DataShow/Progress/index'
import BaoCard from '@/myComponents/DataShow/Card/index'
import BaoTable from '@/myComponents/DataShow/Table/index'
import BaoAudio from '@/myComponents/Others/Audio/index'
import BaoPagination from '@/myComponents/Navigation/Pagination/index'

import BaoFormpost from '@/myComponents/Form/FormPost/index'
import BaoAlert from '@/myComponents/Tips/Alert/index'
import BaoDialog from '@/myComponents/Tips/Dialog/index'
import BaoLoading from '@/myComponents/Tips/Loading/index'

const components = [
	BaoButton,
	BaoRadio,
	BaoCheckbox,
	BaoSwitch,
	BaoInput,
	BaoUpload,
	BaoSlider,
	BaoProgress,
	BaoCard,
	BaoTable,
	BaoAudio,
	BaoPagination
]

// 全局注册组件
const install = function (Vue) {
	if(install.installed) return
	components.map(component => Vue.component(component.name, component))
	// 插件
	Vue.use(BaoFormpost)
	Vue.use(BaoAlert)
	Vue.use(BaoDialog)
	Vue.use(BaoLoading)
}

if(typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

export default {
	install
}
