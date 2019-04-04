<template>
    <div id="place">
        <UserNavbar/>

        <template>
  <v-layout justify-center>
    <v-flex xs12 sm9>
      <v-card>
        <v-responsive >
          <l-map :key="markerLatLng[0]"  style="height:800px; width: 2000px" :zoom="zoom" :center="this.markerLatLng">
            <l-tile-layer :url="url"></l-tile-layer>
              <l-marker :lat-lng="this.markerLatLng" >
                <l-tooltip>{{this.place[0]}}</l-tooltip>
             </l-marker>
           </l-map>
        </v-responsive>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ this.place[0] }}</h3>
            <div>{{ this.place[2] }}</div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>
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
      zoom: 6,
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
