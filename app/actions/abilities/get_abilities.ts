import GetWorkspaceAbilities, { WorkspaceAbilities } from './get_workspace_abilities.js'

type Params = {
  roleId: number
}

export type Abilities = {
  workspace: WorkspaceAbilities
}

export default class GetAbilities {
  static handle({ roleId }: Params): Abilities {
    return {
      workspace: GetWorkspaceAbilities.handle({ roleId }),
    }
  }
}
