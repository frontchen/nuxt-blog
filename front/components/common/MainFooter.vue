<template>
	<div>
		<el-link href="https://beian.miit.gov.cn/" :underline="false">{{
			beian
		}}</el-link>
	</div>
</template>

<script>
export default {
	name: 'page-main-footer',
	data() {
		return {
			beian: '豫ICP备2020034819号-1',
		}
	},
}
</script>

<style></style>
