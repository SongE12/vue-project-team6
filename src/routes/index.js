import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'
import MyPage from './MyPage.vue'
import AccountList from './AccountList.vue'
import AccountAdd from './AccountAdd.vue'
import LoginHome from './LoginHome.vue'
import Test from './test.vue'
import Admin from './Admin.vue'
import AllReadProduct from './AllReadProduct.vue'
<<<<<<< HEAD
import Addproduct from './AddProduct.vue'
import AllReadHistory from './AllReadHistory.vue'
import EditProduct from './Editproduct.vue'
import ReadHistory from './ReadHistory.vue'

=======
import EditUserInfo from './EditUserInfo.vue'
>>>>>>> 8f63d082db79b066c6f45f48805de083b9bc22ef
import Store from './Store.vue'
import PurchaseList from './PurchaseList.vue'
import Detail from './Detail.vue'
import UserInfo from './UserInfo.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/mypage',
      component: MyPage,
      children: [
        {
          path: 'userinfo',
          component: UserInfo,
        },
        {
          path: 'accountlist',
          component: AccountList,
        },
        {
          path: 'accountadd',
          component: AccountAdd,
        },
        {
          path: 'purchaselist',
          component: PurchaseList,
        },
      ],
    },
    {
      path: '/admin',
      component: Admin,
<<<<<<< HEAD
      children: [
        {
          path: 'allreadproduct',
          component: AllReadProduct
        },
        {
          path: 'allreadhistory',
          component: AllReadHistory
        },
        {
          path: 'editproduct',
          component: EditProduct
        },
        {
          path: 'addproduct',
          component: Addproduct
        },
        {
          path: 'readhistory',
          component: ReadHistory
        }
      ]
=======
    },
    {
      path: '/admin/allreadproduct',
      component: AllReadProduct,
>>>>>>> 8f63d082db79b066c6f45f48805de083b9bc22ef
    },
    {
      path: '/loginHome',
      component: LoginHome,
      meta: {
        auth: true,
      },
    },
    {
      path: '/test',
      component: Test,
    },
    {
      path: '/store',
      component: Store,
    },
    {
      path: '/store/detail/:id',
      component: Detail,
    },
    {
      path: '/signin',
      component: SignIn,
    },
    {
      path: '/signup',
      component: SignUp,
    },
    {
      path: '/editUserInfo',
      component: EditUserInfo,
    },
  ],
})
