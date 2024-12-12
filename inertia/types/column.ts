import { Task } from './task'

export type Column = {
  id: number
  title: string
  boardId: number
  tasks: Task[]
}
