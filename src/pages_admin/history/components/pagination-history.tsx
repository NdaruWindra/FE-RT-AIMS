import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { setCurrentPage } from '@/features/history/historySlice'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { getVisiblePages } from '@/lib/utils'
import { TSingleHistory } from '@/utils/type'

export function PaginationHistory({ data }: { data: TSingleHistory[] }) {
  const {
    paginationHistory: { currentPage, totalPage },
  } = useAppSelector(function (state) {
    return state.history
  })
  const dispatch = useAppDispatch()

  if (data?.length === 0) {
    return
  }

  return (
    <Pagination className='mt-5'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className='cursor-pointer'
            onClick={() =>
              dispatch(
                setCurrentPage(currentPage <= 1 ? totalPage : currentPage - 1)
              )
            }
          />
        </PaginationItem>

        {currentPage > 2 && (
          <>
            <PaginationItem>
              <PaginationEllipsis></PaginationEllipsis>
            </PaginationItem>
          </>
        )}

        {getVisiblePages(currentPage, totalPage).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              className='cursor-pointer'
              isActive={page === currentPage}
              onClick={() => dispatch(setCurrentPage(page))}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < totalPage - 1 && (
          <PaginationItem>
            <PaginationEllipsis></PaginationEllipsis>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className='cursor-pointer'
            onClick={() =>
              dispatch(
                setCurrentPage(currentPage === totalPage ? 1 : currentPage + 1)
              )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
