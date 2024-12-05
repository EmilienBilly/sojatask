import Task from '#inertia/Task'
import { ListType } from '../types/list'
import { TaskType } from '../types/task'
import CreateTask from '#inertia/CreateTask'

type ListProps = {
  tasks: TaskType[]
  list: ListType
}

export default function List({ tasks, list }: ListProps) {
  return (
    <>
      <div className="flex flex-col min-w-72 border p-4 rounded-md self-start gap-2">
        <h2>{list.title}</h2>
        {tasks?.map((task) => <Task key={task.id} task={task} />)}
        <CreateTask listId={list.id} />
      </div>
    </>
  )
}
