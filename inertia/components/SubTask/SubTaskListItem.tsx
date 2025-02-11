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
import { ConfirmDialog } from '../ConfirmDialog'
import { useState } from 'react'
import { TaskCheckbox } from '#inertia/TaskCheckbox'

export function SubTaskListItem({ subtask }: { subtask: TaskDto }) {
  const [isOpen, toggle] = useToggle()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  function handleDelete() {
    router.delete(`/tasks/${subtask.id}`)
  }

  return (
    <>
      <div
        key={subtask.id}
        className={`flex items-center justify-between p-2 group transition-colors rounded-md ${
          isOpen ? 'bg-stone-200' : 'hover:bg-stone-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <TaskCheckbox taskId={subtask.id} completed={subtask.completed} className="h-4 w-4" />
          <span className={subtask.completed ? 'line-through text-gray-500' : ''}>
            {subtask.title}
          </span>
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
              <DropdownMenuItem onSelect={() => setShowConfirmDialog(true)}>
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleDelete}
        title="Supprimer la sous-tâche"
        description="Êtes-vous sûr de vouloir supprimer cette sous-tâche ? Cette action est irréversible."
      />
    </>
  )
}
