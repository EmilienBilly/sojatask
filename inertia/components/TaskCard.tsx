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
import { isSafari } from '#inertia/utils/isSafari'

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
  'idle': 'hover:outline outline-2 outline-neutral-50',
  'is-dragging': 'opacity-100',
  'preview': 'bg-amber-500',
}

const outerStyles: { [Key in TCardState['type']]?: string } = {
  // We no longer render the draggable item after we have left it
  // as it's space will be taken up by a shadow on adjacent items.
  // Using `display:none` rather than returning `null` so we can always
  // return refs from this component.
  // Keeping the refs allows us to continue to receive events during the drag.
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

  return (
    <div
      ref={outerRef}
      className={`flex flex-shrink-0 flex-col gap-2 px-3 py-1 ${outerStyles[state.type]}`}
    >
      {/* Put a shadow before the item if closer to the top edge */}
      {state.type === 'is-over' && state.closestEdge === 'top' ? (
        <CardShadow dragging={state.dragging} />
      ) : null}
      <Card
        ref={innerRef}
        onClick={() => setIsDialogOpen(!isDialogOpen)}
        className={`p-2 hover:bg-hovered cursor-pointer group inline-block relative ${innerStyles[state.type]}`}
        style={
          state.type === 'preview'
            ? {
                width: state.dragging.width,
                height: state.dragging.height,
                transform: !isSafari() ? 'rotate(4deg)' : undefined,
              }
            : undefined
        }
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
      {/* Put a shadow after the item if closer to the bottom edge */}
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
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({
              element: inner,
              input: location.current.input,
            }),
            render({ container }) {
              // Demonstrating using a react portal to generate a preview
              setState({
                type: 'preview',
                container,
                dragging: inner.getBoundingClientRect(),
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
      <TaskCardDisplay outerRef={outerRef} innerRef={innerRef} state={state} task={task} />
      {state.type === 'preview'
        ? createPortal(<TaskCardDisplay state={state} task={task} />, state.container)
        : null}
    </>
  )
}
