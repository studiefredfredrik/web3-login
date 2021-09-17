<template>
  <div class="container">
    <div class="video-container">
      <video class="top-video" autoplay loop muted playsinline src="top-video.webm"></video>
    </div>

    <div class="header">JWT + WEB3</div>
    <div class="subsection">
      <div class="block">
        <div>Log in with wallet, </div>
        <div>A button / link</div>
      </div>
      <img class="arrow" src="arrow.png"/>
      <div class="block">
        <div>Some text</div>
        <div>A button / link</div>
      </div>
      <img class="arrow" src="arrow.png"/>
      <div class="block">
        <div>Some text</div>
        <div>A button / link</div>
      </div>
      <img class="arrow" src="arrow.png"/>
      <div class="block">
        <div>Some text</div>
        <div>A button / link</div>
      </div>
      <img class="arrow" src="arrow.png"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Frontpage",
  data(){
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style>

body{
  background-color: #4b19af;
  background-position: 0px 0px;
  background-size: auto;
  font-family: Silka, sans-serif;
  color: #cbcaf9;
  font-size: 16px;
  line-height: 180%;
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.container{
  opacity: 1;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(
      0deg) rotateY(
      0deg) rotateZ(
      0deg) skew(
      0deg,
      0deg);
  transform-style: preserve-3d;
  background-color: #4b19af;
}

.top-video{
  background-size: cover;
  background-position: 50% 50%;
  position: absolute;
  margin: auto;
  width: 100%;
  height: 100%;
  right: -100%;
  bottom: -100%;
  top: -100%;
  left: -100%;
  object-fit: cover;
  z-index: -100;
  display: inline-block;
  vertical-align: baseline;
  box-sizing: border-box;
}

.video-container{
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: auto;
  display: block;
  overflow: hidden;
  /* mix-blend-mode in combination with the parent element background color produces the filter effect*/
  mix-blend-mode: color-dodge;
  position: relative;
  height: 170px;
  color: white;
}

.header{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 0px;

  margin-bottom: 20px;
  font-family: Silka, sans-serif;
  color: #fff;
  font-size: 80px;
  line-height: 128%;
  font-weight: 200;
  z-index: 160;
}

.subsection{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.block{
 margin: auto;
}

.arrow{
  transform: rotate(180deg);
  height: 100px;
  margin: 10px auto;
}
</style>