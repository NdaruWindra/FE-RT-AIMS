import { imagetextIL } from '@/components/assets/images'
import { FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <>
      <footer className=' bg-colorSecondary'>
        <section className='flex justify-center p-5'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-32'>
            <div className='flex w-80 flex-col justify-center space-y-4 p-2 text-center md:items-start'>
              <img src={imagetextIL} alt='Infinite Learning' />
              <p className='text-center text-primary md:text-start'>
                Jl. Hang Lekui KM 2 Sambau, Kecamatan Nongsa, Kota Batam,
                Kepulauan Riau, 29466
              </p>
            </div>

            <div className='flex justify-around '>
              <div className='space-y-2 text-primary'>
                <h3 className='text-lg font-bold'>Program</h3>
                <ul className='space-y-2'>
                  <li>
                    <Link to=''>Learning</Link>
                  </li>
                  <li>
                    <Link to=''>Bootcamp</Link>
                  </li>
                  <li>
                    <Link to=''>Event</Link>
                  </li>
                  <li>
                    <Link to=''>MSIB</Link>
                  </li>
                </ul>
              </div>

              <div className='space-y-2 text-primary'>
                <h3 className='text-lg font-bold'>Community</h3>
                <ul className='space-y-2'>
                  <li>
                    <Link to=''>Blog</Link>
                  </li>
                  <li>
                    <Link to=''>News</Link>
                  </li>
                </ul>
              </div>

              <div className='space-y-2 text-primary'>
                <h3 className='text-lg font-bold'>About</h3>
                <ul className='space-y-2'>
                  <li>
                    <Link to=''>About Us</Link>
                  </li>
                  <li>
                    <Link to=''>Career</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className='flex flex-col items-center justify-center'>
              <h3 className='mb-2 text-lg font-bold'>Our Social Media</h3>
              <div className='mb-2 flex space-x-4'>
                <Link
                  to='https://instagram.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaInstagram className='h-8 w-8 text-primary' />
                </Link>
                <Link
                  to='https://linkedin.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaLinkedin className='h-8 w-8 text-primary' />
                </Link>
                <Link
                  to='https://tiktok.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaTiktok className='h-8 w-8 text-primary' />
                </Link>
              </div>
              <div className='bg-red mt-12 text-center'>
                <p className='text-primary'>0896387111079</p>
                <p className='text-primary'>csc@infinitelearning.id</p>
              </div>
            </div>
          </div>
        </section>
        <div className='bg-gray-700 py-4 text-center'>
          <p className='text-base text-primary'>
            Copyright &copy; {new Date().getFullYear()} | Infinite Learning
            Indonesia.
          </p>
        </div>
      </footer>
    </>
  )
}
