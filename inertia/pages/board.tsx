import { InferPageProps } from '@adonisjs/inertia/types'
import BoardsController from '#controllers/boards/boards_controller'
import { useEffect, useState } from 'react'
import { Head, router } from '@inertiajs/react'
import List from '#inertia/List'
import CreateList from '#inertia/CreateList'
import BoardHeader from '#inertia/BoardHeader'

export default function Board(props: InferPageProps<BoardsController, 'show'>) {
  const board = props.board
  const [lists, setLists] = useState(props.board.lists)

  useEffect(() => {
    setLists(props.board.lists)
  }, [props.board.lists])

  const updateTaskListInDB = (taskId: string, newListId: string) => {
    router.patch(`/tasks/${taskId}/update`, {
      newListId: newListId,
    })
  }
  return (
    <>
      <Head title={board.title} />
      <BoardHeader board={board} />
      <div className="flex flex-row flex-1 gap-4 p-4 overflow-x-auto">
        {lists?.map((list) => (
          /*TODO: clean up props*/
          <List key={list.id} list={list} tasks={list.tasks}></List>
        ))}
        <CreateList board={board} />
      </div>
    </>
  )
}
