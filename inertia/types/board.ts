import { ListType } from './list'

export type BoardType = {
  id: number
  title: string
  description: string
  workspaceId: number
  lists: ListType[]
}
