<template lang="html">
	<div class="">
		<button
			type="button"
			name="button"
			:class="buttonClass"
			>
			<slot>
				<img src="../icons/check.png" alt="" v-if="iconType == 'check'">
				<img src="../icons/delete.png" alt="" v-else-if="iconType == 'delete'">
				<img src="../icons/edit.png" alt="" v-else-if="iconType == 'edit'">
				<img src="../icons/message.png" alt="" v-else-if="iconType == 'message'">
				<img src="../icons/star.png" alt="" v-else-if="iconType == 'star'">
			</slot>
		</button>
	</div>
</template>

<script>
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
		iconType: { // icon类型
			type: String,
			default: 'edit'
		}
	},
	computed: {
		buttonClass() {
			if(this.simple) {
				return `bao_isSimple_${this.type}`
			}else if(this.round) {
				return [`bao_${this.type}`, `bao_isRound`]
			}else if(this.circle) {
				return [`bao_${this.type}`, `bao_isCircle`]
			}else {
				return `bao_${this.type}`
			}
		}
	},
	methods: {

	},
	created() {

	},
	mounted() {
		this.$nextTick(() => {
			let bgColor = {}
			this.typeLists.forEach((type, index) => {
				bgColor[type] = this.bgLists[index]
			})
			document.styleSheets[0].addRule(`.bao_isSimple_${this.type}:before`, `background: ${bgColor.type} !important`)
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
	/* 移除原生控件的默认展示样式 */
	-webkit-appearance: none;
	font-weight: 500;
	border: 1px solid #dcdfe6;
	&:active {
		opacity: .86;
	}
}
button[class^="bao_isSimple_"] {

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
	&:active {
		background: #409eff;
		color: #fff;
	}
}
.bao_isSimple_success {
	.buttonStyle(#67c23a, #f0f9eb, #c2e7b0);
	&:active {
		background: #67c23a;
		color: #fff;
	}
}
.bao_isSimple_info {
	.buttonStyle(#909399, #f4f4f5, #d3d4d6);
	&:active {
		background: #909399;
		color: #fff;
	}
}
.bao_isSimple_warning {
	.buttonStyle(#e6a23c, #fdf6ec, #f5dab1);
	&:active {
		background: #e6a23c;
		color: #fff;
	}
}
.bao_isSimple_danger {
	.buttonStyle(#f56c6c, #fef0f0, #fbc4c4);
	&:active {
		background: #f56c6c;
		color: #fff;
	}
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
	img {
		width: 14px;
		height: 13px;
		// display: block;
	}
}
</style>
