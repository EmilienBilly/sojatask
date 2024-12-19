import { InferPageProps } from '@adonisjs/inertia/types'
import BoardsController from '#controllers/boards/boards_controller'
import { useContext, useEffect, useRef, useState } from 'react'
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area'
import BoardHeader from '#inertia/BoardHeader'
import CreateColumn from '#inertia/CreateColumn'
import BoardColumn from '#inertia/BoardColumn'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge'
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { isColumnData } from '#inertia/utils/column.business'
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder'
import {
  Column,
  isCardData,
  isCardDropTargetData,
  isDraggingACard,
  isDraggingAColumn,
} from '#inertia/utils/kanbanboard.business'
import { SettingsContext } from '#inertia/utils/settings-context'
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element'
import { unsafeOverflowAutoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element'
import invariant from 'tiny-invariant'

export default function Board({ board }: InferPageProps<BoardsController, 'show'>) {
  const [boardData, setBoardData] = useState(board)
  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const { settings } = useContext(SettingsContext)

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
    const element = scrollableRef.current
    invariant(element)
    return combine(
      monitorForElements({
        canMonitor: isDraggingACard,
        onDrop({ source, location }) {
          const draggingElement = source.data
          if (!isCardData(draggingElement)) {
            return
          }

          const innerMost = location.current.dropTargets[0]

          if (!innerMost) {
            return
          }
          const dropTargetData = innerMost.data
          const homeColumnIndex = boardData.columns.findIndex(
            (column) => column.id === draggingElement.columnId
          )
          const home: Column | undefined = boardData.columns[homeColumnIndex]

          if (!home) {
            return
          }
          const cardIndexInHome = home.tasks.findIndex(
            (task) => task.id === draggingElement.task.id
          )

          // dropping on a card
          if (isCardDropTargetData(dropTargetData)) {
            const destinationColumnIndex = boardData.columns.findIndex(
              (column) => column.id === dropTargetData.columnId
            )
            const destination = boardData.columns[destinationColumnIndex]
            // reordering in home column
            if (home === destination) {
              const cardFinishIndex = home.tasks.findIndex(
                (task) => task.id === dropTargetData.task.id
              )

              // could not find cards needed
              if (cardIndexInHome === -1 || cardFinishIndex === -1) {
                return
              }

              // no change needed
              if (cardIndexInHome === cardFinishIndex) {
                return
              }

              const closestEdge = extractClosestEdge(dropTargetData)

              const reordered = reorderWithEdge({
                axis: 'vertical',
                list: home.tasks,
                startIndex: cardIndexInHome,
                indexOfTarget: cardFinishIndex,
                closestEdgeOfTarget: closestEdge,
              })

              const updated: Column = {
                ...home,
                cards: reordered,
              }
              const columns = Array.from(boardData.columns)
              columns[homeColumnIndex] = updated
              setBoardData({ ...boardData, columns })
              return
            }

            // moving card from one column to another

            // unable to find destination
            if (!destination) {
              return
            }

            const indexOfTarget = destination.tasks.findIndex(
              (task) => task.id === dropTargetData.task.id
            )

            const closestEdge = extractClosestEdge(dropTargetData)
            const finalIndex = closestEdge === 'bottom' ? indexOfTarget + 1 : indexOfTarget

            // remove card from home list
            const homeCards = Array.from(home.tasks)
            homeCards.splice(cardIndexInHome, 1)

            // insert into destination list
            const destinationCards = Array.from(destination.tasks)
            destinationCards.splice(finalIndex, 0, draggingElement.task)

            const columns = Array.from(boardData.columns)
            columns[homeColumnIndex] = {
              ...home,
              tasks: homeCards,
            }
            columns[destinationColumnIndex] = {
              ...destination,
              tasks: destinationCards,
            }
            setBoardData({ ...boardData, columns })
            return
          }

          // dropping onto a column, but not onto a card
          if (isColumnData(dropTargetData)) {
            const destinationColumnIndex = boardData.columns.findIndex(
              (column) => column.id === dropTargetData.column.id
            )
            const destination = boardData.columns[destinationColumnIndex]

            if (!destination) {
              return
            }

            // dropping on home
            if (home === destination) {
              console.log('moving card to home column')

              // move to last position
              const reordered = reorder({
                list: home.tasks,
                startIndex: cardIndexInHome,
                finishIndex: home.tasks.length - 1,
              })

              const updated: Column = {
                ...home,
                cards: reordered,
              }
              const columns = Array.from(boardData.columns)
              columns[homeColumnIndex] = updated
              setBoardData({ ...boardData, columns })
              return
            }

            console.log('moving card to another column')

            // remove card from home list

            const homeCards = Array.from(home.tasks)
            homeCards.splice(cardIndexInHome, 1)

            // insert into destination list
            const destinationCards = Array.from(destination.tasks)
            destinationCards.splice(destination.tasks.length, 0, draggingElement.task)

            const columns = Array.from(boardData.columns)
            columns[homeColumnIndex] = {
              ...home,
              tasks: homeCards,
            }
            columns[destinationColumnIndex] = {
              ...destination,
              tasks: destinationCards,
            }
            setBoardData({ ...boardData, columns })
            return
          }
        },
      }),
      monitorForElements({
        canMonitor: isDraggingAColumn,
        onDrop({ source, location }) {
          const dragging = source.data
          if (!isColumnData(dragging)) {
            return
          }

          const innerMost = location.current.dropTargets[0]

          if (!innerMost) {
            return
          }
          const dropTargetData = innerMost.data

          if (!isColumnData(dropTargetData)) {
            return
          }

          const homeIndex = boardData.columns.findIndex(
            (column) => column.id === dragging.column.id
          )
          const destinationIndex = boardData.columns.findIndex(
            (column) => column.id === dropTargetData.column.id
          )

          if (homeIndex === -1 || destinationIndex === -1) {
            return
          }

          if (homeIndex === destinationIndex) {
            return
          }

          const reordered = reorder({
            list: boardData.columns,
            startIndex: homeIndex,
            finishIndex: destinationIndex,
          })
          setBoardData({ ...boardData, columns: reordered })
        },
      }),
      autoScrollForElements({
        canScroll({ source }) {
          if (!settings.isOverElementAutoScrollEnabled) {
            return false
          }

          return isDraggingACard({ source }) || isDraggingAColumn({ source })
        },
        getConfiguration: () => ({ maxScrollSpeed: settings.boardScrollSpeed }),
        element,
      }),
      unsafeOverflowAutoScrollForElements({
        element,
        getConfiguration: () => ({ maxScrollSpeed: settings.boardScrollSpeed }),
        canScroll({ source }) {
          if (!settings.isOverElementAutoScrollEnabled) {
            return false
          }

          let settings
          if (!settings.isOverflowScrollingEnabled) {
            return false
          }

          return isDraggingACard({ source }) || isDraggingAColumn({ source })
        },
        getOverflow() {
          return {
            forLeftEdge: {
              top: 1000,
              left: 1000,
              bottom: 1000,
            },
            forRightEdge: {
              top: 1000,
              right: 1000,
              bottom: 1000,
            },
          }
        },
      })
    )
  }, [])

  return (
    <>
      <BoardHeader board={boardData} />
      <ScrollArea className="px-2 md:px-0 pb-4">
        <div ref={scrollableRef} className="flex gap-4 flex-row p-4">
          {boardData.columns?.map((column) => (
            <BoardColumn
              key={column.id}
              columnId={column.id}
              column={column}
              tasks={column.tasks}
            />
          ))}
          <CreateColumn board={boardData} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  )
}
