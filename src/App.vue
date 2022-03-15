<template>
  <v-app id="app">
    <web-header :title="site.title" :items="site.menu"/>
    <v-main>
      <router-view />
    </v-main>
    <web-footer :footer="site.footer"/> 
  </v-app>
</template>

<script>
import webHeader from "@/components/siteHeader";
import webFooter from "@/components/siteFooter";

export default {
  data() {
    return { 
      site: {
        title: "Main Title",
        footer: "Main Footer",
        menu: [
          {
            icon: 'mdi-home',
            subNavi: [{ title: 'home', link: '/' }],
            title: 'home',
          },
          {
            icon: 'mdi-account',
            active: true,
            subNavi: [
              { title: 'about', link: '/about' },
              { title: 'hello', link: '/hello' },
            ],
            title: 'sub',
          },
          {
            icon: 'mdi-tag',
            subNavi: [{ title: 'List 2', link: '/'  }],
            title: 'tag',
          },
        ] 
      }
    };
  },
  components: {
    webHeader,
    webFooter,
  },
  created () {
	this.subscribe();
  },
  methods: {
    subscribe () {
      this.$firebase.database().ref().child('site').on('value', (sn) => {
        const fixTitle = sn.val();
        if (!fixTitle) {
          this.$firebase.database().ref().child('site').set(this.site);
          return;
        }
        this.site = fixTitle;
      }, (e) => {
        console.log(e.message + " app.vue 제목");
      })
    },
    save () {
      console.log('save@@@')
      this.$firebase.database().ref().child('abcd').set({
        title: 'abcd', text: 'tttttt'
      })
    },
    read () {
      this.$firebase.database().ref().child('abcd').on('value', (sn) => {
        console.log(sn.val())
      })
    },
    async readOne () {
      const sn = await this.$firebase.database().ref().child('abcd').once('value')
      console.log(sn.val())
    }
  },
};

</script>
