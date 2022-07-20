import { defineStore } from 'pinia'
import axios from 'axios'

const { VITE_APIKEY, VITE_USERNAME } = import.meta.env

const accountURL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account'
const headers = {
  'content-type': 'application/json',
  apikey: VITE_APIKEY,
  username: VITE_USERNAME,
}

export const useAccountStore = defineStore('account', {
  state() {
    return {
      list: [],
      banks: [],
      selectedBankData: null,
      isShow: false,
      noneTitle: true,
    }
  },
  getters: {},

  actions: {
    async selectBankList() {
      const bankList = await axios({
        url: accountURL + '/banks',
        method: 'GET',
        headers: {
          ...headers,
          Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
        },
      })
      this.banks = bankList.data
    },

    async readAccountList() {
      const accountList = await axios({
        url: accountURL,
        method: 'GET',
        headers: {
          ...headers,
          Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
        },
      })
      this.list = accountList.data
      this.list.accounts.length === 0
        ? (this.noneTitle = true)
        : (this.noneTitle = false)
    },
    async addAccountList(payload) {
      const { bankCode, accountNumber, phoneNumber, signature } = payload

      await axios({
        url: accountURL,
        method: 'POST',
        headers: {
          ...headers,
          Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
        },
        data: {
          bankCode,
          accountNumber,
          phoneNumber,
          signature,
        },
      })
    },
    async deleteAccount(accountIds, signature) {
      for (let i in accountIds) {
        await axios({
          url: accountURL,
          method: 'DELETE',
          headers: {
            ...headers,
            Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
          },
          data: {
            accountId: accountIds[i],
            signature,
          },
        })
      }
      this.readAccountList()
    },
  },
})
