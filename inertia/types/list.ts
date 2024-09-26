import { TaskType } from '~/types/task'

export type ListType = {
  id: number
  title: string
  boardId: number
  tasks: TaskType[]
}
