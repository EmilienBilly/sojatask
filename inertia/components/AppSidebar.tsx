import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '#shadcn/sidebar'
import WorkspaceDto from '#dtos/workspace'
import { WorkspaceSwitcher } from '#inertia/WorkspaceSwitcher'
import { SearchForm } from '#inertia/SearchForm'
import { NavUser } from '#inertia/NavUser'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '#shadcn/collapsible'
import { ChevronDown, Plus } from 'lucide-react'
import { Link } from '@inertiajs/react'

const data = {
  user: {
    name: 'Emilien Billy',
    avatar: '',
    email: 'emilien.billy@sojadis.com',
  },
}

export default function AppSidebar({
  activeWorkspace,
  workspaces,
  ...props
}: {
  activeWorkspace: WorkspaceDto
  workspaces: WorkspaceDto[]
} & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher workspaces={workspaces} activeWorkspace={activeWorkspace} />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <CollapsibleTrigger>
                Tableaux
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {activeWorkspace.boards && activeWorkspace.boards.length > 0 ? (
                    activeWorkspace.boards.map((board) => (
                      <SidebarMenuItem key={board.title}>
                        <SidebarMenuButton asChild>
                          {/*TODO: set href with board link*/}
                          <a href="">{board.title}</a>
                        </SidebarMenuButton>
                        <SidebarMenuButton asChild>
                          <Link href="/boards/create">
                            Créer un tableau
                            <Plus />
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  ) : (
                    <SidebarMenuItem>
                      <p className="p-2">Il n'y a aucun tableau dans cet espace de travail</p>
                      <SidebarMenuButton asChild>
                        <Link href="/boards/create">
                          Créer un tableau
                          <Plus />
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  <SidebarMenuItem></SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
