import { Head, usePage } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    username: '',
    password: '',
  })
  const flashError = usePage<SharedProps>().props.flash.all

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post('/login')
  }

  return (
    <>
      <Head title="Connexion" />

      <div className="container">
        <div className="title">Bienvenue sur Projet_CDA</div>
        {flashError.errorsBag && <div className="alert alert-error">Identifiants incorrects</div>}
        <form onSubmit={submit}>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            id="username"
            type="text"
            value={data.username}
            onChange={(e) => setData('username', e.target.value)}
          />
          {errors.username && <div>{errors.username}</div>}
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
          />
          {errors.password && <div>{errors.password}</div>}
          <button type="submit" disabled={processing}>
            Login
          </button>
        </form>
      </div>
    </>
  )
}
