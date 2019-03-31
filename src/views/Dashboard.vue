<template>
<nav>
        <v-toolbar flat app>
            <v-toolbar-side-icon class="blue--text" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-side-icon to="/">
                <img src="../assets/logo.png">
            </v-toolbar-side-icon>
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
    </nav>
</template>

<script>

import firebase from 'firebase'

export default {
  name: 'dashboard',
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
