<template>
    <div id="place">
        <UserNavbar/>

        <h3>Place Name: {{ this.place[0] }} </h3>
        <h3>Image Location: <a :href='place[1]'>See it</a></h3>
        <h4>Description: {{ this.place[2] }} </h4>
        <h4>Latitude: {{ this.place[3] }} </h4>
        <h4>Longitude: {{ this.place[4] }} </h4>

         <!-- <a-scene>
      <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene> -->

    <a-scene>
                        <a-sky :src='place[1]'></a-sky>
                    </a-scene>

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
      place: [ ]
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
