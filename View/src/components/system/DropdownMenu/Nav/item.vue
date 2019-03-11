<template>
    <!-- Nav Item template -->
    <li>
       <!-- 建议不多于十八个汉子，超出部分会被隐藏 -->
        <router-link class="list-group-item bg-light text-dark text-decoration-none" to="/System-About">
            <font class="text-truncate w-75 d-inline-block">{{ $t("nav.About") }}</font>
            <i class="fas fa-chevron-down w-25 text-right"></i>
        </router-link>
        <!-- <ul v-if="isFolder" v-show="open">
             <router-link class="list-group-item bg-light text-dark text-decoration-none" to="/System-About">
                <font class="text-truncate w-75 d-inline-block">{{ $t("nav.About") }}</font>
                <i class="fas fa-chevron-down w-25 text-right"></i>
            </router-link>
            <item
                class="NavItem"
                v-for="(item, index) in model.children"
                :key="index"
                :model="item" />
            <li class="add" @click="addChild">+</li>
        </ul> -->
    </li>
</template>

<script>
export default {
    name: 'DropdownMenuNavItem',
}
</script>
