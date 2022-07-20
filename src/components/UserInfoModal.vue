<template>
  <div class="background">
    <div class="content">
      <div class="text">
        <p>수정이 완료되었습니다.</p>
      </div>
      <div class="actions">
        <RouterLink
          to="/mypage/userinfo"
          class="a">
          <button
            class="btn"
            @click="modalOff">
            확인
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '~/store/user'

export default {
  computed:{
    ...mapState(useUserStore, ['userModal'])
  },
  methods:{
     ...mapActions(useUserStore, ['modalOff']),
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
      display: flex;
      justify-content: center;
      align-items: center;
      background: #F9C5D5;
      width:95%;
      height:100px;
      border-radius: 8px 8px 0 0;
      position: relative;
      p{
        color: #fff;
        font-size: 20px;
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
          background: #845FA7;
          box-sizing: border-box;
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
          &:hover{
            opacity: 0.7;
          }
          .a {
            color: #fff;
            text-decoration: none;
          }
      }
    }
  }
}
</style>
