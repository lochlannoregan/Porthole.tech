<template>
  <v-app class="blue lighten-5">
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>

import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: { Footer },
  data () {
    return {
      //
    }
  }
}
</script>
