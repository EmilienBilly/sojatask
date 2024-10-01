import { Link } from '@inertiajs/react'
import styled from 'styled-components'
import DropdownButton from '~/components/DropdownButton'
import { Flex } from '~/components/utils/Flex'
import UserProjectsDropdownButton from '~/components/UserProjectsDropdownButton'

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
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: hsla(211, 18%, 68%, 0.16);
`

const LogoutButton = styled(Link)`
  height: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #f7f8fa;
  color: #8b64fd;
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #dedede;
  }
`
export default function Navbar() {
  return (
    <Nav>
      <>
        <Flex $gap="10px" $center>
          <HomeLink href="/">SojaTask</HomeLink>
          <DropdownButton />
          <UserProjectsDropdownButton />
        </Flex>
        <Flex $gap="10px" $center>
          <Link href="/logout" method="post" as="button" type="button">
            Déconnexion
          </Link>
        </Flex>
      </>
    </Nav>
  )
}
