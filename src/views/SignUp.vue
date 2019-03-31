<template>
  <v-container grid-list-xs>
    <Navbar/>
    <v-form>
      <v-layout row justify-center>
        <v-flex xs6 md3>
          <v-text-field
            v-model="email"
            label="Email"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row justify-center>
      <v-flex xs6 md3>
        <v-text-field
        v-model="password"
        :type="'password'"
        label="Password"
        required></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout justify-center>
      <v-btn
        color="blue white--text"
        @click="signUp" center>
        Sign Up
      </v-btn>
      </v-layout>

       <v-layout justify-center>
        <span class="font-weight-light">
          Already have an account? You can <router-link to="login">login here</router-link></span>
      </v-layout>

    </v-form>
   </v-container>
</template>

<script>
import firebase from 'firebase'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'signUp',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  components: { Navbar },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('dashboard')
        },
        (err) => {
          this.$swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err.message
          })
        }
      )
    }
  }
}
</script>

 <style scoped>
</style>
