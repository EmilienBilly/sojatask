import { usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'

export default function useError(id: string | undefined): string | undefined {
  const errors = usePage<SharedProps>().props.errors

  if (!errors) {
    return undefined
  }

  if (!id) {
    return undefined
  }

  if (!errors[id]) {
    return undefined
  }

  return errors[id]
}
