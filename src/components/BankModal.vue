<template>
  <div
    class="background">
    <div class="content">
      <div class="title">
        결제 할 계좌를 선택 해 주세요!
      </div>
      <div class="bank-select">
        <p
          v-show="accountStore.noneTitle"
          class="none-title">
          등록된 계좌가 없습니다
        </p>
        <label
          v-for="item in accountStore.list.accounts "
          :key="item.id">
          <input
            type="radio"
            name="account" 
            @click="selectedBankData(item)" />
          <span class="bank-name">은행명: {{ item.bankName }} / </span>
          <span class="account-number">계좌번호: {{ item.accountNumber }} / </span>
          <span class="balance">잔액: {{ item.balance.toLocaleString('ko-KR') }}원</span>
        </label>
      </div>
    </div>
    <div class="actions">
      <button
        class="confirm"
        @click="openProductModal">
        확인
      </button>
      <button
        class="cancel"
        @click="accountModalHandler">
        취소
      </button>
      <button
        class="add_account"
        @click="moveAccount">
        계좌등록
      </button>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import {useClientStore} from '~/store/client'
import {useAccountStore} from '~/store/account'


export default {
  computed:{
    ...mapStores(useClientStore, useAccountStore)  
  },
 async created(){
    await this.accountStore.readAccountList()
    await this.noneAction()
  },
  methods:{
    selectedBankData(data){
      this.accountStore.selectedBankData = data
    },
    openProductModal(){
      if(this.accountStore.selectedBankData === null){
        alert('금액을 지불할 계좌를 선택 해 주세요!')
        return
      }
      this.accountStore.isShow = !this.accountStore.isShow
      this.clientStore.isShow = !this.clientStore.isShow
    },
    accountModalHandler(){
      this.accountStore.isShow = !this.accountStore.isShow
      this.accountStore.selectedBankData = null
    },
    noneAction(){
      if(this.accountStore.list.accounts.length === 0){
        alert('등록된 계좌가 존재하지 않습니다 계좌를 등록해 주세요!')
      }
    },
    moveAccount(){
      this.accountStore.isShow = !this.accountStore.isShow
      this.$router.push('/mypage/accountlist')
    }
  },
}
</script>

<style lang="scss" scoped>
$width:580px;
.background{
  width: 100vw;
  height: 100vh;
  background-color:rgba(0,0,0,.5);
  position:fixed;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
    margin: 0;
  .content{
    width:$width;
    height:calc($width * 1/3);
     background-color: #F9C5D5;
    display: flex;
    flex-direction: column;
    border-radius: 8px 8px 0 0;
    box-sizing: border-box;
    position: relative;

    .title{
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      padding: 10px 0;
    }
    .bank-select{
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    box-sizing: border-box;
    background-color: #faebd7;
    height: 150px;
      .none-title{
        margin-top: 50px;
        text-align: center;
        font-size: 25px;
        font-weight: 700;
        color: rgba($color: #000, $alpha: .3);
      }
      label{
      margin: 10px 0;
      }
      .bank-name {
        color: #F6921D;
        margin-left: 5px;
        font-weight: 700;
      }
      .balance {
        color: #83c1c4;
        font-weight: 700;
      }
      .account-number {
        color: #8EC976;
        font-weight: 700;
      }
    }
  }
  .actions{
  width: $width;
  padding: 7px 0;
  background-color: #F9C5D5;
  border-radius:0 0 8px 8px;
  box-sizing: border-box;
  text-align: end;
  button{
    margin: 0 5px;
    padding: 0 30px;
    outline: none;
    color: #fff;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    &.confirm {
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
    &.add_account {
      background-color: #8EC976;
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
}
</style>
