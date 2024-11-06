import { IconType } from 'react-icons/lib'

export interface IUserState {
  id: number
  uuid: string
  username: string
  email: string
  password: string
  role: string
  refresh_token?: string
  id_history?: string
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
