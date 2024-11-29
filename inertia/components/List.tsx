import { useEffect, useRef, useState } from 'react'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import invariant from 'tiny-invariant'
import Task from '#inertia/Task'
import { ListType } from '../types/list'
import { TaskType } from '../types/task'
import CreateTask from '#inertia/CreateTask'

type ListProps = {
  listId: number
  tasks: TaskType[]
  list: ListType
}

export default function List({ listId, tasks, list }: ListProps) {
  const listRef = useRef(null)
  const [isDraggedOver, setIsDraggedOver] = useState(false)

  useEffect(() => {
    const listElement = listRef.current
    invariant(listElement)

    return dropTargetForElements({
      element: listElement,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
      getData: () => ({ listId }),
      getIsSticky: () => true,
    })
  }, [listId])

  return (
    <>
      <div className="min-w-72 border p-4 rounded-md self-start" ref={listRef}>
        <h2>{list.title}</h2>
        {tasks?.map((task) => <Task key={task.id} task={task} />)}
        <CreateTask listId={list.id} />
      </div>
    </>
  )
}
