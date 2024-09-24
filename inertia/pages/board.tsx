import { InferPageProps } from '@adonisjs/inertia/types'
import BoardsController from '#controllers/boards/boards_controller'
import { BoardType } from '~/types/board'
import styled from 'styled-components'
import CreateListButton from '~/components/CreateListButton'
import { DndContext } from '@dnd-kit/core'
import { useState } from 'react'
import DraggableTask from '~/components/DraggableTask'
import DroppableList from '~/components/DroppableList'

const BoardCanva = styled.div`
  display: flex;
  gap: 20px;
  flex-grow: 1;
  margin-top: 12px;
  position: relative;
`

export default function Board(props: InferPageProps<BoardsController, 'show'>) {
  const board: BoardType = props.board
  const lists = props.lists
  console.log(lists)

  const [parent, setParent] = useState(null)
  const draggableMarkup = <DraggableTask id="draggable">Drag me</DraggableTask>

  function handleDragEnd(event) {
    const { over } = event
    setParent(over ? over.id : null)
  }

  return (
    <>
      <h1>{board.title}</h1>
      <div>{board.description}</div>
      <BoardCanva>
        <DndContext onDragEnd={handleDragEnd}>
          {parent === null ? draggableMarkup : null}
          {lists?.map((list) => (
            <DroppableList key={list.id} id={list.id} title={list.title} tasks={list.tasks}>
              {parent === list.id ? draggableMarkup : 'Drop here'}
            </DroppableList>
          ))}
          <CreateListButton board={board} />
        </DndContext>
      </BoardCanva>
    </>
  )
}
