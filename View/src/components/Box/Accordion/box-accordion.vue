<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h4 class="mb-0">{{ title }}</h4>
            <i v-if="isShow" class="fas fa-chevron-up mb-0" v-coll:[id].show="'#' + id" @click="isShow = false"></i>
            <i v-else class="fas fa-chevron-down collapsed mb-0" v-coll:[id]="'#' + id" @click="isShow = true"></i>
        </div>
        <div :id="id" class="collapse" :class="{ show: show }" >
            <div class="card-body">
                <slot>{{ content }}</slot>
            </div>
        </div>
    </div>
    
</template>

<script>
import util from '@/util/index.js'
import '@/components/base/Bootstrap/Collapse/v-collapse.js'

export default {
    name: 'box-accordion',
    data () {
        return {
            isShow: this.show
        }
    },
    props: {
        title: String,
        content: String,
        control: String,
        show: Boolean,
    },
    computed: {
        id: function () {
            return 'accordion-item-' + util.random.getRandomString()
        },
    }
}
</script>