import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    timer: null,
  },
  mutations: {
    startTimer: function (state, payload) {
      state.timer = setTimeout(() => payload.cellback && payload.cellback(), payload.time || 1000)
    },
    stopTimer: function (state) {
      if (state.timer) {
        clearTimeout(state.timer)
        state.timer = null
      }
    },
  },
  actions: {

  }
})
