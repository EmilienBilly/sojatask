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
}
