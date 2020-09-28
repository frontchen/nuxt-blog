<template>
	<el-menu class="el-menu-vertical-demo" :mode="mode" :background-color="backgroundColor" :text-color="textColor" unique-opened :active-text-color="activeTextColor" :default-active="activeIndex" :default-openeds="defaultOpeneds" :menu-trigger="menuTrigger" @open="handlerOpen" @close="handlerClose" @select="handlerSelect">
		<el-submenu v-for="(item, index) in menuList" :index="`${index}`" :key="index">
			<template slot="title">
				<n-link no-prefetch style="display:flex;" :to="{name:item.type}" tag="div">
					<Icon v-if="item.icon" :name="item.icon"></Icon>
					<span>{{ item.label }}</span>
				</n-link>
			</template>
			<el-menu-item v-show="item.children && item.children.length" v-for="(menu, mindex) in item.children" :key="`${index}-${mindex}`" :index="`${index}-${mindex}`">{{ menu.label }}</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
import Icon from '@/components/Icon'
export default {
	name: '',
	data() {
		return {}
	},
	components: {
		Icon
	},
	props: {
		backgroundColor: {
			type: String,
			default: '#ffffff'
		},
		textColor: {
			type: String,
			default: '#303133'
		},
		activeTextColor: {
			type: String,
			default: '#409EFF'
		},
		uniqueOpened: {
			type: Boolean,
			default: false
		},
		defaultOpeneds: {
			type: Array,
			default: () => []
		},
		menu: {
			type: Array,
			default: () => []
		},
		defaultActive: {
			type: String,
			default: '1'
		},
		menuTrigger: {
			type: String,
			default: 'hover',
			validator: function(value) {
				return ['hover', 'click'].indexOf(value) !== -1
			}
		},
		mode: {
			type: String,
			default: 'vertical',
			validator: function(value) {
				return ['horizontal', 'vertical'].indexOf(value) !== -1
			}
		}
	},
	computed: {
		menuList() {
			return this.menu
		},
		activeIndex() {
			return this.defaultActive
		}
	},
	mounted() {
		console.log(['menu', this.menuList])
	},
	methods: {
		//sub-menu 展开的回调
		handlerOpen(index) {
			this.$emit('on-open', index)
		},
		//sub-menu 收起的回调
		handlerClose(index) {
			this.$emit('on-close', index)
		},
		//菜单激活回调
		handlerSelect(index, indexPath) {
			let len = indexPath.length
			let item = {}
			if (len > 0) {
				item = this.menuList[indexPath[0]]
				if (indexPath[0]) item = item.children[indexPath[0]]
				if (indexPath[1]) {
					let indexList = indexPath[1].split('-')
					let firstItem = this.menuList[indexList[0]]
					item = firstItem.children[indexList[1]]
				}
			}

			console.log(['handlerSelect', item])
			this.$emit('on-select', {
				index,
				indexPath,
				item,
				defaultActive: this.defaultActive
			})
		},
		// 点击一级菜单触发
		submenuClick(item, index) {
			this.$emit('on-submenu-item', { item, index })
		}
	},
	watch: {}
}
</script>

<style lang="less" scoped></style>
