<template>
	<div class="server-header">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="登录" name="first">登录</el-tab-pane>
			<el-tab-pane label="注册" name="second">注册</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
export default {
	data() {
		return {
			activeName: 'second'
		}
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event)
		}
	}
}
</script>