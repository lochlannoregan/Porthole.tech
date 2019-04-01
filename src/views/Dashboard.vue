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
      imageLocation: 'testingImageLocation',
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
      var user = firebase.auth().currentUser
      var userDirectory = user.email
      const db = firebase.firestore()
          
      // var url = valueGotten.toString()
      console.log(this.imageLocation)
      db.collection(userDirectory).add({
        placeName: this.placeName,
        description: this.description,
        imageLocation: this.imageLocation,
        latitude: this.latitude,
        longitude: this.longitude
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id)
      })
      .catch(function(error) {
        console.error("Error adding document: ", error)
      })
      this.dialog = false
    },
    onChange: function (file) {
      this.imageLocation = file.name
      var user = firebase.auth().currentUser
      var userDirectory = user.email
      if(userDirectory === null) {
        userDirectory = ''
      }
      // Create the file metadata
      var metadata = {
        contentType: 'image/jpeg'
      };

      const storageRef = firebase.storage().ref()
      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child(userDirectory + '/' + file.name).put(file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;
        }}, function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          // console.log(downloadURL);
          // Dashboard.data().imageLocation = downloadURL
        });
      });
    }
  },
  components: { AllPlaces, 'upload-btn': UploadButton }
}
</script>

<style>

</style>
