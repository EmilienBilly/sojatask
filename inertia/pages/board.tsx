import { InferPageProps } from '@adonisjs/inertia/types'
import BoardsController from '#controllers/boards/boards_controller'
import { useState } from 'react'
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area'
import BoardHeader from '#inertia/BoardHeader'
import CreateList from '#inertia/CreateList'
import List from '#inertia/List'
import { DndContext } from '@dnd-kit/core'

export default function Board({ board }: InferPageProps<BoardsController, 'show'>) {
  const [lists, setLists] = useState(board.lists)

  return (
    <>
      <BoardHeader board={board} />
      <ScrollArea className="px-2 md:px-0 pb-4">
        <DndContext>
          <div className="flex gap-4 flex-row p-4">
            {lists?.map((list) => <List key={list.id} list={list} tasks={list.tasks} />)}
            <CreateList board={board} />
          </div>
        </DndContext>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  )
}
