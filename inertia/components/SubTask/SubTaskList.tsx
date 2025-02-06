import TaskDto from '#dtos/task'
import { SubTaskListItem } from '#inertia/SubTask/SubTaskListItem'

export function SubTaskList({ subtasks }: { subtasks: TaskDto[] }) {
  return (
    <>
      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Sous-tâches
      </span>
      <div className="grid">
        {subtasks.map((subtask) => (
          <SubTaskListItem key={subtask.id} subtask={subtask} />
        ))}
      </div>
    </>
  )
}
