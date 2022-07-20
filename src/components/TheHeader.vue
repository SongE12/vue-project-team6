<template>
  <div class="header">
    <img
      src="../HeaderImage/mapleIcon.png"
      alt="icon" 
      class="icon" />
    <RouterLink
      to="/loginHome">
      <img
        src="../HeaderImage/mapleLogo.png"
        alt="logo"
        class="logo" />
    </RouterLink>
    <div class="user">
      <RouterLink
        v-if="isSignin"
        class="logout"
        to="/"
        @click="signOut()">
        <span 
          class="material-icons"
          @click="cleanPurchasedList">
          logout
        </span>
      </RouterLink>
      <span class="material-icons">
        account_circle
      </span>
      <div class="user_name">
        {{ userInfo.displayName }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '~/store/user'

export default {
  computed: {
    ...mapState(useUserStore, ['isSignin', 'userInfo'])
  },
  methods: {
    ...mapActions(useUserStore, ['signOut']),
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FEE3EC;
  .icon {
    padding-left: 30px;
    width: 48px;
    height: 48px;
  }
  .logo {
    margin-left: 80px;
    cursor: pointer;
  }
  .user {
    display: flex;
    align-items: center;
    .material-icons {
      font-size: 30px;
    }
    .user_name {
      font-size: 20px;
      margin-right: 30px;
      margin-left: 10px;
    }
    .logout {
      span {
        width: 50px;
        height: 45px;
        margin-right: 10px;
        text-decoration: none;
        color: #000;
        text-align: center;
        line-height: 45px;
        &:hover {
          color: #F6921D;
        }
      }
    }
  }
}
</style>
