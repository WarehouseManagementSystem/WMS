<template>
    <div>
        <c-video  />
    </div>

</template>

<script>
import CVideo from '@/components/base/Content/Video/c-video.vue'

export default {
    name: 'c-video-demo',
    components: {CVideo, },
    data: () => {
      return {
        opt: {
          sources: [


          ]
        },
      }
    }
}
</script>
