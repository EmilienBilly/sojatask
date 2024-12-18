import { produce } from 'immer'

import { Task } from '../../types/task'
import { Column } from '../../types/column'
import { Board } from '../../types/board'
import { router } from '@inertiajs/react'

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
      // Si pas de tâche de destination, ajouter à la fin
      draft.tasks.push({
        ...originTask,
        order: draft.tasks.length + 1,
      })
    } else {
      // Insérer après la tâche de destination
      const index = draft.tasks.findIndex((task) => task.id === destinationTaskId)
      draft.tasks.splice(index + 1, 0, {
        ...originTask,
        order: draft.tasks[index].order + 0.5, // Placement entre deux ordres
      })
    }

    // Réordonner les tâches
    draft.tasks = draft.tasks
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((task, index) => ({
        ...task,
        order: index + 1,
      }))
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

export const updateReorderedTaskInDatabase = (
  boardId: number,
  taskId: number,
  destinationTaskId: number | null,
  sourceColumnId: number,
  destinationColumnId: number
) => {
  router.patch(`/boards/${boardId}/reorder/tasks`, {
    activeTaskId: taskId,
    overTaskId: destinationTaskId,
    activeColumnId: sourceColumnId,
    overColumnId: destinationColumnId,
  })
}
