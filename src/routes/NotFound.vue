<template>
  <div class="background-image">
    <div class="container">
      <div class="admin_page">
        <img
          src="../assets/unknown.webp"
          alt="404 ERROR" />
        <p>
          404 ERROR
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.background-image {
  position: relative;
  height: 100%;
  background-position-y: 92%;
  background-repeat : no-repeat;
  background-size : cover;
  background-image: url('../assets/MyPage.png');
  .container {
    padding-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    .admin_page {
      background: rgb(255, 255, 255, 0.8);
      width: 60%;
      height: 75vh;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
        img {
          margin-top: 10px;
          width: 320px;
          height: 300px;
        }
        p {
          color: #460f79;
          font-size: 55px;
          font-weight: 700;
        }
    }
  }
}
</style>
