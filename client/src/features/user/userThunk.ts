import { customFetch } from '@/utils/axios'

// Google Login Start
export async function googleStartThunk(thunkAPI: any) {
  try {
    const response = await customFetch.get('/user/google'); // Start Google login

    // Assuming the response contains the URL to redirect the user to Google for login
    const { url } = response.data;
    window.location.href = url; // Redirect to Google login

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
}

// Google Login Callback
export async function googleCallbackThunk(data: any, thunkAPI: any) {
  try {
    const response = await customFetch.get('/user/google/callback', {
      params: {
        code: data.code, // Authorization code returned by Google
        state: data.state, // Optional state parameter
      },
      withCredentials: true, // Ensure cookies are sent
    });

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
}

// Regular Sign-Up
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

// Regular Sign-In
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

// Sign-Out
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

// Refresh Token
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

// Get All Users
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

// Update User
export async function updateThunk(arg: { accessToken: string; data: any }, thunkAPI: any) {
  try {
    const { accessToken, data } = arg;
    const response = await customFetch.patch(
      '/user/update-user',
      {
        username: data.username,     // Username baru
        newEmail: data.newEmail,     // Email baru
        targetEmail: data.targetEmail, // Email lama (target)
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
}

// Delete User
export async function deleteUserThunk(
  id: string,
  thunkAPI: any
) {
  try {
    const { accessToken } = thunkAPI.getState().user; // Ambil token dari state
    const response = await customFetch.delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data; // Berhasil menghapus user
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to delete user');
  }
}

