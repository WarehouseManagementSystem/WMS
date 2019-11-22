<template>
    <div>
        <b-modal v-if="show" id="Print" title="Print" size="xl" :icon="icon.print" center hideFooter>
            <iframe src="/Plugin-Print" class=" border-0 w-100" style="height: 1000px" sandbox="allow-scripts" />
        </b-modal>
    </div>
   
</template>

<script>
/**
 * 未 20191119
 * 使 cml
 * 用
 */
import config from '@/config/index.js'
import BModal from '@/components/base/Bootstrap/Modal/b-modal.vue'

export default {
    name: 'b-print',
    components: { BModal, },
    props: {
        pURL: {
            type: String,
            default: window.location.href,
        },
        dom: HTMLDivElement,
        show: Boolean,
    },
    computed: {
        icon: function () {
            return config.ui.icon
        },
    },
    methods: {
        closePrint: function () {
            document.body.removeChild(this.__container__);
        },
        setPrint: function () {
            window.onbeforeunload = this.closePrint;
            window.onafterprint = this.closePrint;
            window.focus(); // Required for IE
            window.print();
        },
        // printPage: function () {
        //     var oHiddFrame = document.createElement("iframe");
        //     oHiddFrame.onload = this.setPrint;
        //     oHiddFrame.style.position = "fixed";
        //     oHiddFrame.style.right = "0";
        //     oHiddFrame.style.bottom = "0";
        //     oHiddFrame.style.width = "0";
        //     oHiddFrame.style.height = "0";
        //     oHiddFrame.style.border = "0";
        //     document.body.appendChild(oHiddFrame);
        // }
    },
    watch: {
        show: function (value) {
            this.$refs.wrap.write(value ? this.dom : null) 
        },
    }
}
</script>

<style scoped>
body {
    margin: 0;
    background: #CCCCCC;
}
div.portrait, div.landscape {
  margin: 10px auto;
  padding: 10mm;
  border: solid 1px black;
  overflow: hidden;
  page-break-after: always;
  background: white;
}
div.portrait {
  width: 190mm;
  height: 276mm;
}
div.landscape {
  width: 276mm;
  height: 190mm;
}
@media print {
  body {
    background: none;
    -ms-zoom: 1.665;
  }
  div.portrait, div.landscape {
    margin: 0;
    padding: 0;
    border: none;
    background: none;
  }
  div.landscape {
    transform: rotate(270deg) translate(-276mm, 0);
    transform-origin: 0 0;
  }
}
</style>