<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span class="font-weight-light">Porthole.tech</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn>Login</v-btn>
        <v-btn>Sign Up</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
