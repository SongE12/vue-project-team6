<template>
  <div class="background-img">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '~/store/user'

export default {
  data() {
      return {
          routerView: true
      }
  },
  computed: {
      ...mapState(useUserStore, ['userInfo'])
  },
  methods: {
      routerRink() {
          this.routerView = false
      }
  }
}
</script>

<style lang="scss" scoped>
  .background-img {
    position: relative;
    height: 100%;
    background-position-y: 80%;
    background-repeat : no-repeat;
    background-size : cover;
    background-image: url('../assets/Main.png');
  }
  .a {
    color: #000;
    text-decoration: none;
  }
</style>
