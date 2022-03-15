<template>
    <v-card>
        <v-card-title>
            <bbs-index v-if="collection === 'bbs' && document === 'list'"/>
            <bbs-content v-else-if="collection === 'bbs'" :document="document"/>
            <page-index v-else-if="collection === 'page' && document === 'list'"/>
            <page-content v-else-if="collection === 'page'" :document="document"/>
            <error-page v-else></error-page>
        </v-card-title>

        <v-card class="pa-4">
            collection : {{collection}}
        </v-card>      
        <v-card class="pa-4">
            document : {{document}}
        </v-card>      
    </v-card>
</template>

<script>
import BbsIndex from './bbs/bbsIndex'
import BbsContent from './bbs/bbsContent'
import PageIndex from './page/pageIndex'
import PageContent from './page/pageContent'
import ErrorPage from './errorView'

export default {  
    components: {
        BbsIndex, BbsContent, PageIndex, PageContent, ErrorPage
    },
    computed: {
        collection () {
            return this.$route.params.collection
        },
        document () {
            return this.$route.params.document
        }
    }
}
</script>
