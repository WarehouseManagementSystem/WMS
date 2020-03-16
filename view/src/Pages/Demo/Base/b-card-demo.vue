<template>
    <div>
        <h2>b-card</h2>
        <hr>
        <h3>Base</h3>
        <b-card>
            <b-card-title>Card Title</b-card-title>
            <b-card-subtitle>Card Subtitle</b-card-subtitle>
            <b-card-text>Card text</b-card-text>
            <b-card-link>Card link</b-card-link>
        </b-card>
        <h3>Header</h3>
        <b-card>
            <template #header><b-card-title>Card Title</b-card-title></template>
            <b-card-subtitle>Card Subtitle</b-card-subtitle>
            <b-card-text>Card text</b-card-text>
            <b-card-link>Card link</b-card-link>
        </b-card>
        <h3>Header with nav</h3>
        <div>
            b-nav 的使用请参考 <a href="Demo-Base-b-nav">b-nav</a>
            <br />
            请勿加入 dropdown，这会对辅助技术用户不友好
        </div>
        <div class="row mx-1">
            <b-card>
                <template #header><b-nav class="card-header-tabs" :list="nav" tabs /></template>
                <b-card-subtitle>Card Subtitle</b-card-subtitle>
                <b-card-text>Card text</b-card-text>
                <b-card-link href="#">Card link</b-card-link>
            </b-card>
            <div class="col-1" />
            <b-card>
                <template #header><b-nav class="card-header-pills" :list="list" pills /></template>
                <b-card-subtitle>Card Subtitle</b-card-subtitle>
                <b-card-text>Card text</b-card-text>
                <b-card-link href="#">Card link</b-card-link>
            </b-card>
        </div>
        <h3>Body(default)</h3>
        <b-card>
            <template #header><b-card-title>Card Title</b-card-title></template>
            <b-card-body><b-card-text>Card Body</b-card-text></b-card-body>
        </b-card>
        <h3>Footer</h3>
        <div class="row mx-1">
            <div class="col-1" />
        </div>
        <b-card>
            <template #header><b-card-title>Card Title</b-card-title></template>
            <b-card-title>Card Title</b-card-title>
            <b-card-subtitle>Card Subtitle</b-card-subtitle>
            <b-card-text>Card text</b-card-text>
            <template #footer><b-card-text>Card Footer</b-card-text></template>
        </b-card>
        <h3>Card Group</h3>
        <b-card-group>
            <b-card>
                <b-card-title>Card One</b-card-title>
                <b-card-subtitle>Card Subtitle</b-card-subtitle>
                <b-card-text>Card text</b-card-text>
            </b-card>
            <b-card>
                <template #header><b-card-title>Card Two</b-card-title></template>
                <b-card-subtitle>Card Subtitle</b-card-subtitle>
                <b-card-text>Card text</b-card-text>
            </b-card>
        </b-card-group>
        <h3>Card Deck</h3>
        <b-card-deck>
            <b-card>
                <b-card-title>Card One</b-card-title>
                <b-card-subtitle>Card Subtitle</b-card-subtitle>
                <b-card-text>Card text</b-card-text>
            </b-card>
            <b-card>
                <template #header><b-card-title>Card Two</b-card-title></template>
                <b-card-subtitle>Card Subtitle</b-card-subtitle>
                <b-card-text>Card text</b-card-text>
            </b-card>
        </b-card-deck>
        <h3>Card Columns</h3>
        <b-card-columns>
            <b-card>
                <b-card-title>Card One</b-card-title>
                <b-card-subtitle>Card Subtitle</b-card-subtitle>
                <b-card-text>Card text</b-card-text>
            </b-card>
            <b-card>
                <template #header><b-card-title>Card Two</b-card-title></template>
                <b-card-subtitle>Card Subtitle</b-card-subtitle>
                <b-card-text>Card text</b-card-text>
            </b-card>
            <b-card>
                <template #header><b-card-title>Card Thewe</b-card-title></template>
                <b-card-subtitle>Card Subtitle</b-card-subtitle>
                <b-card-text>Card text</b-card-text>
                <b-card-text>Card text</b-card-text>
                <b-card-text>Card text</b-card-text>
                <b-card-text>Card text</b-card-text>
                <b-card-text>Card text</b-card-text>
            </b-card>
            <b-card>
                <b-card-title>Card Four</b-card-title>
                <b-card-subtitle>Card Subtitle</b-card-subtitle>
                <b-card-text>Card text</b-card-text>
            </b-card>
            <b-card>
                <template #header><b-card-title>Card Five</b-card-title></template>
                <b-card-subtitle>Card Subtitle</b-card-subtitle>
                <b-card-text>Card text</b-card-text>
            </b-card>
            <b-card>
                <b-card-title>Card Six</b-card-title>
                <b-card-subtitle>Card Subtitle</b-card-subtitle>
                <b-card-text>Card text</b-card-text>
                <b-card-text>Card text</b-card-text>
                <b-card-text>Card text</b-card-text>
                <b-card-text>Card text</b-card-text>
                <b-card-text>Card text</b-card-text>
            </b-card>
            <b-card>
                <b-card-title>Card Seven</b-card-title>
                <b-card-subtitle>Card Subtitle</b-card-subtitle>
                <b-card-text>Card text</b-card-text>
                <b-card-text>Card text</b-card-text>
                <b-card-text>Card text</b-card-text>
            </b-card>
            <b-card>
                <template #header><b-card-title>Card Eight</b-card-title></template>
                <b-card-subtitle>Card Subtitle</b-card-subtitle>
                <b-card-text>Card text</b-card-text>
            </b-card>
            <b-card>
                <b-card-title>Card Nine</b-card-title>
                <b-card-subtitle>Card Subtitle</b-card-subtitle>
                <b-card-text>Card text</b-card-text>
                <b-card-text>Card text</b-card-text>
                <b-card-text>Card text</b-card-text>
            </b-card>
        </b-card-columns>
        <h3>Card with list</h3>
        b-list 的使用请参考 <a href="Demo-Base-b-list">b-list</a>
        <b-card>
            <template #card>
                <b-card-body>
                    <b-card-title>Card Nine</b-card-title>
                    <b-card-subtitle>Card Subtitle</b-card-subtitle>
                    <b-card-text>Card text</b-card-text>
                    <b-card-text>Card text</b-card-text>
                    <b-card-text>Card text</b-card-text>
                </b-card-body>
                <b-list :list="list" flush></b-list>
                <b-card-body>
                    <b-card-text>Card text</b-card-text>
                    <b-card-link>Card link</b-card-link>
                </b-card-body>
            </template>
        </b-card>
        
    </div>
