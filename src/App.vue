<template>
  <div id="app">
    <site-header />
    <v-content>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/hello">Hello</router-link>      
      <router-view />

      <div style="height: 300px; text-align: center;">
        <v-btn icon @click="save">
            <v-icon>mdi-check</v-icon>
        </v-btn>&nbsp;&nbsp;
        <v-btn icon @click="read">
            <v-icon>mdi-cards-club-outline</v-icon>
        </v-btn>&nbsp;&nbsp;
        <v-btn icon @click="readOne">
			<v-icon>mdi-cards-heart</v-icon>
        </v-btn>
      </div>

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
  methods: {
	save () {
		console.log('save@@@')
		this.$firebase.database().ref().child('abcd').set({
		title: 'abcd', text: 'tttttt'
		})
	},
	read () {
		this.$firebase.database().ref().child('abcd').on('value', (sn) => {
		console.log(sn)
		console.log(sn.val())
		})
	},
	async readOne () {
		const sn = await this.$firebase.database().ref().child('abcd').once('value')
		console.log(sn.val())
	}
  }
};
</script>
