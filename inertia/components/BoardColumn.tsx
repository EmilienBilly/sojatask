import TaskCard from '#inertia/TaskCard'
import CreateTask from '#inertia/CreateTask'
import { Card, CardContent, CardHeader } from '#shadcn/card'
import { ScrollArea } from '#shadcn/scroll-area'
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import { Column } from '../types/column'
import { Task } from '../types/task'
import { useState } from 'react'
import { cva } from 'class-variance-authority'

type ListProps = {
  tasks: Task[]
  column: Column
  isOverlay?: boolean
}

export default function BoardColumn({ isOverlay, tasks: initialTasks, column }: ListProps) {
  const [tasks, setTasks] = useState(initialTasks)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event

    setActiveTask(active.data.current?.task)
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
    }
  }

  const variants = cva(
    'h-[720px] max-h-[720px] w-[350px] max-w-full bg-primary-foreground flex flex-col flex-shrink-0 snap-center',
    {
      variants: {
        dragging: {
          default: 'border-2 border-transparent',
          over: 'ring-2 opacity-30',
          overlay: 'ring-2 ring-primary',
        },
      },
    }
  )

  return (
    <Card
      style={style}
      ref={setNodeRef}
      className={variants({
        dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined,
      })}
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
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <SortableContext items={tasks.map((task) => task.id)}>
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </SortableContext>
            <DragOverlay>
              {activeTask && <TaskCard key={activeTask.id} task={activeTask} />}
            </DragOverlay>
          </DndContext>
          <CreateTask columnId={column.id} />
        </CardContent>
      </ScrollArea>
    </Card>
  )
}
