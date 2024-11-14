import axios from 'axios'

export const customFetch = axios.create({
  baseURL: 'https://be-rt-aims.vercel.app/api/v1',
  // baseURL: 'http://localhost:3000/api/v1',
})

export const customFetchAudio = axios.create({
  baseURL: 'http://127.0.0.1:8000',
})
