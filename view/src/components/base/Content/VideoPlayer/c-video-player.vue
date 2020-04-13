<template>
  <div class="container-xl p-0" style="max-width:2000px;">
    <div class="row m-0">
      <div class="col-xl-8 col-md-12 mb-1 p-0">
        <c-video />
        <div class="px-3">
          base info
        </div>
        <div class="d-xl-block d-md-none px-3">info and athers1</div>
      </div>
      <div class="col-md-4 col-sm-12 order-xl-1 order-md-2 mb-1 overflow-auto">
        <!-- <c-video-list :list="list" /> -->
        <!-- <c-video-list-card :list="list" /> -->
        <c-video-selector class="w-100" total="950" />
      </div>
      <div class="d-xl-none d-md-block col-md-8 order-xl-2">info and athers2</div>
    </div>

  </div>

</template>

<script>
import CVideo from '@/components/base/Content/Video/c-video.vue'
// import CVideoList from '@/components/base/Content/VideoPlayer/Plugins/Playlist/list/list.vue'
// import CVideoListCard from '@/components/base/Content/VideoPlayer/Plugins/Playlist/ListCard/list-card.vue'
import CVideoSelector from '@/components/base/Content/VideoPlayer/Plugins/Playlist/Selector/selector.vue'

export default {
  name: 'c-video-player',
  components: { CVideo, CVideoSelector,  },
  data() {
    return {
      list: [
        {
          title: 'The title of this video',
          description: 'The description of this video',
          poster: {
            src: 'http://vjs.zencdn.net/v/oceans.png',
          }
        },
        {
          title: 'The title of this video',
          description: 'The description of this video',
          poster: {
            src: 'http://vjs.zencdn.net/v/oceans.png',
          }
        },
        {
          title: 'The title of this video',
          description: 'The description of this video',
          poster: {
            src: 'http://vjs.zencdn.net/v/oceans.png',
          }
        },
        {
          title: 'The title of this video',
          description: 'The description of this video',
          poster: {
            src: 'http://vjs.zencdn.net/v/oceans.png',
          }
        },
      ],
    }
  },
  props: {
    playList: {
      type: Array,
      default: () => [],
    },
  },

}
</script>
