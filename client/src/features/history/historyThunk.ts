import { customFetch, customFetchAudio } from '@/utils/axios'

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

export async function getAllThunk(token: any, thunkAPI: any) {
  try {
    const response = await customFetch.get('/history', {
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

export async function uploadNewAudioThunk(data: any, thunkAPI: any) {
  try {
    const formData = new FormData()
    formData.append('file', data)

    const response = await customFetchAudio.post('/upload-audio/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error: any) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}

export async function createNewHistoryThunk(data: any, thunkAPI: any) {
  try {
    const response = await customFetch.post(
      '/result',
      {
        transcript: data?.transcript,
        summary: data?.summary,
        title: data?.title,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    )

    return response.data
  } catch (error: any) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}
