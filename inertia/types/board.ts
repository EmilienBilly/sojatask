import { ListType } from '~/types/list'

export type BoardType = {
  id: number
  title: string
  description: string
  projectId: number
  lists: ListType[]
}
