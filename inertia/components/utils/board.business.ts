import { produce } from 'immer'

import { Task } from '../../types/task'
import { Column } from '../../types/column'
import { Board } from '../../types/board'

type DropTaskArgs = { columnId: number; cardId?: number } // cardId est optionnel

/**
 * Retire une tâche d'une colonne dans un tableau.
 */
const removeTaskFromColumn = (task: Task, board: Board): Board => {
  return produce(board, (draft) => {
    for (const column of draft.columns) {
      column.tasks = column.tasks.filter((t) => t.id !== task.id)
    }
  })
}

/**
 * Ajoute une tâche après une autre tâche dans une colonne spécifique.
 */
const dropTaskAfter = (
  originTask: Task,
  destinationTaskId: number | undefined,
  destinationColumn: Column
): Column => {
  console.log(originTask, destinationTaskId)
  return produce(destinationColumn, (draft) => {
    const index = draft.tasks.findIndex((task) => task.id === destinationTaskId)
    draft.tasks.splice(index + 1, 0, originTask)
  })
}

/**
 * Ajoute une tâche à une colonne spécifique dans le tableau.
 */
const addTaskToColumn = (task: Task, dropArgs: DropTaskArgs, board: Board): Board => {
  const newColumns = board.columns.map((column) => {
    if (column.id === dropArgs.columnId) {
      return dropTaskAfter(task, dropArgs.cardId, column)
    }
    return column
  })

  return {
    ...board,
    columns: newColumns,
  }
}

/**
 * Déplace une tâche entre colonnes dans un tableau.
 */
export const moveTask = (task: Task, dropArgs: DropTaskArgs, board: Board): Column[] => {
  const boardWithoutTask = removeTaskFromColumn(task, board)
  const boardWithTaskAdded = addTaskToColumn(task, dropArgs, boardWithoutTask)
  return boardWithTaskAdded.columns
}
