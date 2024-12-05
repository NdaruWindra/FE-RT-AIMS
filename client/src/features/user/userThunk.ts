import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from '@/components/ui/use-toast'
import {
  setAllUsers,
  setIsLoading,
  setProfile,
  setRemoveProfile,
} from './userSlice'

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
          toast({
            description: error.error?.data?.message,
            title: 'Error',
            variant: 'destructive',
          })
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
  query: ({ id, accessToken }: { id: string; accessToken: string }) => ({
    url: `/user/${id}`, // Endpoint REST API untuk menghapus user berdasarkan ID
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`, // Token akses untuk otorisasi
    },
  }),
  invalidatesTags: ['user'], // Menyegarkan cache setelah operasi delete
  onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
    try {
      const { data } = await queryFulfilled;
      toast({
        title: 'Success',
        description: data.message, // Menampilkan pesan sukses
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.error?.data?.message, // Menampilkan pesan error
        variant: 'destructive',
      });
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
  useFetchDeleteUserMutation,
} = dataSlice
