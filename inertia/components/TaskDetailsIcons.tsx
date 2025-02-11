import TaskDto from '#dtos/task'
import { LayoutList, Text } from 'lucide-react'

export function TaskDetailsIcons({ task }: { task: TaskDto }) {
  const taskIcons = [
    {
      condition: task.description,
      icon: <Text size={14} />,
    },
    {
      condition: task.subtasks.length > 0,
      icon: <LayoutList size={14} />,
    },
  ]

  return (
    <>
      {taskIcons.map(
        ({ condition, icon }, index) =>
          condition && (
            <span key={index} className="flex items-center gap-1 w-fit p-1 mb-1">
              {icon}
            </span>
          )
      )}
    </>
  )
}
