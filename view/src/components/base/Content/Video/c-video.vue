<template>
    <video ref="videoPlayer" class="video-js vjs-default-skin">
        <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="http://videojs.com/html5-video-support/" target="_blank">
                supports HTML5 video
            </a>
        </p>
    </video>
</template>

<script>
/**
 * video.js
 * https://videojs.com/
 * video.js option
 * https://docs.videojs.com/tutorial-options.html
 * VLC WebPlugin
 * http://localhost:8080/Demo-Content-c-video
* <video>
* https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video
* 视频和音频内容
* https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content
* Creating a cross-browser video player
* https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/cross_browser_video_player
* Adding captions and subtitles to HTML5 video
* https://developer.mozilla.org/zh-CN/docs/Web/Guide/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video
* Guide to media types and formats on the web
* https://developer.mozilla.org/zh-CN/docs/Web/Media/Formats
*/
// 不跟踪
window.HELP_IMPROVE_VIDEOJS = false
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import plugins from './plugins'

export default {
    name: 'c-video',
    data() {
        return {
            player: null,
            defaultOptions: {
              fluid: true,
              // liveui: true,
              controls: true,
              autoplay: false,
              responsive: true,
              playsinline: true,
              // LiveDisplay: true,
              posterImage: true,
              errorDisplay: true,
              bigPlayButton: true,
              // textTrackDisplay: false, // 字幕
              preloadTextTracks: false,
              techOrder: ["html5",],
              preload: "auto", // offeline 后可自动重新加载
              poster: "http://vjs.zencdn.net/v/oceans.png",
              playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
              controlBar: {
                volumePanel: {
                  inline: false
                }
              },
              userActions: {
                hotkeys: true,
              },
              html5: { hls: { withCredentials: false }},
              sources: [
                // {
                //   type: 'video/mp4',
                //   src: 'https://vjs.zencdn.net/v/oceans.mp4',
                // },
                // {
                //   type: 'video/webm',
                //   src: 'https://vjs.zencdn.net/v/oceans.webm'
                // },
                // {
                //   type: 'rtmp/mp4',
                //   src: 'rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov'
                // },
                // {
                //   withCredentials: false,
                //   type: 'application/x-mpegURL',
                //   src: 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'
                // },
                {
                  withCredentials: false,
                  type: "application/x-mpegURL",
                  src: "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8"
                },
                // {
                //   type: 'application/x-mpegURL',
                //   src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
                // },
                // {
                //   type: 'application/dash+xml',
                //   src: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd',
                // },
                // {
                //   type: 'application/x-mpegURL',
                //   src: 'https://d2zihajmogu5jn.cloudfront.net/advanced-fmp4/master.m3u8',
                // },
                // {
                //   type: "video/mp4",
                //   src: 'url.mkv',
                // },
                // { src: 'http://vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
                // { src: 'http://vjs.zencdn.net/v/oceans.webm', type: 'video/webm' },
                // { type: "video/mp4", src: 'url.mkv', },
                // { type: "video/webm", src: 'url.mkv', },
                // { type: 'video/x-matroska; codecs="theora, vorbis"', src: "url.mkv", },
              ],
            },
        }
    },
    props: {
        options: {
            type: Object,
            default: () => {},
        }
    },
    mounted () {
      plugins.title.init()
      plugins.mobileUi.init()

      this.player = videojs(this.$refs.videoPlayer, videojs.mergeOptions(this.defaultOptions, this.options))
      this.player.addChild('TitleBar', {text: 'The title of the video!'})
      this.player.mobileUi()
    },
    beforeDestroy () {
        if (this.player) {
          plugins.mobileUi.dispose()
          this.player.dispose()
          this.player = null
        }
    },
    methods: {

    }
}
</script>

<style scoped lang="scss">
/*
  Player Skin Designer for Video.js
  http://videojs.com

  To customize the player skin edit
  the CSS below. Click "details"
  below to add comments or questions.
  This file uses some SCSS. Learn more
  at http://sass-lang.com/guide)

  This designer can be linked to at:
  https://codepen.io/heff/pen/EarCt/left/?editors=010
*/

// The following are SCSS variables to automate some of the values.
// But don't feel limited by them. Change/replace whatever you want.

// The color of icons, text, and the big play button border.
// Try changing to #0f0
$primary-foreground-color: #fff; // #fff default

// The default color of control backgrounds is mostly black but with a little
// bit of blue so it can still be seen on all-black video frames, which are common.
// Try changing to #900
$primary-background-color: #2B333F;  // #2B333F default

// Try changing to true
$center-big-play-button: true; // true default

.video-js {
  max-width: 100%;

  /* The base font size controls the size of everything, not just text.
     All dimensions use em-based sizes so that the scale along with the font size.
     Try increasing it to 15px and see what happens. */
  font-size: 10px;

  /* The main font color changes the ICON COLORS as well as the text */
  color: $primary-foreground-color;
}

/* The "Big Play Button" is the play button that shows before the video plays.
   To center it set the align values to center and middle. The typical location
   of the button is the center, but there is trend towards moving it to a corner
   where it gets out of the way of valuable content in the poster image.*/
