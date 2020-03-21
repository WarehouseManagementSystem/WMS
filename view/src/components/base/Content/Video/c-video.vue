<template>
    <video ref="videoPlayer" playsinline class="video-js vjs-default-skin">
        <!-- <source src="http://localhost:5000/名探偵コナン/【名探偵コナン】剧集/TV合集[日语＆国语＆粤语＆各种语][MKV＆MP4＆RMVB]/[国语＆粤语＆日语＆西班牙语＆加泰罗尼亚语]TV1-468[标清][MKV][无更新]/101-200/名侦探柯南150.mkv" type='video/x-matroska; codecs="theora, vorbis"' >
        <source src="http://localhost:5000/名探偵コナン/【名探偵コナン】剧集/TV合集[日语＆国语＆粤语＆各种语][MKV＆MP4＆RMVB]/[国语＆粤语＆日语＆西班牙语＆加泰罗尼亚语]TV1-468[标清][MKV][无更新]/101-200/名侦探柯南150.mkv" type='video/mp4' > -->
        <!-- <source src="http://192.168.0.107:5000/名探偵コナン/【名探偵コナン】剧集/TV合集[日语＆国语＆粤语＆各种语][MKV＆MP4＆RMVB]/最近剧集/2020/966%20大怪兽哥美拉vs假面超人（破）.mp4" type="video/mp4"> -->
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
import 'video.js/dist/video-js.css'
import videojs from 'video.js'

export default {
    name: 'c-video',
    data() {
        return {
            player: null,
            options: null,
        }
    },
    props: {
        // options: {
        //     type: Object,
        //     default() {
        //         return {};
        //     }
        // }
    },
    mounted () {
        /* eslint-disable */
        this.options = {
            bigPlayButton: true,
            textTrackDisplay: false,
            posterImage: true,
            errorDisplay: true,
            controls: true, 
            preload: "auto",
            autoplay: false, 
            controlBar: {
              children: { 
                playToggle: true,
                volumePanel: {
                  inline: false,
                },
                volumeMenuButton: true,
                currentTimeDisplay: true,
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                progressControl: true,
                subtitlesButton: true,
                pictureInPictureToggle: true,
                fullscreenToggle: true,
              },
            },
            userActions: {
              hotkeys: true,
            },
            preload: "metadata",
            playsinline: true,
            preloadTextTracks: false,
            playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
            poster: "http://vjs.zencdn.net/v/oceans.png",
            width: 346,
            sources: [
                { src: 'https://d2zihajmogu5jn.cloudfront.net/advanced-fmp4/master.m3u8', type: 'application/x-mpegURL' },
                
            ],
        }
        this.addTitleComponent()
        this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
          if (process.env.NODE_ENV === 'production') console.log('video ready')
        }).addChild('TitleBar', {text: 'The Title of The Video!'})
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose()
            this.player = null
        }
    },
    methods: {
      addTitleComponent: function () {
        // Get the Component base class from Video.js
        var Component = videojs.getComponent('Component');

        // The videojs.extend function is used to assist with inheritance. In
        // an ES6 environment, `class TitleBar extends Component` would work
        // identically.
        var TitleBar = videojs.extend(Component, {

          // The constructor of a component receives two arguments: the
          // player it will be associated with and an object of options.
          constructor: function(player, options) {

            // It is important to invoke the superclass before anything else, 
            // to get all the features of components out of the box!
            Component.apply(this, arguments);

            // If a `text` option was passed in, update the text content of 
            // the component.
            if (options.text) {
              this.updateTextContent(options.text);
            }
          },

          // The `createEl` function of a component creates its DOM element.
          createEl: function() {
            return videojs.dom.createEl('div', {

              // Prefixing classes of elements within a player with "vjs-" 
              // is a convention used in Video.js.
              className: 'vjs-title-bar'
            });
          },

          // This function could be called at any time to update the text 
          // contents of the component.
          updateTextContent: function(text) {

            // If no text was provided, default to "Title Unknown"
            if (typeof text !== 'string') {
              text = 'Title Unknown';
            }

            // Use Video.js utility DOM methods to manipulate the content
            // of the component's element.
            videojs.dom.emptyEl(this.el());
            videojs.dom.appendContent(this.el(), text);
          }
        });

        // Register the component with Video.js, so it can be used in players.
        videojs.registerComponent('TitleBar', TitleBar);
      }
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
.video-js /deep/ .vjs-menu-button .vjs-menu-content {
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
.video-js /deep/ .vjs-title-bar {
  /* IE8 - has no alpha support */
  background-color: $primary-background-color;
  /* Opacity: 1.0 = 100%, 0.0 = 0% */
  background-color: rgba($primary-background-color, 0.7);
  color: $primary-foreground-color;
  font-size: 1.5em;
  /*
    By default, do not show the title bar.
  */
  display: none;
  padding: .5em;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

/* 
  Only show the title bar after playback has begun (so as not to hide
  the big play button) and only when paused or when the user is 
  interacting with the player.
*/
.video-js.vjs-paused.vjs-has-started /deep/ .vjs-title-bar,
.video-js.vjs-user-active.vjs-has-started /deep/ .vjs-title-bar {
  display: block;
}

</style>