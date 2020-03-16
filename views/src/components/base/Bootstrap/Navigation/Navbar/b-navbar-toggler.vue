<template>
    <button class="navbar-toggler" type="button" data-toggle="collapse" :data-target="'#' + target" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <slot><span class="navbar-toggler-icon"></span></slot>
    </button>
</template>

<script>
export default {
    name: 'b-navbar-toggler',
    props: {
        target: {
            type: String,
            required: true,
        },
    },
}
</script>