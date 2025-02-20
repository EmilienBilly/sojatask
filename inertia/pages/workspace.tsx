import { Head } from '@inertiajs/react'
import { Separator } from '#shadcn/separator'
import WorkspaceHeader from '#inertia/WorkspaceHeader'
import WorkspaceBoards from '#inertia/WorkspaceBoards'
import WorkspaceMembers from '#inertia/WorkspaceMembers'
import { InferPageProps } from '@adonisjs/inertia/types'
import WorkspacesController from '#controllers/workspaces_controller'
import UserDto from '#dtos/user'
import RoleDto from '#dtos/role'

export default function Workspace(props: InferPageProps<WorkspacesController, 'show'>) {
  const activeWorkspace = props.activeWorkspace
  const members = props.users as UserDto[]
  const roles = props.roles as RoleDto[]

  return (
    <>
      <Head title={activeWorkspace.title} />
      <div className="container p-6 mt-8 flex flex-col w-full max-w-[960px] mx-auto">
        <WorkspaceHeader workspace={activeWorkspace} />
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <WorkspaceBoards boards={activeWorkspace.boards} />
          </div>
          <div className="w-full md:w-[320px] shrink-0">
            <WorkspaceMembers members={members} roles={roles} />
          </div>
        </div>
      </div>
    </>
  )
}
