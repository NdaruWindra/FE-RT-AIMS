import { FiLoader } from 'react-icons/fi'

export default function Loader() {
  return (
    <div className='flex h-svh w-full items-center justify-center'>
      <FiLoader className='animate-spin' size={32} />

      <span className='sr-only'>loading</span>
    </div>
  )
}
