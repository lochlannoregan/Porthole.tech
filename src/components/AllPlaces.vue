<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      row
      wrap
    >
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
</template>

<script>

import firebase from 'firebase/app'

export default {
  name: 'allplaces',
  data () {
    return {
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      items: [ ]
    }
  },
  methods: {
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
      // this.$forceUpdate()
    }
  },
  created: function () {
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
}
</script>
