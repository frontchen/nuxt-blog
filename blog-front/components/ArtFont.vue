<template>
	<canvas width="30" height="30" class="art-font"></canvas>
</template>

<script>
export default {
	name: '',
	data() {
		return {}
	},
	props: {
		name: {
			type: String,
			default: ''
		}
	},
	computed: {
		fontName() {
			return this.name
		}
	},
	mounted() {
		this.drawText()
	},
	methods: {
		drawText() {
			let canvas = document.querySelector('.art-font')
			let ctx = canvas.getContext('2d')
			ctx.font = '35px 微软雅黑'
			ctx.strokeText('VVHi', 50, 50)
		}
	}
}
</script>

<style lang="less" scoped>
</style>