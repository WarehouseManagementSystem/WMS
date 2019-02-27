<template>
    <!-- <div class="dropdown">
        <button class="btn btn-dark" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-bars"></i>
            menu
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div class="dropdown-item">Action</div>
            <div class="dropdown-item">Another action</div>
            <div class="dropdown-item">Something else here</div>
        </div>
    </div> -->
    <div>
        <a id="dropdownMenuButton" class="btn btn-dark" href="#" data-container="body" data-toggle="popover" data-placement="bottom" data-html="true" :data-content="content">
            <i class="fas fa-bars"></i>
            menu
        </a>
        <dropdownMenuTooltip id="popover-content-dropdownMenuButton"></dropdownMenuTooltip>
        
    </div>
</template>

<script>
import dropdownMenuTooltip from '@/components/base/Nav/index.vue'

// var popoverContent = document.getElementById('popover-content-dropdownMenuButton')
// var dropdownMenuButton = document.getElementById('dropdownMenuButton')
// dropdownMenuButton.setAttribute('data-content', popoverContent.innerText)

export default {
    name: 'dropdownMenuButton',
    components: {
        dropdownMenuTooltip,
    },
    props: {
        content: {
            type: String,
            default: dropdownMenuTooltip
        },
    },
};

// function show() {
//     return document.getElementById('popover-content-dropdownMenuButton').innerHTML
// }

</script>
