import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover'
import { Button } from '#shadcn/button'
import { Calendar } from '#shadcn/calendar'
import { CalendarIcon } from 'lucide-react'
import { cn } from '#lib/utils'
import { DateTime } from 'luxon'
import { useState } from 'react'

type DatePickerProps = {
  date: string | null // La date initiale sous forme de chaîne ou null
  onDateChange: (date: DateTime | undefined) => void // Callback pour transmettre la date sélectionnée
}

export default function DatePicker({ date, onDateChange }: DatePickerProps) {
  // Initialisation de l'état avec DateTime ou undefined
  const [dateState, setDateState] = useState<DateTime | undefined>(
    date ? DateTime.fromISO(date) : undefined
  )

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const formattedDate = dateState
    ? dateState.setLocale('fr').toLocaleString(DateTime.DATE_MED)
    : 'Aucune date sélectionnée'

  const handleDateSelect = (selectedDate: Date | undefined) => {
    const dateTime = selectedDate ? DateTime.fromJSDate(selectedDate) : undefined
    setDateState(dateTime) // Mise à jour de l'état local
    onDateChange(dateTime) // Appel du callback pour transmettre la date au parent
    setIsPopoverOpen(false) // Ferme le Popover
  }

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
          {formattedDate}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dateState?.toJSDate()} // Convertit DateTime en Date pour le Calendar
          onSelect={(selectedDate) => handleDateSelect(selectedDate ?? undefined)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
