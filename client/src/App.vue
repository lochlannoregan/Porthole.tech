<template>
  <div id="app">
  <div class="container">
        <div class="row">
            <div class="col-lg">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <img src="./assets/logo.png" style="width: 10%;"
                         alt="magnifying glass over location marker"
                         class="img-fluid">
                    <router-link to="/">Porthole.dev</router-link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav nav-pills justify-content-center">
                            <li class="nav-item">
                                <router-link to="/myplaces">My Places</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/register">Register</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/login">Login</router-link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
