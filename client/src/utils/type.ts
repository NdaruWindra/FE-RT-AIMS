import { IconType } from 'react-icons/lib'

export interface IUserState {
  id: string
  username: string
  email: string
  role: string
  accessToken?: string
  message?: string
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

// <li>
// <NavLink
//   to='/dashboard/history'
//   className={({ isActive }) =>
//     `group flex items-center rounded-lg p-2 ${
//       isActive
//         ? 'bg-colorPrimary text-white'
//         : 'text-textPrimary hover:bg-colorPrimary dark:text-primary'
//     }`
//   }
// >
//   <MdHistory />
//   <span className='ms-3 flex-1 whitespace-nowrap'>History</span>
// </NavLink>
// </li>
