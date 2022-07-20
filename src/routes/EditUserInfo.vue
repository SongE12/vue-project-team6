<template>
  <div class="inner">
    <div class="name">
      <input
        v-model="displayName"
        placeholder="New 닉네임 (20자 이하)"
        type="text" />
    </div>
    <div class="old_pw">
      <input
        v-model="oldPassword"
        placeholder="현재 비밀번호"
        type="password" />
    </div>
    <div class="new_pw">
      <input
        v-model="newPassword"
        placeholder="New 비밀번호 (8자 이상)"
        type="password" />
    </div>
    <div>
      <input
        placeholder="프로필(임시)"
        type="file" 
        @change="selectFile" />
    </div>
    <div>
      <button
        class="check margin"
        @click="editUserInfo({
          oldPassword,
          newPassword,
          displayName,
          profileImgBase64
        })">
        확인
      </button>
      <button
        class="check" 
        @click="cancel()">
        취소
      </button>
    </div>
    <div class="msg">
      {{ editErrorMsg }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '~/store/user'

export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      displayName: '',
      profileImgBase64: ''
    }
  },
  computed: {
    ...mapState(useUserStore, ['editErrorMsg']),
  }, 
  methods: {
    ...mapActions(useUserStore, ['editUserInfo']),
    selectFile(event) {
      const reader = new FileReader()
      for(const file of event.target.files) {
        reader.readAsDataURL(file)
        reader.addEventListener('load', e => {
          this.profileImgBase64 = e.target.result
        })
      }
    },
    cancel() {
      this.$router.push('/mypage/userinfo')
    }
  }
}
</script>

<style lang="scss" scoped>
.inner {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
input {
  padding: 10px;
  font-size: 20px;
  border: 3px solid #f5f5f5;
  border-radius: 10px;
  width: 25vw;
  height: 30px;
  margin-bottom: 10px;
  &:focus {
    outline: none;
    border: 3px solid rgba(131, 94, 166, .5);
  }
  &::placeholder {
    color: #cac7c7;
  }
}
.margin {
  margin-right: 15px;
}
.check {
  margin-top: 6px;
  border: none;
  background-color: #845FA7;
  border-radius: 50px;
  width: 13vw;
  height: 50px;
  cursor: pointer;
  color: #fff;
  font-size: 28px;
  &:hover {
    opacity: .9;
  }
}
.msg {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: red;
}

</style>

