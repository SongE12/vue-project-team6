<template>
  <div class="background">
    <div class="content">
      <div class="text">
        <p>정말 구매하시겠습니까?</p>
      </div>
      <div class="actions">
        <button
          class="btn buy"
          @click="handler">
          구매
        </button>
        <button 
          class="btn cancel"
          @click="modalHandler">
          취소
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import {useClientStore} from '~/store/client'
import {useAccountStore} from '~/store/account'
import {useAdminStore} from '~/store/admin'
export default {
  computed:{
    ...mapStores(useClientStore, useAccountStore, useAdminStore)  
  },
  created(){
      this.accountStore.readAccountList()
  },
  methods:{
    async handler(){
      try{
        this.clientStore.productPurchase({
          id:this.accountStore.selectedBankData.id,
          price:this.accountStore.selectedBankData.balance
        })
        this.clientStore.modalHandler()
        await this.clientStore.allPurchasedList()
        this.$router.push('/mypage/purchaselist')
        this.accountStore.selectedBankData = null
    } catch{
        alert('로그인을 하지않았거나 등록된 계좌가 없습니다!')
        this.clientStore.modalHandler()
        this.$router.push('/')
    }     
    },
    modalHandler(){
      this.clientStore.modalHandler()
      this.accountStore.selectedBankData = null
    }
  },
}
</script>

<style lang="scss" scoped>
$width:450px;
.background{
  width: 100vw;
  height: 100vh;
  background-color:rgba(0,0,0,.5);
  position:fixed;
  display:flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
    margin: 0;
  .content{
    width:$width;
    height:calc($width * 1/3);
    background:#fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  
    .text{
      background: #F9C5D5;
      width:95%;
      height:100px;
      border-radius: 8px 8px 0 0;
      position: relative;
      p{
        color: #fff;
        font-size: 20px;
        position: absolute;
        top: 50%;
        left: 25%;
      }
    }
    .actions{
      width:95%;
      height:30px;
      background: #faebd7;
      border-radius: 0 0 8px 8px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn{
          margin: 0 8px;
          padding: 0 20px;
          outline: none;
          border: none;
          box-sizing: border-box;
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
          &.buy {
            background-color: #845FA7;
            &:hover {
              opacity: 0.7;
            }
          }
          &.cancel {
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
