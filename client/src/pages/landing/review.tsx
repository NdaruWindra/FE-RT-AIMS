import { dataReview } from '@/utils/constant'
import { IReview } from '@/utils/type'

export function Review() {
  return (
    <>
      <section className='overflow-hidden'>
        <div className='container flex flex-col items-center space-y-8 p-10'>
          <h1 className='text-3xl font-bold text-textPrimary md:text-5xl'>
            What Our Users Say
          </h1>

          <p className='text-center text-lg md:w-3/4 md:text-xl'>
            The potential of our video translation service is vast, and our
            users have shared numerous ways it has benefited them. Here are a
            few testimonials highlighting their experiences.
          </p>
        </div>

        <div className='scroll-container m-10'>
          <div className='scroll-content'>
            {dataReview?.map((Review: IReview, index) => (
              <div
                className='review-item border-2 border-colorPrimary space-y-5'
                key={`${Review.name}-${index}`}
              >
                <div className='flex items-center gap-3'>
                  <Review.icon size={30} fill={'FaBlackTie'} />
                  <p className='text-base'>{Review.name}</p>
                </div>
                <div className='flex gap-2'>
                  {Array.from({ length: 5 }).map((_, starIndex) => {
                    const filledStars = starIndex < (Review.totalStar || 0)
                    return (
                      <Review.star
                        key={starIndex}
                        className={`${filledStars ? 'text-yellow-500' : 'text-muted-foreground'}`}
                      />
                    )
                  })}
                </div>
                <p className='font-medium'>{Review.description}</p>
                <small className='ml-auto text-sm font-light text-muted-foreground'>
                  {Review.date}
                </small>
              </div>
            ))}
            {dataReview?.map((Review: IReview, index) => (
              <div
                className='review-item border-2 border-colorPrimary space-y-5'
                key={`duplicate-${Review.name}-${index}`}
              >
                <div className='flex items-center gap-3'>
                  <Review.icon size={30} fill={'FaBlackTie'} />
                  <p className='text-base'>{Review.name}</p>
                </div>
                <div className='flex gap-2'>
                  {Array.from({ length: 5 }).map((_, starIndex) => {
                    const filledStars = starIndex < (Review.totalStar || 0)
                    return (
                      <Review.star
                        key={starIndex}
                        className={`${filledStars ? 'text-yellow-500' : 'text-muted-foreground'}`}
                      />
                    )
                  })}
                </div>
                <p className='font-medium'>{Review.description}</p>
                <small className='ml-auto text-sm font-light text-muted-foreground'>
                  {Review.date}
                </small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
