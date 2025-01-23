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

  const dateRangeText =
    startText && endText
      ? `${startText} - ${endText}`
      : startText
        ? `Commencé le : ${startText}`
        : endText

  return (
    <span
      className={`flex items-center gap-1 w-fit p-1 mb-1 rounded-sm ${isOverdue ? 'bg-red-200' : ''}`}
    >
      <span>
        <Clock size={14} className={`${isOverdue ? 'text-red-700' : 'text-gray-600'}`} />
      </span>
      <span className={`text-xs px-[2px] ${isOverdue ? 'text-red-700' : 'text-gray-600'}`}>
        {dateRangeText}
      </span>
    </span>
  )
}
