<template>
<div class="list-group">
  <a v-for="(item, index) in list" :key="index" class="list-group-item list-group-item-action p-1">
    <div class="row no-gutters">
      <div class="col-5 align-self-center">
        <c-image
          :src="item.poster && (item.poster.list ? '' : item.poster.src || 'http://vjs.zencdn.net/v/oceans.png')"
          :list="item.poster && item.poster.list"
          alt="video poster"
          style="max-height: 100px" />
      </div>
      <div class="col-7 px-1">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="text-truncate mb-1">{{ item.title || 'Video Title' }}</h5>
          <small class="text-nowrap text-muted text-right">{{ item.uploadTime || '3 days ago' }}</small>
        </div>
        <slot>
          <small class="d-block text-left text-wrap text-muted text-decoration-none text-truncate mb-1 p-0" style="height: 3.2em">{{ item.description || 'Some descriptions with this video' }}</small>
          <small class="btn btn-link text-truncate text-muted px-0" style="max-width: 100%;">{{ item.uploader || 'uploader name and uploader link' }}</small>
        </slot>
      </div>
    </div>
  </a>
</div>
  <!-- <div class="card my-1 border-secondary">
      <div class="row no-gutters">
        <div class="col-5 align-self-center">
          <c-image src="http://vjs.zencdn.net/v/oceans.png" alt="video poster" class="card-img" style="height: 110px" />
        </div>
        <div class="col-7">
          <div class="card-body p-2">
            <p class="card-text text-wrap text-truncate m-0" style="height: 3em">This is a wider card with supporting text below as a natural .</p>
            <a class="card-text btn btn-link text-secondary border-0 text-decoration-none text-truncate m-0 p-0" style="max-width: 100%">
              3 mins ago
            </a>
            <p class="card-text text-truncate">
              <small class="text-muted"> 3 mins ago </small>
            </p>
          </div>
        </div>
      </div>
    </div> -->
</template>

<script>
import CImage from '@/components/base/Bootstrap/Image/c-image.vue'

export default {
  name: 'v-video-list-card',
  components: { CImage, },
  props: {
    list: {
      type: Array,
      default: () => {},
    },
  },
}
</script>
