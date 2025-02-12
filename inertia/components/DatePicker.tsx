import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { cn } from '#lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover'
import { Button } from '#shadcn/button'
import { Calendar } from '#shadcn/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select'
import { useForm } from '@inertiajs/react'
import DynamicDateLabel from '#inertia/DynamicDateLabel'
import { PopoverClose } from '@radix-ui/react-popover'
import TaskDateStatus from '#inertia/TaskDateStatus'
import { CalendarIcon } from 'lucide-react'

type DatePickerMode = 'dueDate' | 'startDate' | 'range'

type DatePickerProps = {
  taskId: number
  startDate: Date | undefined
  dueDate: Date | undefined
}

export default function DatePicker({ taskId, startDate, dueDate }: DatePickerProps) {
  const { data, setData, patch, processing } = useForm({
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
        setData({
          startDate: null,
          dueDate: date?.toISOString() ?? null,
        })
        break
      case 'startDate':
        setData({
          startDate: date?.toISOString() ?? null,
          dueDate: null,
        })
        break
    }
  }

  const handleRangeSelection = (range: DateRange | undefined) => {
    setData({
      startDate: range?.from?.toISOString() ?? null,
      dueDate: range?.to?.toISOString() ?? null,
    })
  }

  const getButtonText = () => {
    const start = data.startDate ? new Date(data.startDate) : undefined
    const end = data.dueDate ? new Date(data.dueDate) : undefined

    if (mode === 'range' && start && end) {
      return `${format(start, 'dd/MM/yyyy')} - ${format(end, 'dd/MM/yyyy')}`
    } else if (mode === 'dueDate' && end) {
      return `${format(end, 'dd/MM/yyyy')}`
    } else if (mode === 'startDate' && start) {
      return `${format(start, 'dd/MM/yyyy')}`
    }
    return 'Sélectionner une date'
  }

  const [shouldSubmitAfterClear, setShouldSubmitAfterClear] = useState(false)

  useEffect(() => {
    if (shouldSubmitAfterClear) {
      handleSubmit()
      setShouldSubmitAfterClear(false)
    }
  }, [shouldSubmitAfterClear])

  const clearDates = () => {
    setData({
      startDate: null,
      dueDate: null,
    })
    setShouldSubmitAfterClear(true)
  }

  const handleSubmit = () => {
    patch(`/tasks/${taskId}`, {
      preserveScroll: true,
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <DynamicDateLabel startDate={data.startDate} dueDate={data.dueDate} />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'font-normal',
              !data.startDate && !data.dueDate && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {getButtonText()}
            <TaskDateStatus dueDate={data.dueDate} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto"
          align="start"
          side="bottom"
          onInteractOutside={() => {
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
                  from: data.startDate ? new Date(data.startDate) : undefined,
                  to: data.dueDate ? new Date(data.dueDate) : undefined,
                }}
                onSelect={handleRangeSelection}
                numberOfMonths={2}
                initialFocus
              />
            ) : (
              <Calendar
                mode="single"
                selected={
                  mode === 'dueDate'
                    ? data.dueDate
                      ? new Date(data.dueDate)
                      : undefined
                    : data.startDate
                      ? new Date(data.startDate)
                      : undefined
                }
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
              {(data.startDate || data.dueDate) && (
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
