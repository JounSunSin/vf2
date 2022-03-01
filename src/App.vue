<template>
  <div id="app">
    <site-header />
    <v-content>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/hello">Hello</router-link>
      <router-view />
    </v-content>
    <site-footer />
  </div>
</template>

<script>
import siteHeader from "@/components/siteHeader";
import siteFooter from "@/components/siteFooter";

export default {
  data() {
    return {
      title: "Main Title",
      footer: "Main Footer",
    };
  },
  components: {
    siteHeader,
    siteFooter,
  },
};
</script>
