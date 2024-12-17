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
  return produce(destinationColumn, (draft) => {
    if (destinationTaskId === undefined) {
      // Ajouter la tâche à la fin si aucune tâche cible n'est spécifiée
      draft.tasks.push(originTask)
    } else {
      const index = draft.tasks.findIndex((task) => task.id === destinationTaskId)
      if (index === -1) {
        throw new Error(`Task with ID ${destinationTaskId} not found in the destination column.`)
      }
      draft.tasks.splice(index + 1, 0, originTask)
    }
  })
}

/**
 * Ajoute une tâche à une colonne spécifique dans le tableau.
 */
const addTaskToColumn = (task: Task, dropArgs: DropTaskArgs, board: Board): Board => {
  return produce(board, (draft) => {
    const destinationColumn = draft.columns.find((column) => column.id === dropArgs.columnId)
    if (!destinationColumn) {
      throw new Error(`Column with ID ${dropArgs.columnId} not found.`)
    }

    // Mettre à jour la colonne avec la nouvelle tâche
    const updatedColumn = dropTaskAfter(task, dropArgs.cardId, destinationColumn)
    draft.columns = draft.columns.map((column) =>
      column.id === dropArgs.columnId ? updatedColumn : column
    )
  })
}

/**
 * Déplace une tâche entre colonnes dans un tableau.
 */
export const moveTask = (task: Task, dropArgs: DropTaskArgs, board: Board): Column[] => {
  const boardWithoutTask = removeTaskFromColumn(task, board)
  const boardWithTaskAdded = addTaskToColumn(task, dropArgs, boardWithoutTask)
  return boardWithTaskAdded.columns
}
