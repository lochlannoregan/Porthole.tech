<template>
<div id="dashboard">

<UserNavbar/>

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
            <upload-btn title="Upload 360 Photo" :fileChangedCallback="onChange" accept="image/jpeg">
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

<v-container grid-list-md fluid>
    <v-data-iterator
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      no-data-text="No places have been added. Add one by clicking the plus!"
      content-tag="v-layout"
      row
      wrap
      search>
      <template v-slot:item="props">
        <v-flex
          xs12
          sm6
          md4
          lg3>
          <v-card v-bind:id="props.item.identifier">
            <v-card-title><h4>{{ props.item.placeName }}</h4></v-card-title>
            <v-divider></v-divider>
            <v-list>
              <v-list-tile>
                <v-list-tile-content>Image:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                <v-avatar>
                  <img v-bind:src="props.item.imageLocation">
                </v-avatar>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Description:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.description }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-btn flat color="blue light" @click="deletePlace(props.item.identifier)">
                <v-icon right>delete</v-icon>
                </v-btn>
                <v-btn flat color="blue light">
                <v-icon right>edit</v-icon>
                </v-btn>
                <v-btn flat color="blue light" :to="{ name: 'Place', params: { id: props.item.identifier } }">
                <v-icon right>open_in_new</v-icon>
                </v-btn>
              </v-list-tile>
            </v-list>
          </v-card>
          <br><br>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>

</div>
</template>

<script>

import firebase from 'firebase/app'
import UserNavbar from '@/components/UserNavbar.vue'
import UploadButton from 'vuetify-upload-button'

export default {
  name: 'dashboard',
  data () {
    return {
      dialog: false,
      manuallyEnterGeoCoords: false,
      placeName: '',
      description: '',
      imageLocation: 'testingImageLocation',
      latitude: '',
      longitude: '',
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      items: []
    }
  },
  methods: {
    addPlace: function () {
      var user = firebase.auth().currentUser
      var userDirectory = user.email
      const db = firebase.firestore()
      db.collection(userDirectory).add({
        placeName: this.placeName,
        description: this.description,
        imageLocation: this.imageLocation,
        latitude: this.latitude,
        longitude: this.longitude
      })
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
          db.collection(userDirectory).doc(docRef.id).get().then(function (doc) {
            const storageRef = firebase.storage()
            storageRef.ref(userDirectory + '/' + doc.data().imageLocation).getDownloadURL().then(function (downloadURL) {
              console.log(downloadURL)
              db.collection(userDirectory).doc(docRef.id).update({
                imageLocation: downloadURL
              })
            })
          })
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
      this.dialog = false
      this.placeName = ''
      this.description = ''
      this.imageLocation = ''
      this.latitude = ''
      this.longitude = ''
    },
    onChange: function (file) {
      const uuidv4 = require('uuid/v4')
      const fileName = uuidv4()
      this.imageLocation = fileName
      var user = firebase.auth().currentUser
      var userDirectory = user.email
      if (userDirectory === null) {
        userDirectory = ''
      }
      // Create the file metadata
      var metadata = {
        contentType: 'image/jpeg'
      }

      const storageRef = firebase.storage().ref()
      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child(userDirectory + '/' + fileName).put(file, metadata)

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running')
              break
          }
        }, function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
            // User doesn't have permission to access the object
              break

            case 'storage/canceled':
            // User canceled the upload
              break
          }
        })
    },
    deletePlace: function (identifier) {
      console.log(identifier)
      var user = firebase.auth().currentUser
      var userDirectory = user.email
      const db = firebase.firestore()
      db.collection(userDirectory).doc(identifier).delete().then(function () {
        console.log('Document deleted successfully')
      }).catch(function (error) {
        console.error('Error removing documents', error)
      })
    },
    loadPlaces: function () {
      var user = firebase.auth().currentUser
      var userDirectory = user.email
      const db = firebase.firestore()
      var itemsLink = this.items
      db.collection(userDirectory).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          itemsLink.push({ identifier: doc.id, placeName: doc.data().placeName, imageLocation: doc.data().imageLocation, description: doc.data().description })
        })
      })
    }
  },
  mounted: function () {
    this.loadPlaces()
  },
  components: { 'upload-btn': UploadButton, UserNavbar }
}
</script>

<style>

</style>
