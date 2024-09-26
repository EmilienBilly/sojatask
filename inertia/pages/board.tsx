import { InferPageProps } from '@adonisjs/inertia/types'
import BoardsController from '#controllers/boards/boards_controller'
import { BoardType } from '~/types/board'
import { ListType } from '~/types/list'
import styled from 'styled-components'
import CreateListButton from '~/components/CreateListButton'
import List from '~/components/List'
import { useCallback, useEffect, useState } from 'react'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

const BoardCanva = styled.div`
  display: flex;
  gap: 20px;
  flex-grow: 1;
  margin-top: 12px;
  position: relative;
`

export default function Board(props: InferPageProps<BoardsController, 'show'>) {
  const board: BoardType = props.board
  const [lists, setLists] = useState<ListType[]>(props.board.lists)

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
      } else {
        console.log('La tâche a été relâchée dans la même liste, aucune action.')
      }
    },
    [lists]
  )

  const moveCard = useCallback(
    (draggedTaskId, sourceListId, destinationListId) => {
      setLists((prevLists) => {
        return prevLists.map((list) => {
          if (list.id === sourceListId) {
            // Retirer la tâche de la liste source
            return {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== draggedTaskId),
            }
          }
          if (list.id === destinationListId) {
            // Ajouter la tâche à la liste destination
            const draggedTask = lists
              .find((list) => list.id === sourceListId)
              ?.tasks.find((task) => task.id === draggedTaskId)

            return {
              ...list,
              tasks: [...list.tasks, { ...draggedTask, listId: destinationListId }],
            }
          }
          return list
        })
      })
    },
    [lists]
  )

  useEffect(() => {
    return monitorForElements({
      onDrop: handleDrop,
    })
  }, [handleDrop])
  return (
    <>
      <h1>{board.title}</h1>
      <div>{board.description}</div>
      <BoardCanva>
        {lists?.map((list) => (
          <List key={list.id} listId={list.id} list={list} tasks={list.tasks}></List>
        ))}
        <CreateListButton board={board} />
      </BoardCanva>
    </>
  )
}
