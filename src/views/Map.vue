<template>
    <div id="map">

      <a-scene>
        <a-sky :src='place[0]'></a-sky>
      </a-scene>
    </div>
</template>

<script>

import firebase from 'firebase'
import 'aframe'

export default {
  name: 'Map',
  data () {
    return {
      aframeid: 0,
      place: [ ]
    }
  },
  methods: {
  },
  components: { },
  created: function () {
    this.aframeid = this.$route.params.aframeid
    var user = firebase.auth().currentUser
    var userDirectory = user.email
    var placeLink = this.place
    const db = firebase.firestore()
    db.collection(userDirectory).doc(this.aframeid).get().then(function (querySnapshot) {
      placeLink.push(querySnapshot.data().imageLocation)
    })
  }
}
</script>

<style>

</style>
