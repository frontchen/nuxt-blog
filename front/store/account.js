//账号相关
const state = () => ({
  token: "",
  userInfo: {},
  sysId: 1,
  currentRefresh: false
});

const getters = {};

const mutations = {
  userLogout(state) {
    state.token = "";
    state.userInfo = {};
  }
};

const actions = {
  userLogout({ commit }) {
    return new Promise(resolve => {
      commit({ type: "logout" });
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
