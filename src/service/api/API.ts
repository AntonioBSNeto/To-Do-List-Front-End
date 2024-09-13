import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

const API = axios.create({
  baseURL: API_BASE_URL
})

API.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // caso haja uma solicitacao feita por um cliente com token expirado, ele e deslogado
    if (error?.response?.status === 401) {
      localStorage.setItem('isTokenExpired', '1')
    }
    throw error
  }
)

export default API