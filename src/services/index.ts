import axios from 'axios'
import { getSession } from 'next-auth/react'

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/'
      : 'http://localhost:8000/',
})

// interceptor para adicionar token antes de realizar chamadas
api.interceptors.request.use(
  async (config: any) => {
    const session = await getSession()
    const token = session?.accessToken
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export default api
