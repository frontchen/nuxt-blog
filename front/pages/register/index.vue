<template>
	<div class="blog-login">
		<el-form :model="accountForm" status-icon :rules="rules" ref="accountForm" label-width="100px" class="blog-login-form">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="accountForm.username" clearable autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input :type="passwordValue?'text':'password'" v-model="accountForm.password" autocomplete="off" clearable>
					<el-switch slot="append" v-model="passwordValue"></el-switch>
				</el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="repeatPassword">
				<el-input :type="repeatPasswordValue?'text':'password'" v-model="accountForm.repeatPassword" clearable autocomplete="off">
					<el-switch slot="append" v-model="repeatPasswordValue"></el-switch>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-row type="flex" justify="center">
					<el-button style="width:80%;" type="primary" @click="submitForm('accountForm')">提交</el-button>
				</el-row>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: '',
	data() {
		return {
			passwordValue: false,
			repeatPasswordValue: false,
			accountForm: {
				password: '',
				username: '',
				repeatPassword: ''
			},
			rules: {
				password: [{ validator: this.passwordRule, trigger: 'blur' }],
				username: [{ validator: this.usernameRule, trigger: 'blur' }],
				repeatPassword: [
					{ validator: this.repeatPasswordRule, trigger: 'blur' }
				]
			}
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
		repeatPasswordRule(rule, value, callback) {
			if (value === '') {
				callback(new Error('请再次输入密码'))
			} else if (value !== this.accountForm.password) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		},
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (!valid) return false
				// let forms=this.accountForm
				// let params={
				// 	username:forms.username,
				// 	password:forms.password
				// }
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		goPage() {
			this.$router.push('/register')
		}
	}
}
</script>

<style lang="less" scoped>
.blog-login {
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	/deep/ &-form {
		width: 400px;
		height: 300px;
		.el-input-group__append {
			background-color: #fff;
			padding: 0 5px;
		}
	}
}
</style>