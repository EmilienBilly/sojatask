type TaskDateStatusProps = {
  dueDate?: string | Date | null // Peut être une date ou une chaîne ISO
  currentDate?: Date // Permet de passer une date personnalisée pour les tests
}

export default function TaskDateStatus({ dueDate, currentDate = new Date() }: TaskDateStatusProps) {
  const parsedDueDate = dueDate ? new Date(dueDate) : undefined

  const isOverdue =
    parsedDueDate &&
    currentDate > parsedDueDate &&
    currentDate.toDateString() !== parsedDueDate.toDateString()

  if (!dueDate || !isOverdue) {
    // Si dueDate est vide ou non défini, on ne rend rien
    return null
  }

  return (
    <span
      className={`rounded-sm p-0.5 text-sm font-medium ${isOverdue ? 'text-red-600 bg-red-200' : 'text-gray-500'}`}
    >
      {isOverdue ? 'En retard' : 'À temps'}
    </span>
  )
}
