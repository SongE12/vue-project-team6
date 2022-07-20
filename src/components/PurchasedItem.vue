<template>
  <div
    v-if="!item.isCanceled"
    class="purchased-item">
    <div
      class="img"
      :style="{backgroundImage:`url(${item.product.thumbnail})`}">
    </div>
    <div class="item-data">
      <div class="title">
        제품: {{ item.product.title }}
      </div>
      <div class="price">
        가격: {{ item.product.price.toLocaleString('ko-KR') }}원
      </div>
      <div class="description">
        제품 설명: {{ item.product.description }}
      </div>
      <div class="actions">
        <button
          v-if="!item.done"
          class="btn confirm"
          @click="purchaseDecision(item.detailId)">
          구매확정
        </button>
        <button
          v-if="!item.done"
          class="btn cancel"
          @click="purchaseCancel(item.detailId)">
          구매취소
        </button>
        <button
          class="btn buy_list"
          @click="singlePurchasedData(item.detailId)">
          제품 구매 내역
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {useClientStore} from '~/store/client'
import { mapStores } from 'pinia'
export default {
  props:{
    item:{
      type:Object,
      required:false
    }
   
  },
  computed:{
    ...mapStores(useClientStore)
  },
  methods:{
   async purchaseDecision(detailId){
    await this.clientStore.purchaseDecision({detailId})
    await this.clientStore.allPurchasedList()
    alert('구매확정이 완료되었습니다 구매확정 이후에는 구매 취소를 할 수 없습니다!')
     this.$router.push('/store/everyitem')
    },
    async purchaseCancel(detailId){
      await this.clientStore.purchaseCancel({detailId})
      await this.clientStore.allPurchasedList()
      alert('구매취소가 완료되었습니다! 제품금액만큼 계좌에 환불처리됩니다!')
      this.$router.push('/mypage/accountlist')
    },
    async singlePurchasedData(detailId){
    await this.clientStore.singlePurchasedList({detailId})
    await this.clientStore.singlePurchasedItemPageData
    await this.$router.push(`/mypage/purchaselist/singlepurchaseditem/${detailId}`)
   }
  },
}
</script>

<style lang="scss" scoped>
  .purchased-item{
    width: 95%;
    height: 100%;
    padding-top:10px;
    padding-bottom: 10px;
    margin: auto;
    margin-top: 2%;
    background-color: #faebd7;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .img{
      width: 120px;
      height: 110px;
      border-radius: 5px;
      margin-left: 7px;
      margin-right: 7px;
      box-sizing: border-box;
      background-color: #808080;
      background-repeat: no-repeat;
      background-size: cover;
      background-position-x: 30%;
      background-position-y: 20%;
    }
    .item-data{
      width: 75%;
      height:100%;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-items:flex-start;
      div, .title, .price, .description{
        margin: 5px ;
        font-size: 14px;
        font-weight: 700;
      }
      .title {
        color: #2d9006;
      } 
      .price {
        color: #08abb4;
      } 
      .description {
        color: #845FA7;
        line-height: 20px;
      }
      .actions{
        .btn{
          margin-right: 10px;
          outline: none;
          border-radius: 8px;
          border: none;
          color: #fff;
          padding: 3px 10px;
          font-weight: 700;
          cursor: pointer;
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
        }
      }
    }
  }
</style>
