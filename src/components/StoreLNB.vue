<template>
  <div class="category-btns">
    <button 
      :class="{ active: /^\/store\/.*everyitem/.test($route.fullPath) }"
      class="btn all"
      @click="$router.push(`/store/everyitem`)">
      전체보기
    </button>
    <button 
      :class="{ active: /^\/store\/.*equipment/.test($route.fullPath) }"
      class="btn equipment"
      @click="$router.push(`/store/equipment`)">
      장비
    </button>
    <button 
      to="consumption"
      :class="{ active: /^\/store\/.*consumption/.test($route.fullPath) }"
      class="btn consumption"
      @click="$router.push(`/store/consumption`)">
      소비
    </button>
    <button 
      :class="{ active: /^\/store\/.*pet/.test($route.fullPath) }"
      class="btn pet"
      @click="$router.push(`/store/pet`)">
      펫
    </button>
    <!-- <routerLink 
      to="everyitem"
      :class="{active: clientStore.selected === 'everyItem'}"
      class="btn all"
      @click="clientStore.selected = 'everyItem'">
      전체보기
    </routerLink>
    <routerLink 
      to="equipment"
      :class="{ active: clientStore.selected === 'equipment'}"
      class="btn equipment"
      @click="clientStore.selected='equipment'">
      장비
    </routerLink>
    <routerLink 
      to="consumption"
      :class="{ active: clientStore.selected === 'consumption' }"
      class="btn consumption"
      @click="clientStore.selected = 'consumption'">
      소비
    </routerLink>
    <routerLink 
      to="pet"
      :class="{ active: clientStore.selected === 'pet' }"
      class="btn pet"
      @click="clientStore.selected = 'pet'">
      펫
    </routerLink> -->
  </div>
</template>

<script>
import {mapStores} from 'pinia'
import { useClientStore } from '~/store/client'
export default {
  computed:{
    ...mapStores(useClientStore)
  },

}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
 .category-btns{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-self: flex-start;
      width: 12%;
      height: 60vh;
      background-color: #F999B7;
      border-radius: 20px;
      .btn{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70%;
        height: 10%;
        margin-top: 10%;
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
        border-radius: 5px;
        color: #fff;
        &.all {
          background-color: #845FA7;
          border: solid 3px #845FA7;
          &:hover {
            border: solid 3px #460f79;
          }
          &.active {
            border: solid 3px #460f79;
          }
        }
        &.equipment {
          background-color: #F6921D;
          border: solid 3px #F6921D;
          &:hover {
            border: solid 3px #FFE341;
          }
          &.active {
            border: solid 3px #FFE341;
          }
        }
        &.consumption {
          border: solid 3px #8EC976;
          background-color: #8EC976;
          &:hover {
            border: solid 3px #2d9006;
          }
          &.active {
            border: solid 3px #2d9006;
          }
        }
        &.pet {
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
