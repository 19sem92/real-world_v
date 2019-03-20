<template>
  <div>
    <h1>Oops!</h1>
    <h3>The page you are looking for in not here!</h3>
    <router-link :to="{ name: 'event-list' }">
      Back Home
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound.vue"
}
</script>

<style scoped>

</style>
