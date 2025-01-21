type TaskDateStatusProps = {
  dueDate?: string | Date // Peut être une date ou une chaîne ISO
  currentDate?: Date // Permet de passer une date personnalisée pour les tests
}

export default function TaskDateStatus({ dueDate, currentDate = new Date() }: TaskDateStatusProps) {
  if (!dueDate) {
    // Si dueDate est vide ou non défini, on ne rend rien
    return null
  }

  const parsedDueDate = dueDate ? new Date(dueDate) : undefined

  const isOverdue =
    parsedDueDate &&
    currentDate > parsedDueDate &&
    currentDate.toDateString() !== parsedDueDate.toDateString()

  return (
    <span
      className={`rounded-sm p-0.5 text-sm font-medium ${isOverdue ? 'text-red-600 bg-red-200' : 'text-gray-500'}`}
    >
      {isOverdue ? 'En retard' : 'À temps'}
    </span>
  )
}
