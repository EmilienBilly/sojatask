import { TaskType } from '../types/task'
import { Card, CardHeader, CardTitle } from '#shadcn/card'

type TaskCardProps = {
  task: TaskType
}
export default function Task({ task }: TaskCardProps) {
  return (
    <>
      <Card className="rounded-md">
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
        </CardHeader>
      </Card>
    </>
  )
}
