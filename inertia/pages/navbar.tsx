import { Link } from '@inertiajs/react'

export default function Navbar() {
  return (
    <nav>
      <div>
        <div>
          <div>
            <Link href="/">Logo</Link>
            <Link href="/">Accueil</Link>
            <Link href="/logout">Déconnexion</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
