import { Link, usePage } from '@inertiajs/react'
import { ErrorBag, Errors, PageProps as InertiaPageProps } from '@inertiajs/core'

interface User {
  id: number
  username: string
}

interface PageProps extends InertiaPageProps {
  user: User | null
  errors: Errors & ErrorBag
}

export default function Navbar() {
  const { user } = usePage<PageProps>().props
  console.log(user)
  return (
    <nav>
      <div>
        <div>
          <div>
            <Link href="/">Logo</Link>
            <Link href="/">Accueil</Link>
            <div>
              {user ? (
                <>
                  <div style={{ color: '#4a5568' }}>Connecté en tant que : {user.username}</div>
                  <Link href="/logout" style={{ color: '#4a5568' }}>
                    Déconnexion
                  </Link>
                </>
              ) : (
                <Link href="/login" style={{ color: '#4a5568' }}>
                  Connexion
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
