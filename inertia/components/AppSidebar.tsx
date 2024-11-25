import * as React from 'react'

import { SearchForm } from '~/components/SearchForm'
import { WorkspaceSwitcher } from '~/components/WorkspaceSwitcher'
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
} from '~/components/ui/sidebar'
import WorkspaceDto from '#dtos/workspace'
import { NavUser } from '~/components/NavUser'

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
          <SidebarGroupLabel>Tableaux</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {activeWorkspace.boards && activeWorkspace.boards.length > 0 ? (
                activeWorkspace.boards.map((board) => (
                  <SidebarMenuItem key={board.title}>
                    <SidebarMenuButton asChild>
                      <a href="">{board.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <p>Aucun tableau</p>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
