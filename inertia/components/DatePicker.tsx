'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { cn } from '#lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover'
import { Button } from '#shadcn/button'
import { Calendar } from '#shadcn/calendar'

type DatePickerProps = {
  startDate: Date | undefined
  dueDate: Date | undefined
  onDateChange: (startDate: string | null, dueDate: string | null) => void
}

export default function DatePicker({ startDate, dueDate, onDateChange }: DatePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startDate,
    to: dueDate,
  })

  const handleDateSelection = (range: DateRange | undefined) => {
    setDate(range)
    console.log(range)
    onDateChange(
      range?.from ? range.from.toISOString() : null,
      range?.to ? range.to.toISOString() : null
    )
  }

  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelection}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
