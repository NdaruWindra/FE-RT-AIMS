import { customFecth } from '@/utils/axios'

export async function signupThunk(data: any, thunkAPI: any) {
  try {
    const response = await customFecth.post('/user/sign-up', {
      username: data.name,
      email: data.email,
      password: data.password,
      role: 'users', // soon dihapus
    })

    console.log(response.data)
    return response.data
  } catch (error: any) {
    console.log(error)

    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}

export async function signinThunk(data: any, thunkAPI: any) {
  try {
    const response = await customFecth.post('/user/sign-in', {
      email: data.email,
      password: data.password,
    })

    console.log(response.data)

    return response.data
  } catch (error: any) {
    console.log(error)

    return thunkAPI.rejectWithValue(error.response.data.message)
  }
}
