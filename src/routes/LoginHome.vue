<template>
  <div class="background-img">
    <div class="welcome">
      <h2>{{ userInfo.displayName }}님</h2>
      <div>MapleStory Market에 오신 것을 환영합니다!</div>
    </div>
    <div class="select_container">
      <div class="user_in">
        <RouterLink
          to="/mypage"
          class="a">
          마이페이지
        </RouterLink>
      </div>
      <routerLink
        to="/store"
        class="search">
        <span class="material-icons">
          search
        </span>
        제품 검색
      </routerLink>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '~/store/user'

export default {
  computed: {
    ...mapState(useUserStore, ['userInfo'])
  },  
}
</script>

<style lang="scss" scoped>
  .background-img {
    position: relative;
    height: 100%;
    background-position-y: 80%;
    background-repeat : no-repeat;
    background-size : cover;
    background-image: url('../assets/Main.png');
    .welcome {
      padding-top: 30px;
      font-size: 24px;
      font-weight: bold;
      width: 500px;
      margin: 0 auto;
      h2 {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
      }
    }
    .select_container {
      padding-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      .user_in, .search {
        width: 320px;
        height: 320px;
        background-color: white;
        border-radius: 20px;
        cursor: pointer;
        font-size: 24px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.8;
      }
      .user_in {
        margin-right: 5%;
      }
      .search {
        margin-left: 5%;
        text-decoration: none;
        color: #000;
      }
      .material-icons {
        font-size: 30px;
        margin-top: 5px;
      }
    }
  }
  .a {
    color: #000;
    text-decoration: none;
  }
</style>
