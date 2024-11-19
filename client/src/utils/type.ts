import { IconType } from 'react-icons/lib'

export type TSingleHistory = {
  id_history: string
  title: string
  createdAt: string
  fileName: string
  date: string
}

export type TSingleUser = {
  id: string
  username: string
  email: string
  history?: string
  date: string
}

export type TSingleResult = {
  id_result: string
  transcript: string[]
  summary: string
}
export type TMessage = {
  status: 'Error' | 'Success' | ''
  text: string
}

export interface IUserState {
  allUser: TSingleUser[]
  paginationUser: {
    currentPage: number
    totalPage: number
  }
  id: string
  username: string
  email: string
  role: string
  accessToken?: string
  refreshToken?: string

  message: TMessage

  isAuthenticated: boolean
  isLoading: boolean
}

export interface IHistoryState {
  singleHistory: TSingleHistory
  allHistory: TSingleHistory[]

  message: TMessage

  paginationHistory: {
    currentPage: number
    totalPage: number
  }

  result: TSingleResult
  isLoading: boolean
}

export interface ISimpleStep {
  title: string
  description: string
  image: string
}

export interface IReview {
  icon: IconType
  name: string
  star: IconType
  totalStar: number
  description: string
  date: string
}

export interface IFaq {
  title: string
  description: string
}

export interface ISideBarLink {
  title: string
  routes: string
  icon: IconType
}

export interface ErrorPayload {
  message: string
}

export interface IDataFormSettingSelect {
  label: string
  placeholder: string
  selectItem: string[]
}
