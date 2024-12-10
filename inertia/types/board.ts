import { ColumnType } from './column'

export type BoardType = {
  id: number
  title: string
  description: string
  workspaceId: number
  columns: ColumnType[]
}
