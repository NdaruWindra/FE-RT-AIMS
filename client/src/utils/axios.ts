import axios from 'axios'

export const customFetch = axios.create({
  // baseURL: 'https://be-rt-aims.vercel.app/api/v1',
  baseURL: 'http://localhost:3000/api/v1',
})
