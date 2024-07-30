import { Link, usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import styled from 'styled-components'

export default function Navbar() {
  const user = usePage<SharedProps>().props.user
  console.log(user)

  const Nav = styled.nav`
    display: flex;
    justify-content: end;
    gap: 20px;
    background-color: #192958;
    color: #f7f8fa;
    padding: 15px;
  `

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: #f7f8fa;
  `

  return (
    <Nav>
      {user ? (
        <>
          <StyledLink href="/">Accueil</StyledLink>
          <div>Connecté en tant que : {user.username}</div>
          <StyledLink href="/logout" method="post">
            Déconnexion
          </StyledLink>
        </>
      ) : (
        <StyledLink href="/login" style={{ color: '#4a5568' }}>
          Connexion
        </StyledLink>
      )}
    </Nav>
  )
}
