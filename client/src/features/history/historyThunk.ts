import { customFetch } from '@/utils/axios'

export async function getMyHistoryThunk(token: any, thunkAPI: any) {
  try {
    const response = await customFetch.get('/history/my-history', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error: any) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}
