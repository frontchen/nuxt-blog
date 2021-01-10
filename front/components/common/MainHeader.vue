<template>
	<div class="main-header">
		<!-- PC  当视口在 <768px 尺寸时隐藏 -->
		<el-row type="flex" align="middle" class="hidden-xs-only">
			<el-col :span="12" class="header-left">
				<el-popover
					v-if="userName"
					placement="bottom-end"
					width="100"
					trigger="hover"
				>
					<div class="header-left-btn">退出</div>
					<template slot="reference">
						<div class="header-left-label">
							<span class="left">{{ userName }}</span
							><i class="el-icon-caret-bottom"></i>
						</div>
					</template>
				</el-popover>

				<div v-else class="header-left-btn">登录</div>
			</el-col>
			<el-col :span="12" hidden-xs-only>
				<div class="right">
					<blog-menu
						:default-active="menuType"
						mode="horizontal"
						@on-select="handlerSelect"
						:menu="rightMenu"
						@on-submenu-item="rightMenuItemClick"
					></blog-menu>
				</div>
			</el-col>
		</el-row>
		<!-- mobile 当视口在 ≥768px 及以上尺寸时隐藏 -->
		<el-row type="flex" align="middle" class="hidden-sm-and-up">
			<el-col :span="12" class="header-left">
				<el-popover
					v-if="userName"
					placement="bottom-end"
					width="100"
					trigger="hover"
				>
					<div class="header-left-btn">退出</div>
					<template slot="reference">
						<div @click="leftDrawer = true" class="header-left-label">
							<span class="left">{{ userName }}</span
							><i class="el-icon-caret-bottom"></i>
						</div>
					</template>
				</el-popover>

				<div v-else class="header-left-btn">登录</div>
				<el-drawer
					:visible.sync="leftDrawer"
					:with-header="false"
					direction="ltr"
					size="45%"
				>
					<blog-menu
						menu-trigger="click"
						class="hidden-sm-and-up"
						:default-active="leftMenuActive"
						:menu="leftMenuList"
					></blog-menu>
				</el-drawer>
			</el-col>
			<el-col :span="12" hidden-xs-only>
				<div class="right">
					<i
						style="font-size: 20px"
						class="el-icon-menu"
						@click="rightDrawer = true"
					></i>
					<el-drawer :visible.sync="rightDrawer" :with-header="false">
						<blog-menu
							menu-trigger="click"
							class="hidden-sm-and-up"
							@on-select="handlerSelect"
							@on-submenu-item="rightMenuItemClick"
							:menu="mobileRightMenu"
						></blog-menu>
					</el-drawer>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { blog, music, film } from '~/data/menu'
import BlogMenu from '@/components/BlogMenu'
import { mapState } from 'vuex'
export default {
	name: '',
	components: {
		BlogMenu,
	},
	data() {
		return {
			leftMenu: {
				blog,
				music,
				film,
			},
			leftMenuActive: '0',
			userName: 'frontChen',
			leftDrawer: false,
			rightDrawer: false,
			rightMenu: [
				// {
				// 	label: '博客',
				// 	icon: 'icon-bokeyuan',
				// 	name: 'html',
				// 	type: 'blog',
				// 	children: blog
				// },
				// {
				// 	label: '音乐',
				// 	icon: 'icon-yinle',
				// 	name: 'mandarin',
				// 	type: 'music',
				// 	children: music
				// },
				// {
				// 	label: '影视',
				// 	icon: 'icon-iconset0129',
				// 	name: 'mainland',
				// 	type: 'film',
				// 	children: film
				// }
			],
		}
	},
	computed: {
		menuItemStyle() {
			return {
				width: `${100 / this.rightMenu.length}%`,
				textAlign: 'center',
			}
		},
		leftMenuList() {
			let item = this.rightMenu[this.menuType || 0]
			return this.leftMenu[this.menuType]
		},
		mobileRightMenu() {
			return this.rightMenu
		},
		...mapState({
			menuType: (state) => state.header.menuType,
		}),
	},
	mounted() {
		console.log(this.$store.state.header)
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath)
		},
		handlerSelect({ item, indexPath }) {
			if (item && item.type) {
				let path = `/${item.type}`
				if (item.name && item.parent) {
					path += `/${item.parent}/${item.name}`
				} else {
					path += `/${item.name}`
				}
				this.$router.push({
					path: path,
				})
			}
		},
		rightMenuItemClick({ item }) {
			if (item.type) {
				let params = {}
				if (item.name && item.parent) {
					params.catetory = item.parent
					params.subclass = item.name
				} else {
					params.catetory = item.name
				}
				let index = this.rightMenu.findIndex((v) => v.name === item.name) || 0
				console.log(['index', index])
				this.$store.dispatch('header/setMenuType', `${index}`)
				this.$router.push({
					path: `/${item.type}`,
					params,
				})
			}
		},
	},
}
</script>

<style lang="less" scoped>
@import '../../assets/css/colors.less';

@header-prefix: main-header;
.header-left-btn {
	color: @main-color;
	cursor: pointer;
}
.@{header-prefix} {
	width: 100%;
	margin: 0 auto;
	background-color: @white-color;
	margin-bottom: 12px;
	@media screen and (max-width: 768px) {
		.el-row {
			height: 45px;
			line-height: 45px;
		}
	}
	.header-left {
		&-label {
			display: inline-block;
		}

		.left {
			font-size: 30px;
			text-shadow: 5px 5px 5px black, 0px 0px 2px black;
			color: @white-color;
		}
		.left + i {
			margin-left: 5px;
			height: 30px;
			line-height: 30px;
			color: @gray-bgColor;
		}
	}

	/deep/ .right {
		.el-submenu {
			.el-submenu__title {
				display: flex;
				align-items: center;
			}
		}
	}
	.el-col-xl-12 {
		.left {
			font-size: 20px;
		}
	}
}
</style>
