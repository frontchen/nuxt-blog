<template>
	<transition enter-active-class="animated bounce" leave-active-class="animated hinge">
		<app-layout>
			<nuxt />
		</app-layout>
	</transition>
</template>

<script>
import AppLayout from '~/components/framework/app-layout/AppLayout.vue'
import 'element-ui/lib/theme-chalk/base.css'
export default {
	name: '',
	components: {
		AppLayout
	},
	data() {
		return {}
	}
}
</script>

<style lang="less" scoped>
</style>