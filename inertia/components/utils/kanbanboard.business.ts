const taskCardKey = Symbol('task')

export type Task = {
  id: number
  title: string
  description: string
  archived: number
  createdBy: number
  columnId: number
  createdAt: string
  updatedAt: string
  dueDate: string | null
  order: number
}

export type Column = {
  id: number
  title: string
  boardId: number
  tasks: Task[]
}

export type Board = {
  id: number
  title: string
  description: string
  workspaceId: number
  columns: Column[]
}

export type TaskData = {
  [taskCardKey]: true
  task: Task
  columnId: number
  rect: DOMRect
}

export function getTaskData({
  task,
  columnId,
  rect,
}: Omit<TaskData, typeof taskCardKey> & { columnId: number }): TaskData {
  return {
    [taskCardKey]: true,
    task,
    columnId,
    rect,
  }
}

export function isCardData(value: Record<string | symbol, unknown>): value is TaskData {
  return Boolean(value[taskCardKey])
}

export function isDraggingACard({
  source,
}: {
  source: { data: Record<string | symbol, unknown> }
}): boolean {
  return isCardData(source.data)
}

const cardDropTargetKey = Symbol('card-drop-target')

export type TaskDropTargetData = {
  [cardDropTargetKey]: true
  task: Task
  columnId: number
}

export function isCardDropTargetData(
  value: Record<string | symbol, unknown>
): value is TaskDropTargetData {
  return Boolean(value[cardDropTargetKey])
}

export function getCardDropTargetData({
  task,
  columnId,
}: Omit<TaskDropTargetData, typeof cardDropTargetKey> & {
  columnId: number
}): TaskDropTargetData {
  return {
    [cardDropTargetKey]: true,
    task,
    columnId,
  }
}

const columnKey = Symbol('column')
export type ColumnData = {
  [columnKey]: true
  column: Column
}

export function getColumnData({ column }: Omit<ColumnData, typeof columnKey>): ColumnData {
  return {
    [columnKey]: true,
    column,
  }
}

export function isColumnData(value: Record<string | symbol, unknown>): value is ColumnData {
  return Boolean(value[columnKey])
}

export function isDraggingAColumn({
  source,
}: {
  source: { data: Record<string | symbol, unknown> }
}): boolean {
  return isColumnData(source.data)
}

export function isShallowEqual(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
): boolean {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }
  return keys1.every((key1) => Object.is(obj1[key1], obj2[key1]))
}

export const blockBoardPanningAttr = 'data-block-board-panning' as const
