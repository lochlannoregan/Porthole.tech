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
        @click="login" center>
        Login
      </v-btn>
      </v-layout>

      <v-layout justify-center row>
        <span class="font-weight-light">or</span>
      </v-layout>

      <v-layout justify-center row>
        <v-btn icon @click="socialLogin">
          <v-avatar>
            <img src="../assets/google-logo.png">
          </v-avatar>
        </v-btn>
      </v-layout>

      <v-layout justify-center>
        <span class="font-weight-light">Don't have an account? You can <router-link to="sign-up">
          create one here</router-link></span>
      </v-layout>

    </v-form>
   </v-container>
</template>

<script>
import firebase from 'firebase'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
      // rules: {
      //   required: value => !!value || 'Required.',
      //   min: v => v.length >= 8 || 'Min 8 characters',
      //   emailMatch: () => ('The email and password you entered don\'t match')
      // }
    }
  },
  components: { Navbar },
  methods: {
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('dashboard')
        },
        (err) => {
          // this.$swal('Oops. ' + err.message)
          this.$swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err.message
          })
        }
      )
    },
    socialLogin: function () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.$router.replace('dashboard')
      }).catch((err) => {
        this.$swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.message
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
