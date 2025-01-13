import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { cn } from '#lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover'
import { Button } from '#shadcn/button'
import { Calendar } from '#shadcn/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select'

type DatePickerMode = 'dueDate' | 'startDate' | 'range'

type FlexibleDatePickerProps = {
  startDate: Date | undefined
  dueDate: Date | undefined
  onDateChange: (startDate: string | null, dueDate: string | null) => void
}

export default function DatePicker({ startDate, dueDate, onDateChange }: FlexibleDatePickerProps) {
  const getInitialMode = (): DatePickerMode => {
    if (startDate && dueDate) return 'range'
    if (startDate) return 'startDate'
    if (dueDate) return 'dueDate'
    return 'dueDate'
  }

  const [mode, setMode] = React.useState<DatePickerMode>(getInitialMode())
  const [selectedDates, setSelectedDates] = React.useState<{
    start: Date | undefined
    end: Date | undefined
  }>({
    start: startDate,
    end: dueDate,
  })

  const handleDateSelection = (date: Date | undefined) => {
    switch (mode) {
      case 'dueDate':
        setSelectedDates((prev) => ({ ...prev, end: date }))
        onDateChange(null, date?.toISOString() ?? null)
        break
      case 'startDate':
        setSelectedDates((prev) => ({ ...prev, start: date }))
        onDateChange(date?.toISOString() ?? null, null)
        break
    }
  }

  const handleRangeSelection = (range: DateRange | undefined) => {
    setSelectedDates({
      start: range?.from,
      end: range?.to,
    })
    onDateChange(range?.from?.toISOString() ?? null, range?.to?.toISOString() ?? null)
  }

  const getButtonText = () => {
    if (mode === 'range' && selectedDates.start && selectedDates.end) {
      return `${format(selectedDates.start, 'dd/MM/yyyy')} - ${format(selectedDates.end, 'dd/MM/yyyy')}`
    } else if (mode === 'dueDate' && selectedDates.end) {
      return `${format(selectedDates.end, 'dd/MM/yyyy')}`
    } else if (mode === 'startDate' && selectedDates.start) {
      return `${format(selectedDates.start, 'dd/MM/yyyy')}`
    }
    return 'Sélectionner une date'
  }

  const clearDates = () => {
    setSelectedDates({ start: undefined, end: undefined })
    onDateChange(null, null)
  }

  return (
    <div className="flex">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !selectedDates.start && !selectedDates.end && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {getButtonText()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="space-y-4">
            <Select value={mode} onValueChange={(value: DatePickerMode) => setMode(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Type de date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Date limite</SelectItem>
                <SelectItem value="startDate">Date de début</SelectItem>
                <SelectItem value="range">Plage de dates</SelectItem>
              </SelectContent>
            </Select>

            {mode === 'range' ? (
              <Calendar
                mode="range"
                selected={{
                  from: selectedDates.start,
                  to: selectedDates.end,
                }}
                onSelect={handleRangeSelection}
                numberOfMonths={2}
                initialFocus
              />
            ) : (
              <Calendar
                mode="single"
                selected={mode === 'dueDate' ? selectedDates.end : selectedDates.start}
                onSelect={handleDateSelection}
                initialFocus
              />
            )}
          </div>
          {(selectedDates.start || selectedDates.end) && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                clearDates()
              }}
            >
              Effacer
            </Button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
