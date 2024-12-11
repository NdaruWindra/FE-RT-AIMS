import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getVisiblePages(
  currentPage: number,
  totalPage: number
): number[] {
  const pages = []
  const start = Math.max(1, currentPage - 1)
  const end = Math.min(totalPage, currentPage + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}
