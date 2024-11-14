import { Button } from '@/components/custom/button'
import { Navbar } from './components/navbar'
import { Footer } from './components/footer'
import { Features } from './features'
import { Faq } from './faq'
import { Review } from './review'
import { wave } from '@/components/assets/images'

export default function LandingPage() {
  return (
    <>
      <main className='space-y-24 lg:space-y-10 '>
        {/* Navbar */}
        <Navbar />

        {/* Main Landing */}
        <section className='flex lg:h-screen lg:pl-20'>
          <div className='flex flex-col space-y-4 p-5 lg:w-1/2 lg:justify-center'>
            <h1 className='text-5xl font-bold text-textPrimary '>
              Voice to Text Revolution Smart with Summarized AI
            </h1>
            <p className='w-full text-2xl lg:w-[55%]'>
              Transforming Speech into Clear Insights Effortlessly and
              Accurately
            </p>
            <div className='flex space-x-4'>
              <Button className='rounded-full bg-colorPrimary p-5 text-primary hover:text-textPrimary'>
                TRY FOR FREE
              </Button>
              <Button className='rounded-full p-5 hover:bg-colorPrimary hover:text-primary'>
                READ DOCUMENTATION
              </Button>
            </div>
          </div>
          <div className='hidden items-end justify-end lg:flex lg:w-1/2'>
            <img src={wave} alt='' className='w-auto object-cover' />
          </div>
        </section>

        {/* Simple Steps to Begin */}
        <Features />

        {/* User Testimonials */}
        <Review />

        {/* FAQ Section */}
        <Faq />

        {/*footer*/}
        <Footer />
      </main>
    </>
  )
}
