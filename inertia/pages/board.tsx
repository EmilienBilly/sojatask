import { InferPageProps } from '@adonisjs/inertia/types'
import BoardsController from '#controllers/boards/boards_controller'
import { useEffect, useState } from 'react'
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area'
import BoardHeader from '#inertia/BoardHeader'
import CreateList from '#inertia/CreateList'
import List from '#inertia/List'

export default function Board(props: InferPageProps<BoardsController, 'show'>) {
  const board = props.board
  const [lists, setLists] = useState(props.board.lists)

  useEffect(() => {
    setLists(props.board.lists)
  }, [props.board.lists])

  return (
    <>
      <BoardHeader board={board} />
      <ScrollArea className="px-2 md:px-0 pb-4">
        <div className="flex gap-4 flex-row p-4">
          {lists?.map((list) => <List key={list.id} list={list} tasks={list.tasks} />)}
          <CreateList board={board} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  )
}
