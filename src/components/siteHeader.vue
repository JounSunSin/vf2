<template>
  <div data-app="true">
    <v-app-bar app color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>

      <v-btn icon @click.stop="fixTitle"><v-icon>mdi-grease-pencil</v-icon></v-btn>      

      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" width="400">
      <site-navi :items="items"/>
    </v-navigation-drawer>

    <v-dialog v-model="fixDialog" max-width="400" >
      <v-card>
        <v-card-title>
          Title 수정
          <v-spacer/>
          <v-btn icon @click="save"><v-icon>mdi-content-save</v-icon></v-btn>
          <v-btn icon @click="closeDialog"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="titleFild" outlined @keypress.enter="save" hide-details/>
        </v-card-text>
      </v-card>
    </v-dialog>      

  </div>
</template>

<script>
import siteNavi from "@/components/siteNavi";

export default {
  props: ["title","items"],
  data() {
    return {
      drawer: false,
      group: null,
      titleFild: '',
      fixDialog: false,
    };
  },
  methods: {
    fixTitle () {
      this.titleFild = this.title;      
      this.fixDialog = true;
    },
    async save () {
      try {
        await this.$firebase.database().ref().child('site').update({ title: this.titleFild });  
      } finally {
        this.fixDialog = false;
      }      
    },
    closeDialog() {
      this.fixDialog = false;
    }
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  components: { siteNavi },
};
</script>
