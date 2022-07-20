<template>
  <div class="main">
    <img
      src="../assets/Yeti.webp"
      alt="YETI" />
    <div
      class="admin">
      이 곳은 관리자 페이지 입니다!
      <br />
      원하시는 작업을 왼쪽에서 선택해 주세요!
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  margin-top: 10px;
  width: 320px;
  height: 300px;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .admin {
    margin-top: 5%;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }
}
</style>
