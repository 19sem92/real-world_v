import Vue from "vue"
import Router from "vue-router"
import EventCreate from "./views/EventCreate.vue"
import EventShow from "./views/EventShow.vue"
import EventList from "./views/EventList.vue"
import NProgress from "nprogress"
import store from "@/store/store"

Vue.use(Router)

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "event-list",
      component: EventList,
      props: true
    },
    {
      path: "/event/:id",
      name: "event-show",
      component: EventShow,
      props: true,
      async beforeEnter (routeTo, routeFrom, next) {
        const event = await store.dispatch(
          "event/fetchEvent",
          routeTo.params.id
        )
        routeTo.params.event = event
        next()
      }
    },
    {
      path: "/event/create",
      name: "event-create",
      component: EventCreate
    }
  ]
})

router.beforeEach((routerTo, routerFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
