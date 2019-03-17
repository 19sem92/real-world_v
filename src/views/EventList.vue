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
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
// import axios from 'axios'
import EventService from "@/services/EventService.js";
export default {
  name: "EventList",
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    };
  },
  created() {
    EventService.getEvents()
      .then(res => {
        this.events = res.data;
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    console.log("already created");
  },
  mounted() {
    console.log("already mounted");
  }
};
</script>