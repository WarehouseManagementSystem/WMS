<template>
    <div>
        <div class="nav-link"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <Avatar></Avatar>
        </div>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <span class="dropdown-item-text">User Info</span>
            <div class="card dropdown-item m-0" style="width: 18rem;">
                <Avatar></Avatar>
                <h5 class="card-title d-inline">User Name</h5>
                <p class="card-text text-wrap">Some quick example text.</p>
            </div>
            <div class="dropdown-divider"></div>
            <div class="card dropdown-item m-0">
                Setting
            </div>
            <div class="card dropdown-item m-0">
                sign Out
            </div>
        </div> 
    </div>
</template>

<script>
import Avatar from './avatar.vue'
export default {
    name: 'user-card',
    components: { Avatar, },
}
</script>

