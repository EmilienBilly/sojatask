import { InferPageProps } from '@adonisjs/inertia/types'
import BoardsController from '#controllers/boards/boards_controller'
import { useCallback, useEffect, useState } from 'react'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
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

  const handleDrop = useCallback(
    ({ source, location }) => {
      const draggedTaskId = source.data.taskId
      const [, sourceListRecord] = location.initial.dropTargets
      const sourceListId = sourceListRecord.data.listId

      // Si la tâche est relâchée en dehors de toute liste
      if (!location.current.dropTargets.length) {
        console.log('Aucune destination valide, annulation du déplacement.')
        return
      }

      // Vérification de la liste de destination
      const destinationListRecord = location.current.dropTargets[0]
      const destinationListId = destinationListRecord.data.listId

      // Vérifier si la destination est différente de la source
      if (destinationListId && destinationListId !== sourceListId) {
        moveCard(draggedTaskId, sourceListId, destinationListId)
        updateTaskListInDB(draggedTaskId, destinationListId)
      } else {
        console.log('La tâche a été relâchée dans la même liste, aucune action.')
      }
    },
    [lists]
  )

  const moveCard = useCallback(
    (draggedTaskId: number, sourceListId: number, destinationListId: number) => {
      setLists((prevLists) => {
        return prevLists.map((prevList) => {
          if (prevList.id === sourceListId) {
            // Retirer la tâche de la liste source
            return {
              ...prevList,
              tasks: prevList.tasks.filter((task) => task.id !== draggedTaskId),
            }
          }
          if (prevList.id === destinationListId) {
            // Ajouter la tâche à la liste destination
            const draggedTask = lists
              .find((list) => list.id === sourceListId)
              ?.tasks.find((task) => task.id === draggedTaskId)

            return {
              ...prevList,
              tasks: [...prevList.tasks, { ...draggedTask, listId: destinationListId }],
            }
          }
          return prevList
        })
      })
    },
    [lists]
  )

  const updateTaskListInDB = (taskId: string, newListId: string) => {
    router.patch(`/tasks/${taskId}/update`, {
      newListId: newListId,
    })
  }

  useEffect(() => {
    return monitorForElements({
      onDrop: handleDrop,
    })
  }, [handleDrop])
  return (
    <>
      <Head title={board.title} />
      <BoardHeader board={board} />
      <div className="flex flex-row flex-1 gap-4 p-4 overflow-x-auto">
        {lists?.map((list) => (
          /*TODO: clean up props*/
          <List key={list.id} listId={list.id} list={list} tasks={list.tasks}></List>
        ))}
        <CreateList board={board} />
      </div>
    </>
  )
}
