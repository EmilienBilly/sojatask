import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import { BoardFactory } from '#database/factories/board_factory'
import { ListFactory } from '#database/factories/list_factory'
import { TaskFactory } from '#database/factories/task_factory'

test.group('BoardsController', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('display board component with the board + lists + tasks in props', async ({ client }) => {
    const user = await User.query().where('username', 'emilien.billy').firstOrFail()

    const board = await BoardFactory.create()
    const list = await ListFactory.merge({ boardId: board.id }).create()
    const task = await TaskFactory.merge({ listId: list.id }).create()

    const response = await client
      .get(`/user_projects/${board.projectId}/boards/${board.id}`)
      .withGuard('web')
      .loginAs(user)
      .withInertia()

    response.assertStatus(200)
    response.assertInertiaComponent('board')

    response.assertInertiaPropsContains({
      board: {
        id: board.id,
        title: board.title,
        description: board.description,
        projectId: board.projectId,
        lists: [
          {
            id: list.id,
            title: list.title,
            boardId: board.id,
            tasks: [
              {
                id: task.id,
                name: task.name,
                description: task.description,
                listId: list.id,
                archived: task.archived,
                deadline: task.deadline,
              },
            ],
          },
        ],
      },
    })
  })
})
