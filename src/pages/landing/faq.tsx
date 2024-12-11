import { dataFaq } from '@/utils/constant'
import { IFaq } from '@/utils/type'
import { useState } from 'react'

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpen(open === index ? null : index)
  }
  return (
    <div className='mx-auto flex max-w-7xl flex-col items-center space-y-4 px-4'>
      <h1 className='mb-5 text-center text-3xl font-bold text-textPrimary md:text-5xl'>
        Frequently Asked Questions
      </h1>

      {dataFaq?.map(function (Faq: IFaq) {
        return (
          <div className='w-full max-w-3xl space-y-2' key={Faq.title}>
            <div className='border-b'>
              <button
                className='flex w-full justify-between py-4 text-start text-lg font-medium text-textPrimary md:text-xl'
                onClick={() => toggleFaq(1)}
              >
                <span>{Faq.title}</span>
                <span>{open === 1 ? '-' : '+'}</span>
              </button>
              {open === 1 && (
                <p className='pb-4 text-sm text-muted-foreground md:text-base'>
                  {Faq.description}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
