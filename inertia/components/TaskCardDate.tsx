import { format } from 'date-fns'
import { Clock } from 'lucide-react'

type TaskCardDateProps = {
  startDate: string | Date | null
  dueDate: string | Date | null
  currentDate?: Date // Permet de passer une date personnalisée pour les tests
}

export function TaskCardDate({ startDate, dueDate, currentDate = new Date() }: TaskCardDateProps) {
  if (!dueDate) {
    return null
  }

  const parseDate = (date: string | Date | null) => (date ? new Date(date) : undefined)

  const parsedStartDate = parseDate(startDate)
  const parsedDueDate = parseDate(dueDate)

  const formatDate = (date: Date | undefined) => (date ? format(date, 'dd MMM.') : null)

  const startText = formatDate(parsedStartDate)
  const endText = formatDate(parsedDueDate)

  const isOverdue =
    parsedDueDate &&
    currentDate > parsedDueDate &&
    currentDate.toDateString() !== parsedDueDate.toDateString()

  const dateRangeText = startText && endText ? `${startText} - ${endText}` : startText || endText

  return (
    <div
      className={`flex items-center gap-1 w-fit p-[4px] rounded-sm ${isOverdue ? 'bg-red-200' : ''}`}
    >
      <Clock size={12} className={`${isOverdue ? 'text-red-600' : 'text-gray-600'}`} />
      <span className={`text-sm px-[2px] ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
        {dateRangeText}
      </span>
    </div>
  )
}
