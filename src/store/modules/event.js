import EventService from "@/services/EventService.js"

export const namespaced = true

export const state = {
  events: [],
  numberOfEvents: 0,
  event: {},
  perPage: 3
}
export const mutations = {
  ADD_EVENT (state, event) {
    state.events.push(event)
  },
  REMOVE_EVENT (state, id) {
    state.events = state.events.filter(event => event.id !== id)
  },
  SET_EVENTS (state, events) {
    state.events = events
  },
  SET_NUMBER_OF_EVENTS (state, count) {
    state.numberOfEvents = count
  },
  SET_EVENT (state, event) {
    state.event = event
  }
}
export const actions = {
  async createEvent ({ commit, dispatch }, event) {
    try {
      await EventService.postEvent(event)
      commit("ADD_EVENT", event)
      const notification = {
        type: "success",
        message: "Your event has been created!!"
      }
      dispatch("notification/add", notification, { root: true })
    } catch (err) {
      const notification = {
        type: "error",
        message: `Create Event Error! ${err.message}`
      }
      dispatch("notification/add", notification, { root: true })
      throw err
    }
    // return EventService.postEvent(event).then( () => {
    //   commit("ADD_EVENT", event)
    // })
  },
  async fetchEvents ({ commit, dispatch, state }, { page }) {
    try {
      const { data, headers } = await EventService.getEvents(
        state.perPage,
        page
      )
      commit("SET_NUMBER_OF_EVENTS", headers["x-total-count"])
      commit("SET_EVENTS", data)
    } catch (err) {
      const notification = {
        type: "error",
        message: `fetch Events Error!! ${err.message}`
      }
      dispatch("notification/add", notification, { root: true })
      // console.log(err)
    }
    // EventService.getEvents()
    //   .then(res => {
    //     commit("SET_EVENTS", res.data)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  },
  async fetchEvent ({ commit, getters, dispatch }, id) {
    const event = getters.getEventById(id)
    if (event) {
      commit("SET_EVENT", event)
      return event
    } else {
      try {
        const { data } = await EventService.getEvent(id)
        commit("SET_EVENT", data)
        return data
      } catch (err){
        const notification = {
          type: "error",
          message: `fetch Event Error =)) ${err.message}`
        }
        dispatch("notification/add", notification, { root: true })
        // console.log(err)
      }
    }
  },
  async deleteEvent ({ commit, dispatch }, id) {
    try {
      await EventService.deleteEvent(id)
      commit("REMOVE_EVENT", id)
      const notification = {
        type: "success",
        message: "Your event has been deleted! =))) "
      }
      dispatch("notification/add", notification, { root: true })
    } catch (err) {
      const notification = {
        type: "error",
        message: `Delete Event Error =)) ${err.message}`
      }
      dispatch("notification/add", notification, { root: true })
    }
  }
}
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
