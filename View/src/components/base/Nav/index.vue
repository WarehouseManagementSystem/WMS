<template>
    <div id=“dropdownMenuTooltip” class="popover" role="tooltip" hidden>
      <div class="arrow"></div>
      <h3 class="popover-header"></h3>
      <div class="popover-body">
         <nav id="nav">
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link class="nav-link" to="/about">{{ $t("nav.About") }}</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
</template>