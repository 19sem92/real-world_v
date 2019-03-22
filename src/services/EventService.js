import axios from "axios"
// import NProgress from "nprogress"

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})

apiClient.interceptors.request.use(config => {
  // NProgress.start()
  console.log(config, "request")
  return config
})

apiClient.interceptors.response.use(response => {
  // NProgress.done()
  console.log(response, "response")
  return response
})

export default {
  getEvents (perPage, page) {
    // return apiClient.get("/events")
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`)
  },
  getEvent (id) {
    return apiClient.get(`/events/${id}`)
  },
  deleteEvent (id) {
    return apiClient.delete(`/events/${id}`)
  },
  postEvent (event) {
    return apiClient.post("/events", event)
  }
}
