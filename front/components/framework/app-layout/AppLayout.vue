<template>
	<el-container class="blog-container">
		<el-header>
			<main-header></main-header>
		</el-header>
		<el-container>
			<el-aside class="hidden-xs-only">
				<blog-menu default-active="1" class="hidden-xs-only" :menu="asideList"></blog-menu>
			</el-aside>
			<el-main>
				<slot></slot>
			</el-main>
		</el-container>
		<el-footer>
			<main-footer></main-footer>
		</el-footer>
	</el-container>
</template>

<script>
import { blog, music, film } from '~/data/menu'
import MainHeader from '~/components/common/MainHeader.vue'
import MainFooter from '~/components/common/MainFooter.vue'
import BlogMenu from '@/components/BlogMenu'
export default {
	name: '',
	components: {
		MainFooter,
		MainHeader,
		BlogMenu
	},
	data() {
		return {
			menuList: blog
		}
	},
	computed: {
		asideList() {
			let vm = this
			let list = []
			switch (vm.$route.name) {
				case 'film':
					list = film
					break
				case 'music':
					list = music
					break
				default:
					list = blog
					break
			}
			return list
		}
	},

	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath)
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath)
		},
		handleSelect({ item }) {
			console.log(['aside', item])
			if (item && item.router) {
				let params = {}
				if (item.name && item.parent) {
					params.catetory = item.parent
					params.subclass = item.name
				} else {
					params.catetory = item.name
				}
				this.$router.push({
					name: vm.$route.name,
					params
				})
			}
		}
	}
}
</script>

<style lang="less" scoped>
</style>