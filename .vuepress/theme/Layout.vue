<template>
  <div class="theme-container container">
    <Navbar />
    <div class="main-content">
      <Content/>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
export default {
  components: {Navbar}
}
</script>

<style>
@font-face {
  font-family: 'iconfont';  /* project id 1022466 */
  src: url('//at.alicdn.com/t/font_1022466_rwmb7fhmuun.eot');
  src: url('//at.alicdn.com/t/font_1022466_rwmb7fhmuun.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1022466_rwmb7fhmuun.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1022466_rwmb7fhmuun.woff') format('woff'),
  url('//at.alicdn.com/t/font_1022466_rwmb7fhmuun.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1022466_rwmb7fhmuun.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
body{margin:0;}
.main-content{margin: 10px auto;}
.content p{margin-bottom:0px!important;}
</style>

