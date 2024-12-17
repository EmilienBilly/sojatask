import TaskCard from '#inertia/TaskCard'
import CreateTask from '#inertia/CreateTask'
import { Card, CardContent, CardHeader } from '#shadcn/card'
import { ScrollArea } from '#shadcn/scroll-area'
import { Column } from '../types/column'
import { Task } from '../types/task'
import { cva } from 'class-variance-authority'

type ListProps = {
  columnId: number
  tasks: Task[]
  column: Column
  isOverlay?: boolean
}

export default function BoardColumn({ columnId, tasks, column }: ListProps) {
  const variants = cva(
    'h-[720px] max-h-[720px] w-[350px] max-w-full bg-primary-foreground flex flex-col flex-shrink-0 snap-center',
    {
      variants: {
        dragging: {
          default: 'border-2 border-transparent',
          over: 'ring-2',
          overlay: 'ring-2 ring-primary',
        },
      },
    }
  )

  return (
    <Card
      className={variants({
        dragging: undefined,
      })}
    >
      <CardHeader className="p-4 font-semibold border-b-2 text-left flex flex-row space-between items-center">
        {column.title}
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex flex-grow flex-col gap-2 p-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} columnId={columnId} />
          ))}
          <CreateTask columnId={column.id} />
        </CardContent>
      </ScrollArea>
    </Card>
  )
}