</template>

<script>
import BCard from '@/components/base/Bootstrap/Card/b-card.vue'
import BCardTitle from '@/components/base/Bootstrap/Card/b-card-title.vue'
import BCardSubtitle from '@/components/base/Bootstrap/Card/b-card-subtitle.vue'
import BCardText from '@/components/base/Bootstrap/Card/b-card-text.vue'
import BCardLink from '@/components/base/Bootstrap/Card/b-card-link.vue'
import BCardGroup from '@/components/base/Bootstrap/Card/b-card-group.vue'
import BCardDeck from '@/components/base/Bootstrap/Card/b-card-deck.vue'
import BCardColumns from '@/components/base/Bootstrap/Card/b-card-columns.vue'
import BCardBody from '@/components/base/Bootstrap/Card/b-card-body.vue'

import BNav from '@/components/base/Bootstrap/Navigation/Nav/b-nav.vue'
import BList from '@/components/base/Bootstrap/List/b-list.vue'

export default {
    name: 'b-card-demo',
    components: { BCard, BCardTitle, BCardSubtitle, BCardText, BCardLink, BCardGroup, BCardDeck, BCardColumns, BCardBody, BNav, BList, },
    data () {
        return {
            nav: [
                {text: 'active href', href: "#", active: true,},
                {text: 'text1'},
                {text: 'text2', },
                {text: 'disabled text', disabled: true,},
            ],
            list: [
                {text: 'text1'},
                {text: 'text2', },
                {text: 'disabled', disabled: true,},
            ],
        }
    }
}
</script>