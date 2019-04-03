<template>
    <div id="place">
        <UserNavbar/>

        <h1>{{ this.place[0] }} </h1>

    </div>
</template>

<script>

import firebase from 'firebase'
import UserNavbar from '@/components/UserNavbar.vue'

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
