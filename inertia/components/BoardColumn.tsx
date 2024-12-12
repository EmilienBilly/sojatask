import TaskCard from '#inertia/TaskCard'
import CreateTask from '#inertia/CreateTask'
import { Card, CardContent, CardHeader } from '#shadcn/card'
import { ScrollArea } from '#shadcn/scroll-area'
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import { Column } from '../types/column'
import { Task } from '../types/task'
import { useState } from 'react'

type ListProps = {
  tasks: Task[]
  column: Column
}

export default function BoardColumn({ tasks: initialTasks, column }: ListProps) {
  const [tasks, setTasks] = useState(initialTasks)

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    console.log(active, over)

    if (over && active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })

      // router.patch(`/boards/${board.id}/reorder`, {
      //   activeColumnId: active.id,
      //   overColumnId: over.id,
      // })
    }
  }

  return (
    <Card
      style={style}
      ref={setNodeRef}
      className="max-h-[720px] w-[350px] max-w-full flex flex-col flex-shrink-0 snap-center"
    >
      <CardHeader
        {...attributes}
        {...listeners}
        className="p-4 font-semibold border-b-2 text-left flex flex-row space-between items-center"
      >
        {column.title}
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex flex-grow flex-col gap-2 p-2">
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={tasks.map((task) => task.id)}>
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </SortableContext>
          </DndContext>
          <CreateTask columnId={column.id} />
        </CardContent>
      </ScrollArea>
    </Card>
  )
}
