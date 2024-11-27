import { ReactNode } from 'react'
import { usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '#shadcn/sidebar'
import AppSidebar from '#inertia/AppSidebar'
import Navbar from '#inertia/Navbar'
import { ProjectContextProvider } from '../hooks/useProject'

const AppLayout = ({ children }: { children: ReactNode }) => {
  const props = usePage<SharedProps>().props
  return (
    <ProjectContextProvider>
      <SidebarProvider>
        <AppSidebar workspaces={props.workspaces} activeWorkspace={props.activeWorkspace} />
        <SidebarInset>
          <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <Navbar />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </ProjectContextProvider>
  )
}

export default AppLayout
