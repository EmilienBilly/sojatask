import { Card, CardContent } from '#shadcn/card'
import TaskEditDialog from '#inertia/TaskEditDialog'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Pencil } from 'lucide-react'
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
      dimensions: {
        width: number
        height: number
      }
    }

const idle: TCardState = { type: 'idle' }

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

export function TaskCardDisplay({
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
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const cardStyle =
    state.type === 'preview'
      ? {
          width: state.dimensions.width,
          height: state.dimensions.height,
        }
      : {}

  return (
    <div
      ref={outerRef}
      className={`flex flex-shrink-0 flex-col gap-2 px-3 py-1 ${outerStyles[state.type] || ''}`}
      style={cardStyle}
    >
      {state.type === 'is-over' && state.closestEdge === 'top' ? (
        <CardShadow dragging={state.dragging} />
      ) : null}
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
      {state.type === 'is-over' && state.closestEdge === 'bottom' ? (
        <CardShadow dragging={state.dragging} />
      ) : null}
      <TaskEditDialog open={isDialogOpen} task={task} onOpenChange={setIsDialogOpen} />
    </div>
  )
}

export default function TaskCard({ columnId, task }: TaskCardProps) {
  const outerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<TCardState>(idle)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    invariant(outer && inner)

    return combine(
      draggable({
        element: inner,
        getInitialData: ({ element }) =>
          getTaskData({ task, columnId, rect: element.getBoundingClientRect() }),
        onGenerateDragPreview({ nativeSetDragImage, location, source }) {
          const data = source.data
          invariant(isCardData(data))

          const rect = inner.getBoundingClientRect()

          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({
              element: inner,
              input: location.current.input,
            }),
            render({ container }) {
              setState({
                type: 'preview',
                container,
                dragging: rect,
                dimensions: {
                  width: rect.width,
                  height: rect.height,
                },
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
        element: outer,
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
      <TaskCardDisplay outerRef={outerRef} innerRef={innerRef} state={state} task={task} />
      {state.type === 'preview'
        ? createPortal(<TaskCardDisplay state={state} task={task} />, state.container)
        : null}
    </>
  )
}
