import { RefObject, useEffect } from 'react'

function useClickOutside<T extends HTMLElement>(ref: RefObject<T>, callback: () => void): void {
  useEffect(() => {
    // Fonction de gestion de l'événement
    const handleClickOutside = (event: MouseEvent) => {
      // Vérifie si le clic est à l'extérieur de l'élément référencé
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback() // Exécute la callback si le clic est à l'extérieur
      }
    }

    // Ajoute l'écouteur de clic au montage
    document.addEventListener('mousedown', handleClickOutside)

    // Nettoie l'écouteur de clic lors du démontage du composant
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback]) // Re-exécute l'effet seulement si `ref` ou `callback` change
}

export default useClickOutside
