import { Head, Link } from '@inertiajs/react'
import { Flex } from '~/components/utils/Flex'
import styled from 'styled-components'
import { ReactElement } from 'react'
import AuthLayout from '~/layouts/AuthLayout'

const Logout = () => {
  return (
    <>
      <Head title="Déconnexion" />
      <Flex $center={true} $flxCol={true} $full={true} $gap="25px">
        <div className="title">Vous avez été déconnecté avec succès</div>
        <Button href="/login" type="button">
          Connexion
        </Button>
      </Flex>
    </>
  )
}

Logout.layout = (page: ReactElement) => <AuthLayout children={page} />

const Button = styled(Link)`
  background-color: #8b64fd;
  color: white;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

export default Logout
