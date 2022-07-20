<template>
  <div class="container">
    <div class="header">
      <TheHeader />
    </div>
    <div class="main">
      <RouterView />
    </div>
    <div class="footer">
      <TheFooter />
    </div>
    
    <transition name="modal-animation">
      <ProductModal
        v-if="clientStore.isShow" 
        class="modal" />
    </transition>
    <transition name="modal-animation">
      <SignModal v-if="userStore.signModal" />
    </transition>
    <transition name="modal-animation">
      <UserInfoModal v-if="userStore.userModal" />
    </transition>
    <transition name="modal-animation">
      <BankModal
        v-if="accountStore.isShow"
        class="modal" />
    </transition>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
import SignModal from '~/components/SignModal.vue'
import UserInfoModal from '~/components/UserInfoModal.vue'
import ProductModal from '~/components/ProductModal.vue'
import BankModal from './components/BankModal.vue'
import { mapStores } from 'pinia'
import { useClientStore } from '~/store/client'
import { useUserStore } from '~/store/user'
import { useAccountStore } from './store/account'
export default {
  components: {
    TheHeader,
    TheFooter,
    SignModal,
    UserInfoModal,
    ProductModal,
    BankModal
  },  
  computed:{
    ...mapStores(useClientStore, useUserStore, useAccountStore),
  },
  created() {
    this.userStore.changeUserName()
  },
}
</script>


<style lang="scss" scoped>

.container {
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  .header {
    height: 64px;
    display: flex;
    align-items: center;
  }
  .main {
    flex-grow: 1;
  }
  .footer {
    height: 35px;
  }
}

.modal{
 transition: .7s;
}

.modal-animation-enter-from{
  opacity: 0;
 
}
.modal-animation-enter-to{
   opacity: 1;
 
}
.modal-animation-leave-active{
  opacity:0;
 
}

</style>
