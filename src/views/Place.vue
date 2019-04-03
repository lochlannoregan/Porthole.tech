<template>
    <div id="place">
        <UserNavbar/>

        <h3>Place Name: {{ this.place[0] }} </h3>
        <h3>Image Location: <a :href='place[1]'>See it</a></h3>
        <h4>Description: {{ this.place[2] }} </h4>
        <h4>Latitude: {{ this.place[3] }} </h4>
        <h4>Longitude: {{ this.place[4] }} </h4>

      <v-layout>
        <l-map style="height: 600px; width: 600px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng" >
      <l-tooltip>{{this.place[0]}}</l-tooltip>
    </l-marker>
  </l-map>
      <!-- <a-scene>
        <a-sky :src='place[1]'></a-sky>
      </a-scene> -->
      </v-layout>

    </div>
</template>

<script>

import firebase from 'firebase'
import UserNavbar from '@/components/UserNavbar.vue'
import AFrame from 'aframe'

export default {
  name: 'place',
  data () {
    return {
      id: 0,
      place: [ ],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 3,
      center: [47.413220, -1.219482],
      markerLatLng: [47.313220, -1.319482]
    }
  },
  methods: {
  },
  components: { UserNavbar },
  created: function () {
    this.id = this.$route.params.id
    var user = firebase.auth().currentUser
    var userDirectory = user.email
    var placeLink = this.place
    const db = firebase.firestore()
    db.collection(userDirectory).doc(this.id).get().then(function (querySnapshot) {
      placeLink.push(querySnapshot.data().placeName,
        querySnapshot.data().imageLocation,
        querySnapshot.data().description,
        querySnapshot.data().latitude,
        querySnapshot.data().longitude)
    })
  }
}
</script>

<style>

</style>
