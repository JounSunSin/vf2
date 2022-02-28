<template>
  <div>
    <v-app-bar color="deep-purple" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Application </v-list-item-title>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item v-for="item in items" :key="item.title" :to="item.to">
        <v-list-item-content> 
          {{ item.title }}
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      drawer: false,
      items: [
        { title: "home", to: "/" },
        { title: "hello", to: "@/components/HelloWorld" },
        { title: "about", to: "/about" },
      ],
    };
  },
};
</script>

<style>
</style>