import { Head, usePage } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import { Flex } from '~/components/utils/Flex'
import styled from 'styled-components'

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
  max-width: 450px;

  input {
    margin-bottom: 15px;
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
export default function Login() {
  const { data, setData, post, processing } = useForm({
    username: '',
    password: '',
  })
  const error = usePage<SharedProps>().props.flash.error

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post('/login')
  }

  return (
    <>
      <Head title="Connexion" />

      <Flex $center={true} $flxCol={true} $full={true}>
        <div className="title">SojaTask</div>
        {error && <div className="alert alert-error">{error}</div>}
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
    </>
  )
}
