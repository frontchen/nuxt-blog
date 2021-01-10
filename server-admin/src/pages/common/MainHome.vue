<template>
	<div class="ims-main-body">
		<div class="container"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			companyName: '',
		}
	},
	computed: {
		classes() {
			return (iconName) => {
				return `search-icon imsfont ${iconName || ''}`
			}
		},
		iconColor() {
			return (color) => {
				return { color: color }
			}
		},
	},
	created() {},
	methods: {},
}
</script>

<style lang="less" scoped>
@import '../../styles/colors.less';
.ims-main-body {
	overflow: hidden;
	background: @ims-gray-order-bgColor;
}
</style>
