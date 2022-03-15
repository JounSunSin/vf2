<template>
    <v-sheet>
        <v-textarea v-model="text"></v-textarea>
        <v-btn @click="readStorage">Read</v-btn>
        <v-btn @click="writeStorage">Write</v-btn>
    </v-sheet>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            text : '',
            url: '',
        }
    },
    methods: {
        async writeStorage() {
            const sn = await this.$firebase.storage().ref().child('xxx.text').putString('abcd');
            const url = await sn.ref.getDownloadURL();
            this.url = url;
        },
        async readStorage() {
            const read = await axios.get(this.url);
            console.log(read);
            this.text = read.data;
        }
    }
}
</script>
