import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover'
import { Button } from '#shadcn/button'
import { Calendar } from '#shadcn/calendar'
import { CalendarIcon } from 'lucide-react'
import { cn } from '#lib/utils'
import { DateTime } from 'luxon'
import { useState } from 'react'

type DatePickerProps = {
  date: string | null
}

export default function DatePicker({ date }: DatePickerProps) {
  const [dateState, setDateState] = useState<Date | undefined>(date ? new Date(date) : undefined)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const formattedDate = dateState
    ? DateTime.fromJSDate(dateState).setLocale('fr').toLocaleString(DateTime.DATE_MED)
    : 'Aucune date sélectionnée'

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'justify-start text-left font-normal',
            !dateState && 'text-muted-foreground'
          )}
          aria-label="Sélectionner une date"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateState ? formattedDate : <span>Sélectionnez une date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dateState}
          onSelect={(selectedDate) => {
            setDateState(selectedDate ?? undefined)
            setIsPopoverOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
