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
    <nav className='relative bg-colorPrimary'>
      <div className='relative flex h-16 '>
        <div className='flex w-full items-center justify-between px-4'>
          <div className='flex w-full flex-shrink-0 justify-end sm:w-auto sm:justify-start'>
            <img className='h-8' src={imagetextIL} alt='Infinite Learning' />
          </div>
          {/* Menu untuk desktop */}
          <div className='hidden items-center sm:flex'>
            <Select>
              <SelectTrigger className='mr-4 w-auto border-none'>
                <SelectValue placeholder='Select a Language' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='id'>Bahasa Indonesia</SelectItem>
                  <SelectItem value='en'>English (United States)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button asChild className='mr-5 border bg-colorPrimary'>
              <Link to={'/sign-in'}>Log in</Link>
            </Button>
            <Button
              asChild
              className='bg-black text-primary hover:text-textPrimary'
            >
              <Link to={'/sign-up'}>Sign up</Link>
            </Button>
          </div>
        </div>
        {/* Tombol menu untuk mobile */}
        <div className='absolute inset-y-0 ml-2 flex items-center sm:hidden'>
          <button
            type='button'
            className=' items-center justify-center rounded-md p-2 hover:bg-gray-700 hover:text-primary focus:outline-none'
            aria-controls='mobile-menu'
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
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
      </div>

      {/* Menu untuk mobile, ditampilkan jika `isOpen` true */}
      <div
        className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}
        id='mobile-menu'
      >
        <div className='space-y-1 px-2 pb-3 pt-2'>
          <Select>
            <SelectTrigger className='w-full border border-primary'>
              <SelectValue placeholder='Select a Language' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='id'>Bahasa Indonesia</SelectItem>
                <SelectItem value='en'>English (United States)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <a
            href='/sign-in'
            className='block rounded-md px-3 py-2 font-medium text-primary hover:bg-gray-700'
            aria-current='page'
          >
            Login
          </a>
          <a
            href='/sign-up'
            className='block rounded-md px-3 py-2 font-medium hover:bg-gray-700 hover:text-primary'
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  )
}
