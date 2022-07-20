<template>
  <div class="background-img">
    <Container />
  </div>
</template>

<script>
import Container from '../components/Container.vue'

export default {
  components:{
    Container
  }
}
</script>

<style lang="scss" scoped>
.background-img {
  display:flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  background-position-y: 80%;
  background-repeat : no-repeat;
  background-size : cover;
  background-image: url('../assets/Store.png');
}
</style>
