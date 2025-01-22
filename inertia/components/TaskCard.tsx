import { Card, CardContent } from '#shadcn/card'
import TaskEditDialog from '#inertia/TaskEditDialog'
import { MutableRefObject, useRef, useState } from 'react'
import { Pencil } from 'lucide-react'
import { useTaskCardDnD } from '../hooks/useTaskCardDnD' // Nouveau hook
import TaskDto from '#dtos/task'
import { createPortal } from 'react-dom'
import { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types'

type TaskCardProps = {
  task: TaskDto
  columnId: number
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
  'idle': 'hover:outline outline-2 outline-neutral-0',
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
}: {
  task: TaskDto
  state: TCardState
  innerRef: MutableRefObject<HTMLDivElement | null>
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Card
        ref={innerRef}
        onClick={() => setIsDialogOpen(!isDialogOpen)}
        className={`p-2 hover:bg-hovered cursor-pointer group inline-block relative ${innerStyles[state.type] || ''}`}
      >
        <CardContent className="flex justify-between px-3 pt-3 pb-6 text-left">
          {task.title}
          <Pencil
            size={16}
            strokeWidth={2}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 m-0"
          />
        </CardContent>
      </Card>
      <TaskEditDialog open={isDialogOpen} task={task} onOpenChange={setIsDialogOpen} />
    </>
  )
}

function TaskCardDisplay({
  task,
  state,
  outerRef,
  innerRef,
}: {
  task: TaskDto
  state: TCardState
  outerRef?: MutableRefObject<HTMLDivElement | null>
  innerRef?: MutableRefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={outerRef}
      className={`flex flex-shrink-0 flex-col gap-2 ${outerStyles[state.type] || ''}`}
    >
      {state.type === 'is-over' && state.closestEdge === 'top' && (
        <CardShadow dragging={state.dragging} />
      )}
      <TaskCardContent task={task} state={state} innerRef={innerRef!} />
      {state.type === 'is-over' && state.closestEdge === 'bottom' && (
        <CardShadow dragging={state.dragging} />
      )}
    </div>
  )
}

export default function TaskCard({ columnId, task }: TaskCardProps) {
  const outerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const { state, portalContainer } = useTaskCardDnD({ task, columnId, outerRef, innerRef })

  return (
    <>
      <TaskCardDisplay outerRef={outerRef} innerRef={innerRef} state={state} task={task} />
      {state.type === 'preview' && portalContainer
        ? createPortal(<TaskCardDisplay state={state} task={task} />, portalContainer)
        : null}
    </>
  )
}
