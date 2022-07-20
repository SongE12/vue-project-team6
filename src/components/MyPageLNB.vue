<template>
  <div class="menu_list">
    <button 
      class="menu myinfo"
      :class="{ active: /^\/mypage\/.*userinfo/.test($route.fullPath) }"
      @click="$router.push(`/mypage/userinfo`)">
      내 정보
    </button>
    <button 
      class="menu account"
      :class="{ active: /^\/mypage\/account.*/.test($route.fullPath) }"
      @click="$router.push(`/mypage/accountlist`)">
      계좌
    </button>
    <button 
      class="menu purchase"
      :class="{ active: /^\/mypage\/purchaselist.*/.test($route.fullPath) }"
      @click="$router.push(`/mypage/purchaselist`)">
      구매 내역
    </button>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAccountStore } from '~/store/account'

export default {
  data() {
    return {
      buttonActive: false
    }
  }, 
  computed: {
    ...mapStores(useAccountStore)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.menu_list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: flex-start;
  width: 20%;
  height: 60vh;
  background-color: #F999B7;
  border-radius: 20px;
  margin-right: 5%;
  .menu {
    width: 70%;
    height: 10%;
    margin-top: 10%;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    border-radius: 5px;
    color: #fff;
    &.myinfo {
      background-color: #F6921D;
      border: solid 3px #F6921D;
      &:hover {
        border: solid 3px #FFE341;
      }
      &.active {
        border: solid 3px #FFE341;
      }
    }
    &.account {
      border: solid 3px #8EC976;
      background-color: #8EC976;
      &:hover {
        border: solid 3px #2d9006;
        }
      &.active {
        border: solid 3px #2d9006;
        }
    }
    &.purchase {
      border: solid 3px #83c1c4;
      background-color: #83c1c4;
    &:hover {
      border: solid 3px #08abb4;
        }
    &.active {
      border: solid 3px #08abb4;
        }
    }
  }
}
</style>
