import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const files = [
  {
    fileName: 'Report_2023.pdf',
    duration: '2 hours',
    createdAt: '2023-01-15',
  },
  {
    fileName: 'Project_Plan.docx',
    duration: '3 hours',
    createdAt: '2023-02-10',
  },
  {
    fileName: 'Budget_2023.xlsx',
    duration: '1 hour',
    createdAt: '2023-03-05',
  },
  {
    fileName: 'Presentation.pptx',
    duration: '45 minutes',
    createdAt: '2023-04-20',
  },
  {
    fileName: 'Invoice_001.pdf',
    duration: '30 minutes',
    createdAt: '2023-05-12',
  },
  {
    fileName: 'Notes.txt',
    duration: '15 minutes',
    createdAt: '2023-06-18',
  },
  {
    fileName: 'Research.pdf',
    duration: '4 hours',
    createdAt: '2023-07-21',
  },
]

export function TableHistory() {
  return (
    <div className='mt-5 overflow-hidden rounded-2xl border border-gray-300'>
      <Table className='w-full md:w-full'>
        <TableHeader className='bg-gray-700'>
          <TableRow>
            <TableHead className='px-4 py-2'>
              <Checkbox />
            </TableHead>
            <TableHead className='w-[100px] px-4 py-2'>File Name</TableHead>
            <TableHead className='px-4 py-2'>Duration</TableHead>
            <TableHead className='px-4 py-2'>Created At</TableHead>
            <TableHead className='px-4 py-2 text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.fileName}>
              <TableCell className='px-4 py-2'>
                <Checkbox />
              </TableCell>
              <TableCell className='px-4 py-2 font-medium'>
                {file.fileName}
              </TableCell>
              <TableCell className='px-4 py-2'>{file.duration}</TableCell>
              <TableCell className='px-4 py-2'>{file.createdAt}</TableCell>
              <TableCell className='space-x-2 px-4 py-2 text-right'>
                <a href='#' className='text-blue-600 hover:underline'>
                  Edit
                </a>
                <a href='#' className='text-red-600 hover:underline'>
                  Delete
                </a>
                <a href='#' className='text-green-600 hover:underline'>
                  Download
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
