<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <a-scene>
        <a-sky :src="`../assets/national_park_3.jpg`"></a-sky>
    </a-scene>
    <img src="../assets/national_park_3.jpg"> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: {
        sample: require('../assets/national_park_3.jpg')
      }
    }
  }
}
</script>
