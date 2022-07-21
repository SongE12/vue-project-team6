<template>
  <div class="container">
    <div class="product">
      <p class="search_title">정보를 볼 제품을 클릭하세요!</p>
      <ul class="product-list">
        <li
          v-for="product in adminStore.products"
          :key="product.id"
          class="product-item"
          :productId="product.id"
        >
          <div
            class="product-image"
            :style="{ backgroundImage: `url(${product.thumbnail})` }"
            @click="clickDetail(`${product.id}`)"
          ></div>
          <div class="product-title">제품 ID : {{ product.id }}</div>
        </li>
      </ul>
    </div>

    <div class="detail">
      <div class="title">제품 이름: {{ adminStore.product.title }}</div>
      <div class="price">제품 가격: {{ adminStore.product.price }}</div>
      <div class="description">제품 설명: {{ adminStore.product.description }}</div>
      <div class="tags">제품 태그: {{ adminStore.product.tags }}</div>
      <div class="edit_info">
        <div class="edit_title">
          <p>이름</p>
          <input v-model="title" placeholder="edit_title" type="text" />
        </div>
        <div class="edit_description">
          <p>설명</p>
          <input v-model="description" placeholder="edit_description" type="text" />
        </div>
        <div class="edit_price">
          <p>가격</p>
          <input v-model="price" placeholder="price" type="text" />
        </div>
        <div class="edit_main_tag">
          <p>태그</p>
          <input v-model="tags[0]" placeholder="tags ( 장비, 소비, 펫 )" type="text" />
        </div>
        <div class="edit_sub_tag">
          <p>태그</p>
          <input v-model="tags[1]" placeholder="tags2 ( anything )" type="text" />
        </div>
        <div class="edit_id_tag">
          <p>ID</p>
          <input v-model="id" placeholder="id (필수 입력!)" type="text" />
        </div>
        <div class="file">
          <input type="file" @change="SelectImage" />
        </div>
        <button
          class="edit_button"
          @click="
            updateProduct({
              title,
              price,
              description,
              tags,
              id,
              thumbnailBase64,
            })
          "
        >
          수정하기
        </button>
      </div>
      <!-- <button @click="updateProduct({title, content, description, tags},id)">
      수정중
    </button> -->
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useAdminStore } from "../store/admin";

export default {
  data() {
    return {
      products: [],
      product: {},
      title: "",
      price: "",
      description: "",
      tags: [],
      id: "",
    };
  },
  computed: {
    ...mapStores(useAdminStore),
  },
  created() {
    this.adminStore.allReadProduct();
  },
  methods: {
    clickDetail(productId) {
      this.adminStore.oneReadProduct(productId);
    },
    updateProduct(item) {
      this.adminStore.editProduct(item);
    },
    SelectImage(event) {
      const { files } = event.target;
      for (const file of files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", (e) => {
          this.thumbnailBase64 = e.target.result;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #faebd7;
  margin: auto;
  width: 95%;
  height: 53vh;
  border-radius: 20px;
  .product {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .search_title {
      font-size: 18px;
      font-weight: 700;
      color: red;
    }
    .product-list {
      height: 50vh;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      overflow-y: scroll;
      .product-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 15px;
        width: 60%;
        .product-image {
          width: 80px;
          height: 80px;
          background-repeat: no-repeat;
          background-size: contain;
          cursor: pointer;
        }
        .product-title {
          padding-top: 10px;
          height: 20px;
          font-weight: bold;
        }
      }
    }
  }
  .detail {
    .title,
    .price,
    .tags,
    .description {
      font-weight: 700;
      margin-left: 10px;
    }
    .title {
      color: #2d9006;
    }
    .price {
      color: #08abb4;
    }
    .description {
      color: #845fa7;
    }
    .tags {
      color: #f6921d;
    }
    .edit_info {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
      .edit_title,
      .edit_description,
      .edit_price,
      .edit_main_tag,
      .edit_sub_tag,
      .edit_id_tag {
        width: 85%;
        font-size: 16px;
        font-weight: 700;
        display: flex;
        justify-content: space-around;
        align-items: center;
        input {
          height: 24px;
          border-radius: 4px;
          border: solid 1px #e1dfdf;
          width: 170px;
        }
      }
      .file {
        margin-top: 10px;
      }
      .edit_button {
        border: solid 3px #845fa7;
        border-radius: 5px;
        background-color: #845fa7;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        margin-top: 5px;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
