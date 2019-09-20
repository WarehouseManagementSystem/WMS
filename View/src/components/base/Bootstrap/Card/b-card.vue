<template>
    <div class="card">
        <slot name="card">
            <card-header><slot name="header"></slot></card-header>
            <card-body><slot></slot></card-body>
            <card-footer><slot name="footer"></slot></card-footer>
        </slot>
        
    </div>
</template>
<script>
import cardHeader from './b-card-header'
import cardBody from './b-card-body'
import cardFooter from './b-card-footer'

export default {
    name: 'b-card',
    components: { cardHeader, cardBody, cardFooter, },
    
}
</script>
