<template>
  <div
    v-if="!singlePurchasedItemPageData"
    class="item-box">
    <div class="container">
      <div
        class="item-image"
        :style="{backgroundImage:`url(${clientStore.singlePurchasedItemPageData.product.thumbnail})`}">
      </div>
      <div class="item-data">
        <div class="bank-name">
          은행명: {{ clientStore.singlePurchasedItemPageData.account.bankName }}
        </div>
        <div class="bank-number">
          계좌번호: {{ clientStore.singlePurchasedItemPageData.account.accountNumber }}
        </div>
        <div class="item-title">
          제품명: {{ clientStore.singlePurchasedItemPageData.product.title }}
        </div>
        <div class="item-price">
          제품가격: {{ clientStore.singlePurchasedItemPageData.product.price.toLocaleString('ko-KR') }}원
        </div>
        <div class="item-description">
          제품설명: {{ clientStore.singlePurchasedItemPageData.product.description }}
        </div>
        <div class="actions">
          <button 
            v-if="!clientStore.singlePurchasedItemPageData.done"
            class="btn confirm"
            @click="purchaseDecision($route.params.id)">
            구매확정
          </button>        
          <button 
            v-if="!clientStore.singlePurchasedItemPageData.done"
            class="btn cancel"
            @click="purchaseCancel($route.params.id)">
            구매취소
          </button>
          <button 
            class="btn buy_list"
            @click="$router.push('/mypage/purchaselist')">
            전체구매 내역
          </button>           
          <button 
            class="btn move_store"
            @click="$router.push('/store/everyitem')">
            상점으로 이동
          </button>        
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useClientStore} from '~/store/client'
import {mapStores} from 'pinia'

export default {
  computed:{
    ...mapStores(useClientStore),
  },
  async created(){
    await this.clientStore.singlePurchasedList({detailId:this.$route.params.id})
    // await this.clientStore.singlePurchasedItemPageData
  },
  methods:{
  async purchaseDecision(detailId){
      await this.clientStore.purchaseDecision({detailId})
      alert('구매확정이 완료되었습니다 구매확정 이후에는 구매 취소를 할 수 없습니다!')
      this.$router.push('/store/everyitem')
    },
    async purchaseCancel(detailId){
      await this.clientStore.purchaseCancel({detailId})
      alert('구매취소가 완료되었습니다! 제품금액만큼 계좌에 환불처리됩니다!')
      this.$router.push('/mypage/accountlist')
    },
  }
}
</script>

<style lang="scss" scoped>
.item-box{
    position: relative;
    height: 100%;
    background-position-y: 92%;
    background-repeat : no-repeat;
    background-size : cover;
    background-image: url('../assets/MyPage.png');
    .container {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 20px;
      padding-bottom: 20px;
      background-color: #FEE3EC;
      top: 0;
      bottom: 0;
      right: 10%;
      margin: auto;
      width: 80%;
      height: 80%;
      border-radius: 20px;
      .item-image{
        width: 200px;
        height: 200px;
        background-size: cover;
        background-repeat: no-repeat;
        background-color: #808080;
        background-position-y:20%;  
        border-radius: 5px;
        margin: auto;
      }
      .item-data{
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content:center;
        .bank-name, .bank-number, .item-title, .item-price, .item-description {
          margin: 20px 10px;
          font-size: 20px;
          font-weight: 700;
        }
        .bank-name {
          color: #F6921D;
        }
        .bank-number {
          color: #8EC976;
        }
        .item-title{
          color: #2d9006;
        }
        .item-price {
          color: #08abb4;
        }
        .item-description {
          color: #845FA7;
          line-height: 25px;
        }
      .actions{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 20px;
        .btn{
          margin: 0 8px;
          outline: none;
          border: none;
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          padding: 5px 20px;
          font-weight: 700;
          &.confirm {
            background-color: #845FA7;
            &:hover {
              opacity: 0.7;
            }
          }
          &.cancel {
            background-color: #f83d3d;
            &:hover {
              opacity: 0.7;
            }
          }
          &.buy_list {
            background-color: #F6921D;
            &:hover {
              opacity: 0.7;
            }
          }
          &.move_store {
            background-color: #08abb4;
            &:hover {
              opacity: 0.7;
            }
          }
        }
      }
    }
  }
}
  
</style>
