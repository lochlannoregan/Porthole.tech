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
          lg3
        >
          <v-card>
            <v-card-title><h4>{{ props.item.placeName }}</h4></v-card-title>
            <v-divider></v-divider>
            <v-list>
              <v-list-tile>
                <v-list-tile-content>Image:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                <v-avatar>
                <img src="https://firebasestorage.googleapis.com/v0/b/porthole-2c2a5.appspot.com/o/image.jpg?alt=media&token=9da6127f-b6f5-48b4-8fd9-9d6f7f21ab9e">
                </v-avatar>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Description:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.description }}</v-list-tile-content>
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

import firebase from 'firebase'

  export default {
    data: () => ({
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      items: [
        {
        }
      ]
    }),
    created: function () {
      const app = firebase.app();
      const db = firebase.firestore()
     
      db.collection("ljoregan@gmail.com").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log("got one!")
          var gotPlaceName = doc.data().placeName
          var gotImageLocation = doc.data().imageLocation
          var gotDescription = doc.data().description
          console.log(gotPlaceName + " " + gotImageLocation + " " + gotDescription)
          // console.log(this.items.push({placeName: gotPlaceName, imageLocation: gotImageLocation, description: gotDescription}))
        })
      })

    //  docRef.get().then(function(doc) {
    //    if (doc.exists) {
    //      console.log("existis")
    //     // this.items.push({placeName: doc.placeName, imageLocation: doc.imageLocation, description: doc.description})
    //    } else {
    //      console.log("no such document")
    //    }
    //  }).catch(function (error) {
    //    console.log("Error getting document", error)
    //  })
      
      // console.log("this page was created")
      // console.log(this.items[0])
      // console.log(this.items.push({placeName: 'French Hill', description: 'Other hill', imageLocation: 'google.com'}))
      // console.log(this.items[1])
    }
  }
  </script>