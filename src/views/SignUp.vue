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
        label="Password"
        :append-icon="show1 ? 'visibility' : 'visibility_off'"
        @click:append="show1 = !show1"
        :type="show1 ? 'text' : 'password'"
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
      password: '',
      show1: false,
      demoPlace: [
        {
          placeName: 'Demo Place',
          imageLocation: 'https://firebasestorage.googleapis.com/v0/b/porthole-2c2a5.appspot.com/o/Demo%2Fnational_park_3.jpg?alt=media&token=5992d534-03a7-4e5c-8e03-35ac25ba3a43',
          description: 'This is a demo place description',
          latitude: 53.280270,
          longitude: -9.058400
        }
      ]
    }
  },
  components: { Navbar },
  methods: {
    signUp: function () {
      var copyOfDemo = this.demoPlace
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          var firebaseUser = firebase.auth().currentUser
          var userDirectory = firebaseUser.email
          const db = firebase.firestore()
          db.collection(userDirectory).add({
            placeName: copyOfDemo[0].placeName,
            description: copyOfDemo[0].description,
            imageLocation: copyOfDemo[0].imageLocation,
            latitude: copyOfDemo[0].latitude,
            longitude: copyOfDemo[0].longitude
          })
            .then(function (docRef) {
              console.log('Document written with ID: ', docRef.id)
            })
            .catch(function (error) {
              console.error('Error adding document: ', error)
            })
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
