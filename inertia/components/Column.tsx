import Task from '#inertia/Task'
import { ColumnType } from '../types/column'
import { TaskType } from '../types/task'
import CreateTask from '#inertia/CreateTask'
import { Card, CardContent, CardHeader } from '#shadcn/card'
import { ScrollArea } from '#shadcn/scroll-area'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type ListProps = {
  tasks: TaskType[]
  column: ColumnType
}

export default function Column({ tasks, column }: ListProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: column.id,
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
          {tasks?.map((task) => <Task key={task.id} task={task} />)}
          <CreateTask columnId={column.id} />
        </CardContent>
      </ScrollArea>
    </Card>
  )
}
