import { Card, CardContent, CardHeader } from '#shadcn/card'
import EditTaskDialog from '#inertia/EditTaskDialog'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { GripVertical, Pencil } from 'lucide-react'
import { Button } from '#shadcn/button'
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import invariant from 'tiny-invariant'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types'
import {
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import {
  getCardDropTargetData,
  getTaskData,
  isCardData,
  isDraggingACard,
  isShallowEqual,
} from '#inertia/utils/kanbanboard.business'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source'
import { createPortal } from 'react-dom'
import TaskDto from '#dtos/task'

type TaskCardProps = {
  task: TaskDto
  columnId: number
}

type TCardState =
  | {
      type: 'idle'
    }
  | {
      type: 'is-dragging'
    }
  | {
      type: 'is-dragging-and-left-self'
    }
  | {
      type: 'is-over'
      dragging: DOMRect
      closestEdge: Edge
    }
  | {
      type: 'preview'
      container: HTMLElement
      dragging: DOMRect
    }

const idle: TCardState = { type: 'idle' }

const innerStyles: { [Key in TCardState['type']]?: string } = {
  'idle': 'hover:outline outline-2 outline-neutral-50 cursor-grab',
  'is-dragging': 'opacity-40',
  'is-dragging-and-left-self': 'hidden',
}

export function CardShadow({ dragging }: { dragging: DOMRect }) {
  return <div className="flex-shrink-0 rounded bg-gray-200" style={{ height: dragging.height }} />
}

export function TaskCardDisplay({
  task,
  state,
  taskCardref,
}: {
  task: TaskDto
  state: TCardState
  taskCardref?: MutableRefObject<HTMLDivElement | null>
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      {/* Put a shadow before the item if closer to the top edge */}
      {state.type === 'is-over' && state.closestEdge === 'top' ? (
        <CardShadow dragging={state.dragging} />
      ) : null}
      <Card
        ref={taskCardref}
        onClick={() => setIsDialogOpen(!isDialogOpen)}
        className={`hover:bg-hovered cursor-pointer group inline-block relative ${innerStyles[state.type]}`}
      >
        <CardHeader className="px-3 py-3 justify-between items-center flex flex-row border-b-2 border-secondary relative">
          <Button
            variant={'ghost'}
            className="p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab"
          >
            <span className="sr-only">Move task</span>
            <GripVertical />
          </Button>
          <Pencil
            size={16}
            strokeWidth={2}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 m-0"
          />
        </CardHeader>
        <CardContent className="px-3 pt-3 pb-6 text-left">{task.title}</CardContent>
      </Card>
      {/* Put a shadow after the item if closer to the bottom edge */}
      {state.type === 'is-over' && state.closestEdge === 'bottom' ? (
        <CardShadow dragging={state.dragging} />
      ) : null}
      <EditTaskDialog open={isDialogOpen} task={task} onOpenChange={setIsDialogOpen} />
    </>
  )
}

export default function TaskCard({ columnId, task }: TaskCardProps) {
  const taskCardRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<TCardState>(idle)

  useEffect(() => {
    const taskElement = taskCardRef.current
    invariant(taskElement)
    return combine(
      draggable({
        element: taskElement,
        getInitialData: ({ element }) =>
          getTaskData({ task, columnId, rect: element.getBoundingClientRect() }),
        onGenerateDragPreview({ nativeSetDragImage, location, source }) {
          const data = source.data
          invariant(isCardData(data))
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({
              element: taskElement,
              input: location.current.input,
            }),
            render({ container }) {
              // Demonstrating using a react portal to generate a preview
              setState({
                type: 'preview',
                container,
                dragging: taskElement.getBoundingClientRect(),
              })
            },
          })
        },
        onDragStart() {
          setState({ type: 'is-dragging' })
        },
        onDrop() {
          setState(idle)
        },
      }),
      dropTargetForElements({
        element: taskElement,
        getIsSticky: () => true,
        canDrop: isDraggingACard,
        getData: ({ element, input }) => {
          const data = getCardDropTargetData({ task, columnId })
          return attachClosestEdge(data, { element, input, allowedEdges: ['top', 'bottom'] })
        },
        onDragEnter({ source, self }) {
          if (!isCardData(source.data)) {
            return
          }
          if (source.data.task.id === task.id) {
            return
          }
          const closestEdge = extractClosestEdge(self.data)
          if (!closestEdge) {
            return
          }

          setState({ type: 'is-over', dragging: source.data.rect, closestEdge })
        },
        onDrag({ source, self }) {
          if (!isCardData(source.data)) {
            return
          }
          if (source.data.task.id === task.id) {
            return
          }
          const closestEdge = extractClosestEdge(self.data)
          if (!closestEdge) {
            return
          }
          // optimization - Don't update react state if we don't need to.
          const proposed: TCardState = { type: 'is-over', dragging: source.data.rect, closestEdge }
          setState((current) => {
            if (isShallowEqual(proposed, current)) {
              return current
            }
            return proposed
          })
        },
        onDragLeave({ source }) {
          if (!isCardData(source.data)) {
            return
          }
          if (source.data.task.id === task.id) {
            setState({ type: 'is-dragging-and-left-self' })
            return
          }
          setState(idle)
        },
        onDrop() {
          setState(idle)
        },
      })
    )
  }, [task, columnId])

  return (
    <>
      <TaskCardDisplay taskCardref={taskCardRef} state={state} task={task} />
      {state.type === 'preview'
        ? createPortal(<TaskCardDisplay state={state} task={task} />, state.container)
        : null}
    </>
  )
}
