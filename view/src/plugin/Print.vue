<template>
    <div>
        <header class="d-flex sticky-top shadow-sm bg-white d-print-none align-items-center justify-content-between mb-1 p-1">
            <font class=" text-danger">A4 纵向 | A3 横向向</font>
            <button type="button" class="btn btn-primary" size="sm" @click="print">Print</button>
        </header>
        <main>
            
            <div class="page landscape a4landscape">A A4 landscape page</div>
        </main>
    </div>
</template>

<script>
/**
 * 未 20191119
 * 使 cml
 * 用
 */
export default {
    name: 'PrintView',
    methods: {
        print: function () {
            window.print.portrait = false;
            window.focus(); // Required for IE
            window.print();
        }
    }
}
</script>

<style scoped>
/** 
* 感谢：
* 从HTML横向打印：https://stackoverflow.com/questions/138422/landscape-printing-from-html
* @page文档：https://developer.mozilla.org/en-US/docs/Web/CSS/@page/size
*/

/** 
* 首先将主体设置margin为0，
* 因为否则页边距将大于在打印对话框中设置的页边距。
* 还要设置background颜色以使页面可视化
* margin，border并且background是可视化页面所必需的。
*/
body {
  margin: 0;
  background: #CCCCCC;
}
/** 
* padding 必须设置为所需的打印边距。在打印对话框中，您必须设置相同的边距（在此示例中为10mm）
*/
div.page {
  margin: 10px auto;
  padding: 10mm;
  border: solid 1px black;
  overflow: hidden;
  break-after: always;
  page-break-after: always;
  background: white;
}
/** 
* A4页面的尺寸为210mm x 297mm。您需要从尺寸中减去打印边距。并设置页面内容的大小
* 使用276mm而不是277mm，因为不同的浏览器对页面的缩放略有不同。
* 因此，其中一些将在两页上打印277毫米高的内容。第二页将为空。使用276mm更安全
*/
div.a4portrait {
  width: 190mm;
  height: 276mm;
}
div.a4landscape {
  width: 276mm;
  height: 190mm;
}
/** 
* 不需要任何margin，border，padding，background在打印页面上，所以其删除
*/
@media print {
  @page {
    size: landscape
  }
  body {
    background: none;
    -ms-zoom: 1.665;
  }
  div.page {
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