import { TaskType } from './task'

export type ColumnType = {
  id: number
  title: string
  boardId: number
  tasks: TaskType[]
}