/* about /deep/
    vue-loader > 范围CSS > 深度选择器
    https://vue-loader.vuejs.org/guide/scoped-css.html#mixing-local-and-global-styles
    /deep/ 可以使带有 scoped 的 css 作用于子组件同时避免全样式局污染
*/
.vjs-default-skin /deep/ .vjs-big-play-button {
  /* The font size is what makes the big play button...big.
     All width/height values use ems, which are a multiple of the font size.
     If the .video-js font-size is 10px, then 3em equals 30px.*/
  font-size: 3em;

  /* We're using SCSS vars here because the values are used in multiple places.
     Now that font size is set, the following em values will be a multiple of the
     new font size. If the font-size is 3em (30px), then setting any of
     the following values to 3em would equal 30px. 3 * font-size. */
  $big-play-width: 3em;
  /* 1.5em = 45px default */
  $big-play-height: 1.5em;

  line-height: $big-play-height;
  height: $big-play-height;
  width: $big-play-width;

  /* 0.06666em = 2px default */
  border: 0.06666em solid $primary-foreground-color;
  /* 0.3em = 9px default */
  border-radius: 0.3em;

  @if $center-big-play-button {
    /* Align center */
    left: 50%;
    top: 50%;
    margin-left: -($big-play-width / 2);
    margin-top: -($big-play-height / 2);
  } @else {
    /* Align top left. 0.5em = 15px default */
    left: 0.5em;
    top: 0.5em;
  }
}

/* The default color of control backgrounds is mostly black but with a little
   bit of blue so it can still be seen on all-black video frames, which are common. */
.video-js /deep/ .vjs-control-bar,
.video-js /deep/ .vjs-big-play-button,
.video-js /deep/ .vjs-menu-button /deep/ .vjs-menu-content {
  /* IE8 - has no alpha support */
  background-color: $primary-background-color;
  /* Opacity: 1.0 = 100%, 0.0 = 0% */
  background-color: rgba($primary-background-color, 0.7);
}

// Make a slightly lighter version of the main background
// for the slider background.
$slider-bg-color: lighten($primary-background-color, 33%);

/* Slider - used for Volume bar and Progress bar */
.video-js /deep/ .vjs-slider {
  background-color: $slider-bg-color;
  background-color: rgba($slider-bg-color, 0.5);
}

/* The slider bar color is used for the progress bar and the volume bar
   (the first two can be removed after a fix that's coming) */
.video-js /deep/ .vjs-volume-level,
.video-js /deep/ .vjs-play-progress,
.video-js /deep/ .vjs-slider-bar {
  background: $primary-foreground-color;
}

/* The main progress bar also has a bar that shows how much has been loaded. */
.video-js /deep/ .vjs-load-progress {
  /* For IE8 we'll lighten the color */
  background: lighten($slider-bg-color, 25%);
  /* Otherwise we'll rely on stacked opacities */
  background: rgba($slider-bg-color, 0.5);
}

/* The load progress bar also has internal divs that represent
   smaller disconnected loaded time ranges */
.video-js /deep/ .vjs-load-progress div {
  /* For IE8 we'll lighten the color */
  background: lighten($slider-bg-color, 50%);
  /* Otherwise we'll rely on stacked opacities */
  background: rgba($slider-bg-color, 0.75);
}

.video-js /deep/ .vjs-time-control {
  padding: 1px;
  display: block;
}
.video-js /deep/ .vjs-remaining-time {
  padding: 1px;
  display: none;
}
.video-js /deep/ .vjs-time-divider {
  width: 3px;
  min-width: 3px;
  margin: auto;
  padding: auto 1px;
}

/* ------------------ Videojs Plugin ------------------ */
// title
.vjs-default-skin /deep/ .vjs-title-bar {
  /* IE8 - has no alpha support */
  background-color: $primary-background-color;
  /* Opacity: 1.0 = 100%, 0.0 = 0% */
  background-color: rgba($primary-background-color, 0.7);
  color: $primary-foreground-color;
  font-size: 1.5em;
  /*
    By default, do not show the title bar.
  */
  padding: .4em;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  visibility: hidden;
}
.vjs-default-skin.vjs-has-started /deep/ .vjs-title-bar {
  transition: top 0.3s;
}
.vjs-default-skin.vjs-has-started.vjs-playing.vjs-user-inactive /deep/ .vjs-title-bar {
  visibility: visible;
  top: -3em;
  opacity: 1;
}
/*
  Only show the title bar after playback has begun (so as not to hide
  the big play button) and only when paused or when the user is
  interacting with the player.
*/
.video-js.vjs-paused.vjs-has-started /deep/ .vjs-title-bar,
.video-js.vjs-user-active.vjs-has-started /deep/ .vjs-title-bar {
  visibility: visible;
}

// ---------------------------------------------------------------------

/*
  videojs-youtube-progress
  https://github.com/mente/videojs-youtube-progress
  https://github.com/mente/videojs-youtube-progress/blob/master/dist/videojs-youtube-progress.css
*/
.vjs-default-skin {
  overflow: hidden;
}
.vjs-default-skin.vjs-has-started /deep/ .vjs-control-bar {
  transition: bottom 0.3s;
}
.vjs-default-skin.vjs-has-started.vjs-playing.vjs-user-inactive /deep/ .vjs-control-bar {
  bottom: -3em;
  visibility: visible;
  opacity: 1;
}
.vjs-default-skin.vjs-using-native-controls /deep/ .vjs-control-bar,
.vjs-default-skin.vjs-controls-disabled /deep/ .vjs-control-bar,
.vjs-default-skin.vjs-error /deep/ .vjs-control-bar {
  visibility: hidden;
}

</style>
