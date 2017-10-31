const state = {
  loading: false,
  progress: 0
}

const actions = {
  gProgress ({ commit }, payload) {
    commit('progress', payload)
  }
}

const mutations = {
  progress (state, payload) {
    state.progress = payload
  }
}

const getters = {
  getGlobal (state) {
    return state
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
