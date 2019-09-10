<template>
    <article>
        <header class="px-2">
            <slot v-if="$slots.header" name="header"></slot>
            <div v-else>
                <h1 class="pb-1">}title</h1>
                <div>
                    <span>Author: author</span>
                    <br />
                    <span>Time: <time>time</time></span>
                </div>
            </div>
        </header>
        <article :class="{row: set != 'top'}">
            <b-nav v-if="['top', 'left'].includes(set)" :id="scrollspyId" :class="{'col-2': column}" column :list="contents" />
            <div v-if="$slots.default" :id="articleBoxId" class="overflow-auto mt-3" :class="{'col-10': column}" style="max-height: 800px;" :data-offset="offset" :data-target="'#' + scrollspyId" data-spy="scroll"><slot></slot></div>
            <b-nav v-if="set == 'right'" :id="scrollspyId" :class="{'col-2': column}" column :list="contents" />
        </article>
        <footer>
            <hr />
            <slot v-if="$slots.header" name="footer"></slot>
            <div class="p-2">
                <font>info</font>
            </div>
        </footer>
    </article>
    
</template>

<script>
import util from '@/util/index.js'

import BNav from './ScrollspyNav/b-scrollspy-nav'

export default {
    name: 'b-scrollspy',
    components: { BNav, },
    data () {
        return {
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
        offset: {
            type: [String, Number,],
            default: 0,
            validator: function (val) {
                return !isNaN(val) && Number(val) >= 0
            }
        },
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
                }
                else if (e.target > lastTarget) {
                    if (contents.length == 0) return
                    let a = array.filter(e => !e.added)
                    if (!a || !a.length) return
                    contents[contents.length - 1].children
                        ? this.getContents(a, contents[contents.length - 1].children, e.target)
                        : this.getContents(a, Object.assign(contents[contents.length - 1], {children: []}).children, e.target)
                } 
                
            })
            return contents
        },
        // getContents: function (arrs, contents = [], lastTarget = arrs[0].target || this.map.h1) {
        //     if (!arrs || !arrs.length) return
            
        //     contents = arrs.reduce((acc, cur) => {
        //         debugger
        //         if (cur.target == lastTarget) acc.push(this.HTarget2Content(cur))
        //         else if (cur.target > lastTarget) {
        //             acc[acc.length - 1].children
        //                 ? acc[acc.length - 1].children.push(...this.getContents([cur], [], cur.target))
        //                 : Object.assign(contents[contents.length - 1], {children: [...this.getContents([cur], [], cur.target) ]})
        //         } 
        //         // else if (e.target < lastTarget) {
        //         //     contents.push(this.getContents(arrs, contents))
        //         // }
        //         return acc
        //     }, contents)
        //     return contents
        // },
        HTarget2Content: function (e) {
            return {text: e.text, href: `#${e.id}`}
        }
    }

}
</script>