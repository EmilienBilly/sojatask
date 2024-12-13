import { InferPageProps } from '@adonisjs/inertia/types'
import BoardsController from '#controllers/boards/boards_controller'
import { useCallback, useEffect, useState } from 'react'
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area'
import BoardHeader from '#inertia/BoardHeader'
import CreateColumn from '#inertia/CreateColumn'
import BoardColumn from '#inertia/BoardColumn'
import { SortableContext } from '@dnd-kit/sortable'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

export default function Board({ board }: InferPageProps<BoardsController, 'show'>) {
  const [columns, setColumns] = useState(board.columns)

  useEffect(() => {
    setColumns(board.columns)
  }, [board.columns])

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

  const handleDrop = useCallback(
    ({ source, location }) => {
      const draggedTaskId = source.data.card.id
      const sourceListRecord = location.initial.dropTargets[0]
      const sourceColumnId = sourceListRecord.data.columnId

      // Si la tâche est relâchée en dehors de toute liste
      if (!location.current.dropTargets.length) {
        console.log('Aucune destination valide, annulation du déplacement.')
        return
      }

      // Vérification de la liste de destination
      const destinationColumnRecord = location.current.dropTargets[0]
      const destinationColumnId = destinationColumnRecord.data.columnId

      // Vérifier si la destination est différente de la source
      if (destinationColumnId && destinationColumnId !== sourceColumnId) {
        moveCard(draggedTaskId, sourceColumnId, destinationColumnId)
        // updateTaskListInDB(draggedTaskId, destinationListId)
      } else {
        console.log('La tâche a été relâchée dans la même liste, aucune action.')
      }
    },
    [columns]
  )

  const moveCard = useCallback(
    (draggedTaskId: number, sourceListId: number, destinationListId: number) => {
      setColumns((prevLists) => {
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
            const draggedTask = columns
              .find((column) => column.id === sourceListId)
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
    [columns]
  )

  useEffect(() => {
    return monitorForElements({
      onDrop: handleDrop,
    })
  }, [handleDrop])

  return (
    <>
      <BoardHeader board={board} />
      <ScrollArea className="px-2 md:px-0 pb-4">
        <div className="flex gap-4 flex-row p-4">
          <SortableContext items={columns}>
            {columns?.map((column) => (
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
