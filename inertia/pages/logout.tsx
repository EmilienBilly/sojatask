import { Head, Link } from '@inertiajs/react'

export default function Logout() {
  return (
    <>
      <Head title="Déconnexion" />

      <div className="container">
        <div className="title">Vous avez été déconnecté avec succès</div>
        <Link href="/login" as="button" type="button">
          Connexion
        </Link>
      </div>
    </>
  )
}
