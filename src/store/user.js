import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../routes'

const { VITE_APIKEY, VITE_USERNAME } = import.meta.env

const authURL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/'
const headers = {
  'content-type': 'application/json',
  apikey: VITE_APIKEY,
  username: VITE_USERNAME,
}

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {
        displayName: '',
      },
      signinError: false,
      isSignin: false,
      isSignup: false,
      signUpError: '',
      signUpMsg: '',
      signModal: false,
      userModal: false,
      editErrorMsg: ''
    }
  },
  getters: {},
  actions: {
    async signIn(signObj) {
      try {
        const res = await axios({
          url: authURL + 'login',
          method: 'POST',
          headers,
          data: {
            email: signObj.email.trim(),
            password: signObj.password.trim(),
          }
        })
        const { user, accessToken } = await res.data
        window.sessionStorage.setItem('userName', user.displayName)
        window.sessionStorage.setItem('token', accessToken)
        this.userInfo = user
        this.isSignin = true
        this.signinError = false
        router.push('/loginHome')
      } catch {
        this.signinError = true
        this.isSignin = false
      }
    },
    async signOut() {
      const accessToken = window.sessionStorage.getItem('token')
      await axios({
        url: authURL + 'logout',
        method: 'POST',
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      })
      window.sessionStorage.removeItem('token', accessToken)
      window.sessionStorage.removeItem('userName')
      this.isSignin = false
      this.userInfo.displayName = 'Guest'
    },
    async signUp(signObj) {
      try {
        await axios({
          url: authURL + 'signup',
          method: 'POST',
          headers,
          data: {
            email: signObj.email.trim(),
            password: signObj.password.trim(),
            displayName: signObj.displayName.trim(),
            profileImgBase64: signObj.profileImgBase64,
          }
        })
        this.isSignup = true
        this.signUpMsg =
          '가입 성공! 아이디와 비밀번호를 확인하고 로그인 해주세요.'
        this.signModal = true
      } catch {
        this.isSignup = false
        if (
          signObj.email.trim() === '' ||
          !signObj.password.trim() ||
          !signObj.displayName.trim()
        ) {
          this.signUpError = '가입 실패! 필수 항목을 모두 입력해주세요.'
        } else if (signObj.password.trim().length < 8) {
          this.signUpError = '가입 실패! 비밀번호는 8자 이상으로 입력해주세요.'
        } else if (signObj.displayName.trim().length > 20) {
          this.signUpError = '가입 실패! 닉네임은 20자 이하로 입력해주세요.'
        } else {
          this.signUpError =
            '가입 실패! 이미 존재하는 아이디 입니다. 혹은 아이디 형식이 잘못되었습니다.'
        }
      }
    },
    errorReset() {
      this.signinError = false
      this.signUpMsg = ''
      this.signUpError = ''
    },
    async editUserInfo(userObj) {
      const accessToken = window.sessionStorage.getItem('token')
      try {
        const res = await axios({
          url: authURL + 'user',
          method: 'PUT',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            oldPassword: userObj.oldPassword.trim(),
            newPassword: userObj.newPassword.trim(),
            displayName: userObj.displayName.trim(),
            profileImgBase64: userObj.profileImgBase64,
          }
        })
        const user = await res.data
        this.editErrorMsg = ''
        this.userInfo.displayName = user.displayName
        this.userModal = true
      } catch {
        if (userObj.displayName.trim().length > 20) {
          this.editErrorMsg = '수정 실패! 닉네임은 20자 이하로 입력해주세요.'
        } else {
          this.editErrorMsg = '수정 실패! 비밀번호가 잘못되었습니다.'
        }
      }
    },
    editErrorReset() {
      this.editErrorMsg = ''
    },
    changeUserName() {
      if(window.sessionStorage.getItem('userName')) {
        this.userInfo.displayName = window.sessionStorage.getItem('userName')
        this.isSignin = true
      } else {
        this.userInfo.displayName = 'Guest'
        this.isSignin = false
      }
    },
    modalOff() {
      this.signModal = false
      this.userModal = false
     }
  },
})
