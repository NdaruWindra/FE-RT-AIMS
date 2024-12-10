import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  setHistory,
  setIsLoading,
  setResults,
  setSingleHistory,
} from './historySlice'
import { toast } from '@/components/ui/use-toast'

export const historySlice = createApi({
  reducerPath: 'histories',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
  }),
  tagTypes: ['histories'],
  endpoints: (builder) => ({
    //! GET MY HISTORY
    getHistory: builder.query({
      query: (token: string | undefined) => ({
        url: `/history/my-history`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['histories'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true))

          const { data } = await queryFulfilled
          dispatch(setHistory(data))

          dispatch(setIsLoading(false))
        } catch (error) {
          toast({
            description: 'Error getting history',
            title: 'Error',
            variant: 'destructive',
          })
          dispatch(setIsLoading(false))
        }
      },
    }),

    //! CREATE NEW HISTORY
    postHistory: builder.mutation({
      query: (data: any) => ({
        url: `/result`,
        method: 'POST',
        body: {
          transcript: data.transcript,
          summary: data.summary,
          title: data.title,
        },
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: ['histories'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true))
          const { data } = await queryFulfilled

          toast({ description: data.message, title: 'Success' })
          dispatch(setIsLoading(false))
        } catch (error) {
          toast({
            description: 'Error creating new history',
            title: 'Error',
            variant: 'destructive',
          })
          dispatch(setIsLoading(false))
        }
      },
    }),

    //! UPLOAD NEW AUDIO
    uploadAudio: builder.mutation({
      query: (file: File) => {
        const formData = new FormData()
        formData.append('file', file)

        return {
          url: `http://127.0.0.1:8000/upload-audio`,
          method: 'POST',
          body: formData,
        }
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(setIsLoading(true))
        try {
          const { data } = await queryFulfilled

          dispatch(setResults(data))
          toast({
            description: 'Audio uploaded successfully!',
            title: 'Success',
          })
          dispatch(setIsLoading(false))
        } catch (error) {
          toast({
            description: 'Error transcript audio',
            title: 'Error',
            variant: 'destructive',
          })
          dispatch(setIsLoading(false))
        }
      },
    }),

    getAllHistory: builder.query({
      query: ({ data, token }) => ({
        url: `/history/all/${data.user_id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['histories'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data && data.id) {
            dispatch(setHistory(data));
          } else {
            console.error('Data tidak memiliki properti id yang diharapkan.');
          }
        } catch (error) {
          toast({
            description: 'Error fetching all histories',
            title: 'Error',
            variant: 'destructive',
          });
        }
      },
    }),
    
    


    //! DELETE (ADMIN)
    deleteHistory: builder.mutation({
      query: (data: any) => ({
        url: `/history/${data.history_id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      }),
      invalidatesTags: ['histories'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true))
          await queryFulfilled

          toast({
            description: 'Success delete history',
            title: 'Success',
          })
        } catch (error) {
          toast({
            description: 'Error fetching all histories',
            title: 'Error',
            variant: 'destructive',
          })
          dispatch(setIsLoading(false))
        }
      },
    }),

    //! GET ALL HISTORY (ADMIN)
    updateHistory: builder.mutation({
      query: (data: any) => ({
        url: `/history/${data.history_id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
        body: {
          title: data.title,
        },
      }),
      invalidatesTags: ['histories'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true))
          await queryFulfilled

          toast({
            description: 'Success update history',
            title: 'Success',
          })
        } catch (error) {
          toast({
            description: 'Error fetching all histories',
            title: 'Error',
            variant: 'destructive',
          })
          dispatch(setIsLoading(false))
        }
      },
    }),

    //! GET ALL HISTORY (ADMIN)
    getSingleHistory: builder.query({
      query: (data: any) => ({
        url: `/history/${data.idHistory}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(setIsLoading(true))
        try {
          const { data } = await queryFulfilled
          dispatch(setSingleHistory(data.data))
        } catch (error) {
          toast({
            description: 'Error fetching single histories',
            title: 'Error',
            variant: 'destructive',
          })
        } finally {
          dispatch(setIsLoading(false))
        }
      },
    }),
  }),
})

export const {
  usePostHistoryMutation,
  useUploadAudioMutation,
  useDeleteHistoryMutation,
  useUpdateHistoryMutation,
  useGetHistoryQuery,
  useGetSingleHistoryQuery,
  useGetAllHistoryQuery,
} = historySlice
