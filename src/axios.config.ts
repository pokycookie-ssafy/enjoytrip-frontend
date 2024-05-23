import axios, { AxiosError } from 'axios'

export const api = axios.create({
  // baseURL: '/api',
  baseURL: 'http://192.168.203.106:8080/api',
  headers: {
    post: { 'Content-Type': 'application/json' },
  },
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const err = error as AxiosError
    console.log(err)
    console.log(error.response)
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem('auth')
      sessionStorage.removeItem('user')
      console.log('REMOVE SESSION!')
      return new Promise(() => {})
    }
    return Promise.reject(error)
  }
)
