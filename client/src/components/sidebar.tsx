import { NavLink, useNavigate } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { useEffect, useRef, useState } from 'react'
import { sideBarLinks } from '@/utils/constant'
import { ISideBarLink } from '@/utils/type'
import { Button } from './custom/button'
import { imagetextIL } from '@/components/assets/images/index'
import { MdLogout } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { signout } from '@/features/user/userSlice'

export default function Sidebar() {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false)
  const asideRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { refreshToken } = useAppSelector(function (store) {
    return store.user
  })

  function handleSidebar(sidebar: boolean) {
    setOpenSidebar(sidebar)
  }

  function handleLogOut() {
    if (refreshToken) {
      dispatch(signout(refreshToken))
      navigate('/sign-in')
    }
  }

  useEffect(function () {
    function handleClickOutside(event: MouseEvent) {
      if (
        asideRef.current &&
        !asideRef.current.contains(event.target as Node)
      ) {
        setOpenSidebar(false)
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside)
    // Cleanup listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <Button
        type='button'
        variant={'ghost'}
        onClick={function () {
          handleSidebar(true)
        }}
        className='ms-3 inline-flex items-center rounded-lg p-2 text-sm  hover:bg-colorPrimary hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
      >
        <FiMenu className='h-6 w-6' />
      </Button>
      <aside
        ref={asideRef}
        className={`fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform md:translate-x-0 ${openSidebar ? 'translate-x-0' : '-translate-x-full'} `}
      >
        <div className=' flex h-full flex-col items-start justify-between overflow-y-auto bg-colorPrimary px-3 py-10 dark:bg-gray-800'>
          <div>
            <img src={imagetextIL} alt='Infinite Learning Logo' />

            <ul className='mt-10 w-full space-y-2 font-medium'>
              {sideBarLinks.map(function (sidebar: ISideBarLink) {
                return (
                  <li key={sidebar.title}>
                    <NavLink
                      to={sidebar.routes}
                      end
                      className={({ isActive }) =>
                        `group flex items-center rounded-lg p-2 ${
                          isActive
                            ? 'bg-white text-primary dark:bg-colorPrimary'
                            : 'text-white hover:bg-white hover:text-primary dark:text-primary hover:dark:bg-colorPrimary'
                        }`
                      }
                    >
                      <sidebar.icon className='h-6 w-6' />
                      <span className='ms-3'>{sidebar.title}</span>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>

          <Button
            onClick={handleLogOut}
            variant={'ghost'}
            className='group flex w-full items-center justify-start rounded-lg p-2 text-white hover:bg-foreground hover:bg-white hover:text-primary  dark:text-primary hover:dark:bg-colorPrimary'
          >
            <MdLogout className='h-6 w-6' />
            <span className='ms-3'>LogOut</span>
          </Button>
        </div>
      </aside>
    </>
  )
}
