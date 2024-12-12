import TaskCard from '#inertia/TaskCard'
import CreateTask from '#inertia/CreateTask'
import { Card, CardContent, CardHeader } from '#shadcn/card'
import { ScrollArea } from '#shadcn/scroll-area'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { Column } from '../types/column'
import { Task } from '../types/task'

type ListProps = {
  tasks: Task[]
  column: Column
}

export default function BoardColumn({ tasks, column }: ListProps) {
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
          <DndContext collisionDetection={closestCenter}>
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
