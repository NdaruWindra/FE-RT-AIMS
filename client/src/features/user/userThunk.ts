import { customFetch } from '@/utils/axios'

export async function signupThunk(data: any, thunkAPI: any) {
  try {
    const response = await customFetch.post('/user/sign-up', {
      username: data.name,
      email: data.email,
      password: data.password,
      role: 'user', // soon dihapus
    })

    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}

export async function signinThunk(data: any, thunkAPI: any) {
  try {
    const response = await customFetch.post(
      '/user/sign-in',
      {
        email: data.email,
        password: data.password,
      },
      { withCredentials: true }
    )

    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}

export async function signoutThunk(refreshToken: string, thunkAPI: any) {
  try {
    const response = await customFetch.delete('/user/sign-out', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })

    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}

export async function refreshThunk(accessToken: string, thunkAPI: any) {
  try {
    const response = await customFetch.post(
      '/user/refresh-token',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      { withCredentials: true }
    )

    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}

export async function getAllUserThunk(token: any, thunkAPI: any) {
  try {
    const response = await customFetch.get('/user', {
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