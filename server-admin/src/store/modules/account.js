// initial state
const state = {
  currentRefresh: true, // 页面是否刷新
  userInfo: {}, // 用户基本信息
  token: ''
}

const getters = {}

const actions = {
  logout({ commit }) {
    commit({ type: 'logout' })
    commit({ type: 'clearAllData' }, { root: true })
  },

  userInfo({ commit }, data) {
    commit('setUserInfo', data)
  },
  userInfoUpdate({ commit, state }, cname) {
    let userInfo = JSON.parse(JSON.stringify(state.userInfo))
    userInfo.cname = cname
    commit('setUserInfo', userInfo)
  },
  // 修改页面状态
  refresh({ commit }, data) {
    commit('refresh', data)
  }
}

const mutations = {
  logout: state => {
    state.token = ''
    state.userInfo = {}
  },

  setUserInfo(state, data) {
    state.userInfo = data
  },
  refresh(state, data) {
    state.currentRefresh = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
