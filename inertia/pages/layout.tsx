import { ReactNode } from 'react'
import Navbar from '~/components/Navbar'
import { usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import { ProjectContextProvider } from '~/hooks/useProject'
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import AppSidebar from '~/components/AppSidebar'

const Layout = ({ children }: { children: ReactNode }) => {
  const user = usePage<SharedProps>().props.user

  return (
    <ProjectContextProvider>
      <div className="flex min-h-screen w-full flex-col">
        <header>{user && <Navbar />}</header>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          {children}
        </SidebarProvider>
      </div>
    </ProjectContextProvider>
  )
}

export default Layout
