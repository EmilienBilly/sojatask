import { router } from '@inertiajs/react'
import { Checkbox } from '#shadcn/checkbox'

type TaskCheckboxProps = {
  taskId: number
  completed: boolean
  className?: string
}

export function TaskCheckbox({ taskId, completed, className }: TaskCheckboxProps) {
  const handleChange = (checked: boolean) => {
    router.patch(
      `/tasks/${taskId}`,
      {
        completed: checked ? 1 : 0,
      },
      {
        preserveScroll: true,
        preserveState: true,
      }
    )
  }

  return <Checkbox checked={completed} onCheckedChange={handleChange} className={className} />
}
