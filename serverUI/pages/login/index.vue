<template>
	<div class="server-header">
		<!-- PC  当视口在 <768px 尺寸时隐藏 -->
		<div class="main hidden-xs-only">

			<el-tabs v-model="checkedTab" @tab-click="handleClick">
				<el-tab-pane label="登录" name="first">登录</el-tab-pane>
				<el-tab-pane label="注册" name="second">注册</el-tab-pane>
			</el-tabs>
		</div>
		<!-- mobile 当视口在 ≥768px 及以上尺寸时隐藏 -->
		<div class="main hidden-sm-and-up">
			<el-row class="header-tabs">
				<el-col :class="'header-tabs-item'" :span="12" @click="changeTab('login')">登录</el-col>
				<el-col class="header-tabs-item" :span="12" @click="changeTab('register')">注册</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			checkedTab: 'login'
		}
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event)
		},
		getHeader() {},
		getList() {}
	}
}
</script>
<style lang="less" scoped>
.server-header {
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	/deep/.main {
		width: 80%;
		height: 50%;
		.header-tabs {
			&-item {
				padding: 0 12px;
				box-sizing: border-box;
			}

			&-item:first-child {
				text-align: right;
			}
			&-item:last-child {
				text-align: left;
			}
		}
		&.hidden-sm-and-up {
			box-shadow: none;
		}
	}
}
</style>
