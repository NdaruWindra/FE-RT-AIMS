import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <>
      <button
        type='button'
        className='ms-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
      >
        <span className='sr-only'>Open sidebar</span>
        <svg
          className='h-6 w-6'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            clipRule='evenodd'
            fillRule='evenodd'
            d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
          />
        </svg>
      </button>
      <aside
        id='default-sidebar'
        className='fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform md:translate-x-0'
        aria-label='Sidebar'
      >
        <div className='0 h-full overflow-y-auto bg-primary px-3 py-4 dark:bg-gray-800'>
          <ul className='space-y-2 font-medium'>
            <li>
              <NavLink
                to='/dashboard'
                end
                className={({ isActive }) =>
                  `group flex items-center rounded-lg p-2 ${
                    isActive
                      ? 'bg-colorPrimary text-white'
                      : 'text-textPrimary hover:bg-colorPrimary dark:text-primary'
                  }`
                }
              >
                <span className='ms-3'>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/dashboard/history'
                className={({ isActive }) =>
                  `group flex items-center rounded-lg p-2 ${
                    isActive
                      ? 'bg-colorPrimary text-white'
                      : 'text-textPrimary hover:bg-colorPrimary dark:text-primary'
                  }`
                }
              >
                <span className='ms-3 flex-1 whitespace-nowrap'>History</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/dashboard/summarize'
                className={({ isActive }) =>
                  `group flex items-center rounded-lg p-2 ${
                    isActive
                      ? 'bg-colorPrimary text-white'
                      : 'text-textPrimary hover:bg-colorPrimary dark:text-primary'
                  }`
                }
              >
                <span className='ms-3 flex-1 whitespace-nowrap'>
                  Summarize AI
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/dashboard/settings'
                className={({ isActive }) =>
                  `group flex items-center rounded-lg p-2 ${
                    isActive
                      ? 'bg-colorPrimary text-white'
                      : 'text-textPrimary hover:bg-colorPrimary dark:text-primary'
                  }`
                }
              >
                <span className='ms-3 flex-1 whitespace-nowrap'>Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}
