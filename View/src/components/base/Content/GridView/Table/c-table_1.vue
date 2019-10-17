<template>
    <div class="row m-0" data-name="tableContainer">
      <div class=" col-4 p-0" data-name="fixedTableContainer">
        <!-- headr -->
        <div class="p-0" data-name="fixedTableHeadr">
           <table class="table m-0" style="table-layout: fixed">
            <colgroup>
              <col width="58px;"  >
              <col width="15%">
              <col width="15%">
              <col width="25%">
              <col width="25%">
              <col width="20%">
            </colgroup>
            <thead class="thead-dark">
                <tr>
                <th rowspan="2" scope="col">#</th>
                <th colspan="5" scope="col">First</th>
              </tr>
              <tr>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
              </tr>
            </thead>
           </table>
        </div>
        <!-- body -->
        <div class="p-0 overflow-auto" style="height:300px; " ref="fixedTableBody" @scroll="scroll($event, 'fixedTableBody')">
          <table class="table table-striped table-hover m-0" style="table-layout: fixed">
            <colgroup>
              <col width="58px;">
              <col width="15%">
              <col width="15%">
              <col width="25%">
              <col width="25%">
              <col width="20%">
            </colgroup>
            <tbody>
              <tr>
                <td scope="row">1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Jacob</td>
                <td>ThorntonThorntonThorntonThorntonThornton</td>
                
              </tr>
              <tr>
                <td scope="row">2</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Jacob</td>
                <td >ThorntonThorntonThorntonThorntonThornton</td>
                
              </tr>
              <tr>
                <td scope="row">3</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Jacob</td>
                <td >ThorntonThorntonThorntonThorntonThornton</td>
                
              </tr>
              <tr>
                <td scope="row">4</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Jacob</td>
                <td >ThorntonThorntonThorntonThorntonThornton</td>
                
              </tr>
              <tr>
                <td scope="row">5</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Jacob</td>
                <td >ThorntonThorntonThorntonThorntonThornton</td>
                
              </tr>
              <tr>
                <td scope="row">6</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Jacob</td>
                <td >ThorntonThorntonThorntonThorntonThornton</td>
                
              </tr>
              <tr>
                <td scope="row">7</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Jacob</td>
                <td >ThorntonThorntonThorntonThorntonThornton</td>
                
              </tr>
              <tr>
                <td scope="row">8</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Jacob</td>
                <td >ThorntonThorntonThorntonThorntonThornton</td>
                
              </tr>
              <tr>
                <td scope="row">9</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Jacob</td>
                <td >ThorntonThorntonThorntonThorntonThornton</td>
                
              </tr>
              <tr>
                <td scope="row">10</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Jacob</td>
                <td >ThorntonThorntonThorntonThorntonThornton</td>
                
              </tr>
            </tbody>
          </table>
        </div>
        <!-- footer -->
        <div class="p-0" data-name="fixedTableFooter">
          <table class="table m-0" style="table-layout: fixed">
            <colgroup>
              <col width="58px">
              <col width="15%">
              <col width="15%">
              <col width="25%">
              <col width="25%">
              <col width="20%">
            </colgroup>
            <tfoot >
                <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      
    </div>
</template>

<script>
import util from '@/util/index.js'

export default {
    name: 'c-table',
    data () {
      return {
        xCoord: 0,
        yCoord: 0,
      }
    },
    mounted () {
      this.injectionHover(this.$refs.fixedTableBody.children[0].children[1], this.$refs.activeTableBody.children[0].children[1])
      this.injectionHover(this.$refs.activeTableBody.children[0].children[1], this.$refs.fixedTableBody.children[0].children[1])
    },
    methods: {
      injectionHover: function (dom1, dom2) {
        for (let i = 0; i < dom1.children.length; i++) {
          dom1.childNodes[i].addEventListener('mouseover', () => util.dom.addClass(dom2.children[i], 'hover'), false)
          dom1.childNodes[i].addEventListener('mouseout', () => util.dom.removeClass(dom2.children[i], 'hover'), false)
        }
      },
      scroll: function (elment, type) {
        if (!elment.target) return
        const e = elment.target
        let xCoord, yCoord = 0
        switch (type) {
          case 'fixedTableBody':
            yCoord = e.scrollTop
            break;
          case 'activeTableHeader':
            xCoord = e.scrollLeft
            break;
          case 'activeTableBody':
            xCoord = e.scrollLeft
            yCoord = e.scrollTop
            break;
          case 'activeTableFooter':
            xCoord = e.scrollLeft
            break;
        }
        this.syncScroll(xCoord, yCoord)
      },
      syncScroll: function (xCoord, yCoord) {
        if (this.$refs.fixedTableBody && Math.abs(yCoord) > 1) this.$refs.fixedTableBody.scrollTop = yCoord
        if (this.$refs.activeTableHeader && Math.abs(xCoord) > 1) this.$refs.activeTableHeader.scrollLeft = xCoord
        if (this.$refs.activeTableBody) {
          if (Math.abs(xCoord) > 1) this.$refs.activeTableBody.scrollLeft = xCoord
          if (Math.abs(yCoord) > 1) this.$refs.activeTableBody.scrollTop = yCoord
        }
        if (this.$refs.activeTableFooter && Math.abs(xCoord) > 1) this.$refs.activeTableFooter.scrollLeft = xCoord
      },
    },
}
</script>

<style scoped>
div { 
  -ms-overflow-style: none;
   overflow: -moz-scrollbars-none;
}
div::-webkit-scrollbar{
  width: 0; 
  height: 0;
}
tbody > tr.hover > td {
  background-color: #f5f5f5;
}
tr > td, tr > th {
  text-align: center;
  vertical-align: middle;
}
</style>