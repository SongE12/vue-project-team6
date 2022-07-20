<template>
  <div class="main">
    <img
      src="../assets/pinkbin.png"
      alt="PINKBIN" />
    <div
      class="phrases">
      {{ displayName }}님 환영합니다!
      <br />
      원하시는 메뉴를 왼쪽에서 선택해 주세요!
    </div>
  </div>
</template>

<script>
import { validateTokenUser } from '~/core'

export default {
  data() {
    return {
      displayName: ''
    }
  },
   mounted() {
    this.userRender()
  },
  methods: {
    async userRender() {
      const user = await validateTokenUser()
      this.displayName = user.displayName
    }
  }
}

</script>

<style lang="scss" scoped>
img {
  margin-top: 10px;
  width: 320px;
  height: 300px;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .phrases {
    margin-top: 5%;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }
}
</style>
