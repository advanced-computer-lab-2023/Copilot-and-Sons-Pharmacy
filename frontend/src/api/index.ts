import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (e) => {
    return Promise.reject(e)
  }
)

api.interceptors.response.use(
  (r) => r,
  (e) => {
    if (e.response.data.type === 'TokenError') {
      localStorage.removeItem('token')
      window.location.href = '/'
    }

    return Promise.reject(e.response.data)
  }
)
