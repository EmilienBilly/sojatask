import { Column } from './column'

export type Board = {
  id: number
  title: string
  description: string
  workspaceId: number
  columns: Column[]
}
