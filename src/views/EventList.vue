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
export default {
  name: "EventList",
  components: {
    EventCard
  },
  data () {
    return {
      perPage: 3
    }
  },
  computed: {
    ...mapState("event", ["events", "numberOfEvents"]),
    ...mapState(["user"]),
    page () {
      return parseInt(this.$route.query.page) || 1
    },
    numberOfPages () {
      return Math.ceil(parseInt(this.numberOfEvents) / this.perPage)
    }
  },
  methods: {
    ...mapActions({
      fetchEvents: "event/fetchEvents"
    })
  },
  async created () {
    try {
      await this.fetchEvents({
        perPage: this.perPage,
        page: this.page
      })
    } catch (err) {
      console.log(err)
    }
  }
}
</script>