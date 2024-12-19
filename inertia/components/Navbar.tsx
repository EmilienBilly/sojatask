import { Link } from '@inertiajs/react'
import styled from 'styled-components'
import DropdownButton from '#inertia/DropdownButton'
import { Flex } from './utils/Flex'

export default function Navbar() {
  return (
    <Nav>
      <>
        <Flex $gap="10px" $center>
          <HomeLink href="/">SojaTask</HomeLink>
          <DropdownButton />
        </Flex>
      </>
    </Nav>
  )
}

const HomeLink = styled(Link)`
  font-weight: bold;
  color: #8b64fd;
  margin-right: 8px;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  color: #b2b8bd;
  padding: 8px;
`
