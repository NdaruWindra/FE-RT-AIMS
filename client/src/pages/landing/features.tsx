import { Button } from '@/components/custom/button'
import { dataSimpleStep } from '@/utils/constant'
import { ISimpleStep } from '@/utils/type'

export function Features() {
  return (
    <>
      {/* Header Features Web */}
      <div className='container space-y-8'>
        <h1 className='text-center text-3xl font-bold text-textPrimary md:text-5xl'>
          Simple Steps to Begin
        </h1>

        {/* Section */}
        {dataSimpleStep?.map(function (simpleStep: ISimpleStep) {
          if (simpleStep.title === 'Drag and Drop Your Files to Upload') {
            return (
              <div
                className='flex w-full flex-col items-center justify-between md:flex-row '
                key={simpleStep.title}
              >
                <div className='flex justify-end sm:hidden md:w-3/4'>
                  <img src={simpleStep.image} alt={simpleStep.title} />
                </div>
                <div className='space-y-5 md:p-5'>
                  <h2 className='text-xl text-textPrimary md:text-5xl'>
                    {simpleStep.title}
                  </h2>
                  <p className='text-justify text-lg text-muted-foreground md:w-2/3'>
                    {simpleStep.description}
                  </p>
                  <Button className='bg-colorSecondary p-4 text-primary hover:text-textPrimary'>
                    Learn More
                  </Button>
                </div>
                <div className='hidden justify-end md:flex md:w-3/4'>
                  <img src={simpleStep.image} alt={simpleStep.title} />
                </div>
              </div>
            )
          }
          return (
            <div
              key={simpleStep.title}
              className='flex w-full flex-col items-center justify-between md:flex-row'
            >
              <div className='md:w-3/4'>
                <img src={simpleStep.image} alt={simpleStep.title} />
              </div>
              <div className='space-y-5 md:w-1/2'>
                <h2 className='text-xl text-textPrimary md:text-5xl'>
                  {simpleStep.title}
                </h2>
                <p className='text-justify text-lg text-muted-foreground md:w-full'>
                  {simpleStep.description}
                </p>
                <Button className='bg-colorSecondary p-4 text-primary hover:text-textPrimary'>
                  Learn More
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
