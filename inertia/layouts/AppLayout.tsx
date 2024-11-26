import { ReactNode } from 'react'
import Navbar from '~/components/Navbar'
import { ProjectContextProvider } from '~/hooks/useProject'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import AppSidebar from '~/components/AppSidebar'
import { usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'

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
