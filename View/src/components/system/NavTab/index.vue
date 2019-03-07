<template v-for="(index, item) in [2, 3, 4]" :key="index" v-if="item != index">
    <router-link class="btn btn-dark text-truncate" style="min-width:5rem;" to="/about" role="button">
        <i class="fas fa-times-circle text-secondary" @click="item == index"></i>
        <font class="px-1">一一一一一一一一一一</font>    
    </router-link>    
</template>

<script>
export default {
    name: 'NavTabs',
}
</script>
