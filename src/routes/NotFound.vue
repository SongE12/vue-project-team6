<template>
  <div class="container">
    <p class="text-404">
      해당 페이지를 찾을 수 없습니다!
    </p>
    <div class="image-404">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container{
  background-image: url('../BSE_imgs/test1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: 50%;
  position: relative;

  .text-404{
    font-size: 60px;
    font-weight: 700;

    color: pink;
    margin-top: 10%;
  }
  .image-404{
  background-image: url('../BSE_imgs/test2.webp');
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x:50%;
  border-radius: 50%;
  height:200px;
  width:200px;
  position: absolute;
  bottom: 7%;
  left: 35%;
  }
}
</style>
