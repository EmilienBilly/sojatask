import { Flex } from '~/components/utils/Flex'
import styled from 'styled-components'

const ProjecstList = styled.ul`
  list-style: none;
`

export default function ProjectsCategory() {
  return (
    <Flex $flxCol>
      <h2>Projets</h2>
      <ProjecstList>
        <li>Oui</li>
        <li>Non</li>
        <li>Oui</li>
      </ProjecstList>
    </Flex>
  )
}
