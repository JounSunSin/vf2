<template> 
    <div>
        <v-card-title>board test</v-card-title>
        
        <v-data-table :headers="headers" :items="mapItems" :items-per-page="3">
            <template v-slot:[slotItem()]="{ item }">
                <v-btn icon @click="bbsDialogOpen(item)">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="bbsDelete(item)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>

        <v-card-actions>
            <v-btn @click="bbsDialogOpen('')">
                <v-icon left>mdi-pencil</v-icon>
            </v-btn>
        </v-card-actions>
        <v-dialog max-width="500" v-model="bbsDialog">
            <v-form>
                <v-card>
                    <v-card-text>
                            <v-text-field v-model="form.title" label="title"/>
                            <v-text-field v-if="selectItem" @keypress.enter="bbsFix('')"
                                v-model="form.content" label="content"/>
                            <v-text-field v-else @keypress.enter="bbsFix('save')"
                                v-model="form.content" label="content"/>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn>
                            <v-icon @click="bbsFix('')" v-if="selectItem"> 
                                mdi-content-save
                            </v-icon>
                            <v-icon @click="bbsFix('save')" v-else>
                                mdi-content-save
                            </v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                { value: 'title' , text: '제목' },
                { value: 'content' , text: '내용' },
                { value: 'id' , text: 'id' },
            ],
            mapItems: [],
            form: { 
                title: '', 
                content: '', 
            },
            bbsDialog: false,
            selectItem: null,
            unsubscribe: null,
        }
    },
    created () {
        this.subscribe();
    },
    destroyed () {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    },
    methods: {
        slotItem () {
            return 'item.id'; 
        },
        subscribe() {
            this.unsubscribe = this.$firebase.firestore().collection('board').onSnapshot((sn) => {
                if (sn.empty) {
                    this.mapItems = [];
                    return;
                } else {
                    this.mapItems = sn.docs.map( v => {
                        const item = v.data();
                        return {
                            id: v.id, title: item.title, content: item.content
                        }
                    });
                }
            });
        },
        bbsDialogOpen (useInfo) {
            this.selectItem = useInfo;
            this.bbsDialog = true;

            if (useInfo != '') {
                this.form.title = useInfo.title;
                this.form.content = useInfo.content;
            } else {
                this.form.title = '';
                this.form.content = '';
            }
        },
        bbsFix (ment) {
            if (ment === 'save') {
                this.$firebase.firestore().collection('board').add(this.form);
            } else {
                this.$firebase.firestore().collection('board').doc(this.selectItem.id).update(this.form);
            }
            this.bbsDialog = false;
        },
        bbsDelete (useInfo) {
            this.$firebase.firestore().collection('board').doc(useInfo.id).delete();
        }
    }
}
</script>
