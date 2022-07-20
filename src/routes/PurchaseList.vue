<template>
  <div class="purchase-list">
    <p 
      v-if="clientStore.purchasedList ===null || clientStore.purchasedList.length===0"
      class="null-text">
      구매내역이 존재하지 않습니다!
    </p>
    <PurchasedItem  
      v-for="item in clientStore.purchasedList"
      :key="item.detailId" 
      :item="item" />
  </div>
</template>

<script>
import {useClientStore} from '~/store/client'
import { mapStores } from 'pinia'
import PurchasedItem from '~/components/PurchasedItem.vue'
export default {
  components:{
    PurchasedItem
  },
   computed:{
    ...mapStores(useClientStore)
  },
  async created(){
    await this.clientStore.allPurchasedList()
  },
}
</script>

<style lang="scss" scoped>
.purchase-list{
  position: relative;
  .null-text{
    position: absolute;
    top: 200px;
    left:25%;
    font-weight: 700;
    font-size: 20px;
    color: #808080;
  }
}
</style>

