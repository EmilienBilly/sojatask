import CreateTask from '#inertia/CreateTask'
import { Card, CardContent, CardHeader } from '#shadcn/card'
import { ScrollArea } from '#shadcn/scroll-area'
import { Column } from '../types/column'
import { Task } from '../types/task'
import { memo, useContext, useEffect, useRef, useState } from 'react'
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { getColumnData, isColumnData } from '#inertia/utils/column.business'
import TaskCard from '#inertia/TaskCard'
import {
  isCardData,
  isCardDropTargetData,
  isDraggingACard,
  isDraggingAColumn,
  isShallowEqual,
  TaskData,
} from '#inertia/utils/kanbanboard.business'
import invariant from 'tiny-invariant'
import { SettingsContext } from '#inertia/utils/settings-context'
import { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/types'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source'
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element'
import { unsafeOverflowAutoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element'

type ListProps = {
  columnId: number
  tasks: Task[]
  column: Column
  isOverlay?: boolean
}

type TColumnState =
  | {
      type: 'is-card-over'
      isOverChildCard: boolean
      dragging: DOMRect
    }
  | {
      type: 'is-column-over'
    }
  | {
      type: 'idle'
    }
  | {
      type: 'is-dragging'
    }

const stateStyles: { [Key in TColumnState['type']]: string } = {
  'idle': 'cursor-grab',
  'is-card-over': 'outline outline-2 outline-neutral-50',
  'is-dragging': 'opacity-40',
  'is-column-over': 'bg-slate-900',
}

const idle = { type: 'idle' } satisfies TColumnState

/**
 * A memoized component for rendering out the card.
 *
 * Created so that state changes to the column don't require all cards to be rendered
 */
const TaskCardList = memo(function CardList({ column }: { column: Column }) {
  return column.tasks.map((task) => <TaskCard key={task.id} task={task} columnId={column.id} />)
})

export default function BoardColumn({ columnId, tasks, column }: ListProps) {
  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const outerFullHeightRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const { settings } = useContext(SettingsContext)
  const [state, setState] = useState<TColumnState>(idle)

  useEffect(() => {
    const outer = outerFullHeightRef.current
    const scrollable = scrollableRef.current
    const header = headerRef.current
    const inner = innerRef.current
    invariant(outer)
    invariant(scrollable)
    invariant(header)
    invariant(inner)

    const columnData = getColumnData(column)

    function setIsCardOver({ data, location }: { data: TaskData; location: DragLocationHistory }) {
      const innerMost = location.current.dropTargets[0]
      const isOverChildCard = Boolean(innerMost && isCardDropTargetData(innerMost.data))

      const proposed: TColumnState = {
        type: 'is-card-over',
        dragging: data.rect,
        isOverChildCard,
      }
      // optimization - don't update state if we don't need to.
      setState((current) => {
        if (isShallowEqual(proposed, current)) {
          return current
        }
        return proposed
      })
    }

    return combine(
      draggable({
        element: header,
        getInitialData: () => columnData,
        onGenerateDragPreview({ source, location, nativeSetDragImage }) {
          const data = source.data
          invariant(isColumnData(data))
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({ element: header, input: location.current.input }),
            render({ container }) {
              // Simple drag preview generation: just cloning the current element.
              // Not using react for this.
              const rect = inner.getBoundingClientRect()
              const preview = inner.cloneNode(true)
              invariant(preview instanceof HTMLElement)
              preview.style.width = `${rect.width}px`
              preview.style.height = `${rect.height}px`

              // // rotation of native drag previews does not work in safari
              // if (!isSafari()) {
              //   preview.style.transform = 'rotate(4deg)'
              // }

              container.appendChild(preview)
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
        getData: () => columnData,
        canDrop({ source }) {
          return isDraggingACard({ source }) || isDraggingAColumn({ source })
        },
        getIsSticky: () => true,
        onDragStart({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location })
          }
        },
        onDragEnter({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location })
            return
          }
          if (isColumnData(source.data) && source.data.column.id !== column.id) {
            setState({ type: 'is-column-over' })
          }
        },
        onDropTargetChange({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location })
            return
          }
        },
        onDragLeave({ source }) {
          if (isColumnData(source.data) && source.data.column.id === column.id) {
            return
          }
          setState(idle)
        },
        onDrop() {
          setState(idle)
        },
      }),
      autoScrollForElements({
        canScroll({ source }) {
          if (!settings.isOverElementAutoScrollEnabled) {
            return false
          }

          return isDraggingACard({ source })
        },
        getConfiguration: () => ({ maxScrollSpeed: settings.columnScrollSpeed }),
        element: scrollable,
      }),
      unsafeOverflowAutoScrollForElements({
        element: scrollable,
        getConfiguration: () => ({ maxScrollSpeed: settings.columnScrollSpeed }),
        canScroll({ source }) {
          if (!settings.isOverElementAutoScrollEnabled) {
            return false
          }

          if (!settings.isOverflowScrollingEnabled) {
            return false
          }

          return isDraggingACard({ source })
        },
        getOverflow() {
          return {
            forTopEdge: {
              top: 1000,
            },
            forBottomEdge: {
              bottom: 1000,
            },
          }
        },
      })
    )
  }, [column, settings])

  return (
    <div ref={outerFullHeightRef} className="">
      <Card
        ref={innerRef}
        className={`h-[720px] max-h-[720px] w-[350px] max-w-full bg-primary-foreground flex flex-col flex-shrink-0 snap-center ${stateStyles[state.type]}`}
      >
        <CardHeader
          ref={headerRef}
          className="p-4 font-semibold border-b-2 text-left flex flex-row space-between items-center"
        >
          {column.title}
        </CardHeader>
        <ScrollArea ref={scrollableRef}>
          <CardContent className="flex flex-grow flex-col gap-2 p-2">
            <TaskCardList column={column} />
            <CreateTask columnId={column.id} />
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  )
}
