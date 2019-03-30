<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex
        xs12
        mb-5
      >
        <h2 class="headline font-weight-bold mb-3">FUCK</h2>

        <v-layout justify-center>
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader'
      }
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com'
      }
    ]
  })
}
</script>

<style>

</style>
