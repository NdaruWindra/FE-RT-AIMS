import { useState } from 'react'
import { imagetextIL } from '@/components/assets/images'
import { Button } from '@/components/custom/button'
import { Link } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='relative'>
      <nav className='bg-colorPrimary'>
        <div className='mx-auto max-w-full px-2 sm:px-6 lg:px-8'>
          <div className='relative flex h-16 items-center justify-between'>
            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
              {/* Mobile menu button */}
              <button
                type='button'
                className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded={isOpen}
                onClick={toggleMenu}
              >
                <span className='absolute -inset-0.5' />
                <span className='sr-only'>Open main menu</span>
                <svg
                  className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                  />
                </svg>
                <svg
                  className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='flex w-full items-center justify-between px-4'>
              <div className='flex flex-shrink-0 items-center'>
                <img
                  className='h-8 w-auto'
                  src={imagetextIL}
                  alt='Your Company'
                />
              </div>
              <div className='flex items-center'>
                <Select>
                  <SelectTrigger className='w-auto border-none mr-4 text-black'>
                    <SelectValue placeholder='Select a Language' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='id'>Bahasa Indonesia</SelectItem>
                      <SelectItem value='en'>
                        English (united States)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button asChild className='bg-colorPrimary mr-5 border'>
                  <Link to={'/sign-in'}>Log in</Link>
                </Button>
                <Button
                  asChild
                  className='bg-black text-white hover:text-black'
                >
                  <Link to={'/sign-up'}>Sign up</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        <div
          className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}
          id='mobile-menu'
        >
          <div className='space-y-1 px-2 pb-3 pt-2'>
            <a
              href='#'
              className='block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white'
              aria-current='page'
            >
              Dashboard
            </a>
            <a
              href='#'
              className='block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
            >
              Team
            </a>
          </div>
        </div>

        {/* Desktop Menu */}
      </nav>
    </div>
  )
}
