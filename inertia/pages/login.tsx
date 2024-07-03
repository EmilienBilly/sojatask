import { Head } from '@inertiajs/react'

export default function Login() {
  return (
    <>
      <Head title="Connexion" />

      <div className="container">
        <div className="title">Bienvenue sur Projet_CDA</div>

        <form method="POST" action="/login">
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
          </div>
          <button type="submit">Connexion</button>
        </form>
      </div>
    </>
  )
}
