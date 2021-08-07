// initial state
const state = {
  sidebar: {
    opend: false,
  },
};

const getters = {};

const actions = {
  toogleSideBar({ commit }, data) {
    commit("toogleSideBar", data);
  },
};

const mutations = {
  toogleSideBar(state) {
    state.sidebar.opend = !state.sidebar.opend;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
