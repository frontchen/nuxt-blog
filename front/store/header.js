// import api from '@/api/';

const state = () => ({
  menuType: "0"
});

const getters = {};

const mutations = {
  setMenuType(state, data) {
    state.menuType = data;
  }
};

const actions = {
  setMenuType({ commit }, menuType) {
    commit("setMenuType", menuType);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
