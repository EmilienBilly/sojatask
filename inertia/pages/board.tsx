import { InferPageProps } from '@adonisjs/inertia/types'
import BoardsController from '#controllers/boards/boards_controller'
import { useEffect, useState } from 'react'
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area'
import BoardHeader from '#inertia/BoardHeader'
import CreateColumn from '#inertia/CreateColumn'
import BoardColumn from '#inertia/BoardColumn'
import { closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { Column } from '../types/column'
import { router } from '@inertiajs/react'

export default function Board({ board }: InferPageProps<BoardsController, 'show'>) {
  const [columns, setColumns] = useState(board.columns)
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

  function handleDragStart(event: DragStartEvent) {
    const { active } = event

    setActiveColumn(active.data.current?.column)
  }

  useEffect(() => {
    setColumns(board.columns)
  }, [board.columns])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
      setActiveColumn(null)

      router.patch(`/boards/${board.id}/reorder`, {
        activeColumnId: active.id,
        overColumnId: over.id,
      })
    }
  }

  return (
    <>
      <BoardHeader board={board} />
      <ScrollArea className="px-2 md:px-0 pb-4">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <div className="flex gap-4 flex-row p-4">
            <SortableContext items={columns}>
              {columns?.map((column) => (
                <BoardColumn key={column.id} column={column} tasks={column.tasks} />
              ))}
            </SortableContext>
            <CreateColumn board={board} />
          </div>
          <DragOverlay>
            {activeColumn && (
              <BoardColumn
                isOverlay
                key={activeColumn.id}
                column={activeColumn}
                tasks={activeColumn.tasks}
              />
            )}
          </DragOverlay>
        </DndContext>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  )
}
