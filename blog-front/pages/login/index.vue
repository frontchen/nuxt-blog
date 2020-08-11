<template>
	<div class="blog-login">
		<el-form
			:model="ruleForm"
			status-icon
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
			class="blog-login-form"
		>
			<el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
				<el-button @click="goPage">注册</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: '',
	data() {
		return {
			ruleForm: {
				password: '',
				username: '',
			},
			rules: {
				password: [{ validator: this.passwordRule, trigger: 'blur' }],
				username: [{ validator: this.usernameRule, trigger: 'blur' }],
			},
		}
	},
	methods: {
		usernameRule(rule, value, callback) {
			if (!value) {
				return callback(new Error('用户名不能为空'))
			}
			callback()
		},
		passwordRule(rule, value, callback) {
			if (!value) {
				callback(new Error('请输入密码'))
			}
			callback()
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!')
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		goPage() {
			this.$router.push('/register')
		},
	},
}
</script>

<style lang="less" scoped>
.blog-login {
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	&-form {
		width: 400px;
		height: 300px;
	}
}
</style>