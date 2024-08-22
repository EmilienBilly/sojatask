import { useProjectContext } from '~/hooks/useProject'

export default function SelectedProject() {
  const { selectedProject } = useProjectContext()
  return (
    <div>
      <h2>{selectedProject?.title}</h2>
    </div>
  )
}
