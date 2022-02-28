<template>
  <v-footer color="deep-purple" dark absolute app>
    <v-spacer />
    <div>&copy; {{ new Date().getFullYear() + " " + footer }}</div>
  </v-footer>
</template>

<script>
export default {
  props: ["footer"],
};
</script>
