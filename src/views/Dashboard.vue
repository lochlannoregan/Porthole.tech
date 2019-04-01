<template>
<div id="dashboard">
        <v-toolbar flat app>
              <v-btn icon to="/">
              <v-avatar>
                  <img src="../assets/logo.png">
              </v-avatar>
              </v-btn>
            <v-toolbar-title class="blue--text">
                <span class="font-weight-light">Porthole</span>
                <span>.tech</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat color="blue light" @click="logout">
                <span>Logout</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>

<v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
              color="pink"
              dark
              small
              top
              left
              fab
            v-on="on">
              <v-icon>add</v-icon>
        </v-btn>
      </template>

      <v-card>
        <!-- <v-card-title
          class="headline grey lighten-2"
          primary-title
        >Add Place</v-card-title> -->

        <v-card-text>
          <v-layout row >
        <v-flex md9>
          <v-text-field
            v-model="placeName"
            label="Place Name"
            required
            maxlength="50"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row >
      <v-flex md9>
        <v-textarea
          label="Description"
          v-model="description"
          value=""
          hint="This image reminds me..."
          maxlength="750"
          auto-grow
          counter></v-textarea>
        </v-flex>
      </v-layout>

       <v-layout row >
        <v-flex md9>
          <v-text-field
            v-model="latitude"
            label="Latitude"
            required
            maxlength="50"
          ></v-text-field>
        </v-flex>
      </v-layout>

       <v-layout row >
        <v-flex md9>
          <v-text-field
            v-model="longitude"
            label="Longitude"
            required
            maxlength="50"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <!-- <v-layout row>
        <span class="font-weight-light">Manually enter location:</span>
          <v-checkbox @click="manuallyEnterGeoCoords = !manuallyEnterGeoCoords">
          </v-checkbox>
      </v-layout> -->

          <v-layout row justify-end>
          <v-flex md9>
            <upload-btn :fileChangedCallback="onChange" accept="image/jpeg">
            </upload-btn>
          </v-flex>
        </v-layout>

      <!-- <v-layout row>
          <v-flex md9>
            <v-avatar>
                  <img id="imgUpload" src="">
            </v-avatar>
          </v-flex>
        </v-layout> -->
      
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="addPlace"
          >
            Add Place
          </v-btn>
        </v-card-actions>
      </v-card>
</v-dialog>

<AllPlaces/>

</div>
</template>

<script>

import firebase from 'firebase'
import AllPlaces from '@/components/AllPlaces.vue'
import UploadButton from 'vuetify-upload-button'

export default {
  name: 'dashboard',
  data () {
    return {
      dialog: false,
      manuallyEnterGeoCoords: false,
      placeName: '',
      description: '',
      latitude: '',
      longitude: ''
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    addPlace: function () {
      this.dialog = false

    },
    onChange (image) {
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        this.image = image
        const storageRef = firebase.storage().ref()
        const imageRef = storageRef.child('image.jpg')
        const task = imageRef.put(image)

        task.then(snapshot => {
          console.log(snapshot)
          const url = snapshot.downloadURL
          document.querySelector('#imgUpload').setAttribute('src', url)
        })

      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    }
  },
  components: { AllPlaces, 'upload-btn': UploadButton }
}
</script>

<style>

</style>
