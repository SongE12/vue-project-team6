<template>
  <AllReadHistoryDetail />
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '~/store/admin'
import AllReadHistoryDetail from '../components/AllReadHistoryDetail.vue'

export default {
  components: {
    AllReadHistoryDetail
},
  computed: {
    ...mapStores(useAdminStore)
  }
}

</script>
