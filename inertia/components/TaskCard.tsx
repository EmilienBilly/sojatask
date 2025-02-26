import { Card, CardContent } from '#shadcn/card'
import TaskEditDialog from '#inertia/TaskEditDialog'
import { MutableRefObject, useRef } from 'react'
import { Pencil } from 'lucide-react'
import { useTaskCardDnD } from '../hooks/useTaskCardDnD'
import TaskDto from '#dtos/task'
import { createPortal } from 'react-dom'
import { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types'
import { TaskCardDate } from '#inertia/TaskCardDate'
import { router, usePage } from '@inertiajs/react'
import { TaskDetailsIcons } from '#inertia/TaskDetailsIcons'

type TaskCardProps = {
  task: TaskDto
  columnId: number
  boardId: number
}

type TCardState =
  | { type: 'idle' }
  | { type: 'is-dragging' }
  | { type: 'is-dragging-and-left-self' }
  | { type: 'is-over'; dragging: DOMRect; closestEdge: Edge }
  | {
      type: 'preview'
      container: HTMLElement
      dragging: DOMRect
    }

const innerStyles: { [Key in TCardState['type']]?: string } = {
  'idle': 'hover:outline outline-1 outline-border',
  'is-dragging': 'opacity-40',
  'preview': 'rotate-6',
}

const outerStyles: { [Key in TCardState['type']]?: string } = {
  'is-dragging-and-left-self': 'hidden',
}

export function CardShadow({ dragging }: { dragging: DOMRect }) {
  return <div className="flex-shrink-0 rounded bg-gray-200" style={{ height: dragging.height }} />
}

function TaskCardContent({
  task,
  state,
  innerRef,
  boardId,
}: {
  task: TaskDto
  state: TCardState
  innerRef: MutableRefObject<HTMLDivElement | null>
  boardId: number
}) {
  const taskFromInertiaProps = usePage().props.task as TaskDto
  const isTaskEditDialogOpen = taskFromInertiaProps?.id === task.id

  const handleDialogClose = () => {
    router.get(`/boards/${boardId}`)
  }

  const handleCardClick = () => {
    router.visit(`/boards/${boardId}/${task.id}`, { only: ['task'] })
  }

  return (
    <>
      <Card
        ref={innerRef}
        onClick={handleCardClick}
        className={`hover:bg-hovered cursor-pointer group relative ${innerStyles[state.type] || ''}`}
      >
        <CardContent className="flex flex-col pt-2 px-3 pb-1 text-left">
          <div className="flex justify-between mb-1">
            <span className="text-sm">{task.title}</span>
            <Pencil
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 m-0"
            />
          </div>
          <div className="flex items-center gap-2">
            <TaskCardDate
              dueDate={task.dueDate}
              startDate={task.startDate}
              completed={task.completed}
            />
            <TaskDetailsIcons task={task} />
          </div>
        </CardContent>
      </Card>
      {isTaskEditDialogOpen && (
        <TaskEditDialog
          open={isTaskEditDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              handleDialogClose()
            }
          }}
        />
      )}
    </>
  )
}

function TaskCardDisplay({
  task,
  state,
  outerRef,
  innerRef,
  boardId,
}: {
  task: TaskDto
  state: TCardState
  outerRef?: MutableRefObject<HTMLDivElement | null>
  innerRef?: MutableRefObject<HTMLDivElement | null>
  boardId: number
}) {
  return (
    <div
      ref={outerRef}
      className={`flex flex-shrink-0 flex-col gap-2 ${outerStyles[state.type] || ''}`}
    >
      {state.type === 'is-over' && state.closestEdge === 'top' && (
        <CardShadow dragging={state.dragging} />
      )}
      <TaskCardContent task={task} state={state} innerRef={innerRef!} boardId={boardId} />
      {state.type === 'is-over' && state.closestEdge === 'bottom' && (
        <CardShadow dragging={state.dragging} />
      )}
    </div>
  )
}

export default function TaskCard({ columnId, task, boardId }: TaskCardProps) {
  const outerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const { state, portalContainer } = useTaskCardDnD({ task, columnId, outerRef, innerRef })

  return (
    <>
      <TaskCardDisplay
        outerRef={outerRef}
        innerRef={innerRef}
        state={state}
        task={task}
        boardId={boardId}
      />
      {state.type === 'preview' && portalContainer
        ? createPortal(
            <TaskCardDisplay state={state} task={task} boardId={boardId} />,
            portalContainer
          )
        : null}
    </>
  )
}
