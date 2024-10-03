import { Head, useForm, usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import { Flex } from '~/components/utils/Flex'
import styled from 'styled-components'

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  @media (min-width: 450px) {
    width: 60%;
  }
  @media (min-width: 769px) {
    width: 40%;
  }

  input {
    margin-bottom: 15px;
    padding: 5px;
    border: solid 1px #46444c;
    border-radius: 3px;

    :focus {
      border-color: #8b64fd;
      background-color: #8b64fd;
      outline: none;
    }
  }

  button {
    background-color: #8b64fd;
    color: white;
    padding: 8px 16px;
    font-size: 16px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
`

const Error = styled.span`
  color: red;
`
export default function Login() {
  const { data, setData, post, processing } = useForm({
    username: '',
    password: '',
  })
  const error = usePage<SharedProps>().props.flash.all.error

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post('/login')
  }

  return (
    <div className="container">
      <Head title="Connexion" />

      <Flex $center={true} $flxCol={true} $full={true} $gap="25px">
        <div className="title">SojaTask</div>
        {error && <Error>{error}</Error>}
        <LoginForm onSubmit={submit}>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            id="username"
            type="text"
            value={data.username}
            onChange={(e) => setData('username', e.target.value)}
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
          />
          <button type="submit" disabled={processing}>
            Login
          </button>
        </LoginForm>
      </Flex>
    </div>
  )
}
