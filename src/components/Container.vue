<template>
  <div class="container">
    <div class="search">
      <input
        ref="inputEl"
        placeholder="제품을 검색하세요!"
        class="search-bar"
        @input="clientStore.searchValue = $event.target.value"
        @keydown.enter="search" />
      <span 
        class="material-icons"
        @click="search">
        search
      </span>
    </div>

    <StoreLNB class="store-btn" />

    <div class="item-box">
      <routerView />
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import {useClientStore} from '~/store/client'
import { useAccountStore } from '~/store/account'
import { useAdminStore } from '~/store/admin'

import StoreLNB from './StoreLNB.vue'
export default {
  components:{
    StoreLNB
  },
  computed:{
    ...mapStores(useAdminStore, useClientStore, useAccountStore)
  },
  async created(){
    await this.clientStore.allReadProduct()
    await this.accountStore.readAccountList()
  },
  mounted(){
      this.$refs.inputEl.focus()
  },
  methods:{
   async search(){
      await this.clientStore.searchProduct({
        text:this.clientStore.searchValue,
      })
    
    this.clientStore.searchItem.length === 0 ? alert('해당 상품을 찾을 수 없습니다!') : this.$router.replace('/store/searchedproduct')
    this.$refs.inputEl.value = ''
    },
  },
}
</script>

<style lang="scss" scoped> 
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 90%;
  background: rgb(255, 255, 255, 0.8);
  position: relative;
  border-radius: 20px;
  .search{
    position: absolute;
    right: 5%;
    top: 15px;
    .search-bar{
      width: 200px;
      height: 30px;
      outline: none;
      border-radius: 8px;
      border: 1px solid ;
      padding: 2px 5px;
      box-sizing: border-box;
    }
    .material-icons {
      position: absolute; 
      cursor: pointer;
      right: 5px;
      top: 3px;
    }
  }
  .store-btn{
    width: 12%;
    height: 60vh;
    margin-right: 20px;
  }
  .item-box{
    width: 80%;
    height: 60vh;
    overflow-y:scroll;
    border-radius: 20px;
  }
}
</style>
