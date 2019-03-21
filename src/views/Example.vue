<template>
  <div>
    <h1>Example!</h1>
    <form @submit.prevent="submit">
      <input
        type="email"
        placeholder="Email"
        :class="{ error: $v.email.$error }"
        @blur="$v.email.$touch()"
        v-model="email"
      >
      <p>{{ $v.email.$error }}</p>
      <div v-if="$v.email.$error">
        <p v-if="!$v.email.email" class="errorMessage">Email is not valid</p>
        <p v-if="!$v.email.required" class="errorMessage">Email is required</p>
      </div>
      <button :disabled="$v.$invalid" type="submit">submit</button>
      <p v-if="$v.$anyError">Please fill out the required fields</p>
    </form>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators"
export default {
  name: "Example",
  data () {
    return {
      email: null
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    submit () {
      if (this.$v.$invalid) return
      console.log("Form submitted", this.email)
    }
  }
}
</script>

<style scoped>

</style>
