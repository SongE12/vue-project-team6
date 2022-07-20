<template>
  <div class="add_list">
    <div class="title">
      <p>제품 이름</p>
      <input
        v-model="title"
        placeholder="title"
        type="text" />
    </div>
    <div class="description">
      <p>제품 설명</p>
      <input
        v-model="description"
        placeholder="description"    
        type="text" />
    </div>
    <div class="price">
      <p>제품 가격</p>
      <input
        v-model="price"
        placeholder="price"
        type="text" />
    </div>
    <div class="main_tag">
      <p>제품 태그</p>
      <input
        v-model="tags[0]"
        placeholder="tags ( 장비, 소비, 펫 )"
        type="text" />
    </div>
    <div class="sub_tag">
      <p>제품 태그</p>
      <input
        v-model="tags[1]"
        placeholder="tags2 ( anything )"
        type="text" />
    </div>
    <div class="file">
      <input
        type="file"
        placeholder="file"
        @change="SelectImage" />
    </div>
    <button
      class="add_button"
      @click="AddProd({
        title, description, price, tags, thumbnailBase64
      })">
      추가
    </button>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '~/store/admin'

export default {
  data() {
    return {
      product: {},
      title: '',
      price: '',
      description: '',
      tags: [],
      thumbnailBase64: ''
    }
  },
  computed: {
    ...mapStores(useAdminStore)
  },
  methods: {
    AddProd(item) {
      this.adminStore.AddProduct(item)
    },
    SelectImage(event) {
      const { files } = event.target
      for ( const file of files ) {
        const reader =  new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', e => {
          this.thumbnailBase64 = e.target.result
        })
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.add_list {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 85%;
  height: 50vh;
  margin: auto;
  border-radius: 20px;
  background-color: #faebd7;
  .title, .description, .price, .main_tag, .sub_tag {
    width: 85%;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 5%;
    margin-left: 20px;
    input {
      height: 24px;
      border-radius: 4px;
      border: solid 1px #e1dfdf;
      width: 200px;
    }
  }
  .file {
    margin-top: 10px;
  }
  .add_button {
    border: solid 3px #845FA7;
    border-radius: 5px;
    background-color: #845FA7;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    margin-top: 5px;
    &:hover {
      opacity: 0.7;
    }
  }
}


</style>
