<template>
  <div class="holder">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</template>
<style lang="scss">
$duration: 10s;
$ease: ease-in-out;
.holder {
  z-index: 3;
  width: 300px;
  height: 150px;
  position: absolute;
  .circle {
    border-radius: 100% 100% 0 0;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: bottom center;
  }
  @for $i from 1 through 16 {
    .circle:nth-child(#{$i}) {
      $size: 0;
      @if ($i > 1) {
        $size: 31px * ($i - 1);
        border: 13px solid black;
      } @else {
        $size: 25px;
        background: black;
      }
      border-bottom: none;
      border-radius: $size $size 0 0;
      width: $size;
      height: $size / 2;
      z-index: 16 - $i;
      animation: circle-#{$i} $duration infinite $ease;
    }
    @keyframes circle-#{$i} {
      0% {
        transform: translateX(-50%) rotate(0deg);
      }
      100% {
        transform: translateX(-50%) rotate(-($i * 360deg));
      }
    }
  }
}
</style>
