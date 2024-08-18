import styled from 'styled-components'
import ProjectsCategory from '~/components/ProjectsCategory'

const Sidenav = styled.div`
  padding: 15px;
  width: 260px;
  border-right-width: 1px;
  border-right-style: solid;
  border-color: hsla(211, 18%, 68%, 0.16);
`

export default function Sidebar() {
  return (
    <Sidenav>
      <ProjectsCategory />
    </Sidenav>
  )
}
