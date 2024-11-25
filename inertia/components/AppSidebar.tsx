import * as React from 'react'

import { SearchForm } from '~/components/SearchForm'
import { WorkspaceSwitcher } from '~/components/WorkspaceSwitcher'
import {
  Sidebar,
  SidebarContent,
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

const data = {
  navMain: [
    {
      title: 'Tableaux',
      url: '#',
      items: [
        {
          title: 'Planning atelier',
          url: '#',
        },
        {
          title: 'SojaTask',
          url: '#',
        },
        {
          title: 'SojadisPro',
          url: '#',
        },
      ],
    },
  ],
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
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
