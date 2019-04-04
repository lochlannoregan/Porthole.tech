<template>
    <div id="place">
        <UserNavbar/>

        <h3>Place Name: {{ this.place[0] }} </h3>
        <h3>Image Location: <a :href='place[1]'>See it</a></h3>
        <h4>Description: {{ this.place[2] }} </h4>
        <h4></h4>

      <v-layout>
        <l-map :key="markerLatLng[0]" style="height: 600px; width: 600px" :zoom="zoom" :center="this.markerLatLng">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker :lat-lng="this.markerLatLng" >
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
import 'aframe'

export default {
  name: 'place',
  data () {
    return {
      id: 0,
      place: [ ],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 3,
      markerLatLng: [ 41.234, -1.532 ]
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
    var latlongLink = this.markerLatLng
    const db = firebase.firestore()
    db.collection(userDirectory).doc(this.id).get().then(function (querySnapshot) {
      placeLink.push(querySnapshot.data().placeName,
        querySnapshot.data().imageLocation,
        querySnapshot.data().description)
      latlongLink[0] = querySnapshot.data().latitude
      latlongLink[1] = querySnapshot.data().longitude
    })
  }
}
</script>

<style>

</style>
