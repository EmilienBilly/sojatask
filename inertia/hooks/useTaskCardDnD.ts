import { MutableRefObject, useEffect, useState } from 'react'
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import {
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source'
import invariant from 'tiny-invariant'
import {
  getCardDropTargetData,
  getTaskData,
  isCardData,
  isDraggingACard,
  isShallowEqual,
} from '#inertia/utils/kanbanboard.business'
import { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types'
import TaskDto from '#dtos/task'

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

type UseTaskCardDnDProps = {
  task: TaskDto
  columnId: number
  outerRef: MutableRefObject<HTMLDivElement | null>
  innerRef: MutableRefObject<HTMLDivElement | null>
}

export function useTaskCardDnD({ task, columnId, outerRef, innerRef }: UseTaskCardDnDProps) {
  const [state, setState] = useState<TCardState>({ type: 'idle' })

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    invariant(outer && inner, 'Outer and Inner refs must be set')

    return combine(
      // Draggable behavior
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
              })
            },
          })
        },
        onDragStart() {
          setState({ type: 'is-dragging' })
        },
        onDrop() {
          setState({ type: 'idle' })
        },
      }),
      // Drop target behavior
      dropTargetForElements({
        element: outer,
        getIsSticky: () => true,
        canDrop: isDraggingACard,
        getData: ({ element, input }) => {
          const data = getCardDropTargetData({ task, columnId })
          return attachClosestEdge(data, { element, input, allowedEdges: ['top', 'bottom'] })
        },
        onDragEnter({ source, self }) {
          if (!isCardData(source.data) || source.data.task.id === task.id) return

          const closestEdge = extractClosestEdge(self.data)
          if (!closestEdge) return

          setState({ type: 'is-over', dragging: source.data.rect, closestEdge })
        },
        onDrag({ source, self }) {
          if (!isCardData(source.data) || source.data.task.id === task.id) return

          const closestEdge = extractClosestEdge(self.data)
          if (!closestEdge) return

          const proposed: TCardState = { type: 'is-over', dragging: source.data.rect, closestEdge }
          setState((current) => (isShallowEqual(proposed, current) ? current : proposed))
        },
        onDragLeave({ source }) {
          if (!isCardData(source.data)) return

          if (source.data.task.id === task.id) {
            setState({ type: 'is-dragging-and-left-self' })
          } else {
            setState({ type: 'idle' })
          }
        },
        onDrop() {
          setState({ type: 'idle' })
        },
      })
    )
  }, [task, columnId])

  return { state, portalContainer: state.type === 'preview' ? state.container : null }
}
