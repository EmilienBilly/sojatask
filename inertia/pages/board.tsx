import { InferPageProps } from '@adonisjs/inertia/types'
import BoardsController from '#controllers/boards/boards_controller'
import { useEffect, useRef, useState } from 'react'
import BoardHeader from '#inertia/BoardHeader'
import CreateColumn from '#inertia/CreateColumn'
import BoardColumn from '#inertia/BoardColumn'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge'
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder'
import {
  blockBoardPanningAttr,
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
  isDraggingAColumn,
} from '#inertia/utils/kanbanboard.business'
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element'
import { unsafeOverflowAutoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element'
import invariant from 'tiny-invariant'
import { CleanupFn } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types'
import { bindAll } from 'bind-event-listener'
import { router } from '@inertiajs/react'
import BoardDto from '#dtos/board'
import ColumnDto from '#dtos/column'

export default function Board({ board }: InferPageProps<BoardsController, 'show'>) {
  const [boardData, setBoardData] = useState(board)
  const scrollableRef = useRef<HTMLDivElement | null>(null)

  function saveColumnOrder(updatedBoard: BoardDto) {
    const ids = updatedBoard.columns.map((column) => column.id)
    router.patch(`/boards/${updatedBoard.id}/columns/order`, { ids })
  }

  function saveTaskOrder(updatedBoard: BoardDto) {
    const columns = updatedBoard.columns.map((column) => ({
      id: column.id,
      tasks: column.tasks.map((task) => task.id),
    }))
    router.patch(`/boards/${updatedBoard.id}/tasks/order`, { columns })
  }

  useEffect(() => {
    setBoardData(board)
  }, [board])

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

          const dropTarget = location.current.dropTargets[0]

          if (!dropTarget) {
            return
          }
          const dropTargetData = dropTarget.data
          const homeColumnIndex = boardData.columns.findIndex(
            (column) => column.id === draggingElement.columnId
          )
          const homeColumn: ColumnDto | undefined = boardData.columns[homeColumnIndex]

          if (!homeColumn) {
            return
          }
          const taskIndexInHomeColumn = homeColumn.tasks.findIndex(
            (task) => task.id === draggingElement.task.id
          )

          // dropping on a card
          if (isCardDropTargetData(dropTargetData)) {
            const destinationColumnIndex = boardData.columns.findIndex(
              (column) => column.id === dropTargetData.columnId
            )
            const destination = boardData.columns[destinationColumnIndex]
            // reordering in home column
            if (homeColumn === destination) {
              const taskIndexInDroppedColumn = homeColumn.tasks.findIndex(
                (task) => task.id === dropTargetData.task.id
              )

              // could not find cards needed
              if (taskIndexInHomeColumn === -1 || taskIndexInDroppedColumn === -1) {
                return
              }

              // no change needed
              if (taskIndexInHomeColumn === taskIndexInDroppedColumn) {
                return
              }

              const closestEdge = extractClosestEdge(dropTargetData)

              const reordered = reorderWithEdge({
                axis: 'vertical',
                list: homeColumn.tasks,
                startIndex: taskIndexInHomeColumn,
                indexOfTarget: taskIndexInDroppedColumn,
                closestEdgeOfTarget: closestEdge,
              })

              const updated: ColumnDto = {
                ...homeColumn,
                tasks: reordered,
              }
              const columns = Array.from(boardData.columns)
              columns[homeColumnIndex] = updated
              const updatedBoardData = { ...boardData, columns }

              setBoardData(updatedBoardData)
              saveTaskOrder(updatedBoardData)
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
            const homeCards = Array.from(homeColumn.tasks)
            homeCards.splice(taskIndexInHomeColumn, 1)

            // insert into destination list
            const destinationCards = Array.from(destination.tasks)
            destinationCards.splice(finalIndex, 0, draggingElement.task)

            const columns = Array.from(boardData.columns)
            columns[homeColumnIndex] = {
              ...homeColumn,
              tasks: homeCards,
            }
            columns[destinationColumnIndex] = {
              ...destination,
              tasks: destinationCards,
            }
            const updatedBoardData = { ...boardData, columns }

            setBoardData(updatedBoardData)
            saveTaskOrder(updatedBoardData)
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
            if (homeColumn === destination) {
              // move to last position
              const reordered = reorder({
                list: homeColumn.tasks,
                startIndex: taskIndexInHomeColumn,
                finishIndex: homeColumn.tasks.length - 1,
              })

              const updated: ColumnDto = {
                ...homeColumn,
                tasks: reordered,
              }
              const columns = Array.from(boardData.columns)
              columns[homeColumnIndex] = updated
              const updatedBoardData = { ...boardData, columns }

              setBoardData(updatedBoardData)
              saveTaskOrder(updatedBoardData)
              return
            }

            // remove card from home list

            const homeCards = Array.from(homeColumn.tasks)
            homeCards.splice(taskIndexInHomeColumn, 1)

            // insert into destination list
            const destinationCards = Array.from(destination.tasks)
            destinationCards.splice(destination.tasks.length, 0, draggingElement.task)

            const columns = Array.from(boardData.columns)
            columns[homeColumnIndex] = {
              ...homeColumn,
              tasks: homeCards,
            }
            columns[destinationColumnIndex] = {
              ...destination,
              tasks: destinationCards,
            }
            const updatedBoardData = { ...boardData, columns }

            setBoardData(updatedBoardData)
            saveTaskOrder(updatedBoardData)
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

          const updatedBoardData = { ...boardData, columns: reordered }
          setBoardData(updatedBoardData)
          saveColumnOrder(updatedBoardData)
        },
      }),
      autoScrollForElements({
        getConfiguration: () => ({ maxScrollSpeed: 'fast' }),
        element,
      }),
      unsafeOverflowAutoScrollForElements({
        element,
        getConfiguration: () => ({ maxScrollSpeed: 'fast' }),
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
  }, [boardData])

  // Panning the board
  useEffect(() => {
    let cleanupActive: CleanupFn | null = null
    const scrollable = scrollableRef.current
    invariant(scrollable)

    function begin({ startX }: { startX: number }) {
      let lastX = startX

      const cleanupEvents = bindAll(
        window,
        [
          {
            type: 'pointermove',
            listener(event) {
              const currentX = event.clientX
              const diffX = lastX - currentX

              lastX = currentX
              scrollable?.scrollBy({ left: diffX })
            },
          },
          // stop panning if we see any of these events
          ...(
            [
              'pointercancel',
              'pointerup',
              'pointerdown',
              'keydown',
              'resize',
              'click',
              'visibilitychange',
            ] as const
          ).map((eventName) => ({ type: eventName, listener: () => cleanupEvents() })),
        ],
        // need to make sure we are not after the "pointerdown" on the scrollable
        // Also this is helpful to make sure we always hear about events from this point
        { capture: true }
      )

      cleanupActive = cleanupEvents
    }

    const cleanupStart = bindAll(scrollable, [
      {
        type: 'pointerdown',
        listener(event) {
          if (!(event.target instanceof HTMLElement)) {
            return
          }
          // ignore interactive elements
          if (event.target.closest(`[${blockBoardPanningAttr}]`)) {
            return
          }

          begin({ startX: event.clientX })
        },
      },
    ])

    return function cleanupAll() {
      cleanupStart()
      cleanupActive?.()
    }
  }, [])

  return (
    <>
      <BoardHeader board={boardData} />
      <div ref={scrollableRef} className="flex gap-8 flex-row p-4 overflow-x-auto">
        {boardData.columns?.map((column) => <BoardColumn key={column.id} column={column} />)}
        <CreateColumn board={boardData} />
      </div>
    </>
  )
}
