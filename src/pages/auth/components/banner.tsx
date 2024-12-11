import { Button } from '@/components/custom/button'
import { imagebanner } from '@/components/assets/images'

function banner() {
  return (
    <div className='relative hidden h-screen w-fit flex-col lg:block'>
      <Button className='absolute mt-2 h-24 w-80 rounded-full border-4 border-colorPrimary'>
        Try now for free!
      </Button>
      <p
        className='absolute right-4 top-28 text-4xl font-bold text-[#FFF9D4]'
        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8' }}
      >
        Summarize in second
      </p>

      <div className='absolute left-4 top-48 w-64 rounded-lg p-4 shadow-lg backdrop-blur-lg'>
        <p className='text-lg text-primary'>
          Cut through the clutter and get instant meeting summaries and stay
          ahead effortlessly.
        </p>
      </div>

      <div className='absolute bottom-36 right-4 w-64 rounded-lg p-4 shadow-lg backdrop-blur-lg'>
        <p className='text-lg text-primary'>
          Instant insights from every meeting, so you can focus on what matters.
        </p>
      </div>

      <img
        src={imagebanner}
        alt='imageBanner'
        className='max-h-screen rounded-3xl object-cover'
      />
    </div>
  )
}

export default banner
