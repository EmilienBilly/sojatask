import * as React from 'react'
import { Briefcase, Check, ChevronsUpDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar'
import WorkspaceDto from '#dtos/workspace'

export function WorkspaceSwitcher({
  workspaces,
  defaultWorkspace,
}: {
  workspaces: WorkspaceDto[]
  defaultWorkspace: WorkspaceDto
}) {
  const [selectedWorkspace, setSelectedWorkspace] = React.useState(defaultWorkspace)
  console.log(selectedWorkspace)
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Briefcase className="size-4" />
              </div>
              <div className="flex flex-col gap-1 leading-none">
                <span className="font-semibold">Workspace</span>
                <span className="">{selectedWorkspace.title}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start">
            {workspaces.map((workspace) => (
              <DropdownMenuItem key={workspace.id} onSelect={() => setSelectedWorkspace(workspace)}>
                {workspace.title} {workspace === selectedWorkspace && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
