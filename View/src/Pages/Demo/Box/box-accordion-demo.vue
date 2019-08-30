<template>
    <div>
        <h2>box-accordion</h2>
        <hr>
        <div class="accordion" id="accordionExample">
            <box-accordion title="title">
                content
            </box-accordion>
            <box-accordion title="title">
                content
            </box-accordion>
        </div>
        <h2>box-accordion-list</h2>
        <hr>
        <box-accordion-list :list="list"></box-accordion-list>
        
    </div>
</template>

<script>
import BoxAccordion from '@/components/Box/Accordion/box-accordion.vue'
import BoxAccordionList from '@/components/Box/Accordion/box-accordion-list.vue'

export default {
    name: 'box-accordion-demo',
    components: { BoxAccordion, BoxAccordionList,},
    data () {
        return {
            list: [
                { title: 'title one', content: 'content one', show: true, },
                { title: 'title two', content: 'content two', show: true, },
                { title: 'title three', content: 'content three',},
            ],
        }
    },
}
</script>