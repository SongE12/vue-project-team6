import router from './index'
import { useUserStore } from '~/store/user'
import { validateTokenUser } from '~/core'


router.beforeEach(async to => {
  const userStore = useUserStore()

  if(to.meta.auth) {
    const user = await validateTokenUser()
    if (user.displayName === 'admin') {
      userStore.userInfo = user
      userStore.isSignin = true
      return '/admin'
    }
    if (user && user.email) {
      userStore.userInfo = user
      userStore.isSignin = true
      return true
    }
    return '/'
  }
  return true
})
