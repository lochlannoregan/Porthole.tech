<template>
<div id="dashboard">
        <v-toolbar flat app>
            <toolbar-side-icon>
                <v-btn icon to="/">
                <v-avatar>
                    <img src="../assets/logo.png">
                </v-avatar>
                </v-btn>
            </toolbar-side-icon>
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
              absolute
              top
              right
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
          name="input-7-1"
          label="Description"
          value=""
          hint="This image reminds me..."
          maxlength="750"
          auto-grow
          counter
></v-textarea>
        </v-flex>
      </v-layout>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Add Place
          </v-btn>
        </v-card-actions>
      </v-card>
</v-dialog>

<!-- <AllPlaces/> -->

</div>
</template>

<script>

import firebase from 'firebase'
import AllPlaces from '@/components/AllPlaces.vue'

export default {
  name: 'dashboard',
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    addPlace: function () {
      dialog = false
    }
  },
  components: { AllPlaces }
}
</script>

<style>

</style>
