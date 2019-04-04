<template>
  <div class="home">
    <Navbar/>
 <v-layout column align-center justify-center>
      <h1 class="font-weight-light blue--text">Porthole.tech</h1>
      <h4 class="blue--text">Working with 360 images</h4>
    </v-layout>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  components: {
    Navbar
  },
  data () {
    return {
    }
  }
}
</script>
