<template>
  <div class="bg">
    <div class="inner">
      <div>
        <img
          src="../assets/login.png"
          alt="login" />
        <div class="id">
          <input
            v-model="email"
            placeholder="아이디 (이메일 주소)"
            type="text" />
        </div>
        <div class="pw">
          <input
            v-model="password"
            placeholder="패스워드"
            type="password"
            @keydown.enter="signIn({
              email,
              password
            })" />
        </div>
        <div class="checkID">
          <span
            v-if="signinError">
            아이디 또는 패스워드가 일치하지 않습니다.
          </span>
          <RouterLink
            class="join"
            to="/sign/signup"
            @click="errorReset()">
            회원가입
          </RouterLink>
        </div>
        <button
          class="login"
          @click="signIn({
            email,
            password
          })">
          로그인
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '~/store/user'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapState(useUserStore, ['signinError'])
  },  
  methods: {
    ...mapActions(useUserStore, ['signIn', 'errorReset']),
  }
}
</script>

<style lang="scss" scoped>
.bg {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  background-position-y: 80%;
  background-repeat : no-repeat;
  background-size : cover;
  background-image: url('../assets/Main.png');
}
.inner {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 10%;
  width: 800px;
  height: 400px; 
  background-color: #fff;
  opacity: .9;
  border-radius: 10px;
}
img {
  cursor: pointer;
  display: block;
  width: 110px;
  height: 110px;
  margin: auto;
}
.font {
  display: inline-block;
  width: 100px;
  font-size: 46px;
  line-height: 55px;
}
.id {
  margin-bottom: 10px;
}
.pw {
  margin-bottom: 10px;
}
input {
  padding: 10px;
  font-size: 20px;
  border: 3px solid #f5f5f5;
  border-radius: 10px;
  width: 600px;
  height: 50px;
  &:focus {
    outline: none;
    border: 3px solid rgba(131, 94, 166, .5);
  }
  &::placeholder {
    color: #cac7c7;
  }
}
.checkID {
  display: flex;
  justify-content: right;
  span {
  font-size: 18px;
  font-weight: bold;
  color: red;
  padding: 0 150px 0 5px;
  }
}
.join {
  width: 100px;
  font-size: 18px;
  padding-right: 10px;
  margin-bottom: 10px;
  color: #000;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: #845FA7;
  }
}
.login {
  margin-top: 6px;
  border: none;
  background-color: #845FA7;
  border-radius: 50px;
  width: 620px;
  height: 70px;
  cursor: pointer;
  color: #fff;
  font-size: 28px;
  &:hover {
    opacity: .9;
  }
}
</style>
