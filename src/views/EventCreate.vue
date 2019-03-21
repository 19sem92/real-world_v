<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <base-select
        class="field"
        label="Select a category"
        :options="categories"
        v-model="event.category"
      />

      <h3>Name & describe your event</h3>
      <base-input
        class="field"
        label="Title"
        type="text"
        placeholder="Add an event title"
        v-model="event.title"
      />

      <base-input
        class="field"
        label="Description"
        type="text"
        placeholder="Add a description"
        v-model="event.description"
      />

      <h3>Where is your event?</h3>
      <base-input
        class="field"
        label="Location"
        type="text"
        placeholder="Add a location"
        v-model="event.location"
      />

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>

      <base-select
        class="field"
        label="Select a category"
        :options="times"
        v-model="event.time"
      />

      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker"
import { mapState } from "vuex"
import NProgress from "nprogress"
import BaseInput from "../components/BaseInput";
import BaseSelect from "../components/BaseSelect";
export default {
  name: "EventCreate",
  components: {
    BaseSelect,
    BaseInput,
    Datepicker
  },
  data () {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(`${i}:00`)
    }
    return {
      times,
      event: this.createNewEventObj ()
    }
  },
  computed: {
    ...mapState([
        "categories",
        "user"
    ])
  },
  methods: {
    createNewEventObj () {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)

      return {
        id,
        user,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: []
      }
    },
    async createEvent () {
      try {
        NProgress.start()
        await this.$store.dispatch("event/createEvent", this.event)
        this.$router.push({
          name: "event-show",
          params: { id: this.event.id }
        })
        this.event = this.createNewEventObj()
      } catch (err) {
        console.log("There was a problem", err)
        NProgress.done()
      }

      // this.$store.dispatch("createEvent", this.event).then(() => {
      //     console.log("then")
      //     this.$router.push({
      //       name: "event-show",
      //       params: { id: this.event.id }
      //     })
      //     this.event = this.createNewEventObj()
      //   })
      //   .catch(() => {
      //     console.log("There was a problem")
      // })
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
