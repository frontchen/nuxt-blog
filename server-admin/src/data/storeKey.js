// 缓存前缀
const prefix = 'server'

// localStorage
const localKey = {}

// sessionStorage
const sessionKey = {
  menuOpen: `${prefix}-menu-open`, // 展开的菜单项
  menuActive: `${prefix}-menu-active`, // 激活的菜单项
  vuexStore: `${prefix}-session-store` // vuex刷新缓存
}

const storeKey = {
  ...localKey,
  ...sessionKey
}

export default storeKey
