<template>
    <div>
        <h2>box-accordion</h2>
        <hr>
        <div class="row pt-1">
            <font class="col-1">default</font>
            <div class="col-11 accordion">
                <box-accordion title="title">
                    content
                </box-accordion>
                <box-accordion title="title">
                    content
                </box-accordion>
            </div>
        </div>
        <div class="row pt-1">
            <font class="col-1">parent</font>
            <div class="col-11 accordion" id="accordion">
                <box-accordion title="title" parent="#accordion">
                    content
                </box-accordion>
                <box-accordion title="title" parent="#accordion">
                    content
                </box-accordion>
            </div>
        </div>
        
        <h2>box-accordion-list</h2>
        <hr>
        <div class="row pt-1">
            <font class="col-1">default</font>
            <box-accordion-list class="col-11" :list="list"></box-accordion-list>
        </div>
        <div class="row pt-1">
            <font class="col-1">parent</font>
            <box-accordion-list class="col-11" id="accordionList" :list="list" parent="#accordionList"></box-accordion-list>
        </div>
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
                { title: 'title one', content: 'content one', show: true},
                { title: 'title two', content: 'content two', },
                { title: 'title three', content: 'content three',},
            ],
        }
    },
}
</script>