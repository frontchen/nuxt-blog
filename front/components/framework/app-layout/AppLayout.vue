<template>
	<el-container class="blog-container">
		<el-header>
			<main-header></main-header>
		</el-header>
		<el-container>
			<el-aside class="hidden-xs-only">
				<blog-menu :default-active="menuType" class="hidden-xs-only" :menu="asideList" @on-select="handlerSelect"></blog-menu>
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
import { mapState } from 'vuex'
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
			switch (vm.menuType) {
				case '0':
					list = blog
					break
				case '1':
					list = music
					break
				default:
					list = film
					break
			}
			return list
		},
		...mapState({
			menuType: state => state.header.menuType
		})
	},

	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath)
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath)
		},
		handlerSelect({ item }) {
			if (item && item.type) {
				let path = `/${item.type}`
				if (item.name && item.parent) {
					path += `/${item.parent}/${item.name}`
				} else {
					path += `/${item.name}`
				}
				this.$router.push({
					path: path
				})
			}
		}
	}
}
</script>

<style lang="less" scoped>
</style>