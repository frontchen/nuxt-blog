<template>
	<div class="main-header">
		<!-- PC  当视口在 <768px 尺寸时隐藏 -->
		<el-row type="flex" align="middle" class="hidden-xs-only">
			<el-col :span="12">
				<div class="left">{{userName}}</div>
			</el-col>
			<el-col :span="12" hidden-xs-only>
				<div class="right">
					<blog-menu :default-active="menuType" mode="horizontal" @on-select="handleSelect" :menu="rightMenu" @on-submenu-item="rightMenuItemClick"></blog-menu>
				</div>
			</el-col>
		</el-row>
		<!-- mobile 当视口在 ≥768px 及以上尺寸时隐藏 -->
		<el-row type="flex" align="middle" class="hidden-sm-and-up">
			<el-col :span="12">
				<div class="left" @click="leftDrawer = true">{{userName}}</div>
				<el-drawer :visible.sync="leftDrawer" :with-header="false" direction="ltr" size="45%">
					<blog-menu menu-trigger="click" class="hidden-sm-and-up" :default-active="leftMenuActive" :menu="leftMenuList"></blog-menu>
				</el-drawer>
			</el-col>
			<el-col :span="12" hidden-xs-only>
				<div class="right">
					<i style="font-size:20px;" class="el-icon-menu" @click="rightDrawer = true"></i>
					<el-drawer :visible.sync="rightDrawer" :with-header="false">
						<blog-menu menu-trigger="click" class="hidden-sm-and-up" @on-select="handleSelect" @on-submenu-item="rightMenuItemClick" :menu="mobileRightMenu"></blog-menu>
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
		BlogMenu
	},
	data() {
		return {
			leftMenu: {
				blog,
				music,
				film
			},
			leftMenuActive: '0',
			userName: 'frontChen',
			leftDrawer: false,
			rightDrawer: false,
			rightMenu: [
				{
					name: '博客',
					router: '/blog',
					icon: 'icon-bokeyuan',
					value: 'blog',
					children: blog
				},
				{
					name: '音乐',
					router: '/music',
					icon: 'icon-yinle',
					value: 'music',
					children: music
				},
				{
					name: '影视',
					router: '/film',
					icon: 'icon-iconset0129',
					value: 'film',
					children: film
				}
			]
		}
	},
	computed: {
		menuItemStyle() {
			return {
				width: `${100 / this.rightMenu.length}%`,
				textAlign: 'center'
			}
		},
		leftMenuList() {
			let item = this.rightMenu[this.menuType || 0]
			return this.leftMenu[item.value]
		},
		mobileRightMenu() {
			return this.rightMenu
		},
		...mapState({
			menuType: state => state.header.menuType
		})
	},
	mounted() {
		console.log(this.$store.state.header)
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath)
		},
		handleSelect({ item }) {
			if (item && item.router) this.$router.push(item.router)
		},
		rightMenuItemClick({ item }) {
			if (item.router) {
				this.$router.push(item.router)
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../assets/css/colors.less';

@header-prefix: main-header;

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
	.left {
		font-size: 30px;
		text-shadow: 5px 5px 5px black, 0px 0px 2px black;
		color: white;
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
