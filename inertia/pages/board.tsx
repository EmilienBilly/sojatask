import { InferPageProps } from '@adonisjs/inertia/types'
import BoardsController from '#controllers/boards/boards_controller'
import { useState } from 'react'
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area'
import BoardHeader from '#inertia/BoardHeader'
import CreateColumn from '#inertia/CreateColumn'
import List from '#inertia/List'
import { DndContext } from '@dnd-kit/core'

export default function Board({ board }: InferPageProps<BoardsController, 'show'>) {
  const [columns, setColumns] = useState(board.columns)

  return (
    <>
      <BoardHeader board={board} />
      <ScrollArea className="px-2 md:px-0 pb-4">
        <DndContext>
          <div className="flex gap-4 flex-row p-4">
            {columns?.map((column) => (
              <List key={column.id} column={column} tasks={column.tasks} />
            ))}
            <CreateColumn board={board} />
          </div>
        </DndContext>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  )
}
