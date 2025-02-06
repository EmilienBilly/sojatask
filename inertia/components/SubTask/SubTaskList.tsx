import { Table, TableBody, TableCell, TableHeader, TableRow } from '#shadcn/table'
import TaskDto from '#dtos/task'

export function SubTaskList({ subtasks }: { subtasks: TaskDto[] }) {
  console.log(subtasks)
  return (
    <>
      <Table>
        <TableHeader>Sous-tâches</TableHeader>
        <TableBody>
          {subtasks.map((subtask) => (
            <TableRow key={subtask.id}>
              <TableCell>{subtask.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
