<template>
	<i :class="iconName"></i>
</template>

<script>
export default {
	name: '',
	data() {
		return {}
	},
	props: {
		name: {
			props: {
				type: String,
				default: ''
			}
		}
	},
	computed: {
		iconName() {
			let index = this.name.indexOf('el-icon')
			if (index > -1) {
				return this.name
			}
			return `iconfont ${this.name}`
		}
	}
}
</script>

<style lang="less" scoped>
i {
	font-size: 16px;
	margin-right: 5px;
}
</style>