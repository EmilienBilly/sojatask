import Workspace from '#models/workspace'
import { workspaceInviteValidator } from '../../validators/workspace_validator.js'
import { Infer } from '@vinejs/vine/types'

type Params = {
  workspace: Workspace
  invitedByUserId: number
  data: Infer<typeof workspaceInviteValidator>
}

export default class SendWorkspaceInvite {
  static async handle({}: Params) {}
}
