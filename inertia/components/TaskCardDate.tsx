import { format } from 'date-fns'
import { CheckCircle, Clock } from 'lucide-react'

type TaskCardDateProps = {
  startDate: string | Date | null
  dueDate: string | Date | null
  completed: boolean
  currentDate?: Date
}

export function TaskCardDate({
  startDate,
  dueDate,
  completed,
  currentDate = new Date(),
}: TaskCardDateProps) {
  if (!dueDate && !startDate) {
    return null
  }

  const parseDate = (date: string | Date | null) => (date ? new Date(date) : undefined)

  const parsedStartDate = parseDate(startDate)
  const parsedDueDate = parseDate(dueDate)

  const formatDate = (date: Date | undefined) => (date ? format(date, 'dd MMM.') : null)

  const startText = formatDate(parsedStartDate)
  const endText = formatDate(parsedDueDate)

  const isOverdue =
    !completed &&
    parsedDueDate &&
    currentDate > parsedDueDate &&
    currentDate.toDateString() !== parsedDueDate.toDateString()

  const dateRangeText =
    startText && endText
      ? `${startText} - ${endText}`
      : startText
        ? `Commencé le : ${startText}`
        : endText

  const statusColor = completed ? 'bg-green-200' : isOverdue ? 'bg-red-200' : ''
  const textColor = completed ? 'text-green-700' : isOverdue ? 'text-red-700' : 'text-gray-600'

  return (
    <span className={`flex items-center gap-1 w-fit p-1 rounded-sm ${statusColor}`}>
      <span>
        <Clock size={14} className={textColor} />
      </span>
      <span className={`text-xs px-[2px] ${textColor}`}>{dateRangeText}</span>
    </span>
  )
}
