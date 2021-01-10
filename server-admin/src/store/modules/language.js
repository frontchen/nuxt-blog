// initial state
const state = {
  lang: 'zh-CN'
}

const getters = {}

const actions = {
  setLanguage({ commit }, data) {
    commit('setLanguage', data)
  }
}

const mutations = {
  setLanguage(state, data) {
    state.lang = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
