<template>
  <div class="__container">
    <div class="LNB">
      <div class="nav nav-pill menu_list">
        <button 
          class="menu list"
          :class="{ active: /^\/admin\/.*allreadproduct/.test($route.fullPath) }"
          @click="$router.push(`/admin/allreadproduct`)">
          모든 제품 조회
        </button>
        <button 
          class="menu deal"
          :class="{ active: /^\/admin\/.*allreadhistory/.test($route.fullPath) }"
          @click="$router.push(`/admin/allreadhistory`)">
          모든 거래 내역 조회
        </button>
        <button 
          class="menu more_edit"
          :class="{ active: /^\/admin\/.*editproduct/.test($route.fullPath) }"
          @click="$router.push(`/admin/editproduct`)">
          제품 자세히 보기 및 수정
        </button>
        <button 
          class="menu add"
          :class="{ active: /^\/admin\/.*addproduct/.test($route.fullPath) }"
          @click="$router.push(`/admin/addproduct`)">
          제품 추가
        </button>
        <button 
          class="menu delete"
          :class="{ active: /^\/admin\/.*deleteproduct/.test($route.fullPath) }"
          @click="$router.push(`/admin/deleteproduct`)">
          제품 삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '~/store/admin'

export default {
  ...mapStores(useAdminStore)
}
</script>

<style lang="scss" scoped>

.__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  width: 20%;
  height: 60vh;
  background-color: #F999B7;
  border-radius: 20px;
  margin-right: 5%;
  .LNB {
    .nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-self: center;
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
        &.list {
          background-color: #F6921D;
          border: solid 3px #F6921D;
          &:hover {
            border: solid 3px #FFE341;
          }
          &.active {
            border: solid 3px #FFE341;
          }
        }
        &.deal {
          border: solid 3px #8EC976;
          background-color: #8EC976;
          &:hover {
            border: solid 3px #2d9006;
            }
          &.active {
            border: solid 3px #2d9006;
            }
        }
        &.more_edit {
          border: solid 3px #83c1c4;
          background-color: #83c1c4;
          &:hover {
            border: solid 3px #08abb4;
            }
          &.active {
            border: solid 3px #08abb4;
            }
        }
        &.add {
          border: solid 3px #845FA7;
          background-color: #845FA7;
          &:hover {
            border: solid 3px #460f79;
            }
          &.active {
            border: solid 3px #460f79;
            }
        }
        &.delete {
          border: solid 3px #f83d3d;
          background-color: #f83d3d;
          &:hover {
            border: solid 3px #a80a0a;
            }
          &.active {
            border: solid 3px #a80a0a;
            }
        }
      }
    }
  }
}
</style>
