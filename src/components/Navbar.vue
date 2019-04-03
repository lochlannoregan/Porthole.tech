<template>
    <nav>
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
            <v-btn flat color="blue light" to="/login">
                <span>Login</span>
            </v-btn>
            <v-btn flat color="blue light" to="/sign-up">
                <span>Sign Up</span>
            </v-btn>
        </v-toolbar>
    </nav>
</template>

<script>
export default {
}
</script>
