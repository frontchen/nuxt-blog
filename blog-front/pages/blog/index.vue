<template>
	<div>blog</div>
</template>

<script>
export default {
	layout: 'layout',
	name: '',
	data() {
		return {}
	},
	mounted() {
		this.$store.dispatch('header/setMenuType', '0')
	},
	methods: {},
}
</script>

<style lang="less" scoped>
</style>