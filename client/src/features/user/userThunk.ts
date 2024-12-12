import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from '@/components/ui/use-toast'
import {
  setAllUsers,
  setIsLoading,
  setProfile,
  setRemoveProfile,
} from './userSlice'
import { removeLocalStorage } from '@/utils/localStorage'

export const dataSlice = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
    credentials: 'include',
  }),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    //! SIGN UP ENDPOINT
    fetchSignUp: builder.mutation({
      query: (data: any) => ({
        url: `/user/sign-up`,
        method: 'POST',
        body: {
          username: data.name,
          email: data.email,
          password: data.password,
          role: 'user',
        },
      }),
      invalidatesTags: ['user'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true))
          const { data } = await queryFulfilled

          toast({ description: data.message, title: 'Success' })

          dispatch(setIsLoading(false))
        } catch (error: any) {
          toast({
            description: error.error?.data?.message,
            title: 'Error',
            variant: 'destructive',
          })
          dispatch(setIsLoading(false))
        }
      },
    }),

    //! SIGN IN ENDPOINT
    fetchSignIn: builder.mutation({
      query: (data: any) => ({
        url: `/user/sign-in`,
        method: 'POST',
        body: {
          email: data.email,
          password: data.password,
        },
      }),
      invalidatesTags: ['user'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true))
          const { data } = await queryFulfilled

          dispatch(setProfile(data))
          toast({ description: data.message, title: 'Success' })
          dispatch(setIsLoading(false))
        } catch (error: any) {
          toast({
            description: error.error?.data?.message,
            title: 'Error',
            variant: 'destructive',
          })
          dispatch(setIsLoading(false))
        }
      },
    }),

    //! SIGN IN GOOGLE ENDPOINT
    fetchSignInGoogle: builder.mutation({
      query: (access_token: any) => ({
        url: `/user/google/userinfo?accessToken=${access_token}`,
        method: 'GET',
      }),
      invalidatesTags: ['user'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true))
          const { data } = await queryFulfilled

          console.log(data)

          dispatch(setProfile(data))
          toast({ description: 'Login successful', title: 'Success' })
        } catch (error: any) {
          toast({
            description: error.error?.data?.message,
            title: 'Error',
            variant: 'destructive',
          })
        } finally {
          dispatch(setIsLoading(false))
        }
      },
    }),

    //! REFRESH ENDPOINT
    fetchRefreshToken: builder.mutation({
      query: (refreshToken: string | undefined) => ({
        url: `/user/refresh-token`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }),
      invalidatesTags: ['user'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true))
          const { data } = await queryFulfilled

          dispatch(setProfile(data))
          dispatch(setIsLoading(false))
        } catch (error: any) {
          removeLocalStorage('refreshToken')
          dispatch(setIsLoading(false))
        }
      },
    }),

    //! GET ALL USERS
    fetchAllUsers: builder.query({
      query: (refreshToken: string | undefined) => ({
        url: `/user`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }),
      providesTags: ['user'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true))
          const { data } = await queryFulfilled

          dispatch(setAllUsers(data))
          dispatch(setIsLoading(false))
        } catch (error: any) {
          toast({
            description: error.error?.data?.message,
            title: 'Error',
            variant: 'destructive',
          })
          dispatch(setIsLoading(false))
        }
      },
    }),

    //! SIGN OUT
    fetchSignOut: builder.mutation({
      query: (refreshToken: string | undefined) => ({
        url: `/user/sign-out`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }),
      invalidatesTags: ['user'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true))
          const { data } = await queryFulfilled

          dispatch(setRemoveProfile())
          toast({
            title: 'Success',
            description: data.message,
          })
          dispatch(setIsLoading(false))
        } catch (error: any) {
          toast({
            description: error.error?.data?.message,
            title: 'Error',
            variant: 'destructive',
          })
          dispatch(setIsLoading(false))
        }
      },
    }),

    //! UPDATE USER
    fetchUpdateUser: builder.mutation({
      query: (data: any) => ({
        url: `/user/update-user`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
        body: {
          username: data.username,
          newEmail: data.email,
          targetEmail: data.targetEmail,
        },
      }),
      invalidatesTags: ['user'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true))
          const { data } = await queryFulfilled
          

          toast({
            title: 'Success',
            description: data.message,
          })
          dispatch(setIsLoading(false))
        } catch (error: any) {

          console.log(error);
          
          toast({
            description: error.error?.data?.message,
            title: 'Error',
            variant: 'destructive',
          })
          dispatch(setIsLoading(false))
        }
      },
    }),

    //! SEND TOKEN TO EMAIL
    fetchSendTokenPassword: builder.mutation({
      query: (email: string) => ({
        url: `/user/forgetPassword`,
        method: 'POST',
        body: {
          email,
        },
      }),
      invalidatesTags: ['user'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true))
          const { data } = await queryFulfilled

          toast({
            title: 'Success',
            description: data.message,
          })
          dispatch(setIsLoading(false))
        } catch (error: any) {
          toast({
            description: error.error?.data?.message,
            title: 'Error',
            variant: 'destructive',
          })
          dispatch(setIsLoading(false))
        }
      },
    }),

    //! UPDATE PASSWORD WITH TOKEN
    fetchUpdatePassword: builder.mutation({
      query: (data: any) => ({
        url: `/user/resetPassword/${data.token}`,
        method: 'PATCH',
        body: {
          password: data.NewPassword,
          confirmPassword: data.ConfirmPassword,
        },
      }),
      invalidatesTags: ['user'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true))
          const { data } = await queryFulfilled

          toast({
            title: 'Success',
            description: data.message,
          })
          dispatch(setIsLoading(false))
        } catch (error: any) {
          toast({
            description: error.error?.data?.message,
            title: 'Error',
            variant: 'destructive',
          })
          dispatch(setIsLoading(false))
        }
      },
    }),

    //! UPDATE MY PASSWORD
    fetchUpdateMyPassword: builder.mutation({
      query: (data: any) => ({
        url: `/user/updateMyPassword`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
        body: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        },
      }),
      invalidatesTags: ['user'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true))
          const { data } = await queryFulfilled

          toast({
            title: 'Success',
            description: data.message,
          })
          dispatch(setIsLoading(false))
        } catch (error: any) {
          toast({
            description: error.error?.data?.message,
            title: 'Error',
            variant: 'destructive',
          })
          dispatch(setIsLoading(false))
        }
      },
    }),

    //! UPDATE MY PROFILE
    fetchUpdateMyProfile: builder.mutation({
      query: (data: any) => {
        const formData = new FormData()
        if (data.images) {
          formData.append('photo', data.images)
        }
        if (data.username) {
          formData.append('username', data.username)
        }
        if (data.email) {
          formData.append('email', data.email)
        }

        return {
          url: `/user/update-profile`,
          method: 'PATCH',
          body: formData,
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      },
      invalidatesTags: ['user'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true))
          const { data } = await queryFulfilled

          toast({
            title: 'Success',
            description: data.message,
          })
          dispatch(setIsLoading(false))
        } catch (error: any) {
          toast({
            description: error.error?.data?.message,
            title: 'Error',
            variant: 'destructive',
          })
          dispatch(setIsLoading(false))
        }
      },
    }),

    //! DELETE USER
    fetchDeleteUser: builder.mutation({
      query: ({ id, accessToken }: { id: string; accessToken?: string }) => ({
        url: `/user/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ['user'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true))
          const { data } = await queryFulfilled
          toast({
            title: 'Success',
            description: data.message,
          })

          dispatch(setIsLoading(false))
        } catch (error: any) {
          toast({
            title: 'Error',
            description: error.error?.data?.message,
            variant: 'destructive',
          })
          dispatch(setIsLoading(false))
        }
      },
    }),
  }),
})

export const {
  useFetchSignUpMutation,
  useFetchSignInMutation,
  useFetchRefreshTokenMutation,
  useFetchSignOutMutation,
  useFetchUpdateUserMutation,
  useFetchAllUsersQuery,
  useFetchSignInGoogleMutation,
  useFetchDeleteUserMutation,
  useFetchSendTokenPasswordMutation,
  useFetchUpdatePasswordMutation,
  useFetchUpdateMyPasswordMutation,
  useFetchUpdateMyProfileMutation,
} = dataSlice
