import { ReactNode } from 'react'
import Navbar from '~/components/Navbar'
import { usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import { ProjectContextProvider } from '~/hooks/useProject'

const Layout = ({ children }: { children: ReactNode }) => {
  const user = usePage<SharedProps>().props.user

  return (
    <ProjectContextProvider>
      {user && <Navbar />}
      <div className="container">{children}</div>
    </ProjectContextProvider>
  )
}

export default Layout
