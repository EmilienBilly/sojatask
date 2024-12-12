import { InferPageProps } from '@adonisjs/inertia/types'
import BoardsController from '#controllers/boards/boards_controller'
import { useState } from 'react'
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area'
import BoardHeader from '#inertia/BoardHeader'
import CreateColumn from '#inertia/CreateColumn'
import BoardColumn from '#inertia/BoardColumn'
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'

export default function Board({ board }: InferPageProps<BoardsController, 'show'>) {
  const [columns, setColumns] = useState(board.columns)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    console.log(active, over)

    if (over && active.id !== over.id) {
      setColumns((items) => {
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
    <>
      <BoardHeader board={board} />
      <ScrollArea className="px-2 md:px-0 pb-4">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="flex gap-4 flex-row p-4">
            <SortableContext items={columns}>
              {columns?.map((column) => (
                <BoardColumn key={column.id} column={column} tasks={column.tasks} />
              ))}
            </SortableContext>
            <CreateColumn board={board} />
          </div>
        </DndContext>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  )
}
