import type Workspace from '#models/workspace'

type Params = {
  workspace: Workspace
}

export default class GetWorkspaceUsers {
  static handle({ workspace }: Params) {
    return workspace.related('users').query()
  }
}
