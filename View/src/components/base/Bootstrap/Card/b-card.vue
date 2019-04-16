<template>
    <div class="card" style="width: 18rem;">
        <card-header :target="target"><slot name="header"></slot></card-header>
        <div class="card-body"><slot></slot></div>
        <card-footer><slot name="footer"></slot></card-footer>
    </div>
</template>
<script>
import cardHeader from './b-card-header'
import cardFooter from './b-card-footer'

export default {
    name: 'b-card',
    components: {
        cardHeader,
        cardFooter,
    },
    
}
</script>
