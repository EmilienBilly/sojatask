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
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`/workspace/`}>Modifier le workspace</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {workspaces ? (
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
                            <Link href={`/boards/${board.id}`} prefetch>
                              {board.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))
                    ) : (
                      <SidebarMenuItem>
                        <p className="p-2">Il n'y a aucun tableau dans cet espace de travail</p>
                      </SidebarMenuItem>
                    )}
                    <SidebarMenuButton asChild>
                      <Link as="button" href={'/boards/create'}>
                        Créer un tableau
                        <Plus />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ) : (
          <SidebarGroup>
            <SidebarGroupContent>Aucun espace de travail créé pour le moment</SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
