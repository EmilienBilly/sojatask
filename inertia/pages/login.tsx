import { Head } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    username: '',
    password: '',
  })

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post('/login')
  }

  return (
    <>
      <Head title="Connexion" />

      <div className="container">
        <div className="title">Bienvenue sur Projet_CDA</div>

        <form onSubmit={submit}>
          <input
            type="text"
            value={data.username}
            onChange={(e) => setData('username', e.target.value)}
          />
          {errors.username && <div>{errors.username}</div>}
          <input
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
