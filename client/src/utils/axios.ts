import axios from 'axios'

export const customFecth = axios.create({
  baseURL: 'https://be-rt-aims.vercel.app/api/v1',
})
