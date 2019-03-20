<template>
  <div>
    <h1>Events for {{ user.user.name }} </h1>
    <event-card
      v-for="(event, i) in events"
      :key="event.id"
      :event="event"
      :index="i + 1"
    />
    <base-icon/>
    <template v-if="page !== 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev page
      </router-link> |
    </template>

    <template v-if="page <= numberOfPages">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
      >
        Next page
      </router-link>
    </template>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue"
import { mapState, mapActions } from "vuex"
// import axios from 'axios'
// import EventService from "@/services/EventService.js"
import store from "@/store/store"

async function getPageEvents (routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  await store.dispatch("event/fetchEvents", {
    page: currentPage
  })
  routeTo.params.page = currentPage
  next()
}
export default {
  name: "EventList",
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  async beforeRouteEnter (routeTo, routeFrom, next) {
    console.log("beforeRouteEnter")
    await getPageEvents(routeTo, next)
  },
  async beforeRouteUpdate (routeTo, routeFrom, next) {
    console.log("beforeRouteUpdate")
    await getPageEvents(routeTo, next)
  },
  // data () {
  //   return {
  //     perPage: 3
  //   }
  // },
  computed: {
    ...mapState("event", ["events", "numberOfEvents", "perPage"]),
    ...mapState(["user"]),
    // page () {
    //   return parseInt(this.$route.query.page) || 1
    // },
    numberOfPages () {
      return Math.ceil(parseInt(this.numberOfEvents) / this.perPage)
    }
  },
  methods: {
    ...mapActions({
      fetchEvents: "event/fetchEvents"
    })
  },
  // async created () {
  //   try {
  //     await this.fetchEvents({
  //       perPage: this.perPage,
  //       page: this.page
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
}
</script>
