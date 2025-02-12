import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
import { Checkbox } from '#shadcn/checkbox'
import { cn } from '#lib/utils'

type TaskCheckboxProps = {
  taskId: number
  completed: boolean
  className?: string
}

export function TaskCheckbox({ taskId, completed, className }: TaskCheckboxProps) {
  const [isCompleted, setIsCompleted] = useState(completed)

  useEffect(() => {
    setIsCompleted(completed)
  }, [completed])

  const handleChange = (checked: boolean) => {
    setIsCompleted(checked)

    router.patch(
      `/tasks/${taskId}`,
      {
        completed: checked ? 1 : 0,
      },
      {
        preserveScroll: true,
        preserveState: true,
        onError: () => setIsCompleted(!checked),
      }
    )
  }

  return (
    <Checkbox
      checked={isCompleted}
      onCheckedChange={handleChange}
      className={cn(
        'rounded-full',
        'data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600',
        className
      )}
    />
  )
}
