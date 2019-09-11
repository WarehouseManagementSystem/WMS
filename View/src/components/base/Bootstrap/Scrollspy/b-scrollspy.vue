<template>
    <article>
        <header class="mx-2">
            <slot v-if="$slots.header" name="header"></slot>
            <div v-else>
                <h1 class="pb-1">{{ title || 'Title' }}</h1>
                <div>
                    <span>Author: {{ author || 'Author' }}</span>
                    <br />
                    <span>Time: <time>{{ time || 'Time' }}</time></span>
                </div>
            </div>
        </header>
        <article class="border rounded m-1" :class="{row: set != 'top'}" style="max-height: 800px;">
            <b-scrollspy-nav v-if="set == 'top'" :id="scrollspyId" :set="set" :list="contents" />
            <b-scrollspy-nav v-if="set == 'left'" :id="scrollspyId" :set="set" :class="{'col-2': column}" column :list="contents" />
            <div v-show="showArtical && $slots.default" :id="articleBoxId" class="overflow-auto p-1" :class="{'col-10': column}" style="max-height: 730px;" data-offset="20" :data-target="'#' + scrollspyId" data-spy="scroll"><slot></slot></div>
            <b-scrollspy-nav v-if="set == 'right'" :id="scrollspyId" :set="set" :class="{'col-2': column}" column :list="contents" />
        </article>
        <footer>
            <slot v-if="$slots.header" name="footer"></slot>
            <div class="p-2">
                <font>info</font>
            </div>
        </footer>
    </article>
    
</template>

<script>
import util from '@/util/index.js'

import BScrollspyNav from './ScrollspyNav/b-scrollspy-nav'

export default {
    name: 'b-scrollspy',
    components: { BScrollspyNav, },
    data () {
        return {
            showArtical: false,
            contents: [],
            map: { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6, }
        }
    },
    props: {
        id: {
            type: String,
            default: function () {
                return util.random.getRandomString()
            }
        },
        set: {
            type: String,
            default: 'top',
            validator: function (val) {
                return ['top', 'left', 'right'].includes(val)
            },
        },
        title: String,
        author: String,
        time: [ Date, String, ],
    },
    computed: {
        column: function () {
            return this.set != 'top'
        },
        scrollspyId: function () {
            return 'Scrollspy-' + this.id
        },
        articleBoxId: function () {
            return 'Article-Box-' + this.id
        },
    },
    mounted () {
        const node = this.getArticleNode()
        const arrs = this.getHTarget(node)
        this.contents = this.getContents(arrs)
        // 目录计算完成后显示文章，否则无法完成目录与文章的联动
        setTimeout(() => {
            this.showArtical = true
        }, 100);
    },
    methods: {
        getArticleNode: function () {
            if (!this.$el.childNodes || !this.$el.childNodes[1]) return
            let childrenNodes = this.$el.childNodes[1].childNodes
            for (let i = 0; i < childrenNodes.length; i++) {
                if (childrenNodes[i].id && childrenNodes[i].id == this.articleBoxId) {
                    return childrenNodes[i]
                }
            }
            return
        },
        getHTarget: function (node) {
            if (!node) return
            let arrs = []
            for (let i = 0; i < node.childNodes.length; i++) {
                let e = node.childNodes[i]
                if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(e.tagName.toLowerCase())) {
                    e.id = this.addId2HTarget(e)
                    arrs.push({id: e.id, target: this.map[e.tagName.toLowerCase()], text: e.textContent})
                }
            }
            return arrs
        },
        addId2HTarget: function (arr) {
            return `${arr.tagName.toLowerCase()}-${arr.textContent}`
        },
        getContents: function (arrs, contents = [], lastTarget = arrs[0].target || this.map.h1) {
            if (!arrs || !arrs.length) return
            
            arrs.forEach((e, index, array) => {
                if (e.target == lastTarget) {
                    contents.push(this.HTarget2Content(e))
                    Object.assign(array[index], {added: true})
                    // array.splice(index, 1)
                } else if (e.target > lastTarget) {
                    if (this.set == 'top' || contents.length == 0) return
                    let a = []
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].target <= lastTarget && !array[i].added) break
                        if (array[i].target > lastTarget && !array[i].added) a.push(array[i])
                    }
                    if (!a || !a.length) return
                    contents[contents.length - 1].children
                        ? this.getContents(a, contents[contents.length - 1].children, e.target)
                        : this.getContents(a, Object.assign(contents[contents.length - 1], {children: []}).children, e.target)
                }
                
            })
            return contents
        },
        HTarget2Content: function (e) {
            return {text: e.text, href: `#${e.id}`}
        },
    },
    

}
</script>