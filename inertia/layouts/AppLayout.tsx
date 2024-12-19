import { ReactNode } from 'react'
import { usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import { SidebarProvider, SidebarTrigger } from '#shadcn/sidebar'
import AppSidebar from '#inertia/AppSidebar'
import Navbar from '#inertia/Navbar'
import { Toaster } from 'sonner'

const AppLayout = ({ children }: { children: ReactNode }) => {
  const props = usePage<SharedProps>().props
  return (
    <div className="h-screen">
      <Toaster />
      <SidebarProvider>
        <AppSidebar workspaces={props.workspaces} activeWorkspace={props.activeWorkspace} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b p-4">
            <SidebarTrigger />
            <Navbar />
          </header>
          <main className="h-full flex flex-col flex-1 overflow-auto">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default AppLayout
