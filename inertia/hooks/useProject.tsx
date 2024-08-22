import { createContext, useContext, useState, ReactNode } from 'react'

// Définition du type pour un projet
interface Project {
  id: number
  title: string
  description: string
  created_by: number
}

// Définition du type pour le contexte
interface ProjectContextType {
  selectedProject: Project | null
  setSelectedProject: (project: Project | null) => void
}

// Création du contexte avec une valeur par défaut
export const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

// Hook pour accéder au contexte
export const useProjectContext = (): ProjectContextType => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider')
  }
  return context
}

// Le Provider qui va encapsuler l'application ou une partie de celle-ci
interface ProjectProviderProps {
  children: ReactNode
}

export const ProjectContextProvider = ({ children }: ProjectProviderProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </ProjectContext.Provider>
  )
}
