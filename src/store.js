import Vue from "vue"
import Vuex from "vuex"
import EventService from "@/services/EventService.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: "abc123", name: "Sergey Chirva" },
    categories: [
      "sustainability!",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ],
    events: [],
    numberOfEvents: 0,
    event: {}
  },
  mutations: {
    ADD_EVENT (state, event) {
      state.events.push(event)
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
  },
  actions: {
    async createEvent ({ commit }, event) {
      await EventService.postEvent(event)
      commit("ADD_EVENT", event)
      // return EventService.postEvent(event).then( () => {
      //   commit("ADD_EVENT", event)
      // })
    },
    async fetchEvents ({ commit }, { perPage, page }) {
      try {
        const { data, headers } = await EventService.getEvents(perPage, page)
        commit("SET_NUMBER_OF_EVENTS", headers["x-total-count"])
        commit("SET_EVENTS", data)
      } catch (err) {
        console.log(err)
      }
      // EventService.getEvents()
      //   .then(res => {
      //     commit("SET_EVENTS", res.data)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    async fetchEvent ({ commit, getters }, id) {
      const event = getters.getEventById(id)
      if (event) {
        commit("SET_EVENT", event)
      } else {
        try {
          const { data } = await EventService.getEvent(id)
          commit("SET_EVENT", data)
        } catch (err){
          console.log(err)
        }
      }
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
