<template lang="html">
	<div class="">
		<button
			type="button"
			name="button"
			:class="buttonClass"
			:style="buttonSize"
			ref="button"
			>
			<!-- 加载中的状态 -->
			<i class="iconfont iconloading" v-if="loading"></i>
			<slot>
				<!-- 利用icon font来减小静态资源的体积 -->
				<i class="iconfont" :class="`icon${iconType}`"></i>
			</slot>
		</button>
	</div>
</template>

<script>
import { addClass } from '@/common/js/dom.js'

export default {
	name: 'bao-button',
	data: () => ({
		typeLists: ['primary', 'success', 'info', 'warning', 'danger'],
		bgLists: ['#409eff', '#67c23a', '#909399', '#e6a23c', '#f56c6c']
	}),
	props: {
		type: { // 按钮类型
			type: String,
			default: '' // ['primary', 'success', 'info', 'warning', 'danger']-五种类型
		},
		simple: { // 是否是朴素类按钮
			type: Boolean,
			default: false
		},
		round: { // 是否是圆角按钮
			type: Boolean,
			default: false
		},
		circle: { // 是否是圆形带有icon的按钮
			type: Boolean,
			default: false
		},
		iconType: { // icon类型['search','check','edit','edit','message','star']
			type: String,
			default: ''
		},
		disable: { // 是否禁用按钮
			type: Boolean,
			default: false
		},
		loading: { // 是否处于加载状态
			type: Boolean,
			default: false
		},
		size: { // 按钮尺寸类型['medium', 'small', 'mini']-中,小,迷你
			type: String,
			default: ''
		}
	},
	computed: {
		buttonClass() {
			if(this.type) {
				if(this.simple) {
					return `bao_isSimple_${this.type}`
				}else if(this.round) {
					return [`bao_${this.type}`, `bao_isRound`]
				}else if(this.circle) {
					return [`bao_${this.type}`, `bao_isCircle`]
				}else {
					return `bao_${this.type}`
				}
			}else { //原始类型
				return ''
			}
		},
		buttonSize() {
			let styleStr = ''
			switch (this.size) {
				case 'medium':
					styleStr = `padding: 10px 20px;`
					break;
				case 'small':
					styleStr = `padding: 9px 15px;font-size: 12px;border-radius: 3px;`
					break;
				case 'mini':
					styleStr = `padding: 7px 15px;font-size: 12px;border-radius: 3px;`
					break;
			}
			return styleStr
		}
	},
	methods: {
		addCssStyle() {
			let bgColor = {}
			let type = this.type
			this.typeLists.forEach((type, index) => {
				bgColor[type] = this.bgLists[index]
			})
			let cssStyle = `.bao_isSimple_${this.type}:active {background: ${bgColor[type]} !important; color: #fff;}`
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
	},
	created() {

	},
	mounted() {
		this.$nextTick(() => {
			if(this.simple) { // 朴素按钮
				this.addCssStyle()
			}
			if(this.disable) {
				this.$refs.button.setAttribute("disable", true)
				addClass(this.$refs.button, 'bao_disabled')
			}
			// 最新版的Chrome对addRule做了限制，不能直接添加样式表
			// document.styleSheets[0].addRule(`.bao_isSimple_${this.type}:before`, `background: ${bgColor.type} !important`)
		})
	}
}
</script>

<style lang="less" scoped>
.buttonStyle(@color, @bgColor, @bdColor) {
	color: @color;
	background-color: @bgColor;
	border-color: @bdColor;
}

button {
	display: inline-block;
	margin: 0;
	outline: none;
	box-sizing: border-box;
	padding: 12px 20px;
	font-size: 14px;
	color: #606266;
	border-radius: 4px;
	line-height: 1;
	white-space: nowrap;
	background: #fff;
	text-align: center;
	cursor: pointer;
	/* 移除原生控件的默认展示样式 */
	-webkit-appearance: none;
	font-weight: 500;
	border: 1px solid #dcdfe6;
	&:active {
		opacity: .86;
	}
}
.bao_primary {
	.buttonStyle(#fff, #409eff, #409eff);
}
.bao_success {
	.buttonStyle(#fff, #67c23a, #67c23a);
}
.bao_info {
	.buttonStyle(#fff, #909399, #909399);
}
.bao_warning {
	.buttonStyle(#fff, #e6a23c, #e6a23c);
}
.bao_danger {
	.buttonStyle(#fff, #f56c6c, #f56c6c);
}
.bao_isSimple_primary {
	.buttonStyle(#409eff, #ecf5ff, #b3d8ff);
}
.bao_isSimple_success {
	.buttonStyle(#67c23a, #f0f9eb, #c2e7b0);
}
.bao_isSimple_info {
	.buttonStyle(#909399, #f4f4f5, #d3d4d6);
}
.bao_isSimple_warning {
	.buttonStyle(#e6a23c, #fdf6ec, #f5dab1);
}
.bao_isSimple_danger {
	.buttonStyle(#f56c6c, #fef0f0, #fbc4c4);
}
.bao_isRound {
	border-radius: 20px;
	padding: 12px 23px;
}
.bao_isCircle {
	border-radius: 50%;
	padding: 12px;
	display: -webkit-flex;
					display: flex;
	justify-content: center;
	align-items: center;
}
.bao_disabled {
	cursor: not-allowed;
	background-image: none;
	filter: opacity(.68);
}
.iconfont {
	font-size: 14px;
	color: #fff;
}
.iconloading {
	display: inline-block; // rotate不适用于行内元素
	animation: loadAnimate 2s linear infinite;
}

@keyframes loadAnimate {
	0% {
		transform: rotateZ(0);
	}
	to {
		transform: rotateZ(1turn);
	}
}
</style>
