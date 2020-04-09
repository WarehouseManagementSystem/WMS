<template>
  <div class="container-xl p-0 bg-light" style="max-width:2000px;">
    <div class="row m-0">
      <div class="col-xl-9 col-md-12 p-0">
        <c-video />
        <div class="px-3">
          base info
        </div>
      </div>
      <div class="col-3 order-xl-1 order-md-2">playlist</div>
      <div class="col-xl-12 col-md-9 order-xl-2">info and athers</div>
    </div>
  </div>

</template>

<script>
import CVideo from '@/components/base/Content/Video/c-video.vue'

export default {
  name: 'c-video-player',
  components: { CVideo, },
  props: {
    playList: {
      type: Array,
      default: () => [],
    },
  },

}
</script>
