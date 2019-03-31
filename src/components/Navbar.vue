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
            <v-btn flat color="blue light" to="/login">
                <span>Login</span>
            </v-btn>
            <v-btn flat color="blue light" to="/sign-up">
                <span>Sign Up</span>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer app v-model="drawer" class="indigo">
            <p>test</p>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  }
}
</script>
