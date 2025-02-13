import Roles from '#enums/roles'

type Params = {
  roleId: number
}

export type WorkspaceAbilities = {
  edit: boolean
  destroy: boolean
  manageMembers: boolean
}

export default class GetWorkspaceAbilities {
  static handle({ roleId }: Params): WorkspaceAbilities {
    return {
      edit: this.canEdit(roleId),
      destroy: this.canDestroy(roleId),
      manageMembers: this.canManageMembers(roleId),
    }
  }

  static canEdit(roleId: number) {
    return roleId === Roles.ADMIN
  }

  static canDestroy(roleId: number) {
    return roleId === Roles.ADMIN
  }

  static canManageMembers(roleId: number) {
    return roleId === Roles.ADMIN
  }
}
