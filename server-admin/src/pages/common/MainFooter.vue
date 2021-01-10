<template>
	<div>
		<p>{{ copyright }}</p>
		<p>{{ beian }}</p>
	</div>
</template>

<script>
export default {
	name: 'page-main-footer',
	data() {
		return {
			copyright: '',
			beian: '',
		}
	},
}
</script>

<style>
</style>
