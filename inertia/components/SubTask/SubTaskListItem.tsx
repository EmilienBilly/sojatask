import { Checkbox } from '#shadcn/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#shadcn/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import TaskDto from '#dtos/task'
import { useToggle } from '../../hooks/useToggle'
import { router } from '@inertiajs/react'

export function SubTaskListItem({ subtask }: { subtask: TaskDto }) {
  const [isOpen, toggle] = useToggle()

  function handleDelete() {
    router.delete(`/tasks/${subtask.id}`)
  }

  return (
    <div
      key={subtask.id}
      className={`flex items-center justify-between p-2 group transition-colors rounded-md ${
        isOpen ? 'bg-stone-200' : 'hover:bg-stone-200'
      }`}
    >
      <div className="flex items-center gap-2">
        <Checkbox />
        <span>{subtask.title}</span>
      </div>
      <div className="flex">
        <DropdownMenu onOpenChange={toggle}>
          <DropdownMenuTrigger asChild>
            <Ellipsis
              size={16}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 data-[state=open]:opacity-100"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={handleDelete}>Supprimer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
