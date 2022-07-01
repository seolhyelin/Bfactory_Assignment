import { atom } from 'recoil'
import store from 'storejs'

export const imageState = atom({
  key: '#imageState',
  default: [],
})

export const setLocalStorage = (key, value) => {
  store.set(key, value)
}
