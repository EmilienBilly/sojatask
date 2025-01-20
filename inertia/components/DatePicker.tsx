import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { cn } from '#lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover'
import { Button } from '#shadcn/button'
import { Calendar } from '#shadcn/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select'
import { useForm } from '@inertiajs/react'
import DynamicDateLabel from '#inertia/DynamicDateLabel'
import { PopoverClose } from '@radix-ui/react-popover'

type DatePickerMode = 'dueDate' | 'startDate' | 'range'

type DatePickerProps = {
  taskId: number
  startDate: Date | undefined
  dueDate: Date | undefined
}

export default function DatePicker({ taskId, startDate, dueDate }: DatePickerProps) {
  const [selectedDates, setSelectedDates] = useState<{
    start: Date | undefined
    end: Date | undefined
  }>({
    start: startDate,
    end: dueDate,
  })

  const { data, setData, put, processing } = useForm({
    startDate: startDate?.toISOString() || null,
    dueDate: dueDate?.toISOString() || null,
  })

  const getInitialMode = (): DatePickerMode => {
    if (startDate && dueDate) return 'range'
    if (startDate) return 'startDate'
    if (dueDate) return 'dueDate'
    return 'dueDate'
  }
  const [mode, setMode] = useState<DatePickerMode>(getInitialMode())

  const handleDateSelection = (date: Date | undefined) => {
    switch (mode) {
      case 'dueDate':
        setSelectedDates((prev) => ({ ...prev, end: date }))
        setData({
          startDate: null,
          dueDate: date?.toISOString() ?? null,
        })
        break
      case 'startDate':
        setSelectedDates((prev) => ({ ...prev, start: date }))
        setData({
          startDate: date?.toISOString() ?? null,
          dueDate: null,
        })
        break
    }
  }

  const handleRangeSelection = (range: DateRange | undefined) => {
    setSelectedDates({
      start: range?.from,
      end: range?.to,
    })
    setData({
      startDate: range?.from?.toISOString() ?? null,
      dueDate: range?.to?.toISOString() ?? null,
    })
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

  const [shouldSubmitAfterClear, setShouldSubmitAfterClear] = useState(false)

  useEffect(() => {
    if (shouldSubmitAfterClear) {
      handleSubmit()
      setShouldSubmitAfterClear(false)
    }
  }, [data.startDate, data.dueDate, shouldSubmitAfterClear])

  const clearDates = () => {
    setSelectedDates({ start: undefined, end: undefined })
    setData({
      startDate: null,
      dueDate: null,
    })
    setShouldSubmitAfterClear(true)
  }

  const handleSubmit = () => {
    put(`/tasks/${taskId}`, {
      preserveScroll: true,
    })
  }

  useEffect(() => {})

  return (
    <div className="flex items-center gap-2">
      <DynamicDateLabel startDate={data.startDate} dueDate={data.dueDate} />
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
        <PopoverContent
          className="w-auto"
          align="center"
          side="right"
          onInteractOutside={() => {
            setSelectedDates({ start: startDate, end: dueDate })
            setData({
              startDate: startDate?.toISOString() || null,
              dueDate: dueDate?.toISOString() || null,
            })
          }}
        >
          <div>
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

            <div className="flex flex-col gap-2">
              <PopoverClose asChild>
                <Button className="flex-1" onClick={handleSubmit} disabled={processing}>
                  Valider
                </Button>
              </PopoverClose>
              {(selectedDates.start || selectedDates.end) && (
                <PopoverClose asChild>
                  <Button variant="outline" className="flex-1" onClick={clearDates}>
                    Effacer
                  </Button>
                </PopoverClose>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
