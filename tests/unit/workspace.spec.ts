import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import Workspace from '#models/workspace'
import WorkspaceService from '#services/workspace_service'
import User from '#models/user'
import WorkspaceDto from '#dtos/workspace'

test.group('Workspace', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('should return workspaces for authenticated user', async ({ assert, client }) => {
    // Arrange
    const user = await User.query().where('username', 'emilien.billy').firstOrFail()
    const workspace1 = await Workspace.create({ id: 1, title: 'workspace 1', createdBy: user.id })
    const workspace2 = await Workspace.create({ id: 2, title: 'workspace 2', createdBy: user.id })
    await user.related('workspaces').attach([workspace1.id, workspace2.id])

    await client.get('/').loginAs(user)

    const ctx = await testUtils.createHttpContext()
    Object.defineProperty(ctx, 'auth', {
      value: {
        user,
      },
    })
    const service = new WorkspaceService(ctx)

    const result = await service.getAuthenticatedUserWorkspaces()

    assert.equal(result.length, 2)
    assert.instanceOf(result[0], WorkspaceDto)
    assert.equal(result[0].id, workspace1.id)
  })
})
