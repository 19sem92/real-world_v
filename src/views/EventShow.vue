<template>
  <div>
    <base-button @click="removeEvent">Delete<base-button/>
    <div class="event-header">
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by {{ event.organizer ? event.organizer.name : "" }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>

    <BaseIcon name="map"><h2>Location</h2></BaseIcon>

    <address>{{ event.location }}</address>

    <h2>Event details</h2>
    <p>{{ event.description }}</p>

    <h2>Attendees
      <span class="badge -fill-gradient">{{
        event.attendees ? event.attendees.length : 0
      }}</span>
    </h2>
    <ul class="list-group">
      <li v-for="(attendee, index) in event.attendees" :key="index" class="list-item">
        >
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
    <p>Event Show {{ $route.params.id }} = {{ id }}</p>
  </div>
</template>

<script>
// import { mapState, mapActions } from "vuex"
// import NProgress from "nprogress"
// import store from "@/store/store"
import BaseButton from "../components/BaseButton";
export default {
  name: "EventShow",
  components: {BaseButton},
  props: {
    id: {
      type: [
        String,
        Number
      ]
    },
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeEvent () {

    }
  }
  // async beforeRouteEnter (routeTo, routeFrom, next) {
  //   NProgress.start()
  //   await store.dispatch("event/fetchEvent", routeTo.params.id)
  //   NProgress.done()
  //   next()
  // },
  // computed: {
  //   ...mapState({
  //     event: state => state.event.event
  //   })
  // }
  // methods: {
  //   ...mapActions("event", ["fetchEvent"])
  // },
  // async created () {
  //   await this.fetchEvent(this.id)
  // }
}
</script>

<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
