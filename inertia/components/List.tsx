import Task from '#inertia/Task'
import { ListType } from '../types/list'
import { TaskType } from '../types/task'
import CreateTask from '#inertia/CreateTask'
import { Card, CardContent, CardHeader } from '#shadcn/card'
import { ScrollArea } from '#shadcn/scroll-area'
import { useDroppable } from '@dnd-kit/core'

type ListProps = {
  tasks: TaskType[]
  list: ListType
}

export default function List({ tasks, list }: ListProps) {
  const { setNodeRef } = useDroppable({
    id: list.id,
  })

  return (
    <Card className="max-h-[720px] w-[350px] max-w-full flex flex-col flex-shrink-0 snap-center">
      <CardHeader className="p-4 font-semibold border-b-2 text-left flex flex-row space-between items-center">
        {list.title}
      </CardHeader>
      <ScrollArea>
        <CardContent ref={setNodeRef} className="flex flex-grow flex-col gap-2 p-2">
          {tasks?.map((task) => <Task key={task.id} task={task} />)}
          <CreateTask listId={list.id} />
        </CardContent>
      </ScrollArea>
    </Card>
  )
}
