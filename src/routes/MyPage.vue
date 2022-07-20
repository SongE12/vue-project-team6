<template>
  <div class="background-img">
    <div class="container">
      <div class="my_page">
        <p>My Page</p>
        <div class="menu">
          <MyPageLNB />
          <div class="menu_ui">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyPageLNB from '~/components/MyPageLNB.vue'

export default {
  components: {
    MyPageLNB
  }
}
</script>

<style lang="scss" scoped>
  .background-img {
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
      .my_page {
        width: 60%;
        height: 75vh;
        background: rgb(255, 255, 255, 0.8);
        border-radius: 20px;
        p {
          padding: 20px 0;
          font-size: 24px;
          font-weight: 700;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .menu {
          display: flex;
          justify-content: center;
          align-items: center;
          .menu_ui {
            width: 60%;
            height: 60vh;
            background-color: #F9C5D5;
            border-radius: 20px;
            overflow: auto;
          }
        }
      }
    }
  }
</style>
