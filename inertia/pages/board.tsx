import { InferPageProps } from '@adonisjs/inertia/types'
import BoardsController from '#controllers/boards/boards_controller'
import { useEffect, useState } from 'react'
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area'
import BoardHeader from '#inertia/BoardHeader'
import CreateColumn from '#inertia/CreateColumn'
import BoardColumn from '#inertia/BoardColumn'
import { SortableContext } from '@dnd-kit/sortable'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { Task } from '../types/task'
import { moveTask } from '#inertia/utils/board.business'

export default function Board({ board }: InferPageProps<BoardsController, 'show'>) {
  const [boardColumns, setBoardColumns] = useState(board.columns)

  // const handleDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event
  //
  //   if (over && active.id !== over.id) {
  //     setColumns((items) => {
  //       const oldIndex = items.findIndex((item) => item.id === active.id)
  //       const newIndex = items.findIndex((item) => item.id === over.id)
  //       return arrayMove(items, oldIndex, newIndex)
  //     })
  //     setActiveColumn(null)
  //
  //     router.patch(`/boards/${board.id}/reorder`, {
  //       activeColumnId: active.id,
  //       overColumnId: over.id,
  //     })
  //   }
  // }

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        console.log('Source', source)
        console.log('Location', location)
        const destination = location.current.dropTargets[0]
        if (!destination) {
          return
        }

        const task = source.data.task as Task
        const columnId = destination.data.columnId as number
        const destinationCardId = destination.data.taskId as number

        setBoardColumns((columns) =>
          moveTask(task, { columnId, cardId: destinationCardId }, { ...board, columns })
        )
      },
    })
  }, [moveTask])

  return (
    <>
      <BoardHeader board={board} />
      <ScrollArea className="px-2 md:px-0 pb-4">
        <div className="flex gap-4 flex-row p-4">
          <SortableContext items={boardColumns}>
            {boardColumns?.map((column) => (
              <BoardColumn
                key={column.id}
                columnId={column.id}
                column={column}
                tasks={column.tasks}
              />
            ))}
          </SortableContext>
          <CreateColumn board={board} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  )
}
