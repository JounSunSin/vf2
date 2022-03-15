<template> 
    <div>
        <v-card-title>board test</v-card-title>
        
        <v-data-table :headers="headers" :items="mapItems"       
            :items-per-page="5"
            :options.sync="options"
            :server-items-length="serverItemsLength"
            must-sort
            >
            <template v-slot:[slotItem()]="{ item }">
                <v-btn icon @click="bbsDialogOpen(item)">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="bbsDelete(item)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
            <template v-slot:[soltTime]="{ item }">
                {{item.createdAt.toLocaleString()}}
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
import { head, last } from 'lodash'

export default {
    data() {
        return {
            headers: [
                { value: 'createdAt', text: '작성일' }, 
                { value: 'title' , text: '제목' },
                { value: 'content' , text: '내용' },
                { value: 'id' , text: 'id', sortable: false },
            ],
            mapItems: [],
            form: { 
                title: '', 
                content: '',
            },
            bbsDialog: false,
            selectItem: null,
            unsubscribe: null,
            unsubscribeCount: null,
            serverItemsLength: 0,
            options: {
                sortBy: ['createdAt'],
                sortDesc: [true]
            },
            docs: [],
        }
    },
    watch: {
        options: {
            handler (now, old) {
                const arrow = now.page - old.pgae;
                this.subscribe(arrow);
            },
            deep: true
        }
    },
    created () {

    },
    destroyed () {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        if (this.unsubscribeCount) {
            this.unsubscribeCount()
        }
    },
    methods: {
        slotItem() {
            return 'item.id'; 
        },
        soltTime() {
            return 'item.createdAt';
        },
        subscribe(arrow) {
            const basicQuery = this.$firebase.firestore();

            this.unsubscribeCount = basicQuery.collection('meta').doc('board').onSnapshot((doc) => {
                
                if (!doc.exists) { 
                    return 
                }
                this.serverItemsLength = doc.data().count
            });

            const order = head(this.options.sortBy);
            const sort = head(this.options.sortDesc) ? 'desc' : 'asc';
            const limit = this.options.itemsPerPage;            
            const ref = basicQuery.collection('board').orderBy(order, sort);
            let query;

            switch (arrow) {
                case -1: query = ref.endBefore(head(this.docs)).limitToLast(limit)

                break
                case 1: query = ref.startAfter(last(this.docs)).limit(limit)
                break

                default: query = ref.limit(limit)
                break
            }

            this.unsubscribe = query.onSnapshot((sn) => {            
                if (sn.empty) {
                    this.mapItems = [];
                    return;
                } else {
                    this.docs = sn.docs;

                    this.mapItems = sn.docs.map( v => {
                        const item = v.data();
                        return {
                            id: v.id, 
                            title: item.title, 
                            content: item.content, 
                            createdAt: item.createdAt.toDate(),
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
                this.form.createdAt = new Date();

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
