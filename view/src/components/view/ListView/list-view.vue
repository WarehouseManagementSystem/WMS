<template>
    <!-- 感谢 https://zhuanlan.zhihu.com/p/33280304 的启发 -->
    <div id="listview" class="border border-dark rounded w-100 h-100 p-1">
        <base-table></base-table>
    </div>
</template>
<script>
import BaseTable from '@/components/base/BaseTable/base-table.vue'

export default {
   name: 'list-view',
   components: {
       BaseTable,
   }
}
</script>

