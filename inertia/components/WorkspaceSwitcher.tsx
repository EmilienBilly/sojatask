import * as React from 'react'
import { Briefcase, Check, ChevronsUpDown, Plus } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar'
import WorkspaceDto from '#dtos/workspace'
import { router } from '@inertiajs/react'

export function WorkspaceSwitcher({
  workspaces,
  activeWorkspace,
}: {
  workspaces: WorkspaceDto[]
  activeWorkspace: WorkspaceDto
}) {
  const [selectedWorkspace, setSelectedWorkspace] = React.useState(activeWorkspace)

  function setActiveWorkspace(workspace: WorkspaceDto) {
    setSelectedWorkspace(workspace)
    router.get(`/workspaces/${workspace.id}`)
  }

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
                <span className="">{selectedWorkspace.title}</span>{' '}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start">
            {workspaces.map((workspace) => (
              <DropdownMenuItem key={workspace.id} onSelect={() => setActiveWorkspace(workspace)}>
                {workspace.title} {workspace === selectedWorkspace && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Nouveau workspace</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
