import { Link, usePage } from '@inertiajs/react'

interface User {
  username: string
  // Ajoutez d'autres propriétés de l'utilisateur si nécessaire
}

interface PageProps {
  user: User | null

  [key: string]: any
}

export default function Navbar() {
  const { user } = usePage<PageProps>().props
  const page = usePage<PageProps>()
  console.log(page.props)
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
