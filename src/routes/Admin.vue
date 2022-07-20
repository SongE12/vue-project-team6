<template>
  <div class="background-image">
    <div class="container">
      <div class="admin_page">
        <p>Admin Page</p>
        <div class="menu">
          <AdminLNB />
          <div class="content">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '~/store/admin'
import AdminLNB from '../components/AdminLNB.vue'

export default {
  components: {
    AdminLNB
  },
  data() {
    return {
      title: '',
      price: '',
      description: '',
      tags: '',
      thumbnail: ''
    }
  },
  computed: {
    ...mapStores(useAdminStore)
  }
}
</script>

<style scoped lang="scss">

.background-image {
  position: relative;
  height: 100%;
  background-position-y: 92%;
  background-repeat : no-repeat;
  background-size : cover;
  background-image: url('../assets/MyPage.png');
  .container {
    padding-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    .admin_page {
      background: rgb(255, 255, 255, 0.8);
      width: 60%;
      height: 75vh;
      border-radius: 20px;
      p {
        padding: 20px 0;
        font-size: 24px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .menu {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .content {
        width: 60%;
        height: 60vh;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        background-color: #F9C5D5;
        border-radius: 20px;
        overflow: auto;
      }
    }
  }
}


</style>
