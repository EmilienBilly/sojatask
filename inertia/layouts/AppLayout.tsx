import { ReactNode } from 'react'
import Navbar from '~/components/Navbar'
import { ProjectContextProvider } from '~/hooks/useProject'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import AppSidebar from '~/components/AppSidebar'

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ProjectContextProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <Navbar />
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </ProjectContextProvider>
  )
}

export default AppLayout
