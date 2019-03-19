export const namespaced = true

export const state = {
  notifications: []
}

let nextId = 1

export const mutations = {
  PUSH (state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++
    })
  },
  DELETE (state, notificationToRemove) {
    console.log(state.notifications, "BEFORE state.notifications<<<")
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationToRemove.id
    )
    console.log(state.notifications, "state.notifications<<<")
  }
}

export const actions = {
  add ({ commit }, notification) {
    commit("PUSH", notification)
  },
  remove ({ commit }, notificationToRemove) {
    commit("DELETE", notificationToRemove)
  },
}
