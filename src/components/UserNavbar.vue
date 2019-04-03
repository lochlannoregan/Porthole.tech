<template>
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
</template>

<script>

import firebase from 'firebase'

export default {
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>
