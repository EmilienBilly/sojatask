import { Label } from '#shadcn/label'

type DateLabelProps = {
  startDate: string | null
  dueDate: string | null
}

export default function DynamicDateLabel({ startDate, dueDate }: DateLabelProps) {
  const getLabel = () => {
    if (startDate && dueDate) return 'Dates'
    if (dueDate) return 'Date limite'
    if (startDate) return 'Date de début'
    return 'Date' // Fallback label
  }

  return <Label>{getLabel()}</Label>
}
