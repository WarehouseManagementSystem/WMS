<template>
    <div class="card" style="min-width: 18rem;">
        <card-header :target="target"><slot name="header"></slot></card-header>
        <card-body><slot></slot></card-body>
        <card-footer><slot name="footer"></slot></card-footer>
    </div>
</template>
<script>
import cardHeader from './b-card-header'
import cardBody from './b-card-body'
import cardFooter from './b-card-footer'

export default {
    name: 'b-card',
    components: {
        cardHeader,
        cardBody,
        cardFooter,
    },
    
}
</script>
