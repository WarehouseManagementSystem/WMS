<template>
    <button v-show="icon && icon.length > 0" class='btn btn-outline-primary rounded-circle text-center ml-1'><i :class="icon" /></button>
</template>

<script>
export default {
    name: 'c-controller-button',
    props: {
        icon: String,
    }
}
</script>