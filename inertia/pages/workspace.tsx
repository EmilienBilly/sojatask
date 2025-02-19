import { Head, usePage } from '@inertiajs/react'
import type WorkspaceDto from '#dtos/workspace'
import { Separator } from '#shadcn/separator'
import WorkspaceHeader from '#inertia/WorkspaceHeader'
import WorkspaceBoards from '#inertia/WorkspaceBoards'
import WorkspaceMembers from '#inertia/WorkspaceMembers'

export default function Workspace() {
  const activeWorkspace = usePage().props.activeWorkspace as WorkspaceDto
  const fakeMembers = [
    { id: 1, name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Diana Prince', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Ethan Hunt', avatar: 'https://i.pravatar.cc/150?img=5' },
  ]

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
            <WorkspaceMembers members={fakeMembers} />
          </div>
        </div>
      </div>
    </>
  )
}
