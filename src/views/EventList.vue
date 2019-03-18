<template>
  <div>
    <h1>Events Listing</h1>
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

    <template v-if="page >= numberOfPages">
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
import { mapState } from "vuex"
// import axios from 'axios'
// import EventService from "@/services/EventService.js"
export default {
  name: "EventList",
  components: {
    EventCard
  },
  data () {
    return {
      perPage: 4
    }
  },
  computed: {
    ...mapState([
      "events",
      "numberOfEvents"
    ]),
    page () {
      return parseInt(this.$route.query.page) || 1
    },
    numberOfPages () {
      return Math.ceil(parseInt(this.numberOfEvents) / 3)
    }
  },
  created () {
    this.$store.dispatch("fetchEvents", {
      perPage: this.perPage,
      page: this.page
    })
  }
}
</script>