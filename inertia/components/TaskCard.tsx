import { Card, CardContent, CardHeader } from '#shadcn/card'
import EditTaskDialog from '#inertia/EditTaskDialog'
import { useEffect, useRef, useState } from 'react'
import { GripVertical, Pencil } from 'lucide-react'
import { Button } from '#shadcn/button'
import { Task } from '../types/task'
import { cva } from 'class-variance-authority'
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import invariant from 'tiny-invariant'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import DropIndicator from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box'
import { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types'
import {
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { getTaskData } from '#inertia/utils/kanbanboard.business'

type TaskCardProps = {
  task: Task
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
}

const outerStyles: { [Key in TCardState['type']]?: string } = {
  // We no longer render the draggable item after we have left it
  // as it's space will be taken up by a shadow on adjacent items.
  // Using `display:none` rather than returning `null` so we can always
  // return refs from this component.
  // Keeping the refs allows us to continue to receive events during the drag.
  'is-dragging-and-left-self': 'hidden',
}

export default function TaskCard({ columnId, task }: TaskCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dragging, setDragging] = useState<boolean>(false)
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null)

  const ref = useRef(null)

  useEffect(() => {
    const taskCardElement = ref.current
    invariant(taskCardElement)
    return combine(
      draggable({
        element: taskCardElement,
        getInitialData: () => {
          return getTaskData({ task, columnId })
        },
        onDragStart: ({ source }) => {
          setDragging(true)
          console.log(source)
        },
        onDrop: () => setDragging(false),
      }),

      dropTargetForElements({
        element: taskCardElement,
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          const data = getTaskData({ task, columnId })
          return attachClosestEdge(data, {
            input,
            element,
            // you can specify what edges you want to allow the user to be closest to
            allowedEdges: ['top', 'bottom'],
          })
        },
        canDrop({ source }) {
          return source.element !== taskCardElement
        },
        onDragEnter: ({ self }) => {
          const edge = extractClosestEdge(self.data)
          if (!edge) {
            return
          }
          setClosestEdge(edge)
        },
        onDrag: ({ self }) => {
          const edge = extractClosestEdge(self.data)
          if (!edge) {
            return
          }
          setClosestEdge(edge)
        },
        onDragLeave: () => {
          setClosestEdge(null)
        },
        onDrop: () => {
          setClosestEdge(null)
        },
      })
    )
  }, [task])

  const variants = cva('hover:bg-hovered cursor-pointer group inline-block relative', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary',
      },
    },
  })

  return (
    <>
      <Card
        ref={ref}
        onClick={() => setIsDialogOpen(!isDialogOpen)}
        className={variants({
          dragging: dragging ? 'over' : undefined,
        })}
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
        {closestEdge && <DropIndicator edge={closestEdge} gap="8px" />}
      </Card>
      <EditTaskDialog open={isDialogOpen} task={task} onOpenChange={setIsDialogOpen} />
    </>
  )
}
