<template>
  <div class="inner">
    <div class="profile">
      <img
        :src="profileImg"
        alt="profileImg" />
    </div>
    <p><span class="icon">Name: </span><span>{{ displayName }}</span></p>
    <p><span class="icon">E-Mail: </span><span>{{ email }}</span></p>
    <p>
      <button
        class="edit_userinfo"
        :class="{ active: /^\/mypage\/edituserinfo.*/.test($route.fullPath) }"
        @click="$router.push(`/mypage/edituserinfo`)">
        <button>
          내정보 수정하기
        </button>
      </button>
    </p>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useUserStore } from '~/store/user'
import { validateTokenUser } from '~/core'

export default { 
  data() {
    return {
      email: '',
      displayName: '',
      profileImg: ''
    }
  },
  mounted() {
    this.userRender()
  },
  methods: {
    ...mapActions(useUserStore, ['editErrorReset']),
    async userRender() {
      const user = await validateTokenUser()
      this.email = user.email
      this.displayName = user.displayName
      this.profileImg = user.profileImg
    },
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
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #fff;
  margin-bottom: 15px;
}
p {
  width: 80%;
  padding: 20px 0 20px 40px;
  font-size: 24px;
  font-weight: 700;
  .icon {
    margin-right: 30px;
  }
}
img {
  width: 50px;
  height: 50px;
}
button {
  margin: auto;
  border: none;
  background-color: #845FA7;
  border-radius: 50px;
  width: 400px;
  height: 50px;
  cursor: pointer;
  color: #fff;
  font-size: 24px;
  &:hover {
    opacity: .9;
  }
}
</style>
