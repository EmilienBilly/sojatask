import { Head, usePage } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'

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

      <div className="container">
        <div className="title">Bienvenue sur Projet_CDA</div>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={submit}>
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
        </form>
      </div>
    </>
  )
}
