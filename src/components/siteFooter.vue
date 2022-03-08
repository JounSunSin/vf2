<template>
  <v-footer color="deep-purple" dark absolute app>
    <v-spacer />
    <v-btn icon @click="fixFooter"><v-icon>mdi-grease-pencil</v-icon></v-btn>
    <div>&copy; {{ new Date().getFullYear() + " " + footer }}</div>

    <v-dialog v-model="footDialog" max-width="400" >
      <v-card>
        <v-card-title>
          Footer 수정
          <v-spacer/>
          <v-btn icon @click="footerSave"><v-icon>mdi-content-save</v-icon></v-btn>
          <v-btn icon @click="closeDialog"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="footerField" outlined @keypress.enter="footerSave" hide-details/>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-footer>
</template>

<script>
export default {
  props: ["footer"],
  data() {
    return {
      footerField: '',
      footDialog: false,
    }
  },
  methods: {
    fixFooter () {
      this.footerField = this.footer;      
      this.footDialog = true;
    },
    async footerSave () {
      try {
        await this.$firebase.database().ref().child('site').update({ footer: this.footerField });  
      } finally {
        this.footDialog = false;
      }      
    },
    closeDialog() {
      this.footDialog = false;
    }
  }
};
</script>
