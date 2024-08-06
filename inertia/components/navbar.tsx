import { Link, usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import styled from 'styled-components'
import { Flex } from '~/components/utils/flex'

export default function Navbar() {
  const user = usePage<SharedProps>().props.user
  console.log(user)

  const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    color: #b2b8bd;
    padding: 15px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-color: hsla(211, 18%, 68%, 0.16);
  `

  return (
    <Nav>
      <>
        <Flex>
          <Link href="/">Accueil</Link>
        </Flex>
        <Flex gap="10px">
          <div>Connecté en tant que : {user.username}</div>
          <Link href="/logout" method="post">
            Déconnexion
          </Link>
        </Flex>
      </>
    </Nav>
  )
}
